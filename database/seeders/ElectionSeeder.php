<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Election;
use Carbon\Carbon;
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
            'start_date' => Carbon::now()->format('Y-m-d H:i:s'),
            'end_date' => Carbon::now()->addDays(7)->format('Y-m-d H:i:s'),
        ]);

        Election::create([
            'id' => Str::uuid(),
            'title' => 'Pemilihan Ketua HIMA 2025', // ubah name -> title
            'description' => 'Pemilihan ketua dan wakil ketua HIMA tahun 2025.',
            'status' => 'pending',
            'start_date' => Carbon::now()->format('Y-m-d H:i:s'),
            'end_date' => Carbon::now()->addDays(7)->format('Y-m-d H:i:s'),
        ]);
    }
}
