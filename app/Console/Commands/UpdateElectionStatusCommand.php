<?php

namespace App\Console\Commands;

use App\Models\Election;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

class UpdateElectionStatusCommand extends Command
{
    protected $signature = 'election:update-status';
    protected $description = 'Automatically updates election statuses based on start/end dates.';

    public function handle()
    {
        $now = Carbon::now(config('app.timezone'));

        $pendingToActive = Election::where('status', 'pending')
            ->where('start_date', '<=', $now)
            ->where('end_date', '>', $now)
            ->update(['status' => 'active']);

        $activeToClose = Election::where('status', 'active')
            ->where('end_date', '<=', $now)
            ->update(['status' => 'closed']);

        $this->info("Updated {$pendingToActive} elections from 'pending' to 'active'.");
        $this->info("Updated {$activeToClose} elections from 'active' to 'closed'.");
        return 0;
    }
}
