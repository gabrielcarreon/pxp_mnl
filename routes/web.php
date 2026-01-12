<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\CalendarController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('calendar')->controller(CalendarController::class)->group(function () {
        Route::get('/', 'index')->name('calendar');
    });

    Route::prefix('bookings')->controller(BookingController::class)->group(function () {
        Route::get('/', 'index')->name('bookings');
    });
});

require __DIR__.'/settings.php';
