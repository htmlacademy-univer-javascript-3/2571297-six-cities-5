import { Navigate } from 'react-router-dom';
import { AuthStatus, AppRoute } from '../../constants';
import { Spinner } from '../spinner';
import { useAppSelector } from '../../hooks';
import { selectAuthData } from '../../store/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
};

export const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const { authorizationStatus } = useAppSelector(selectAuthData);

  if (authorizationStatus === AuthStatus.Unknown) {
    return <Spinner fullPage />;
  }

  return authorizationStatus === AuthStatus.Auth ? children : <Navigate to={AppRoute.Login} />;
};
