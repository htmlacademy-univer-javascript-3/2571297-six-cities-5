import { useRef, useEffect, useMemo } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { useMap } from '../../hooks';
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

  const points = useMemo(() => {
    const basePoints = offers.map((offer: Offer) => ({
      id: offer.id,
      title: offer.title,
      ...offer.location,
    }));

    if (selectedOffer && !basePoints.some((point) => point.id === selectedOffer.id)) {
      return [
        ...basePoints,
        {
          id: selectedOffer.id,
          title: selectedOffer.title,
          ...selectedOffer.location,
        },
      ];
    }

    return basePoints;
  }, [offers, selectedOffer]);

  const map = useMap(mapRef, city);

  useEffect(() => {
    if (!map || !city) {
      return;
    }

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
  }, [map, points, selectedOffer, city]);

  return <div style={{ width, height }} ref={mapRef}></div>;
};
