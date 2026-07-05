<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\PatientFileController;
use App\Http\Controllers\RendezVousController;
use App\Http\Controllers\SpecialiteController;

// ==========================================
// 🔓 Routes publiques (بدون Login)
// ==========================================

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');

// Forgot Password
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);


// ==========================================
// 🔒 Routes protégées par Sanctum
// ==========================================

Route::middleware('auth:sanctum')->group(function () {

    // User connecté
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    // ==========================
    // Admins & Secretaries
    // ==========================
    Route::get('/admins', function () {
        return response()->json([
            'admins' => \App\Models\User::where('role', 'admin')->latest()->get()
        ]);
    });

    Route::get('/secretaries', function () {
        return response()->json([
            'secretaries' => \App\Models\User::where('role', 'secretary')->latest()->get()
        ]);
    });

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'stats']);

    // Users (Admin)
    Route::post('/users', [AuthController::class, 'storeUser']);

    // ==========================
    // Specialités
    // ==========================
    Route::get('/specialites', [SpecialiteController::class, 'index']);
    Route::post('/specialites', [SpecialiteController::class, 'store']);
    Route::delete('/specialites/{id}', [SpecialiteController::class, 'destroy']);

    // ==========================
    // Doctors
    // ==========================
    Route::get('/doctors', [DoctorController::class, 'index']);
    Route::post('/doctors', [DoctorController::class, 'store']);
    Route::put('/doctors/{id}', [DoctorController::class, 'update']);
    Route::delete('/doctors/{id}', [DoctorController::class, 'destroy']);

    // Profil du médecin
    Route::get('/doctor/profile', [DoctorController::class, 'profile']);

    // ==========================
    // Patients
    // ==========================
    Route::apiResource('patients', PatientController::class);

    // ==========================
    // Consultations
    // ==========================
    Route::apiResource('consultations', ConsultationController::class);
    Route::get(
        'patients/{id}/consultations',
        [ConsultationController::class, 'getPatientHistory']
    );

    // ==========================
    // Patient Files
    // ==========================
    Route::post('/upload', [PatientFileController::class, 'upload']);
    Route::get('/patients/{id}/files', [PatientFileController::class, 'getPatientFiles']);

    // ==========================
    // Rendez-vous
    // ==========================
    Route::post('/rendezvous', [RendezVousController::class, 'store']);
    Route::get('/my-rendezvous', [RendezVousController::class, 'myRendezVous']);
    Route::get('/rendezvous', [RendezVousController::class, 'index']);
    Route::get('/rendezvous/{rdv}', [RendezVousController::class, 'show']);
    Route::put('/rendezvous/{rdv}', [RendezVousController::class, 'update']);
    Route::delete('/rendezvous/{rdv}', [RendezVousController::class, 'destroy']);
    Route::get('/slots/available', [RendezVousController::class, 'availableSlots']);
    Route::put('/rendezvous/{id}/confirm', [RendezVousController::class, 'confirm']);
    Route::put('/rendezvous/{id}/cancel', [RendezVousController::class, 'cancel']);
});
