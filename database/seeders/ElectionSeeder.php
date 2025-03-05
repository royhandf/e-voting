<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Election;
use Illuminate\Support\Str;

class ElectionSeeder extends Seeder
{
    public function run(): void
    {
        Election::create([
            'id' => Str::uuid(),
            'title' => 'Pemilihan Ketua BEM 2025', // ubah name -> title
            'description' => 'Pemilihan ketua dan wakil ketua BEM tahun 2025.',
            'status' => 'active',
            'start_date' => now(),
            'end_date' => now()->addDays(7),
        ]);

        Election::create([
            'id' => Str::uuid(),
            'title' => 'Pemilihan Ketua HIMA 2025', // ubah name -> title
            'description' => 'Pemilihan ketua dan wakil ketua HIMA tahun 2025.',
            'status' => 'pending',
            'start_date' => now()->addDays(365),
            'end_date' => now()->addDays(372),
        ]);
    }
}