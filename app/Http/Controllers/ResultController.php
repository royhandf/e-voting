<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Election;
use App\Models\User;
use App\Models\Vote;
use Inertia\Inertia;

class ResultController extends Controller
{
    public function index()
    {
        $elections = Election::withCount('candidates')->get(['id', 'title', 'status', 'end_date']);
        $voteResults = Vote::selectRaw('votes.election_id, candidates.name as candidate_name, COUNT(*) as votes')
            ->join('candidates', 'votes.candidate_id', '=', 'candidates.id')
            ->groupBy('votes.election_id', 'votes.candidate_id', 'candidates.name')
            ->get();
            $votes = Vote::with(['user:id,name', 'candidate:id,name,photo_url', 'election:id,title']) 
            ->orderBy('created_at', 'desc')
            ->get(['id', 'user_id', 'candidate_id', 'election_id', 'created_at']);
        

        return Inertia::render('Results/Index', [
            'totalPemilih' => User::where('role', 'user')->count(),
            'totalKandidat' => Candidate::count(),
            'totalPemilihanAktif' => Election::where('status', 'active')->count(),
            'totalPemilihanSelesai' => Election::where('status', 'closed')->count(),
            'elections' => $elections,
            'voteResults' => $voteResults,
            'votes' => $votes,
        ]);
    }
}
