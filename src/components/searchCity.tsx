import { useState } from 'react';
import { inject, observer } from 'mobx-react';
import Map, { FullscreenControl, NavigationControl, ScaleControl, ViewState } from 'react-map-gl';
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

    const [viewport, setViewport] = useState({
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
        mapboxAccessToken={mapboxToken}
        attributionControl={false}
      >
        <GeocoderControl mapboxAccessToken={mapboxToken as string} position="top-left" />
        <FullscreenControl />
        <NavigationControl />
      </Map>
    );
  })
);

export default SearchCity;
