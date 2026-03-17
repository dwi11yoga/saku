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
// cashflow
Route::get('/cashflow', [TransactionController::class, 'cashflow']);

// balance saat ini
Route::get('/current-balance', [WalletController::class, 'currentBalance']);
// daftar wallet
Route::get('/wallets', [WalletController::class, 'getWallet']);

// daftar kategori
Route::get('/categories', [CategoryController::class, 'getCategories']);
// detail kategori
Route::get('/categories/{id}', [CategoryController::class, 'categoryDetail']);
