<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'election_id',
        'name',
        'photo_url',
        'vision',
        'mission',
        'number'
    ];

    protected $appends = ['photo_url'];

    public function election()
    {
        return $this->belongsTo(Election::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function getPhotoUrlAttribute()
    {
        return $this->attributes['photo_url'] ?? null
            ? asset("storage/{$this->attributes['photo_url']}")
            : null;
    }
}
