import MainPage from '../pages/main-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from '../pages/not-found-page';
import OfferPage from '../pages/offer-page';
import FavoritesPage from '../pages/favorites-page';
import LoginPage from '../pages/login-page';
import PrivateRoute from '../components/private-route';

interface AppProps {
  offersCount: number;
}

const App = (props: AppProps) => {
  const { offersCount } = props;

  const isAuth = false; // Temporary

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage offersCount={offersCount} />} />
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute isAuth={isAuth}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        {/* Match any other route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
