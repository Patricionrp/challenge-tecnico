<?php

use App\Http\Controllers\Auth\AdminAuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\UserAuthController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\SpaceController;
use Illuminate\Http\Request;

/* USER ROUTES */

Route::get(('/user'),function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(UserAuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/logout', 'logout')->middleware('auth:sanctum', 'role:user,admin');
});
Route::middleware('auth:sanctum','role:user,admin')->controller(ReservationController::class)->group(function () {
    Route::post('/reservations', 'store');
    Route::get('/user/reservations', 'getReservations');
    Route::patch('/user/reservations/{reservation}/cancel', 'cancel');
});
Route::middleware(['auth:sanctum', 'role:user,admin'])->controller(SpaceController::class)->group(function () {
    Route::get('/spaces', 'index');
    Route::get('/spaces/{space}', 'show');
});

/* ADMIN ROUTES */

Route::middleware(['auth:sanctum', 'role:admin'])->get('/admin/user', function (Request $request) {
    return $request->user();
});

Route::controller(AdminAuthController::class)->group(function () {
    Route::post('/admin/login', 'login');
    Route::post('/admin/logout', 'logout')->middleware('auth:sanctum', 'role:admin');
});

Route::middleware(['auth:sanctum', 'role:admin'])->controller(ReservationController::class)->group(function () {
    Route::get('/admin/reservations', 'getAllReservations');
    Route::patch('/admin/reservations/{reservation}/approve', 'approve');
    Route::patch('/admin/reservations/{reservation}/reject', 'reject');
});

