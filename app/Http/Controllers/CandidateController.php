<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Election;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $candidates = Candidate::with('election')
            ->orderBy('election_id')
            ->orderBy('number', 'asc')
            ->paginate(10)
            ->through(fn($candidate) => [
                'id' => $candidate->id,
                'name' => $candidate->name,
                'photo_url' => $candidate->photo_url,
                'vision' => strip_tags($candidate->vision),
                'mission' => $candidate->mission,
                'number' => $candidate->number,
                'election' => $candidate->election ? [
                    'id' => $candidate->election->id,
                    'title' => $candidate->election->title
                ] : null
            ]);

        return Inertia::render('Candidates/Index', [
            'candidates' => $candidates
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $elections = Election::orderBy('title')->get();

        return Inertia::render('Candidates/Create', [
            'elections' => $elections
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'vision' => 'required|string',
            'mission' => 'required|string',
            'election_id' => 'required|exists:elections,id',
        ]);

        $lastNumber = Candidate::where('election_id', $request->election_id)->max('number');

        $newNumber = $lastNumber ? $lastNumber + 1 : 1;

        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('candidates', 'public');
        } else {
            $photoPath = null;
        }

        Candidate::create([
            'name' => $request->name,
            'photo' => $photoPath,
            'vision' => $request->vision,
            'mission' => $request->mission,
            'election_id' => $request->election_id,
            'number' => $newNumber
        ]);

        return redirect()->route('candidates.index')->with('success', 'Kandidat berhasil ditambahkan.');
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
    public function edit(Candidate $candidate)
    {
        $elections = Election::orderBy('title')->get();

        return Inertia::render('Candidates/Edit', [
            'candidate' => $candidate,
            'elections' => $elections
        ]);
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
