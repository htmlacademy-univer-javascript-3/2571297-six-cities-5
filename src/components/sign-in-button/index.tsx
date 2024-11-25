import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';

export const SignInButton = () => (
  <li className="header__nav-item user">
    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
      <div className="header__avatar-wrapper user__avatar-wrapper" />
      <span className="header__login">Sign in</span>
    </Link>
  </li>
);
