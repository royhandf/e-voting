<?php

namespace App\Exports;

use App\Models\Candidate;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ElectionResultExport implements FromQuery, WithHeadings, WithMapping
{
    protected $electionId;

    public function __construct(string $electionId)
    {
        $this->electionId = $electionId;
    }

    public function query()
    {
        return Candidate::query()
            ->where('election_id', $this->electionId)
            ->withCount('votes')
            ->orderBy('votes_count', 'desc');
    }

    public function headings(): array
    {
        return [
            'Peringkat',
            'Nama Kandidat',
            'Jumlah Suara',
        ];
    }

    public function map($candidate): array
    {
        static $rank = 0;
        $rank++;

        return [
            $rank,
            $candidate->name,
            $candidate->votes_count,
        ];
    }
}
