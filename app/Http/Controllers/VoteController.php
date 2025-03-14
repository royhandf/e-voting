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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
