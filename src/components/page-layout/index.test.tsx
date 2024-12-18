import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageLayout } from './';

describe('Component: PageLayout', () => {
  it('should render children correctly', () => {
    render(
      <PageLayout>
        <div data-testid="test-child">Test Content</div>
      </PageLayout>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should have default page class', () => {
    const { container } = render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    );

    expect(container.firstChild).toHaveClass('page');
  });

  it('should append custom page class name', () => {
    const { container } = render(
      <PageLayout pageClassName="custom-page">
        <div>Content</div>
      </PageLayout>
    );

    expect(container.firstChild).toHaveClass('page', 'custom-page');
  });
});
