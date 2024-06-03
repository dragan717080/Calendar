<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    EventController,
    UserController
};

// To do: make events child route of users/{id} since it's dependant on it like 'users/{id}/events'
Route::prefix('events')->group(function() {
    Route::get('/', [EventController::class, 'getAllEvents']);
    Route::get('/{id}', [EventController::class, 'getById']);
    Route::post('/', [EventController::class, 'create']);
    Route::patch('/{id}', [EventController::class, 'update'])->middleware('client');
    Route::delete('/{id}', [EventController::class, 'delete'])->middleware('client');
});

Route::prefix('users')->group(function() {
    Route::get('/', [UserController::class, 'getAll']);
    Route::get('/{id}', [UserController::class, 'getById']);
    Route::post('/', [UserController::class, 'create'])->middleware('validateEmail');
    Route::post('/sign-in', [UserController::class, 'signInWithCredentials'])->middleware(['validateEmail']);
    Route::post('/socials/sign-in', [UserController::class, 'signInWithSocials']);
    Route::post('/sign-out', [UserController::class, 'signOut']);
    Route::patch('/{id}', [UserController::class, 'update'])->middleware('validateEmail');
    Route::delete('/{id}', [UserController::class, 'delete']);
});

Route::get('/', function () {
    return view('welcome');
});
