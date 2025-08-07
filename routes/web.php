<?php

use App\Http\Controllers\CandidateController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ElectionController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\AuditTrailController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::resource('candidates', CandidateController::class);
    Route::resource('users', UserController::class);
    Route::resource('elections', ElectionController::class);
    Route::get('results', [ResultController::class, 'index'])->name('results.index');
    Route::get('results/{election}/excel', [ResultController::class, 'exportExcel'])->name('results.export.excel');
    Route::get('/audit-trail', [AuditTrailController::class, 'index'])->name('audit.index');
});

Route::middleware(['auth', 'user'])->group(function () {
    Route::get('/votes', [VoteController::class, 'index'])->name('votes.index');
    Route::post('/vote', [VoteController::class, 'store'])->name('vote.store');
});

require __DIR__ . '/auth.php';
