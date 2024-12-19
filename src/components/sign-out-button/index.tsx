import { Link } from 'react-router-dom';
import { useActions } from '../../hooks';
import { useCurrentRoute } from '../../hooks/use-current-route';

export const SignOutButton = () => {
  const { logout } = useActions();
  const currentRoute = useCurrentRoute();

  const handleSignOut = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    logout();
  };

  return (
    <li className="header__nav-item">
      <Link className="header__nav-link" to={currentRoute} onClick={handleSignOut}>
        <span className="header__signout">Sign out</span>
      </Link>
    </li>
  );
};
