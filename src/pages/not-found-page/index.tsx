import { Link } from 'react-router-dom';
import './styles.css';
import { Footer, Header, PageLayout } from '../../components';
import { AppRoute } from '../../constants';

export const NotFoundPage = () => (
  <PageLayout pageClassName="page--gray page--not-found">
    <Header />
    <div className="not-found">
      <h1>404 - Page not found!</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to={AppRoute.Home} className="home-link">
        Go to Home
      </Link>
    </div>
    <Footer />
  </PageLayout>
);
