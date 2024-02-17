import { inject, observer } from 'mobx-react';
import uuid from 'react-uuid';
import VisibilitySensor from 'react-visibility-sensor';
import Forecast from './forecast';
import Daily from './daily';
import ScrollContainer from 'react-indiana-drag-scroll';
import { IWeatherStoreProps } from '../interfaces/interfaces';
import { useEffect, useRef } from 'react';

const Result = inject('WeatherStore')(
  observer((props: IWeatherStoreProps) => {
    const { WeatherStore } = props || {};

    const {
      weatherData: {
        id = null,
        city = '',
        country = '',
        date = '',
        description = '',
        temp = null,
        sunset = '',
        sunrise = '',
        humidity = null,
        wind = null,
        highestTemp = null,
        lowestTemp = null,
        forecast = [],
        daily = [],
      } = {},
      days,
      weatherConditions,
      sunsetSunrise,
    } = WeatherStore || {};

    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
      ref.current?.scrollTo?.({
        left: 1600,
      });
    }, []);

    const dailyDate = (utc: number | null): string => {
      return utc ? new Date(utc * 1000).toLocaleDateString() : '';
    };

    const dayOfWeek = (utc: number | null): string => {
      const time = utc ? new Date(utc * 1000) : null;
      return time ? (days?.[time.getDay()] as string) : '';
    };

    const getMathFloor = (el: number | null): number => {
      return el ? Math.floor((el ?? 0) * 1) / 1 : 0;
    };

    const box2Param = [`${getMathFloor(highestTemp)}°`, `${wind} m/s`, sunrise, `${getMathFloor(lowestTemp)}°`, `${humidity}%`, sunset];

    return (
      <>
        <div className="row">
          <div className="col-12 box-title">
            <h2 className="ps-4 mt-4">
              {city}, {country}
            </h2>
            <h4 className="ps-4 mb-3">{date}</h4>
          </div>
          <div className="col-12 col-md-6 box-current">
            <div className="box1">
              <div className="box1__image">
                <i className={`icon wi wi-owm-${id}`} />
              </div>
              <div className="box1__heading">
                <h3>{getMathFloor(temp)}&#176;</h3>
                <h4>{description}</h4>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="box2 round">
              {weatherConditions &&
                weatherConditions.map((item, i) => (
                  <div key={i} className="item">
                    <h4>{box2Param[i]}</h4>
                    <span>{item}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="py-3 py-md-5">
          <div className="col-12 box-title">
            <h3>Hourly Forecast 4 days</h3>
          </div>

          <div className="col-12">
            <div className="box3">
              <ScrollContainer hideScrollbars={false} className="scroll-container">
                {forecast &&
                  forecast.map((el, i) => (
                    <Forecast
                      key={i}
                      temp={Math.floor(el?.main?.temp * 1) / 1}
                      icon={el?.weather?.[0]?.icon ?? ''}
                      month={el?.dt_txt?.slice(5, 7)}
                      day={el?.dt_txt?.slice(8, 10)}
                      hour={el?.dt_txt?.slice(11, 13)}
                    />
                  ))}
              </ScrollContainer>
            </div>
          </div>
        </div>

        <div className="py-3 py-md-5">
          <div className="col-12 box-title">
            <h3>Daily Forecast 7 days</h3>
          </div>

          <div className="col-12">
            <div className="box4">
              {daily &&
                daily.map((item, index) => (
                  <VisibilitySensor key={uuid()}>
                    {({ isVisible }: { isVisible: boolean }) => {
                      return (
                        <Daily
                          key={index}
                          tempDay={getMathFloor(item?.temp?.day ?? null)}
                          tempMorning={getMathFloor(item?.temp?.morn ?? null)}
                          tempNight={getMathFloor(item?.temp?.night ?? null)}
                          icon={item?.weather?.[0]?.icon ?? ''}
                          description={item?.weather?.[0]?.description ?? ''}
                          date={dailyDate(item?.dt ?? null)}
                          day={dayOfWeek(item?.dt ?? null)}
                          sunset={sunsetSunrise?.(item?.sunset ?? null)}
                          sunrise={sunsetSunrise?.(item?.sunrise ?? null)}
                          front={isVisible ? ' front' : ' back'}
                        />
                      );
                    }}
                  </VisibilitySensor>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  })
);

export default Result;
