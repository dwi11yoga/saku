<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\WalletController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// daftar transaksi
Route::get('/transactions', [TransactionController::class, 'transactionList']);
// tambah transaksi
Route::post('/transactions', [TransactionController::class, 'create']);
// cashflow
Route::get('/cashflow', [TransactionController::class, 'cashflow']);
// detail transaksi
Route::get('/transaction/{id}', [TransactionController::class, 'transactionDetail']);

// balance saat ini
Route::get('/current-balance', [WalletController::class, 'currentBalance']);
// daftar wallet
Route::get('/wallets', [WalletController::class, 'getAllWallet']);
// tambah kantong
Route::post('/wallet', [WalletController::class, 'create']);
// detail kantong
Route::get('/wallet/{id}', [WalletController::class, 'walletDetail']);
// simpan edit kantong
Route::put('/wallet/{id}', [WalletController::class, 'update']);

// daftar kategori
Route::get('/categories', [CategoryController::class, 'getCategories']);
// tambah kategori
Route::post('/categories', [CategoryController::class, 'create']);
// simpan edit kategori
Route::put('/categories/{id}', [CategoryController::class, 'update']);
// detail kategori
Route::get('/categories/{id}', [CategoryController::class, 'categoryDetail']);
