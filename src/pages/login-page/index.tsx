import { PageLayout, Header } from '../../components';
import { LoginForm } from '../../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';

export const LoginPage = () => {
  const currentCity = useSelector((state: RootState) => state.common.city);

  return (
    <PageLayout pageClassName="page--gray page--login">
      <Header isNavVisible={false} />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm />
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Home}>
                <span>{currentCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </PageLayout>
  );
};
