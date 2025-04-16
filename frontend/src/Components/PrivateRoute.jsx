import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
    const navigate = useNavigate();
  if (!token) {
    return navigate('/login', { replace: true });
  }

  return children;
}