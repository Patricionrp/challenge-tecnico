import { useState } from 'react';

export default function ApproveReservation({ reservationId, token, onApprove }) {
  const [loading, setLoading] = useState(false);

  const handleApproveReservation = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/reservations/${reservationId}/approve`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Error al aprobar la reserva');
      }

      const data = await res.json().catch((err) => {
        throw new Error('Respuesta no válida');
      });

      alert('Reserva aprobada exitosamente!');
      onApprove(reservationId);

    } catch (error) {
      alert(`Error: ${error.message || 'Algo salió mal al aprobar la reserva'}`);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleApproveReservation}
      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
      disabled={loading}
    >
      {loading ? 'Aprobando...' : 'Aprobar'}
    </button>
  );
}