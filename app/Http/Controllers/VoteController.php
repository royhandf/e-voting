<?php

namespace App\Http\Controllers;

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

        // cek apakah user sudah pernah vote di election ini
        if (Vote::hasUserVoted($user->id, $request->election_id)) {
            return back()->withErrors(['message' => 'Anda sudah memberikan suara dalam pemilihan ini.']);
        }

        Vote::create([
            'user_id' => $user->id,
            'election_id' => $request->election_id,
            'candidate_id' => $request->candidate_id,
        ]);

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
