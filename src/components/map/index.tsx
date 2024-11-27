import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { useMap } from '../../hooks/use-map';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../constants';
import 'leaflet/dist/leaflet.css';
import { Offer, OfferCity, BaseOffer } from '../../types/offer';

type MapProps = {
  width?: string;
  height?: string;
  city: OfferCity | undefined;
  offers: Offer[];
  selectedOffer: BaseOffer | undefined;
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
  const { width = '512px', height = '100%', city, offers, selectedOffer } = props;

  const mapRef = useRef(null);

  const points = offers.map((offer: Offer) => ({
    id: offer.id,
    title: offer.title,
    ...offer.location,
  }));

  if (selectedOffer && !points.some((point) => point.id === selectedOffer.id)) {
    points.push({
      id: selectedOffer.id,
      title: selectedOffer.title,
      ...selectedOffer.location,
    });
  }

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
          .setIcon(selectedOffer !== undefined && point.id === selectedOffer.id ? currentCustomIcon : defaultCustomIcon)
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedOffer, city]);

  return <div style={{ width: width, height: height }} ref={mapRef}></div>;
};
