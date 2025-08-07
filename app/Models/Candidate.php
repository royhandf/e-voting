<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use OwenIt\Auditing\Auditable as AuditableTrait;

class Candidate extends Model implements Auditable
{
    use HasFactory, HasUuids, AuditableTrait;

    protected $fillable = [
        'election_id',
        'name',
        'photo_url',
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

    /**
     * Accessor untuk atribut photo_url.
     *
     * @param  string|null  
     * @return string|null 
     */
    public function getPhotoUrlAttribute($value)
    {
        $value = $this->attributes['photo_url'] ?? null;

        if ($value) {
            return asset('storage/' . $value);
        }

        return asset('images/no-photo.jpg');
    }
}
