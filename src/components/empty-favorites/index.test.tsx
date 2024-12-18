import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyFavorites } from './';

describe('EmptyFavorites Component', () => {
  const renderComponent = () => render(<EmptyFavorites />);

  it('should render empty favorites message', () => {
    renderComponent();
    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });

  it('should render description message', () => {
    renderComponent();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./)).toBeInTheDocument();
  });

  it('should have visually hidden heading', () => {
    renderComponent();
    const heading = screen.getByText('Favorites (empty)');
    expect(heading).toHaveClass('visually-hidden');
  });

  it('should have correct structure', () => {
    renderComponent();

    const container = screen.getByTestId('empty-favorites');
    expect(container).toHaveClass('favorites', 'favorites--empty');
    expect(container.tagName).toBe('SECTION');

    const section = container.querySelector('.favorites__status-wrapper');
    expect(section).toHaveClass('favorites__status-wrapper');

    const status = screen.getByText('Nothing yet saved.');
    expect(status).toHaveClass('favorites__status');
  });
});
