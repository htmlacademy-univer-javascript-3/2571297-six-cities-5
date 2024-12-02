import { memo, useCallback, useMemo } from 'react';
import { Cities } from '../../constants';
import { useActions, useAppSelector } from '../../hooks';
import { selectCommonData } from '../../store/selectors';
import { CityItem } from './components/city-item';

interface CitiesListProps {
  cities: Cities[];
}

const CitiesList = memo(({ cities }: CitiesListProps) => {
  const { setActiveCity } = useActions();
  const activeCity = useAppSelector(selectCommonData).city;

  const handleCitySelect = useCallback((city: Cities) => {
    setActiveCity(city);
  }, [setActiveCity]);

  const citiesList = useMemo(() => (
    cities.map((city) => (
      <CityItem
        key={city}
        city={city}
        isActive={city === activeCity}
        onSelect={handleCitySelect}
      />
    ))
  ), [cities, activeCity, handleCitySelect]);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {citiesList}
        </ul>
      </section>
    </div>
  );
});

CitiesList.displayName = 'CitiesList';

export { CitiesList };
