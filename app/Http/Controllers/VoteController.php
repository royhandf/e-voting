<?php

namespace App\Http\Controllers;

use App\Events\VoteUpdated;
use App\Models\Candidate;
use App\Models\Election;
use App\Models\Vote;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();

        return Inertia::render('Votes/Index', [
            'elections' => Election::where('status', 'active')
                ->whereDoesntHave('votes', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })->get(),
            'candidates' => Candidate::all(),
            'userVotes' => Vote::where('user_id', $user->id)->pluck('election_id'),
        ]);
    }

    public function store(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'election_id' => 'required|exists:elections,id',
            'candidate_id' => 'required|exists:candidates,id',
        ]);

        if (Vote::hasUserVoted($user->id, $request->election_id)) {
            return back()->withErrors(['message' => 'Anda sudah memberikan suara dalam pemilihan ini.']);
        }

        Vote::create([
            'user_id' => $user->id,
            'election_id' => $request->election_id,
            'candidate_id' => $request->candidate_id,
        ]);

        $candidates = Candidate::where('election_id', $request->election_id)->get();

        $votes = Vote::selectRaw('candidate_id, COUNT(*) as count')
            ->where('election_id', $request->election_id)
            ->groupBy('candidate_id')
            ->get();

        $formattedVotes = $candidates->map(function ($candidate) use ($votes) {
            $vote = $votes->firstWhere('candidate_id', $candidate->id);

            return [
                'candidate_name' => $candidate->name,
                'election_id' => $candidate->election_id,
                'votes' => $vote ? $vote->count : 0,
            ];
        });

        broadcast(new VoteUpdated($formattedVotes));

        return redirect()->back()->with('success', 'Vote berhasil disimpan.');
    }


    public function history()
    {
        $user = auth()->user();

        $votes = Vote::with(['election', 'candidate'])
            ->where('user_id', $user->id)
            ->latest()
            ->paginate(10);

        return Inertia::render('Votes/History', [
            'votes' => $votes
        ]);
    }
}
