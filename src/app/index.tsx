import { MainPage } from '../pages/main-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../pages/not-found-page';
import { OfferPage } from '../pages/offer-page';
import { FavoritesPage } from '../pages/favorites-page';
import { LoginPage } from '../pages/login-page';
import { PrivateRoute } from '../components';
import { AppRoute, AuthStatus } from '../constants';
import { Provider } from 'react-redux';
import { store } from '../store';

const App = () => {
  // TODO: Get auth status from the server
  const authStatus = AuthStatus.Auth;

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Home} element={<MainPage />} />
          <Route path={AppRoute.OfferRouter} element={<OfferPage />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authStatus={authStatus}>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          {/* Match any other route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
