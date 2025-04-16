<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationRequest;
use App\Models\Reservation;
use App\Models\Space;
use App\ReservationStatusEnum;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ReservationController extends Controller
{
    use AuthorizesRequests;

    
    /**
    * Store a new reservation
    *
    * @param ReservationRequest $request
    * @return void
    */
    public function store(ReservationRequest $request)
    {
        $validatedData = $request->validated();

        $space = Space::findOrFail($validatedData['space_id']);

        $this->authorize('reserve', $space); // SpacePolicy

        $reservation = Reservation::create([
            'user_id' => Auth::id(),
            'space_id' => $validatedData['space_id'],
            'reserved_at' => $validatedData['reserved_at'],
            'status' => ReservationStatusEnum::RESERVED,
        ]);

        $space->update(['status' => ReservationStatusEnum::RESERVED]);

        return response()->json(['message' => 'Reservation created successfully.', 'reservation' => $reservation], 201);
    }

   /**
    * Cancel a reservation
    *
    * @param Reservation $reservation
    * @return void
    */
    public function cancel(Reservation $reservation)
    {

        $this->authorize('cancel', $reservation); // ReservationPolicy
        $reservation->update(['status' => ReservationStatusEnum::CANCELLED]);

        $space = Space::findOrFail($reservation->space_id);

        $space->update(['status' => ReservationStatusEnum::AVAILABLE]);

        return response()->json(['message' => 'Reservation cancelled successfully.']);
    }
   
    /**
     * Approve reservation method for admin
     *
     * @param Reservation $reservation
     * @return void
     */
    public function approve(Reservation $reservation)
    {
       
        $reservation->update([
            'status' => ReservationStatusEnum::APPROVED,
        ]);

        $space = Space::findOrFail($reservation->space_id);
        $space->update(['status' => ReservationStatusEnum::RESERVED]);
       
        return response()->json(['message' => 'Reservation approved.', 'reservation' => $reservation]);
    }

    /**
     * Reject reservation method for admin
     */

    public function reject(Reservation $reservation)
    {
        
        $reservation->update([
            'status' => ReservationStatusEnum::REJECTED,
        ]);
        
        $space = Space::findOrFail($reservation->space_id);
        $space->update(['status' => ReservationStatusEnum::AVAILABLE]);
        return response()->json(['message' => 'Reservation rejected.', 'reservation' => $reservation]);
    }


    /**
    * Get all reservations for the authenticated user
    *
    * @return void
    */
   public function getReservations()
   {
    $user = Auth::user();
    return response()->json([
        'reservations' => $user->reservations()->with('space')->get(),
    ]);
   }

   /**
    * Get all reservations for the admin
    *
    * @return void
    */
    public function getAllReservations()
    {
        return response()->json([
            'reservations' => Reservation::with(['user', 'space'])->latest()->get()
        ]);
    }

}
