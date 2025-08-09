<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Election;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Support\Facades\DB; // Import DB Facade
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $elections = Election::withCount('candidates')->get(['id', 'title', 'status', 'end_date']);
        $voteResults = Vote::selectRaw('votes.election_id, candidates.name as candidate_name, COUNT(*) as votes')
            ->join('candidates', 'votes.candidate_id', '=', 'candidates.id')
            ->groupBy('votes.election_id', 'votes.candidate_id', 'candidates.name')
            ->get();

        // Menghitung total pemilih yang terdaftar di *semua* pemilihan
        $totalPemilih = DB::table('election_user')->distinct('user_id')->count();

        // --- PERBAIKAN LOGIKA ---

        // 1. Data Partisipasi Pemilih (Diperbaiki)
        // Menghitung jumlah pemilih yang sudah memberikan suara untuk setiap pemilihan aktif.
        $voterParticipation = Vote::selectRaw('election_id, COUNT(*) as total_voted')
            ->whereIn('election_id', Election::where('status', 'active')->pluck('id'))
            ->groupBy('election_id')
            ->get()
            ->mapWithKeys(fn($item) => [$item->election_id => $item->total_voted]);

        // 2. Data Aktivitas Terbaru (Dinonaktifkan Sementara)
        // Logika ini tidak bisa berjalan tanpa user_id di tabel votes.
        // Anda perlu memikirkan kembali bagaimana cara melacak aktivitas pemilih.
        $recentActivities = []; // Dikosongkan untuk menghindari error

        // 3. Data Hasil Pemilihan Terakhir Selesai (Tetap sama)
        $lastClosedElection = Election::where('status', 'closed')->latest('updated_at')->first();
        $winner = null;
        if ($lastClosedElection) {
            $winnerData = Vote::selectRaw('candidates.name as candidate_name, COUNT(*) as votes')
                ->join('candidates', 'votes.candidate_id', '=', 'candidates.id')
                ->where('votes.election_id', $lastClosedElection->id)
                ->groupBy('candidates.name')
                ->orderByDesc('votes')
                ->first();
            if ($winnerData) {
                $winner = [
                    'election_title' => $lastClosedElection->title,
                    'name' => $winnerData->candidate_name,
                    'votes' => $winnerData->votes,
                ];
            }
        }

        return Inertia::render('Dashboard', [
            'totalPemilih' => $totalPemilih,
            'totalKandidat' => Candidate::count(),
            'totalPemilihanAktif' => Election::where('status', 'active')->count(),
            'totalPemilihanSelesai' => Election::where('status', 'closed')->count(),
            'elections' => $elections,
            'voteResults' => $voteResults,
            'voterParticipation' => $voterParticipation,
            'recentActivities' => $recentActivities,
            'lastElectionWinner' => $winner,
        ]);
    }
}
