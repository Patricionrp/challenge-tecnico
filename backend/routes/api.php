<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\UserAuthController;

Route::controller(UserAuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});

Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
    Route::post('/logout', [UserAuthController::class, 'logout']);
});

