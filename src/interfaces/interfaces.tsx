import { GeocoderOptions } from '@mapbox/mapbox-gl-geocoder';
import { ControlPosition, MarkerProps } from 'react-map-gl';

export interface IElements {
  nameClass?: string;
  children?: string | number | null;
}

export interface IWeatherDataDailyfeelsLike {
  day?: number;
  night?: number;
  eve?: number;
  morn?: number;
}

export interface IWeatherDataDailyTemp {
  day?: number;
  eve?: number;
  max?: number;
  min?: number;
  morn?: number;
  night?: number;
}

export interface IWeatherDataDailyWeather {
  description?: string;
  icon?: string;
  id?: number;
  main?: string;
}

export interface IWeatherDataDaily {
  clouds?: number;
  dew_point?: number;
  dt?: number;
  humidity?: number;
  moon_phase?: number;
  moonrise?: number;
  moonset?: number;
  pop?: number;
  pressure?: number;
  rain?: number;
  snow?: number;
  sunrise?: number;
  sunset?: number;
  uvi?: number;
  weather: any[];
  wind_deg?: number;
  wind_gust?: number;
  wind_speed?: number;
  feels_like?: IWeatherDataDailyfeelsLike;
  temp?: IWeatherDataDailyTemp;
}

export interface IWeatherDataForecastWeather {
  description?: string;
  icon?: string;
  id?: number;
  main?: string;
  [name: string]: number | string | any;
}

export interface IWeatherDataForecastClouds {
  all?: number;
  [name: string]: number | string | any;
}

export interface IWeatherDataForecastMain {
  [name: string]: number | string | any;
}

export interface IWeatherDataForecastSys {
  pod?: string;
  [name: string]: number | string | any;
}

export interface IWeatherDataForecastOther {
  [name: string]: number;
}

export interface IWeatherDataForecast {
  clouds: IWeatherDataForecastClouds;
  dt?: number;
  dt_txt?: string;
  main?: IWeatherDataForecastMain;
  grnd_level?: number;
  humidity?: number;
  pressure?: number;
  sea_level?: number;
  temp?: number;
  temp_kf?: number;
  temp_max?: number;
  temp_min?: number;
  pop?: number;
  rain?: IWeatherDataForecastOther;
  sys?: IWeatherDataForecastSys;
  visibility?: number;
  weather?: IWeatherDataForecastWeather[];
  wind?: IWeatherDataForecastOther;
  [name: string]: number | string | any;
}

export interface IWeatherData {
  city?: string;
  clouds?: number;
  country?: string;
  date?: string;
  description?: string;
  highestTemp?: number;
  humidity?: number;
  icon?: string;
  id?: number;
  lowestTemp?: number;
  main?: string;
  sunrise?: string;
  sunset?: string;
  temp?: number;
  wind?: number;
  daily?: IWeatherDataDaily[];
  forecast?: IWeatherDataForecast[];
  [name: string]: number | string | any;
}

export interface ISearchResults {
  city?: string | undefined;
  place?: string | undefined;
  language?: string | undefined;
  latitude?: number | undefined | null;
  longitude?: number | undefined | null;
}

export interface IWeatherStore {
  weatherData?: IWeatherData;
  isLoading?: boolean;
  weatherInfo?: boolean;
  error?: boolean;
  errorMsg?: string;
  mapboxToken?: string;
  searchResults?: ISearchResults;
  months?: string[];
  days?: string[];
  weatherConditions?: string[];
  exists?: (e: object) => void;
  sunsetSunrise?: (e: number | null) => string;
  addResults?: (params: ISearchResults) => void;
  retrieve?: () => Promise<void>;
}

export interface IViewport {
  latitude?: number | undefined | null;
  longitude?: number | undefined | null;
  zoom?: number | undefined | null;
  bearing?: number | undefined | null;
  pitch?: number | undefined | null;
  [name: string]: any;
}

export type IWeatherStoreProps = {
  WeatherStore?: IWeatherStore;
};

export type GeocoderControlProps = Omit<
  IWeatherStoreProps & GeocoderOptions,
  'accessToken' | 'mapboxgl' | 'marker'
> & {
  mapboxAccessToken?: string | undefined;
  marker?: boolean | Omit<MarkerProps, 'longitude' | 'latitude'>;
  position?: ControlPosition;
  onLoading?: (e: object) => void;
  onResults?: (e: object) => void;
  onResult?: (e: object) => void;
  onError?: (e: object) => void;
};
