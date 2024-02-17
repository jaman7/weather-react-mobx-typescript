import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useControl, Marker } from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { GeocoderControlProps, ISearchResults } from '../interfaces/interfaces';

const GeocoderControl = inject('WeatherStore')(
  observer((props: GeocoderControlProps) => {
    const { WeatherStore } = props;
    const [marker, setMarker] = useState<React.ReactElement | null>(null);

    const {
      searchResults: { city = '', place = '', language = '', latitude = null, longitude = null } = {},
      mapboxToken = '',
      addResults,
    } = WeatherStore || {};

    const [results, setResults] = useState<ISearchResults>({
      city,
      place,
      language,
      latitude,
      longitude,
    });

    const geocoder = useControl<MapboxGeocoder>(
      () => {
        const ctrl = new MapboxGeocoder({
          ...props,
          marker: false,
          accessToken: mapboxToken,
        });
        ctrl.on('loading', () => props.onLoading);
        ctrl.on('results', () => props.onResults);

        if (results.city === 'Zakopane') {
          setMarker(<Marker longitude={(results?.longitude as number) ?? 0} latitude={results?.latitude ?? 0} anchor="bottom" />);
        } else {
          setMarker(null);
        }

        ctrl.on('result', evt => {
          props?.onResult?.(evt);

          const { result, result: { text = '', place_name = '' } = {} } = evt || {};

          const location = result?.center || (result?.geometry?.type === 'Point' && result?.geometry?.coordinates);

          const lang = (data: unknown | any): string => {
            return 'language' in data ? data?.language ?? '' : data?.context?.[1]?.language ?? '';
          };

          if (location && props.marker) {
            const searchResults: ISearchResults = {
              city: text,
              place: place_name,
              language: lang(result),
              latitude: location[0],
              longitude: location[1],
            };
            setResults(() => searchResults);

            addResults?.(searchResults);

            setMarker(<Marker longitude={location[0]} latitude={location[1]} />);
          } else {
            setMarker(null);
          }
        });
        ctrl.on('error', () => props.onError);
        return ctrl;
      },
      {
        position: props.position,
      }
    );
    if (geocoder?._map) {
      switch (true) {
        case geocoder.getProximity() !== props.proximity && props.proximity !== undefined:
          geocoder.setProximity(props.proximity);
          break;
        case geocoder.getRenderFunction() !== props.render && props.render !== undefined:
          geocoder.setRenderFunction(props.render);
          break;
        case geocoder.getLanguage() !== props.language && props.language !== undefined:
          geocoder.setLanguage(props.language);
          break;
        case geocoder.getZoom() !== props.zoom && props.zoom !== undefined:
          geocoder.setZoom(props.zoom);
          break;
        case geocoder.getFlyTo() !== props.flyTo && props.flyTo !== undefined:
          geocoder.setFlyTo(props.flyTo);
          break;
        case geocoder.getPlaceholder() !== props.placeholder && props.placeholder !== undefined:
          geocoder.setPlaceholder(props.placeholder);
          break;
        case geocoder.getCountries() !== props.countries && props.countries !== undefined:
          geocoder.setCountries(props.countries);
          break;
        case geocoder.getTypes() !== props.types && props.types !== undefined:
          geocoder.setTypes(props.types);
          break;
        case geocoder.getMinLength() !== props.minLength && props.minLength !== undefined:
          geocoder.setMinLength(props.minLength);
          break;
        case geocoder.getLimit() !== props.limit && props.limit !== undefined:
          geocoder.setLimit(props.limit);
          break;
        case geocoder.getFilter() !== props.filter && props.filter !== undefined:
          geocoder.setFilter(props.filter);
          break;
        case geocoder.getOrigin() !== props.origin && props.origin !== undefined:
          geocoder.setOrigin(props.origin);
          break;
        default:
          break;
      }
    }

    return marker;
  })
);

const noop = (): any => {};

GeocoderControl.wrappedComponent.defaultProps = {
  marker: true,
  onLoading: noop,
  onResults: noop,
  onResult: noop,
  onError: noop,
};

export default GeocoderControl;
