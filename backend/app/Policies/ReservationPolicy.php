<?php
namespace App\Policies;

use App\Models\Reservation;
use App\Models\User;


class ReservationPolicy
{   
    /**
     * Authorize the user to cancel a reservation
     *
     * @param User $user
     * @param Reservation $reservation
     * @return boolean
     */
    public function cancel(User $user, Reservation $reservation): bool
    {
        return $user->id === $reservation->user_id;
    }

}