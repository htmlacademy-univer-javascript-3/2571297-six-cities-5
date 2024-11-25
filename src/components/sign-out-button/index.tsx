import { useActions } from '../../store/hooks';

export const SignOutButton = () => {
  const { logout } = useActions();

  const handleSignOut = () => {
    logout();
  };

  return (
    <li className="header__nav-item">
      <a className="header__nav-link" onClick={handleSignOut}>
        <span className="header__signout">Sign out</span>
      </a>
    </li>
  );
};
