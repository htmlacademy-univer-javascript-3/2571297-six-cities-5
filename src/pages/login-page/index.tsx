import { PageLayout, Header } from '../../components';
import { LoginForm } from '../../components';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks';
import { selectCommonData } from '../../store/selectors';

export const LoginPage = () => {
  const currentCity = useAppSelector(selectCommonData).city;

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
