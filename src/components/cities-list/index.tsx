import { Cities } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCity } from '../../store/action';

interface CitiesListProps {
  cities: Cities[];
}

export const CitiesList = ({ cities }: CitiesListProps) => {
  const dispatch = useDispatch();
  const activeCity = useSelector((state: { city: Cities }) => state.city);

  const handleCitySelect = (city: Cities) => {
    dispatch(setActiveCity(city));
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
