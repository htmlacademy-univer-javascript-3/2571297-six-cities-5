import { PageLayout, Header } from '../../components';
import { LoginForm } from '../../components';
import { Link } from 'react-router-dom';
import { AppRoute, CITIES } from '../../constants';
import { useMemo } from 'react';
import { useActions } from '../../hooks';

export const LoginPage = () => {
  const { setActiveCity } = useActions();

  const randomCity = useMemo(() => CITIES[Math.floor(Math.random() * CITIES.length)], []);

  const handleCityClick = () => {
    setActiveCity(randomCity);
  };

  return (
    <PageLayout pageClassName="page--gray page--login">
      <Header isNavVisible={false} />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm />
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Home} onClick={handleCityClick}>
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </PageLayout>
  );
};
