import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { useMap } from '../../hooks/use-map';
import { Point } from '../../types/geo';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../constants';
import 'leaflet/dist/leaflet.css';
import { OfferCity } from '../../types/offer';

type MapProps = {
  width?: string;
  height?: string;
  city: OfferCity | undefined;
  points: Point[];
  selectedPoint: Point | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const Map = (props: MapProps): JSX.Element => {
  const { width = '512px', height = '100%', city, points, selectedPoint } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map && city) {
      map.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        city.location.zoom
      );

      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.title === selectedPoint.title ? currentCustomIcon : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint, city]);

  return <div style={{ width: width, height: height }} ref={mapRef}></div>;
};
