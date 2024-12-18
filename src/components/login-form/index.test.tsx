import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthStatus } from '../../constants';
import { BrowserRouter } from 'react-router-dom';
import { RequestError } from '../../types/error';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockLogin = vi.fn();

// Mock the useAppSelector hook directly
const mockSelector = vi.fn(() => ({
  authorizationStatus: AuthStatus.NoAuth,
  error: null as RequestError | null,
}));

vi.mock('../../hooks', () => ({
  useActions: () => ({
    login: mockLogin,
  }),
  useAppSelector: () => mockSelector(),
}));

describe('Component: LoginForm', () => {
  const renderLoginForm = (authStatus = AuthStatus.NoAuth, error: RequestError | null = null) => {
    // Update both store and selector
    mockSelector.mockReturnValue({
      authorizationStatus: authStatus,
      error,
    });

    const store = mockStore({
      auth: {
        authorizationStatus: authStatus,
        error,
      },
    });

    return {
      store,
      ...render(
        <Provider store={store}>
          <BrowserRouter>
            <LoginForm />
          </BrowserRouter>
        </Provider>
      ),
    };
  };

  it('should render form elements', () => {
    renderLoginForm();

    expect(screen.getByTestId('login-title')).toHaveTextContent('Sign in');
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Sign in');
  });

  it('should handle input changes', () => {
    renderLoginForm();

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@test.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call login on form submit', () => {
    renderLoginForm();

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const form = screen.getByTestId('login-form');

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'password123',
    });
  });

  it('should display error messages when present', () => {
    const errorMessages = [
      'email must be an email',
      'Password no have letter or number!',
      'password must be longer than or equal to 2 characters',
      'password should not be empty',
      'email should not be empty',
    ];
    const mockError: RequestError = { status: 400, messages: errorMessages };

    // Update both store and selector with error state
    mockSelector.mockReturnValue({
      authorizationStatus: AuthStatus.NoAuth,
      error: mockError,
    });

    renderLoginForm(AuthStatus.NoAuth, mockError);

    const errorElements = screen.getAllByTestId('error-message');
    expect(errorElements).toHaveLength(errorMessages.length);

    errorElements.forEach((element, index) => {
      expect(element).toHaveTextContent(errorMessages[index]);
      expect(element).toHaveClass('form__error-message');
    });
  });

  it('should have correct structure', () => {
    renderLoginForm();

    expect(screen.getByTestId('login-title')).toHaveClass('login__title');
    expect(screen.getByTestId('login-form')).toHaveClass('login__form', 'form');
    expect(screen.getByTestId('submit-button')).toHaveClass('login__submit', 'form__submit', 'button');

    const inputWrappers = screen.getAllByTestId('input-wrapper');
    inputWrappers.forEach((wrapper) => {
      expect(wrapper).toHaveClass('login__input-wrapper', 'form__input-wrapper');
    });
  });
});
