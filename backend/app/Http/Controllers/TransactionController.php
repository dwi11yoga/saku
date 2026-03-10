<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Carbon\Carbon;
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

        // proses data uang dan tanggal
        // $data = $data->map(function ($d) {
        //     $d->date = $d->date->translatedFormat('j F Y');
        //     return $d;
        // });
        foreach ($data as &$d) {
            $d->date = $d->date->translatedFormat('j F Y');
        }

        // dd($data);

        return $data;
    }

    // dapatkan data cashflow (debit dan credit)
    public function cashflow(Request $request)
    {
        // debit
        $debit = Transaction::where('user_id', 1)
            ->where('direction', 'in')
            ->whereBetween('date', [Carbon::now()->subDays(7)->startOfDay(), now()->endOfDay()])
            ->sum('amount');
        // credit
        $credit = Transaction::where('user_id', 1)
            ->where('direction', 'out')
            ->whereBetween('date', [Carbon::now()->subDays(7)->startOfDay(), now()->endOfDay()])
            ->sum('amount');
        return [
            'debit' => $debit,
            'credit' => $credit
        ];
    }
}
