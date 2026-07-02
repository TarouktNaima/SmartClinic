<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PatientFileController extends Controller
{
    
    public function getPatientFiles($patient_id)
    {
        $files = File::where('patient_id', $patient_id)->orderBy('created_at', 'desc')->get();
        return response()->json($files, 200);
    }

  
    public function upload(Request $request)
    {
        $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'title' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf,jpg,jpeg,png,doc,docx|max:2048', 
        ]);

        if ($request->hasFile('file')) {
           
            $path = $request->file('file')->store('patient_files', 'public');

            
            $file = File::create([
                'patient_id' => $request->patient_id,
                'title' => $request->title,
                'file_path' => Storage::url($path), 
            ]);

            return response()->json([
                'message' => 'Fichier téléchargé avec succès !',
                'file' => $file
            ], 201);
        }

        return response()->json(['message' => 'Aucun fichier trouvé'], 400);
    }
}