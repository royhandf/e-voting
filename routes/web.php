<?php

use App\Http\Controllers\CandidateController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ElectionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VoteController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
});

Route::middleware(['auth', 'admin'])->group(function () {

    Route::resource('candidates', CandidateController::class);
    Route::resource('users', UserController::class);
    Route::resource('elections', ElectionController::class);
});

Route::middleware(['auth', 'user'])->group(function () {
    Route::get('/votes', [VoteController::class, 'index'])->name('votes.index');
    Route::post('/vote', [VoteController::class, 'store'])->name('vote.store');
    Route::get('/votes/history', [VoteController::class, 'history'])->name('votes.history');
});

require __DIR__ . '/auth.php';
