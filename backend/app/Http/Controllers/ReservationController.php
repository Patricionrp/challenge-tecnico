<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationRequest;
use App\Models\Reservation;
use App\Models\Space;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ReservationController extends Controller
{
    use AuthorizesRequests;

   public function store(ReservationRequest $request)
   {
       $validatedData = $request->validated();

       $space = Space::findOrFail($validatedData['space_id']);

       $this->authorize('reserve', $space); // SpacePolicy

       $reservation = Reservation::create([
           'user_id' => Auth::id(),
           'space_id' => $validatedData['space_id'],
           'reserved_at' => $validatedData['reserved_at'],
       ]);

       $space->update(['status' => 'reserved']);

       return response()->json(['message' => 'Reservation created successfully.', 'reservation' => $reservation], 201);
   }

   public function getReservations()
   {
    $user = Auth::user();
    return response()->json([
        'reservations' => $user->reservations()->with('space')->get(),
    ]);
   }

}
