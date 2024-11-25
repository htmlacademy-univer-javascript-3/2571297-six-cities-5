import { Cities } from '../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { useActions } from '../../store/hooks';

interface CitiesListProps {
  cities: Cities[];
}

export const CitiesList = ({ cities }: CitiesListProps) => {
  const { setActiveCity } = useActions();
  const activeCity = useSelector((state: RootState) => state.common.city);

  const handleCitySelect = (city: Cities) => {
    setActiveCity(city);
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li key={city} className="locations__item">
              <a
                className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleCitySelect(city);
                }}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
