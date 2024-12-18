import { Link } from 'react-router-dom';
import { useActions } from '../../hooks';

export const SignOutButton = () => {
  const { logout } = useActions();

  const handleSignOut = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    logout();
  };

  return (
    <li className="header__nav-item">
      <Link className="header__nav-link" to="#" onClick={handleSignOut}>
        <span className="header__signout">Sign out</span>
      </Link>
    </li>
  );
};
