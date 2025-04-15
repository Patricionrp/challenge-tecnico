<?php

namespace App\Policies;

use App\Models\Space;
use App\Models\User;

class SpacePolicy
{
    
    /**
     * Authorize the user to reserve a space
     *
     * @param User $user
     * @param Space $space
     * @return boolean
     */
    public function reserve(User $user, Space $space) : bool
    {
        return $space->status === 'available';
    }
}
