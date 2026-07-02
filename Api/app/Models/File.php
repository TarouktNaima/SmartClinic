<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $fillable = ['patient_id', 'title', 'file_path'];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}