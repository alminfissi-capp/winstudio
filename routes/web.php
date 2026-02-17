<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\FrameBuilderController;
use App\Http\Controllers\FrameController;
use App\Http\Controllers\ProjectController;
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

    // Frame Builder
    Route::get('frame-builder/create', [FrameBuilderController::class, 'create'])
        ->name('frame-builder.create');
    Route::get('frame-builder/{project}', [FrameBuilderController::class, 'show'])
        ->name('frame-builder.show');

    // Projects
    Route::get('projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::post('projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::patch('projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');

    // Clients
    Route::get('clients', [ClientController::class, 'index'])->name('clients.index');
    Route::post('clients', [ClientController::class, 'store'])->name('clients.store');
    Route::patch('clients/{client}', [ClientController::class, 'update'])->name('clients.update');
    Route::delete('clients/{client}', [ClientController::class, 'destroy'])->name('clients.destroy');

    // Frames (nested under projects)
    Route::post('projects/{project}/frames', [FrameController::class, 'store'])
        ->name('projects.frames.store');
    Route::patch('projects/{project}/frames/{frame}', [FrameController::class, 'update'])
        ->name('projects.frames.update');
    Route::delete('projects/{project}/frames/{frame}', [FrameController::class, 'destroy'])
        ->name('projects.frames.destroy');
    Route::post('projects/{project}/frames/reorder', [FrameController::class, 'reorder'])
        ->name('projects.frames.reorder');
});

require __DIR__.'/settings.php';
