<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\PatientFileController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/doctors', [DoctorController::class, 'index']);
Route::post('/doctors', [DoctorController::class, 'store']);
Route::get('/dashboard', [DashboardController::class, 'stats']);

Route::apiResource('patients', PatientController::class);
Route::apiResource('consultations', ConsultationController::class);
// Historique d'un patient spécifique
Route::get('patients/{id}/consultations', [ConsultationController::class, 'getPatientHistory']);
// upload 
Route::post('/upload', [PatientFileController::class, 'upload']);
// get file of patients
Route::get('/patients/{id}/files', [PatientFileController::class, 'getPatientFiles']);