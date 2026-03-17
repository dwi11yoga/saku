<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // dapatkan daftar data kategori
    public function getCategories()
    {
        return Category::where('user_id', 1)
            ->latest()
            ->withCount(['transaction' => function ($query) {
                $query->where('user_id', 1);
            }])
            ->get();
    }

    // dapatkan data detail soal 1 kategori
    public function categoryDetail(Request $request)
    {
        sleep(3);
        $data = Category::with(['transaction' => function ($query) {
            $query->where('user_id', 1)->orderByDesc('date');
        }])
            ->withCount(['transaction' => function ($query) {
                $query->where('user_id', 1);
            }])
            ->find($request->id);

        // kembalikan status error 404 jika data tidak ditemukan
        if (!$data) {
            return response()->json(['message' => 'Kategori tidak ditemukan'], 404);
        }

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
