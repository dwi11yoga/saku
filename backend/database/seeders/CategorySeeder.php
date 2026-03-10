<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::insert([
            [
                'user_id' => 1,
                'name' => 'Kuota & data',
                'icon' => 'Smartphone',
            ],
            [
                'user_id' => 1,
                'name' => 'Jajan',
                'icon' => 'Utensils',
            ],
            [
                'user_id' => 1,
                'name' => 'Bensin',
                'icon' => 'Fuel',
            ],
        ]);
    }
}
