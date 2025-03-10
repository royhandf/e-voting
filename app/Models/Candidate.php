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
        'photo',
        'vision',
        'mission',
        'number'
    ];

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
        return $this->photo ? asset("storage/{$this->photo}") : null;
    }
}
