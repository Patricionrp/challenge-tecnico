<?php

namespace App\Models;

use App\ReservationStatusEnum;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'user_id',
        'space_id',
        'reserved_at',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function space()
    {
        return $this->belongsTo(Space::class);
    }

    public $casts = [
        'status' => ReservationStatusEnum::class,
    ];
}
