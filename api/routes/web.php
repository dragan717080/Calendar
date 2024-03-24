<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    EventController,
    UserController,
};

Route::prefix('events')->group(function() {
    Route::get('/', [EventController::class, 'getAll']);
    Route::get('/{id}', [EventController::class, 'getById']);
    Route::post('/', [EventController::class, 'create'])->middleware('validateEmail');
    Route::patch('/{id}', [EventController::class, 'update'])->middleware('validateEmail');
    Route::delete('/{id}', [EventController::class, 'delete']);
});

Route::prefix('users')->group(function() {
    Route::get('/', [UserController::class, 'getAll']);
    Route::get('/{id}', [UserController::class, 'getById']);
    Route::post('/', [UserController::class, 'create'])->middleware('validateEmail');
    Route::patch('/{id}', [UserController::class, 'update'])->middleware('validateEmail');
    Route::delete('/{id}', [UserController::class, 'delete']);
});

Route::get('/', function () {
    return view('welcome');
});
