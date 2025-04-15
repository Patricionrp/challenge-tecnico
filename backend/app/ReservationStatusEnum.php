<?php

namespace App;

enum ReservationStatusEnum : string
{
    case AVAILABLE = 'available';
    case RESERVED = 'reserved';
    case CANCELLED = 'cancelled';
    case APPROVED = 'approved';
    case REJECTED = 'rejected';
}
