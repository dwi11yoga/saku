<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // tambah kategori
    public function create(Request $request)
    {
        sleep(3);
        // validasi
        $request->validate([
            'user_id' => 'required|numeric',
            'icon' => 'required',
            'name' => 'required|string|max:50',
            'note' => 'nullable|string|max:100'
        ]);

        // simpan data
        Category::create([
            'user_id' => $request->user_id,
            'icon' => $request->icon,
            'name' => $request->name,
            'note' => $request->note,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // kembalikan 
        return response()->json([
            'message' => 'Berhasil menyimpan kategori baru'
        ], 200);
    }
    // dapatkan daftar data kategori
    public function getCategories(Request $request)
    {
        try {
            $data = Category::where('user_id', $request->user_id)
                ->latest()
                ->withCount(['transaction' => function ($query) {
                    $query->where('user_id', 1);
                }])
                ->get();
        } catch (QueryException $e) {
            return response()->json(['message' => "Gagal mengambil data dari database"], 500);
        }
        return $data;
    }

    // dapatkan data detail soal 1 kategori
    public function categoryDetail(Request $request)
    {
        try {
            $data = Category::with(['transaction' => function ($query) {
                $query->where('user_id', 1)->orderByDesc('date');
            }])
                ->withCount(['transaction' => function ($query) {
                    $query->where('user_id', 1);
                }])
                ->find($request->id);
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Gagal mengambil data dari database'
            ], 500);
        }

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
