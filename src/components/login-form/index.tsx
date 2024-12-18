import { FormEvent, useState, useEffect } from 'react';
import { useActions, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../constants';
import { LoginFormState } from './interfaces';
import { selectAuthData } from '../../store/selectors';
import './styles.css';

export const LoginForm = () => {
  const { login } = useActions();
  const navigate = useNavigate();
  const { authorizationStatus, error } = useAppSelector(selectAuthData);

  const initialFormState: LoginFormState = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState<LoginFormState>(initialFormState);

  useEffect(() => {
    if (authorizationStatus === AuthStatus.Auth) {
      navigate(AppRoute.Home);
    }
  }, [authorizationStatus, navigate]);

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    login(formData);
  };

  return (
    <section className="login">
      <h1 className="login__title" data-testid="login-title">
        Sign in
      </h1>
      <form className="login__form form" action="#" method="post" onSubmit={handleSubmit} data-testid="login-form">
        {error && (
          <>
            {error.messages.map((message: string) => (
              <div key={message} className="form__error-message" data-testid="error-message">
                {message}
              </div>
            ))}
          </>
        )}
        <div className="login__input-wrapper form__input-wrapper" data-testid="input-wrapper">
          <label className="visually-hidden">E-mail</label>
          <input
            className="login__input form__input"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            data-testid="email-input"
          />
        </div>
        <div className="login__input-wrapper form__input-wrapper" data-testid="input-wrapper">
          <label className="visually-hidden">Password</label>
          <input
            className="login__input form__input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            data-testid="password-input"
          />
        </div>
        <button className="login__submit form__submit button" type="submit" data-testid="submit-button">
          Sign in
        </button>
      </form>
    </section>
  );
};
