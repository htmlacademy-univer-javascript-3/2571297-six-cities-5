import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
  isAuth: boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { children, isAuth } = props;

  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
