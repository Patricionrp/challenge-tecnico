import { useState } from 'react';

export default function RejectReservation({ reservationId, token, onReject }) {
  const [loading, setLoading] = useState(false);

  const handleRejectReservation = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/reservations/${reservationId}/reject`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Error al rechazar la reserva');
      }

      const data = await res.json().catch((err) => {
        throw new Error('Respuesta no válida');
      });

      alert('Reserva rechazada exitosamente!');
      onReject(reservationId);

    } catch (error) {
      alert(`Error: ${error.message || 'Algo salió mal al rechazar la reserva'}`);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleRejectReservation}
      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
      disabled={loading}
    >
      {loading ? 'Rechazando...' : 'Rechazar'}
    </button>
  );
}