<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    // dapatkan banyak data transaksi
    public function transactionList(Request $request)
    {
        $data = Transaction::with('category');

        // order
        if ($request->has('orderBy')) {
            match ($request->orderBy) {
                'terlama' => $data = $data->orderBy('date'),
                'terbaru' => $data = $data->orderByDesc('date'),
            };
        } else {
            $data = $data->orderBy('date', 'desc');
        }

        // jika ada param limit
        if ($request->has('limit')) {
            $data = $data->limit($request->limit);
        }

        $data = $data->get();

        return $data;
    }
}
