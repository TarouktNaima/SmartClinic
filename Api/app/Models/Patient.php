<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
   protected $fillable = ['name', 'prenom', 'age', 'email', 'phone'];
   
   public function files()
    {
        return $this->hasMany(File::class);
    }
}
