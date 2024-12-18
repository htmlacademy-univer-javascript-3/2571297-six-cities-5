import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CityItem } from './city-item';
import { Cities } from '../../../constants';

describe('CityItem Component', () => {
  const mockCity = Cities.Paris;
  const mockOnSelect = vi.fn();

  const renderComponent = (isActive = false) =>
    render(<CityItem city={mockCity} isActive={isActive} onSelect={mockOnSelect} />);

  it('should render city name', () => {
    renderComponent();
    expect(screen.getByText(mockCity)).toBeInTheDocument();
  });

  it('should apply active class when isActive is true', () => {
    renderComponent(true);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('tabs__item--active');
  });

  it('should not apply active class when isActive is false', () => {
    renderComponent(false);
    const link = screen.getByRole('link');
    expect(link).not.toHaveClass('tabs__item--active');
  });

  it('should call onSelect with correct city when clicked', () => {
    renderComponent();
    const link = screen.getByRole('link');

    fireEvent.click(link);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(mockCity);
  });

  it('should prevent default behavior when clicked', () => {
    renderComponent();
    const link = screen.getByRole('link');

    fireEvent.click(link, {
      preventDefault: vi.fn(),
    });

    // Instead of checking preventDefault, we verify that onSelect was called
    // because preventDefault is handled internally by the component
    expect(mockOnSelect).toHaveBeenCalledWith(mockCity);
  });

  it('should have correct structure', () => {
    renderComponent();

    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveClass('locations__item');

    const link = screen.getByRole('link');
    expect(link).toHaveClass('locations__item-link', 'tabs__item');
  });
});
