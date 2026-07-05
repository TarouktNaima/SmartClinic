<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'specialite',
        'photo',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relations
    |--------------------------------------------------------------------------
    */

    // 🔗 Doctor belongs to User (account system)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // 🔗 Doctor has many rendez-vous (IMPORTANT FIX)
    public function rendezVous()
    {
        return $this->hasMany(RendezVous::class, 'doctor_id', 'id');
    }
}