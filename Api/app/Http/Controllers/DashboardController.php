<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Doctor;

class DashboardController extends Controller
{
    public function stats()
    {
        $patients = User::where('role', 'patient')->count();
        $doctors = Doctor::count();
        $rendezvous = 0;

        return response()->json([
            'patients' => $patients,
            'doctors' => $doctors,
            'rendezvous' => $rendezvous
        ]);
    }
}