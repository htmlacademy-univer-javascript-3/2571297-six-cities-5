import { MainPage } from '../pages/main-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../pages/not-found-page';
import { OfferPage } from '../pages/offer-page';
import { FavoritesPage } from '../pages/favorites-page';
import { LoginPage } from '../pages/login-page';
import { PrivateRoute } from '../components/private-route';
import { AppRoute, AuthStatus } from '../constants';
import { offersMock } from '../mocks/offers';

interface AppProps {
  offersCount: number;
}

const App = (props: AppProps) => {
  const { offersCount } = props;

  // TODO: Get auth status from the server
  const authStatus = AuthStatus.NoAuth;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Home} element={<MainPage offersCount={offersCount} offers={offersMock} />} />
        <Route path={AppRoute.OfferRouter} element={<OfferPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authStatus={authStatus}>
              <FavoritesPage offers={offersMock.filter((offer) => offer.isFavorite)} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        {/* Match any other route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
