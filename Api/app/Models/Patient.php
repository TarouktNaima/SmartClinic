<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'prenom',
        'age',
        'email',
        'phone',
    ];

    // ==========================
    // Relations
    // ==========================

    // Le compte utilisateur associé au patient
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Les rendez-vous du patient
    public function rendezVous()
    {
        return $this->hasMany(RendezVous::class, 'patient_id', 'user_id');
    }
}