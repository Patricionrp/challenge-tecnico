import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import RejectReservation from '../../Components/RejectReservation';
import ApproveReservation from '../../Components/ApproveReservation';
import { useNavigate } from 'react-router-dom';

export default function AdminReservations() {
  const { token } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // Redirigir al login de admin si no hay token
      navigate('/admin');
      return;
    }

    async function fetchReservations() {
      setLoading(true);

      const res = await fetch('/api/admin/reservations', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setReservations(data.reservations);
      } else {
        alert('Error al obtener las reservas');
      }

      setLoading(false);
    }

    fetchReservations();
  }, [token, navigate]);

  const handleReject = (reservationId) => {
    setReservations((prevReservations) =>
      prevReservations.map((reservation) =>
        reservation.id === reservationId ? { ...reservation, status: 'rejected' } : reservation
      )
    );
  };

  const handleApprove = (reservationId) => {
    setReservations((prevReservations) =>
      prevReservations.map((reservation) =>
        reservation.id === reservationId ? { ...reservation, status: 'approved' } : reservation
      )
    );
  };

  if (loading) {
    return <p>Cargando reservas...</p>;
  }

  return (
    <div className="admin-reservations-page p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Administracion</h1>
      <h2 className="text-2xl font-bold mb-6">Reservas</h2>

      <button
        onClick={() => navigate('/')}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Ir a Pagina Principal
      </button>

      {reservations.length === 0 ? (
        <p>No hay reservas pendientes.</p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((reservation) => (
            <li key={reservation.id} className="border border-gray-300 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{reservation.space.name}</h2>
              <p className="text-gray-700 mb-2">{reservation.space.description}</p>
              <p className="text-gray-600 mb-2">Usuario: {reservation.user?.name || 'Usuario desconocido'}</p>
              <p
                className={`font-medium mb-2 ${
                  reservation.status === 'rejected'
                    ? 'text-red-500'
                    : reservation.status === 'approved'
                    ? 'text-green-500'
                    : reservation.status === 'cancelled'
                    ? 'text-gray-500'
                    : 'text-yellow-500'
                }`}
              >
                {reservation.status === 'rejected'
                  ? 'Rechazada'
                  : reservation.status === 'approved'
                  ? 'Aprobada'
                  : reservation.status === 'cancelled'
                  ? 'Cancelada'
                  : 'Pendiente'}
              </p>
              <p className="text-gray-600">Fecha de Reserva: {new Date(reservation.reserved_at).toLocaleString()}</p>

              {reservation.status !== 'cancelled' && (
                <div className="mt-4 flex space-x-4">
                  {reservation.status !== 'approved' && (
                    <ApproveReservation 
                      reservationId={reservation.id} 
                      token={token} 
                      onApprove={handleApprove} 
                    />
                  )}
                  
                  {reservation.status !== 'rejected' && (
                    <RejectReservation 
                      reservationId={reservation.id} 
                      token={token} 
                      onReject={handleReject} 
                    />
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}