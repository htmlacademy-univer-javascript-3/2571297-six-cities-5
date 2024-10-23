import { Navigate } from 'react-router-dom';
import { AuthStatus } from '../../constants';

interface PrivateRouteProps {
  children: JSX.Element;
  authStatus: AuthStatus;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { children, authStatus } = props;

  return authStatus === AuthStatus.Auth ? children : <Navigate to="/login" />;
};
