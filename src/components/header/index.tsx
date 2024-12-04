import { Link } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../constants';
import { UserNavigation } from '../user-navigation';
import { SignOutButton } from '../sign-out-button';
import { SignInButton } from '../sign-in-button';
import { useAppSelector } from '../../hooks';
import { selectAuthData } from '../../store/selectors';

interface HeaderProps {
  isNavVisible?: boolean;
  showUserNav?: boolean;
}

export const Header = ({ isNavVisible = true, showUserNav = true }: HeaderProps) => {
  const { authorizationStatus } = useAppSelector(selectAuthData);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={`header__logo-link${isNavVisible ? ' header__logo-link--active' : ''}`} to={AppRoute.Home}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {isNavVisible && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {showUserNav &&
                  (authorizationStatus === AuthStatus.Auth ? (
                    <>
                      <UserNavigation />
                      <SignOutButton />
                    </>
                  ) : (
                    <SignInButton />
                  ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};
