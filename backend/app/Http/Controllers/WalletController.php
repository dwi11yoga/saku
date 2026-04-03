<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    // tambah wallet
    public function create(Request $request)
    {
        // validasi
        $request->validate([
            'user_id' => 'required',
            'icon' => 'required',
            'color' => 'required',
            'name' => 'required|string|min:3|max:50',
            'initial_balance' => 'required|int',
            'note' => 'nullable|max:100'
        ]);

        // simpan data
        Wallet::create([
            'user_id' => $request->user_id,
            'name' => $request->name,
            'icon' => $request->icon,
            'color' => $request->color,
            'balance' => $request->initial_balance,
            'initial_balance' => $request->initial_balance,
            'note' => $request->note,
            'created_at' => now(),
            'updated_at' => now()
        ]);
        return response()->json($request->all());
    }
    // dapatkan balance saat ini
    public function currentBalance()
    {
        // saldo sat ini
        $balance = Wallet::where('user_id', 1)->sum('balance');

        // saldo minggu kemarin
        $transaction = Transaction::where('user_id', 1)
            ->whereBetween('date', [now()->subDays(7)->startOfDay(), now()->endOfDay()]);

        $lastWeekExpenses = (clone $transaction)->where('direction', 'out')
            ->sum('amount');
        $lastWeekRevenue = (clone $transaction)->where('direction', 'in')->sum('amount');
        $diff = $lastWeekRevenue - $lastWeekExpenses;
        // $diff = -200000;
        // jika diff positif, berarti dikurang dengan saldo saat ini. jika negatif maka sebaliknya
        if ($diff > 0) {
            $lastWeekBalance = $balance - abs($diff);
        } else {
            $lastWeekBalance = $balance + abs($diff);
        }

        // persentase berbedaan saldo
        $percentage = (($balance - $lastWeekBalance) / $lastWeekBalance) * 100;
        return [
            'balance' => $balance,
            'lastWeekBalance' => $lastWeekBalance,
            'growth' => $diff,
            // 'percentage' => number_format($percentage, 2, ',', '.'),
            'percentage' => $percentage,
        ];
    }

    // dapatkan semua data wallet
    public function getAllWallet()
    {
        return Wallet::where('user_id', 1)->latest()->get();
    }

    // dapatkan detail wallet / kantong
    public function walletDetail($id)
    {
        $data = Wallet::where('id', $id)
            ->with(['transaction' => function ($query) {
                $query->where('user_id', 1)
                    ->orderByDesc('date');
            }])
            ->withCount(['transaction as debit_count' => function ($query) {
                $query->where('user_id', 1)
                    ->where('direction', 'in');
            }])
            ->withCount(['transaction as credit_count' => function ($query) {
                $query->where('user_id', 1)
                    ->where('direction', 'out');
            }])
            ->first();

        // dapatkan total transaksi
        $data->transaction_count = $data->debit_count + $data->credit_count;

        // dapatkan periode
        $data->firstTransaction = $data->transaction->min('date');
        $data->latestTransaction = $data->transaction->max('date');

        // dapatkan data jumlah uang masuk dan keluar
        $data->debit = $data->transaction->where('direction', 'in')->sum('amount');
        $data->credit = $data->transaction->where('direction', 'out')->sum('amount');
        $data->total = $data->debit - $data->credit;

        return $data;
    }
}
