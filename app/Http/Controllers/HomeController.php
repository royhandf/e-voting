<?php

namespace App\Http\Controllers;

use App\Models\Election;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $elections = Election::with('candidates')->where('status', 'active')->get();

        return Inertia::render('Index', [
            'elections' => $elections,
            'activeElection' => $elections->first(),
        ]);
    }
}
