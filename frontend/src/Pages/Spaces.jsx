import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ReserveSpace from '../Components/ReserveSpace';

export default function Spaces() {
  const { token } = useContext(AuthContext);
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchSpaces() {
    const res = await fetch('/api/spaces', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    const spacesWithActiveReservation = data.map(space => {
      const activeReservation = Array.isArray(space.reservations)
        ? space.reservations.find(reservation => reservation.status === 'active' && reservation.user_id === user.id)
        : null;
      return { ...space, activeReservation };
    });
    setSpaces(spacesWithActiveReservation);
    setLoading(false);
  }

  useEffect(() => {
    if (token) {
      fetchSpaces();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <div className="reservations-page p-6">
      <h1 className="text-2xl font-bold mb-6">Lugares disponibles para reservar</h1>
      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : (
        <ul className="space-y-4">
          {spaces.map((space) => (
            <ReserveSpace
              key={space.id}
              space={space}
              token={token}
              onReserve={fetchSpaces}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
