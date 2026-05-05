<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;
class DoctorController extends Controller
{
    public function index()
    {
        $doctors = Doctor::all();

        return response()->json($doctors);
    }
   public function store(Request $request)
{
    $request->validate([
        'name' => 'required',
        'specialite' => 'required',
        'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
    ]);

    $photoName = null;

    if ($request->hasFile('photo')) {
        $photo = $request->file('photo');
        $photoName = time() . '.' . $photo->getClientOriginalExtension();

        $photo->storeAs('doctors', $photoName, 'public');
    }

    $doctor = \App\Models\Doctor::create([
        'name' => $request->name,
        'specialite' => $request->specialite,
        'photo' => $photoName,
    ]);

    return response()->json([
        'message' => 'Doctor added successfully',
        'doctor' => $doctor
    ]);
}
}