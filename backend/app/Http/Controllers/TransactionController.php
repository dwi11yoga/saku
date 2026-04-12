<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Wallet;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

use function Symfony\Component\Clock\now;

class TransactionController extends Controller
{
    // buat transaksi
    public function create(Request $request)
    {
        // validasi
        $request->validate([
            'user_id' => 'required|integer|',
            'amount' => 'required|integer|min:0|max:999999999999',
            'direction' => 'required|in:in,out',
            'category' => 'required|integer',
            'wallet' => 'required|integer',
            'datetime' => 'required|date',
            'location' => 'nullable|string|max:50',
            'note' => 'nullable|string|max:100',
        ]);

        // simpan transaksi
        $saved = Transaction::create([
            'user_id' => $request->user_id,
            'amount' => $request->amount,
            'direction' => $request->direction,
            'category_id' => $request->category,
            'wallet_id' => $request->wallet,
            'date' => $request->datetime,
            'location' => $request->location,
            'note' => $request->note,
        ]);

        // ubah saldo saat ini
        $wallet = Wallet::find($request->wallet);
        $balance_changes = $request->direction == "out" ? ($wallet->balance - $request->amount) : ($wallet->balance + $request->amount);
        $wallet->update([
            "balance" => $balance_changes
        ]);

        // kembalikan
        return response()->json($saved, 200);
    }
    // dapatkan banyak data transaksi
    public function transactionList(Request $request)
    {
        // ambil data dari db
        try {

            $data = Transaction::with('category');

            // jika data yang diminta berdasarkan loakasi
            if ($request->has("location")) {
                $data = $data->where("location", $request->location);
            }

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
            // kalau bisa sertakan request timezone juga ya gess ya
            if ($request->has('month') && $request->has('year') && $request->has('timezone')) {
                $startOfMonth = Carbon::create($request->year, $request->month, 1, 0, 0, 0, $request->timezone ?? 'UTC')
                    ->startOfMonth()
                    ->utc() // konversi ke utc
                    ->toDateTimeString();
                $endOfMonth = Carbon::create($request->year, $request->month, 1, 0, 0, 0, $request->timezone ?? 'UTC')
                    ->endOfMonth()
                    ->utc() // konversi ke utc
                    ->toDateTimeString();
                $data = $data->whereBetween('date', [$startOfMonth, $endOfMonth]);

                // $data = $data->whereMonth('date', $request->month)
                //     ->whereYear('date', $request->year);
            }
            $data = $data->get();
        } catch (QueryException $e) {
            // jika tidak terhubung ke database...
            return response()->json(['message' => 'Gagal mengambil data dari database'], 500);
        }

        // jika di groupby
        // if ($request->has('groupby')) {
        //     $data = $data->groupBy(function ($transaction) {
        //         return $transaction->date->format('Y-m-d');
        //     });
        // }

        return $data;
    }

    // dapatkan data cashflow (debit dan credit)
    public function cashflow(Request $request)
    {
        // periode waktu
        // jika di request ada timezone, maka gunakan waktu berdasarkan timezone
        $startDate = Carbon::now($request->timezone ?? "UTC")
            ->startOfDay()
            ->subDays(6) // 7 hari sebelumnya
            ->utc()
            ->toDateTimeString();
        $endDate = Carbon::now($request->timezone ?? "UTC")
            ->endOfDay()
            ->utc()
            ->toDateTimeString();
        // debit
        $debit = Transaction::where('user_id', 1)
            ->where('direction', 'in')
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('amount');
        // credit
        $credit = Transaction::where('user_id', 1)
            ->where('direction', 'out')
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('amount');
        return [
            'debit' => $debit,
            'credit' => $credit
        ];
    }

    // dapatkan detail transaksi
    public function transactionDetail(Request $request)
    {
        return Transaction::with('wallet')->with('category')->findOrFail($request->id);
    }
}
