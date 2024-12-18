import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from './';

describe('Footer Component', () => {
  const renderComponent = (children?: React.ReactNode) =>
    render(
      <MemoryRouter>
        <Footer>{children}</Footer>
      </MemoryRouter>
    );

  it('should render logo', () => {
    renderComponent();
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('alt', '6 cities logo');
    expect(logo).toHaveAttribute('src', 'img/logo.svg');
  });

  it('should render children when provided', () => {
    const testContent = 'Test Footer Content';
    renderComponent(<div>{testContent}</div>);
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('should have correct structure', () => {
    renderComponent();
    expect(screen.getByRole('contentinfo')).toHaveClass('footer', 'container');
    expect(screen.getByRole('link')).toHaveClass('footer__logo-link');
  });
});
