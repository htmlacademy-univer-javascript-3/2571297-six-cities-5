import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PrivateRoute } from './';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthStatus, AppRoute } from '../../constants';

const mockStore = configureMockStore();

// Mock the entire module
vi.mock('../spinner', () => ({
  Spinner: () => <div data-testid="spinner">Loading</div>,
}));

// Mock useAppSelector separately to control its return value
const mockUseAppSelector = vi.fn(() => ({
  authorizationStatus: AuthStatus.NoAuth,
}));

vi.mock('../../hooks', () => ({
  useAppSelector: () => mockUseAppSelector(),
}));

describe('Component: PrivateRoute', () => {
  const mockChildren = <div data-testid="protected-content">Protected Content</div>;

  const renderPrivateRoute = (authStatus: AuthStatus) => {
    mockUseAppSelector.mockReturnValue({
      authorizationStatus: authStatus,
    });

    return render(
      <Provider store={mockStore()}>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/protected" element={<PrivateRoute>{mockChildren}</PrivateRoute>} />
            <Route path={AppRoute.Login} element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  it('should render protected content when user is authorized', () => {
    renderPrivateRoute(AuthStatus.Auth);

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  it('should redirect to login when user is unauthorized', () => {
    renderPrivateRoute(AuthStatus.NoAuth);

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('should show spinner when auth status is unknown', () => {
    renderPrivateRoute(AuthStatus.Unknown);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});
