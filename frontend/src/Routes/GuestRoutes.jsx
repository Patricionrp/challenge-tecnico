import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const GuestRoutes = () => {
  const { token } = useContext(AuthContext);

  return token ? <Navigate to="/" /> : <Outlet />;
};

export default GuestRoutes;