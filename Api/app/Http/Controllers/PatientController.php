<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    
    public function index()
    {
        return response()->json(Patient::all(), 200);
    }

    public function store(Request $request)
    {
     
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'age' => 'required|integer',
            'email' =>  'nullable|email|unique:patients,email',
            'phone' => 'required|string',
            
        ]);

        $patient = Patient::create($validated);

        return response()->json($patient, 201);
    }

    public function update(Request $request, $id)
    {
        $patient = Patient::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'age' => 'required|integer',
            'email' =>  'nullable|email|unique:patients,email',
            'phone' => 'required|string',
        ]);
        
        $patient->update($validated);

        return response()->json($patient, 200);
    }

    public function destroy($id)
    {
        $patient = Patient::findOrFail($id);
        $patient->delete();

        return response()->json(['message' => 'Patient deleted successfully'], 200);
    }
}