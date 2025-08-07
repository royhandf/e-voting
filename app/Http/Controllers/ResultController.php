<?php

namespace App\Http\Controllers;

use App\Models\Election;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Exports\ElectionResultExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Str;

class ResultController extends Controller
{
    public function index(Request $request)
    {
        $elections = Election::where('status', 'closed')
            ->orderBy('end_date', 'desc')
            ->get();

        $selectedElection = null;
        $stats = null;
        $results = null;
        $winner = null;

        if ($request->has('election_id') && $request->election_id) {
            $selectedElection = Election::with('candidates')->find($request->election_id);

            if ($selectedElection) {
                $totalVoters = User::where('role', 'user')->count();
                $totalVotes = Vote::where('election_id', $selectedElection->id)->count();
                $turnout = $totalVoters > 0 ? ($totalVotes / $totalVoters) * 100 : 0;

                $stats = [
                    'totalVoters' => $totalVoters,
                    'totalVotes' => $totalVotes,
                    'turnout' => round($turnout, 2),
                ];

                $results = $selectedElection->candidates()
                    ->withCount('votes')
                    ->orderBy('votes_count', 'desc')
                    ->get();

                $winner = $results->first();
            }
        }

        return Inertia::render('Results/Index', [
            'elections' => $elections,
            'selectedElection' => $selectedElection,
            'stats' => $stats,
            'results' => $results,
            'winner' => $winner,
        ]);
    }

    public function exportExcel(Election $election)
    {
        return Excel::download(new ElectionResultExport($election->id), 'Hasil-' . Str::slug($election->title) . '.xlsx');
    }
}
