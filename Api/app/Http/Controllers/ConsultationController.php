<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use Illuminate\Http\Request;

class ConsultationController extends Controller
{
    // 1. GET /consultations 
    public function index()
    {
        // with('patient') 
        return response()->json(Consultation::with('patient')->get(), 200);
    }

    // 2. POST /consultations 
    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id', 
            'diagnostic' => 'required|string',
            'prescription' => 'nullable|string',
        ]);

        $consultation = Consultation::create($validated);

        return response()->json($consultation, 201);
    }

    // 3. PUT /consultations/{id} 
    public function update(Request $request, $id)
    {
        $consultation = Consultation::findOrFail($id);

        $validated = $request->validate([
            'diagnostic' => 'required|string',
            'prescription' => 'nullable|string',
        ]);

        $consultation->update($validated);

        return response()->json($consultation, 200);
    }

    // 4. DELETE /consultations/{id} 
    public function destroy($id)
    {
        $consultation = Consultation::findOrFail($id);
        $consultation->delete();

        return response()->json(['message' => 'Consultation deleted successfully'], 200);
    }

    
    public function getPatientHistory($patient_id)
    {
        $consultations = Consultation::where('patient_id', $patient_id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($consultations, 200);
    }
}