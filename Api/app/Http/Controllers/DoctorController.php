<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:6',
        'phone' => 'nullable|string|max:50',
        'specialite' => 'required|string|max:255',
        'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
    ]);

    $photoName = null;

    if ($request->hasFile('photo')) {
        $photoName = time() . '.' . $request->photo->extension();
        $request->photo->storeAs('doctors', $photoName,'public');
    }

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => 'doctor',
    ]);

    $doctor = Doctor::create([
        'user_id' => $user->id,
        'name' => $request->name,
        'email' => $request->email,
        'phone' => $request->phone,
        'specialite' => $request->specialite,
        'photo' => $photoName,
    ]);

    return response()->json([
        'message' => 'Doctor created successfully',
        'doctor' => $doctor,
        'user' => $user,
    ], 201);
}
public function update(Request $request, $id)
{
    $doctor = Doctor::find($id);

    if (!$doctor) {
        return response()->json([
            'message' => 'Doctor not found'
        ], 404);
    }

    $doctor->name = $request->name;
    $doctor->email = $request->email;
    $doctor->phone = $request->phone;
    $doctor->specialite = $request->specialite;
    $doctor->save();

    return response()->json([
        'message' => 'Doctor updated successfully',
        'doctor' => $doctor
    ]);
}
public function destroy($id)
{
    $doctor = Doctor::find($id);

    if (!$doctor) {
        return response()->json([
            'message' => 'Doctor not found'
        ], 404);
    }

    $doctor->delete();

    return response()->json([
        'message' => 'Doctor deleted successfully'
    ]);
}
public function profile(Request $request)
{
    $user = $request->user();

    $doctor = Doctor::where('user_id', $user->id)
        ->orWhere('email', $user->email)
        ->first();

    if (!$doctor) {
        return response()->json([
            'message' => 'Doctor profile not found',
            'doctor' => [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => null,
                'specialite' => null,
                'photo' => null,
            ]
        ], 200);
    }

    return response()->json([
        'doctor' => $doctor
    ]);
}
}