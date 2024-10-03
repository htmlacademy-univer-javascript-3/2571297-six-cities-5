import { Link } from 'react-router-dom';
import './styles.css';

const NotFoundPage = () => (
  <div className="not-found">
    <h1>404 - Page not found!</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <Link to="/" className="home-link">
      Go to Home
    </Link>
  </div>
);

export default NotFoundPage;
