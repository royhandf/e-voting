<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'candidate_id',
        'election_id',
        'vote_time',
    ];

    protected $casts = [
        'vote_time' => 'datetime',
    ];

    public static function hasUserVoted($userId, $electionId)
    {
        return self::where('user_id', $userId)
            ->where('election_id', $electionId)
            ->exists();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }

    public function election()
    {
        return $this->belongsTo(Election::class);
    }
}
