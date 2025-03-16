<?php

namespace App\Http\Controllers;

use App\Models\Election;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $elections = Election::where('status', 'active')
            ->with('candidates')
            ->orderBy('start_date', 'asc')
            ->get();

        return Inertia::render('Index', [
            'elections' => $elections,
        ]);
    }
}
