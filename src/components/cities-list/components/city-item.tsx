import { memo } from 'react';
import { Cities } from '../../../constants';

interface CityItemProps {
  city: Cities;
  isActive: boolean;
  onSelect: (city: Cities) => void;
}

export const CityItem = memo(({ city, isActive, onSelect }: CityItemProps) => (
  <li className="locations__item">
    <a
      className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onSelect(city);
      }}
    >
      <span>{city}</span>
    </a>
  </li>
));

CityItem.displayName = 'CityItem';
