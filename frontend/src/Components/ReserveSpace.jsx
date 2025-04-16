import { useState } from 'react';

export default function ReserveSpace({ space, token, onReserve }) {
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const activeReservation = space.reservations?.find(
    (reservation) => reservation.user_id === token.user_id && reservation.status !== 'cancelled'
  );

  async function handleReserve() {
    if (!date) {
      alert("Seleccioná una fecha.");
      return;
    }

    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        space_id: space.id,
        reserved_at: date,
      }),
    });

    if (res.ok) {
      alert('Reserva exitosa!');
      onReserve?.();
    } else {
      const error = await res.json();
      alert(`Error: ${error.message || 'Algo salió mal'}`);
    }
  }

  return (
    <li className="border border-gray-300 p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-2">{space.name}</h2>
      <p className="text-gray-700 mb-2">{space.description}</p>
      <p
        className={`font-medium mb-2 ${
          space.status === 'reserved' ? 'text-red-500' : 'text-green-500'
        }`}
      >
        {space.status === 'reserved' ? 'Reservado' : 'Habilitado'}
      </p>

      <input
        type="date"
        className="border rounded px-2 py-1 mb-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      
      {!activeReservation ? (
        <button
          className={`py-2 px-4 rounded-lg transition duration-200 ${
            space.status === 'reserved' || activeReservation
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={space.status === 'reserved' || activeReservation || loading}
          onClick={handleReserve}
        >
          {loading ? 'Reservando...' : space.status === 'reserved' || activeReservation ? 'Ya Reservado' : 'Reservar'}
        </button>
      ) : (
        <p className="text-yellow-500">Ya tienes una reserva activa para este espacio.</p>
      )}
    </li>
  );
}
