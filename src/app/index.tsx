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
import { useActions } from '../store/hooks';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/types';

const AppContent = () => {
  const { checkAuth, fetchFavorites } = useActions();
  const authorizationStatus = useSelector((state: RootState) => state.auth.authorizationStatus);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authorizationStatus === AuthStatus.Auth) {
      fetchFavorites();
    }
  }, [authorizationStatus, fetchFavorites]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Home} element={<MainPage />} />
        <Route path={AppRoute.OfferRouter} element={<OfferPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        {/* Match any other route */}
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
