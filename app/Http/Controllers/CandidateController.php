<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Election;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'photo_url' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'vision' => 'required|string',
            'mission' => 'required|string',
            'election_id' => 'required|exists:elections,id',
            'number' => 'required|integer|unique:candidates,number',
        ]);

        if ($request->hasFile('photo_url')) {
            $photoPath = $request->file('photo_url')->store('candidates', 'public');
        } else {
            $photoPath = null;
        }

        Candidate::create([
            'name' => $request->name,
            'photo_url' => $photoPath,
            'vision' => $request->vision,
            'mission' => $request->mission,
            'election_id' => $request->election_id,
            'number' => $request->number
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
    public function update(Request $request, Candidate $candidate)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'vision' =>  'required|string',
            'mission' => 'required|string',
            'election_id' =>  'required|exists:elections,id',
            'number' => 'required|integer|unique:candidates,number,' . $candidate->id . ',id,election_id,' . $request->election_id
        ]);

        $candidate->update($validated);
        if ($request->hasFile('photo_url')) {
            if ($candidate->photo_url) {
                $relativePath = str_replace(url('storage') . '/', '', $candidate->photo_url);
                Storage::disk('public')->delete($relativePath);
            }

            $photoPath = $request->file('photo_url')->store('candidates', 'public');
            $candidate->update(['photo_url' => $photoPath]);
        }

        return redirect()->route('candidates.index')->with('success', 'Kandidat berhasil diperbarui.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Candidate $candidate)
    {
        if ($candidate->photo_url) {
            Storage::disk('public')->delete($candidate->photo_url);
        }

        $candidate->delete();

        return redirect()->route('candidates.index')->with('success', 'Kandidat berhasil dihapus.');
    }
}
