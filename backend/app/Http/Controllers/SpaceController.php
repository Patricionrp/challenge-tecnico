<?php

namespace App\Http\Controllers;

use App\Models\Space;
use Illuminate\Http\Request;

class SpaceController extends Controller
{
    public function index()
    {
        return Space::all();
    }

    public function show($id)
    {
        return Space::findOrFail($id);
    }

}
