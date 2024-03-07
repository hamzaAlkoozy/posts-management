<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:55',
            'email' => 'email|required|unique:users',
            'password' => 'required|confirmed'
        ]);

        $validatedData['password'] = Hash::make($request->password);

        $user = User::create($validatedData);

        // this token is required in react to send requests
        $accessToken = $user->createToken('authToken')->plainTextToken;

        return response(['user' => $user, 'access_token' => $accessToken]);
    }

    public function login(Request $request)
    {
        $loginData = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if (!auth()->attempt($loginData)) {
            return response(['message' => 'Invalid credentials']);
        }

        $accessToken = auth()->user()->createToken('authToken')->plainTextToken;

        return response(['user' => auth()->user(), 'access_token' => $accessToken]);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return response(['message' => 'Logged out']);
    }
}
