<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    protected $fillable = ['patient_id', 'diagnostic', 'prescription'];

   
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}