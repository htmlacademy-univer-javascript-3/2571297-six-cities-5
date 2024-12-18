import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Spinner } from './';

describe('Component: Spinner', () => {
  it('should render basic spinner correctly', () => {
    const { container } = render(<Spinner />);

    expect(container.querySelector('.spinner-container')).toBeInTheDocument();
    expect(container.querySelector('.spinner')).toBeInTheDocument();
    expect(container.querySelector('.spinner__circle')).toBeInTheDocument();
    expect(container.querySelector('.spinner-overlay')).not.toBeInTheDocument();
  });

  it('should render full page spinner when fullPage prop is true', () => {
    const { container } = render(<Spinner fullPage />);

    expect(container.querySelector('.spinner-container')).toHaveClass('spinner-overlay');
    expect(container.querySelector('.spinner')).toBeInTheDocument();
    expect(container.querySelector('.spinner__circle')).toBeInTheDocument();
  });

  it('should have correct class names for styling', () => {
    const { container } = render(<Spinner />);

    const spinnerContainer = container.querySelector('.spinner-container');
    const spinner = container.querySelector('.spinner');
    const spinnerCircle = container.querySelector('.spinner__circle');

    expect(spinnerContainer).toHaveClass('spinner-container');
    expect(spinner).toHaveClass('spinner');
    expect(spinnerCircle).toHaveClass('spinner__circle');
  });

  it('should have correct class names for overlay mode', () => {
    const { container } = render(<Spinner fullPage />);

    const spinnerContainer = container.querySelector('.spinner-container');
    expect(spinnerContainer).toHaveClass('spinner-container', 'spinner-overlay');
  });

  it('should have correct structure', () => {
    const { container } = render(<Spinner />);

    const spinnerContainer = container.querySelector('.spinner-container');
    const spinner = spinnerContainer?.querySelector('.spinner');
    const spinnerCircle = spinner?.querySelector('.spinner__circle');

    expect(spinnerContainer).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
    expect(spinnerCircle).toBeInTheDocument();
  });
});
