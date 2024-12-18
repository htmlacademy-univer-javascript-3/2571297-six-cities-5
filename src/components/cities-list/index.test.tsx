import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CitiesList } from './index';
import { Cities, SortOption } from '../../constants';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { commonReducer } from '../../store/common';

describe('CitiesList Component', () => {
  const mockCities = [Cities.Paris, Cities.Amsterdam, Cities.Brussels];

  const createStore = (initialCity = Cities.Paris) =>
    configureStore({
      reducer: {
        common: commonReducer,
      },
      preloadedState: {
        common: {
          city: initialCity,
          sortOption: SortOption.Popular,
        },
      },
    });

  const renderComponent = (cities = mockCities) => {
    const store = createStore();
    return render(
      <Provider store={store}>
        <CitiesList cities={cities} />
      </Provider>
    );
  };

  it('should render all cities', () => {
    renderComponent();

    mockCities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('should highlight active city', () => {
    const store = createStore(Cities.Amsterdam);
    render(
      <Provider store={store}>
        <CitiesList cities={mockCities} />
      </Provider>
    );

    const activeLink = screen.getByText(Cities.Amsterdam).closest('a');
    expect(activeLink).toHaveClass('tabs__item--active');
  });

  it('should render correct number of cities', () => {
    renderComponent();

    const cityItems = screen.getAllByRole('listitem');
    expect(cityItems).toHaveLength(mockCities.length);
  });

  it('should have correct structure', () => {
    renderComponent();

    expect(screen.getByRole('list')).toHaveClass('locations__list', 'tabs__list');
    expect(screen.getByRole('list').parentElement).toHaveClass('locations', 'container');
  });
});
