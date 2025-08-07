<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use OwenIt\Auditing\Models\Audit;

class AuditTrailController extends Controller
{
    public function index()
    {
        $audits = Audit::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Audit/Index', [
            'audits' => $audits,
        ]);
    }
}
