<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Candidate;
use App\Models\Election;
use Illuminate\Support\Str;

class CandidateSeeder extends Seeder
{
    public function run(): void
    {
        $elections = Election::all(); // Ambil semua election

        $firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank'];
        $lastNames = ['Doe', 'Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Garcia', 'Miller'];

        foreach ($elections as $election) {
            Candidate::insert([
                [
                    'id' => Str::uuid(),
                    'election_id' => $election->id,
                    'name' => $firstNames[array_rand($firstNames)] . ' ' . $lastNames[array_rand($lastNames)],
                    'photo' => null,
                    'description' => 'Visi misi nomor 1 untuk ' . $election->title,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'id' => Str::uuid(),
                    'election_id' => $election->id,
                    'name' => $firstNames[array_rand($firstNames)] . ' ' . $lastNames[array_rand($lastNames)],
                    'photo' => null,
                    'description' => 'Visi misi nomor 2 untuk ' . $election->title,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }
    }
}