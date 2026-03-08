<?php

namespace Database\Seeders;

use App\Models\Wallet;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WalletSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Wallet::insert([
            [
                'user_id' => 1,
                'name' => 'Dompet',
                'icon' => '👛',
                'color' => 'blue',
                'balance' => 50000,
                'initial_balance' => 1000000,
            ],
            [
                'user_id' => 1,
                'name' => 'Tabungan',
                'icon' => '🐖',
                'color' => 'yellow',
                'balance' => 1000000,
                'initial_balance' => 200000,
            ],
            [
                'user_id' => 1,
                'name' => 'BRI',
                'icon' => '💳',
                'color' => 'blue',
                'balance' => 1000000,
                'initial_balance' => 200000,
            ],
        ]);
    }
}
