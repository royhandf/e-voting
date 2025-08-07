<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use OwenIt\Auditing\Auditable as AuditableTrait;

class Election extends Model implements Auditable
{
    use HasFactory, HasUuids, AuditableTrait;

    protected $fillable = [
        'title',
        'start_date',
        'end_date',
        'status',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'status' => 'string',
    ];

    public function candidates()
    {
        return $this->hasMany(Candidate::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function getStartDateAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d H:i:s');
    }

    public function getEndDateAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d H:i:s');
    }

    protected static function booted()
    {
        static::updated(function ($election) {
            if ($election->isDirty('status') && $election->status === 'ended') {
                Vote::where('election_id', $election->id)
                    ->whereNotNull('user_id')
                    ->update(['user_id' => null]);
            }
        });
    }
}
