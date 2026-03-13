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

        // jika di beri filter bulan
        if ($request->has('month') && $request->has('year')) {
            $data = $data->whereMonth('date', $request->month)
                ->whereYear('date', $request->year);
        }

        // dapatkan data
        $data = $data->get();

        // jika di groupby
        if ($request->has('groupby')) {
            $data = $data->groupBy(function ($transaction) {
                return $transaction->date->format('Y-m-d');
            });
        }

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
