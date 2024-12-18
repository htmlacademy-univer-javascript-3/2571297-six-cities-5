import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../constants';
import { MainPage } from '../../pages/main-page';
import { OfferPage } from '../../pages/offer-page';
import { FavoritesPage } from '../../pages/favorites-page';
import { LoginPage } from '../../pages/login-page';
import { NotFoundPage } from '../../pages/not-found-page';
import { PrivateRoute } from '../../components/private-route';
import { useActions, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { selectAuthData } from '../../store/selectors';

export const AppRouter = () => {
  const { checkAuth, fetchFavorites } = useActions();
  const { authorizationStatus } = useAppSelector(selectAuthData);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authorizationStatus === AuthStatus.Auth) {
      fetchFavorites();
    }
  }, [authorizationStatus, fetchFavorites]);

  return (
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
  );
};
