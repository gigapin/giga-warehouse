<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CausalController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\InventoryMovementController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MunicipalityController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\SupplierController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Route::get('/', [LoginController::class, 'index']);

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('/categories', CategoryController::class);
    Route::resource('/municipalities', MunicipalityController::class);
    Route::resource('/causals', CausalController::class);
    Route::resource('/items', ItemController::class);
    Route::resource('/customers', CustomerController::class);
    Route::resource('/suppliers', SupplierController::class);
    Route::resource('/inventory-movements', InventoryMovementController::class);
    Route::resource('/orders', OrderController::class);
    Route::resource('/order-details', OrderDetailController::class);
});

require __DIR__.'/settings.php';
