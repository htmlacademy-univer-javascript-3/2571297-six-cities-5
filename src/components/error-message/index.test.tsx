import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './';

describe('ErrorMessage Component', () => {
  it('should render default error message', () => {
    render(<ErrorMessage />);
    expect(screen.getByText('Server is unavailable. Please try again later.')).toBeInTheDocument();
  });

  it('should render custom error message', () => {
    const message = 'Custom error message';
    render(<ErrorMessage message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('should have correct structure', () => {
    render(<ErrorMessage />);
    expect(screen.getByTestId('error-message')).toHaveClass('error-message');
    expect(screen.getByText('Server is unavailable. Please try again later.')).toHaveClass('error-message__text');
  });
});
