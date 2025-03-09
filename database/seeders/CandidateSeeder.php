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
                    'vision' => 'Berjuang untuk rakyat',
                    'mission' => 'Membangun negeri ini',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'id' => Str::uuid(),
                    'election_id' => $election->id,
                    'name' => $firstNames[array_rand($firstNames)] . ' ' . $lastNames[array_rand($lastNames)],
                    'photo' => null,
                    'vision' => 'Menjadi yang terbaik',
                    'mission' => 'Melayani masyarakat dengan sepenuh hati',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }
    }
}
