import { useState } from 'react';
import { inject, observer } from 'mobx-react';
import Map from 'react-map-gl';
import GeocoderControl from './geocoder-control';
import { IViewport, IWeatherStoreProps } from '../interfaces/interfaces';

const SearchCity = inject('WeatherStore')(
  observer((props: IWeatherStoreProps) => {
    const { WeatherStore } = props;
    const { mapboxToken } = WeatherStore || {};
    const styles = {
      width: '100%',
      height: 'calc(50vh)',
    };

    const [viewport, setViewport] = useState<IViewport>({
      latitude: 49.3,
      longitude: 19.96667,
      zoom: 6,
      bearing: 0,
      pitch: 0,
    });

    return (
      <Map
        initialViewState={{ ...viewport }}
        style={styles}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(nextViewport: IViewport): void =>
          setViewport(nextViewport ?? {})
        }
        mapboxAccessToken={mapboxToken}
      >
        <GeocoderControl
          mapboxAccessToken={mapboxToken as string}
          position="top-left"
        />
      </Map>
    );
  })
);

export default SearchCity;
