<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Exception;


class AdminAuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        try {
            $validatedData = $request->validated();

            $user = User::where('email', $validatedData['email'])->first();

            if (!$user || !Hash::check($validatedData['password'], $user->password)) {
                return response()->json([
                    'message' => 'Invalid credentials'
                ], 401);
            }

            if ($user->role !== 'admin') {
                return response()->json([
                    'message' => 'Unauthorized'
                ], 403);
            }

            $token = $user->createToken($user->name)->plainTextToken;

            return response()->json([
                'message' => 'Admin logged in successfully',
                'user' => $user,
                'token' => $token,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong, please try again later'
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();

            return response()->json([
                'message' => 'Admin logged out successfully'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong, please try again later'
            ], 500);
        }
    }
}
