<?php

namespace App\Http\Controllers;

use App\Events\VoteUpdated;
use App\Models\Candidate;
use App\Models\Election;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class VoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();

        $availableElections = Election::where('status', 'active')
            ->whereDoesntHave('voters', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->with('candidates')
            ->get();

        return Inertia::render('Votes/Index', [
            'elections' => $availableElections,
        ]);
    }

    public function store(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'election_id' => 'required|exists:elections,id',
            'candidate_id' => 'required|exists:candidates,id',
        ]);

        $election = Election::findOrFail($request->election_id);

        if ($election->status !== 'active') {
            return back()->with('error', 'Pemilihan ini tidak sedang aktif.');
        }

        if ($user->votedElections()->where('election_id', $election->id)->exists()) {
            return back()->with('error', 'Anda sudah memberikan suara pada pemilihan ini.');
        }

        try {
            DB::transaction(function () use ($request, $user, $election) {
                Vote::create([
                    'election_id'  => $election->id,
                    'candidate_id' => $request->candidate_id,
                ]);

                $user->votedElections()->attach($election->id);
            });
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan saat menyimpan suara. Silakan coba lagi.');
        }

        $candidates = Candidate::where('election_id', $request->election_id)->get();

        $votes = Vote::selectRaw('candidate_id, COUNT(*) as count')
            ->where('election_id', $request->election_id)
            ->groupBy('candidate_id')
            ->get();

        $formattedVotes = $candidates->map(function ($candidate) use ($votes) {
            $vote = $votes->firstWhere('candidate_id', $candidate->id);
            return [
                'candidate_name' => $candidate->name,
                'election_id'    => $candidate->election_id,
                'votes'          => $vote ? $vote->count : 0,
            ];
        });

        broadcast(new VoteUpdated($formattedVotes));

        return redirect()->back()->with('success', 'Suara Anda berhasil disimpan. Terima kasih telah berpartisipasi!');
    }
}
