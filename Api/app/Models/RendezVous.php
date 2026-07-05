<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Doctor;

class RendezVous extends Model
{
    use HasFactory;

    protected $table = 'rendez_vous';

    protected $fillable = [
        'patient_id',
        'doctor_id',
        'date',
        'heure',
        'status',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relations
    |--------------------------------------------------------------------------
    */

    // 👤 patient = user
    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    // 👨‍⚕️ doctor = DOCTOR (IMPORTANT FIX)
    public function doctor()
    {
        return $this->belongsTo(Doctor::class, 'doctor_id');
    }

    /*
    |--------------------------------------------------------------------------
    | Availability check
    |--------------------------------------------------------------------------
    */

    public static function isSlotAvailable($doctorId, $date, $heure, $excludeId = null)
    {
        $query = self::where('doctor_id', $doctorId)
            ->where('date', $date)
            ->where('heure', $heure)
            ->where('status', '!=', 'annulé');

        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        return !$query->exists();
    }
}