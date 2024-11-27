import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthStatus, AppRoute } from '../../constants';
import { Spinner } from '../spinner';
import { RootState } from '../../store/types';

type PrivateRouteProps = {
  children: JSX.Element;
};

export const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const authorizationStatus = useSelector((state: RootState) => state.auth.authorizationStatus);

  if (authorizationStatus === AuthStatus.Unknown) {
    return <Spinner fullPage />;
  }

  return authorizationStatus === AuthStatus.Auth ? children : <Navigate to={AppRoute.Login} />;
};
