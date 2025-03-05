<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'id' => Str::uuid(),
            'name' => 'Admin Evoting',
            'nim' => '0000000000',
            'password' => Hash::make('penyepong99'),
            'role' => 'admin',
        ]);

        User::factory()->count(10)->create();
    }
}