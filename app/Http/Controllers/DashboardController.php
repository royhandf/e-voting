<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Election;
use App\Models\User;
use App\Models\Vote;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $elections = Election::withCount('candidates')->get(['id', 'title', 'status', 'end_date']);
        $voteResults =  Vote::selectRaw('votes.election_id, candidates.name as candidate_name, COUNT(*) as votes')
            ->join('candidates', 'votes.candidate_id', '=', 'candidates.id')
            ->groupBy('votes.election_id', 'votes.candidate_id', 'candidates.name')
            ->get();

        return Inertia::render('Dashboard', [
            'totalPemilih' => User::where('role', 'user')->count(),
            'totalKandidat' => Candidate::count(),
            'totalPemilihanAktif' => Election::where('status', 'active')->count(),
            'totalPemilihanSelesai' => Election::where('status', 'closed')->count(),
            'elections' => $elections,
            'voteResults' => $voteResults,
        ]);
    }
}
