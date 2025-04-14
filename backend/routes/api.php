<?php

use App\Http\Controllers\Auth\AdminAuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\UserAuthController;

Route::controller(UserAuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/logout', 'logout')->middleware('auth:sanctum', 'role:user');
});

Route::controller(AdminAuthController::class)->group(function () {
    Route::post('/admin/login', 'login');
    Route::post('/admin/logout', 'logout')->middleware('auth:sanctum', 'role:admin');
});
