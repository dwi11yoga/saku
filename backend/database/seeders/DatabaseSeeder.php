<?php

namespace Database\Seeders;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Muklis Eka Pangestu',
            'username' => 'muklis',
            'password' => bcrypt('password')
        ]);

        $this->call([
            CategorySeeder::class,
            WalletSeeder::class
        ]);

        // factory
        Transaction::factory(100)->create();
    }
}
