import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CitiesList } from './index';
import { useAppSelector, useActions } from '../../hooks';
import { Cities, CITIES } from '../../constants';
import { Mock } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../hooks', () => ({
  useAppSelector: vi.fn(),
  useActions: vi.fn(),
}));

describe('CitiesList Component', () => {
  const mockSetActiveCity = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useActions as Mock).mockReturnValue({ setActiveCity: mockSetActiveCity });
  });

  const renderWithRouter = (component: React.ReactNode) => render(<MemoryRouter>{component}</MemoryRouter>);

  it('should render all cities', () => {
    (useAppSelector as Mock).mockReturnValue({ city: Cities.Paris });

    renderWithRouter(<CitiesList cities={CITIES} />);

    CITIES.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('should highlight active city', () => {
    (useAppSelector as Mock).mockReturnValue({ city: Cities.Amsterdam });

    renderWithRouter(<CitiesList cities={CITIES} />);

    const activeLink = screen.getByText(Cities.Amsterdam).closest('a');
    expect(activeLink).toHaveClass('tabs__item--active');
  });

  it('should call setActiveCity when city is clicked', () => {
    (useAppSelector as Mock).mockReturnValue({ city: Cities.Paris });

    renderWithRouter(<CitiesList cities={CITIES} />);

    fireEvent.click(screen.getByText(Cities.Amsterdam));
    expect(mockSetActiveCity).toHaveBeenCalledWith(Cities.Amsterdam);
  });

  it('should render correct number of cities', () => {
    (useAppSelector as Mock).mockReturnValue({ city: Cities.Paris });

    renderWithRouter(<CitiesList cities={CITIES} />);

    const cityItems = screen.getAllByRole('listitem');
    expect(cityItems).toHaveLength(CITIES.length);
  });

  it('should have correct structure', () => {
    (useAppSelector as Mock).mockReturnValue({ city: Cities.Paris });

    renderWithRouter(<CitiesList cities={CITIES} />);

    expect(screen.getByRole('list')).toHaveClass('locations__list', 'tabs__list');
    expect(screen.getByRole('list').parentElement).toHaveClass('locations', 'container');
  });
});
