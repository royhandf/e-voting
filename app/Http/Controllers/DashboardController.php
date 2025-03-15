<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Election;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            $voteResults =  Vote::selectRaw('votes.election_id, candidates.name as candidate_name, COUNT(*) as votes')
                ->join('candidates', 'votes.candidate_id', '=', 'candidates.id')
                ->groupBy('votes.election_id', 'votes.candidate_id', 'candidates.name')
                ->get();

            return Inertia::render('Dashboard/Admin', [
                'totalPemilih' => User::where('role', 'user')->count(),
                'totalKandidat' => Candidate::count(),
                'totalPemilihanAktif' => Election::where('status', 'active')->count(),
                'totalPemilihanSelesai' => Election::where('status', 'closed')->count(),
                'elections' => Election::withCount('candidates')->get(['id', 'title', 'status', 'end_date']),
                'voteResults' => $voteResults,
            ]);
        }

        return Inertia::render('Dashboard/User', [
            'ongoingElections' => Election::where('status', 'ongoing')->get(),
            'votingResults' => Vote::groupBy('candidate_id')
                ->selectRaw('candidate_id, COUNT(*) as votes')
                ->get(),
        ]);
    }
}
