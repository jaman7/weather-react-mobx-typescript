import {
  observable,
  configure,
  makeObservable,
  action,
  runInAction,
} from 'mobx';
import axios from 'axios';
import {
  ISearchResults,
  IWeatherData,
  IWeatherStore,
} from '../interfaces/interfaces';

axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5/';
axios.defaults.responseType = 'json';
const apikey = 'ae98d58d517252f2065829367d320dbb';
const urloptions = `&APPID=${apikey}&units=metric`;

configure({
  enforceActions: 'never',
});

class WeatherStore implements IWeatherStore {
  weatherData: IWeatherData = { icon: '04n' };

  isLoading = true;

  weatherInfo = false;

  error = false;

  errorMsg: string = '';

  mapboxToken: string =
    'pk.eyJ1IjoiamFtYW43IiwiYSI6ImNqbmV0bTFrczBrZG8zcm80Y2h4ZGF1ajQifQ.8aCc8P2-eq4hqman9k0E7g';

  searchResults: ISearchResults = {
    city: 'Zakopane',
    place: 'Zakopane, powiat tatrzański, województwo małopolskie, Polska',
    language: 'pl',
    latitude: 49.3,
    longitude: 19.96667,
  };

  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  weatherConditions: string[] = [
    'Hight',
    'Wind',
    'Sunrise',
    'Low',
    'Rain',
    'Sunset',
  ];

  exists = (x: unknown): boolean =>
    x !== null || typeof x !== 'undefined' || x !== '';

  sunsetSunrise = (utc: number | null): string => {
    return utc ? new Date(utc * 1000).toLocaleTimeString().slice(0, 5) : '';
  };

  async retrieve(): Promise<void> {
    try {
      this.isLoading = true;

      const { city, latitude, longitude } = this.searchResults;

      const weather = await axios.get(`weather?q=${city}${urloptions}`);
      const forecast = await axios.get(`forecast?q=${city}${urloptions}`);
      const forecast7 = await axios.get(
        `onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apikey}`
      );
      const weatherRequests = weather.data;
      const forecastRequests = forecast.data;
      const forecastRequests7 = forecast7.data;

      const weatherAll = await Promise.all([
        weatherRequests,
        forecastRequests,
        forecastRequests7,
      ]);

      const currentDate = new Date();
      const date = `${
        this.days?.[currentDate?.getDay()]
      } ${currentDate.getDate()} ${this.months?.[currentDate?.getMonth()]}`;

      const sunset = this.sunsetSunrise(weatherAll[0].sys.sunset);
      const sunrise = this.sunsetSunrise(weatherAll[0].sys.sunrise);

      const [data1, data2, data3] = weatherAll || [];
      const {
        name,
        sys,
        weather: weatherRes,
        main,
        clouds,
        wind,
      } = data1 || {};

      const weatherDataPayload: IWeatherData = {
        city: name,
        country: sys.country,
        date,
        description: weatherRes?.[0]?.description ?? '',
        main: weatherRes?.[0]?.main ?? '',
        icon: weatherRes?.[0]?.icon ?? '',
        id: weatherRes?.[0]?.id ?? null,
        temp: main?.temp ?? null,
        highestTemp: main?.temp_max ?? null,
        lowestTemp: main?.temp_min ?? null,
        sunrise,
        sunset,
        clouds: clouds?.all ?? null,
        humidity: main?.humidity ?? null,
        wind: wind?.speed ?? null,
        forecast: data2?.list ?? [],
        daily: data3?.daily ?? [],
      };

      console.log(weatherDataPayload);

      runInAction(() => {
        this.isLoading = false;
        this.weatherInfo = true;
        this.weatherData = weatherDataPayload;
        this.error = false;
      });
    } catch (error) {
      this.weatherInfo = true;
      this.isLoading = false;
      this.errorMsg = 'Error loading todos';
    }
  }

  addResults = (params: ISearchResults): void => {
    this.searchResults = params;
    this.retrieve().then();
  };

  constructor() {
    makeObservable(this, {
      weatherData: observable,
      isLoading: observable,
      weatherInfo: observable,
      mapboxToken: observable,
      error: observable,
      searchResults: observable,
      months: observable,
      days: observable,
      weatherConditions: observable,
      exists: action,
      sunsetSunrise: action,
      retrieve: action,
      addResults: action,
    });
  }
}

export default new WeatherStore();
