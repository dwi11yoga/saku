<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Http\Request;

class WalletController extends Controller
{
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

    // dapatkan data wallet
    public function getWallet()
    {
        return Wallet::where('user_id', 1)->get();
    }
}
