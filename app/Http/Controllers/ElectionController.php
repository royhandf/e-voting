<?php

namespace App\Http\Controllers;

use App\Models\Election;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ElectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $elections = Election::orderBy('start_date', 'desc')->paginate(10);

        $elections->getCollection()->transform(function ($election) {
            return [
                'id' => $election->id,
                'title' => $election->title,
                'description' => $election->description,
                'start_date' => $election->start_date,
                'end_date' => $election->end_date,
                'status' => $election->status,
            ];
        });

        return Inertia::render('Elections/Index', [
            'elections' => $elections
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Elections/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'status' => 'required|in:pending,active,closed',
        ]);

        $validated['start_date'] = Carbon::parse($validated['start_date'])->format('Y-m-d H:i:s');
        $validated['end_date'] = Carbon::parse($validated['end_date'])->format('Y-m-d H:i:s');

        Election::create($validated);

        return redirect()->route('elections.index')->with('success', 'Pemilihan berhasil ditambahkan!');
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
    public function edit(Election $election)
    {
        return inertia('Elections/Edit', compact('election'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Election $election)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'status' => 'required|in:pending,active,closed',
        ]);

        $election->update([
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'status' => $request->status,
        ]);

        return redirect()->route('elections.index')->with('success', 'Pemilihan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Election $election)
    {
        $election->delete();
        return redirect()->route('elections.index')->with('success', 'Pemilihan berhasil dihapus.');
    }
}
