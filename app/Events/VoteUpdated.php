<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Queue\SerializesModels;
use App\Models\Vote;

class VoteUpdated implements ShouldBroadcastNow
{
    use InteractsWithSockets, SerializesModels;

    public $votes;

    public function __construct($votes)
    {
        $this->votes = $votes;
    }

    public function broadcastOn()
    {
        return new Channel('votes');
    }

    public function broadcastAs()
    {
        return 'VoteUpdated';
    }
}
