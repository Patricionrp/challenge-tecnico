<?php

namespace App\Policies;

use App\Models\Space;
use App\Models\User;

class SpacePolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function reserve(User $user, Space $space) : bool
    {
        return $space->status === 'available';
    }
}
