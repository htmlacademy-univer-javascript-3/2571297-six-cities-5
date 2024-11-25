import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';

interface FooterProps {
  children?: React.ReactNode;
}

export const Footer = ({ children }: FooterProps) => (
  <footer className="footer container">
    <Link className="footer__logo-link" to={AppRoute.Home}>
      <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
    </Link>
    {children}
  </footer>
);
