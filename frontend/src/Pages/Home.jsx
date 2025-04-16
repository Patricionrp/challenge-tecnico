import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function Home() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleReservationClick = () => {
    if (token) {
      navigate('/spaces');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-page">
      <h1>Bienvenido a la App de Reservas</h1>
      <button 
        onClick={handleReservationClick}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Hacer una Reserva
      </button>
    </div>
  );
}