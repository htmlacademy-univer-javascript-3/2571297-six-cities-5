import { memo } from 'react';
import { Cities } from '../../../constants';
import { Link } from 'react-router-dom';
import { useCurrentRoute } from '../../../hooks/use-current-route';

interface CityItemProps {
  city: Cities;
  isActive: boolean;
  onSelect: (city: Cities) => void;
}

export const CityItem = memo(({ city, isActive, onSelect }: CityItemProps) => {
  const currentRoute = useCurrentRoute();

  return (
    <li className="locations__item">
      <Link
        to={currentRoute}
        className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
        onClick={() => onSelect(city)}
      >
        <span>{city}</span>
      </Link>
    </li>
  );
});

CityItem.displayName = 'CityItem';
