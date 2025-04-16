import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
export default function Reservations() {
  const { token } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      // Redirigir al login si no hay token
      navigate('/login');
      return;
    }

    async function fetchReservations() {
      setLoading(true);

      const res = await fetch('api/user/reservations', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setReservations(data.reservations);
        console.log(data);
      } else {
        alert('Error al obtener las reservas');
      }

      setLoading(false);
    }

    fetchReservations();
  }, [token]);

  if (loading) {
    return <p>Cargando reservas...</p>;
  }

  const handleCancelReservation = async (reservationId) => {
    setLoading(true);

    const res = await fetch(`api/user/reservations/${reservationId}/cancel`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      alert('Reserva cancelada exitosamente!');
      setReservations((prevReservations) =>
        prevReservations.map((reservation) => 
          reservation.id === reservationId 
            ? { ...reservation, status: 'cancelled' } 
            : reservation
        )
      );
    } else {
      alert(`Error: ${data.message || 'Algo salió mal al cancelar la reserva'}`);
    }

    setLoading(false);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'cancelled':
        return 'Cancelada';
      case 'rejected':
        return 'Rechazada';
      case 'approved':
        return 'Aprobada';
      case 'reserved':
      default:
        return 'Pendiente';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'cancelled':
      case 'rejected':
        return 'text-red-500';
      case 'approved':
        return 'text-green-500';
      case 'reserved':
      default:
        return 'text-yellow-500';
    }
  };

  return (
    <div className="reservations-page p-6">
      <h1 className="text-2xl font-bold mb-6">Mis Reservas</h1>

      {reservations.length === 0 ? (
        <p>No tienes reservas activas.</p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((reservation) => (
            <li key={reservation.id} className="border border-gray-300 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{reservation.space.name}</h2>
              <p className="text-gray-700 mb-2">{reservation.space.description}</p>
              <p className={`font-medium mb-2 ${getStatusColor(reservation.status)}`}>
                {getStatusText(reservation.status)}
              </p>
              <p className="text-gray-600">Fecha de Reserva: {new Date(reservation.reserved_at).toLocaleString()}</p>

              {(reservation.status !== 'cancelled' && reservation.status !== 'rejected') && (
                <button
                  onClick={() => handleCancelReservation(reservation.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 mt-4"
                >
                  Cancelar Reserva
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}