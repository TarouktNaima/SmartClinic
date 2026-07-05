<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RendezVous;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\JsonResponse;

class RendezVousController extends Controller
{
    // ==========================================
    // GET ALL RDV (admin / secretaire)
    // ==========================================
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        // دعم التسمية بالفرنسية (secretaire) كما هو وارد في طلبات الـ Front-end
        if (!in_array($user->role, ['admin', 'secretaire', 'secretary'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $rdvs = RendezVous::with(['patient', 'doctor'])->get();

        return response()->json([
            'message' => 'success',
            'data'    => $rdvs
        ]);
    }

    // ==========================================
    // MY RDV (patient / doctor)
    // ==========================================
    public function myRendezVous(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role === 'patient') {
            $rdvs = RendezVous::with('doctor')
                ->where('patient_id', $user->id)
                ->get();
        } elseif ($user->role === 'doctor') {
            $rdvs = RendezVous::with('patient')
                ->where('doctor_id', $user->id)
                ->get();
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'message' => 'success',
            'data'    => $rdvs
        ]);
    }

    // ==========================================
    // CREATE RDV
    // ==========================================
    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role !== 'patient') {
            return response()->json(['message' => 'Only patients can book'], 403);
        }

        $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'date'      => 'required|date|after_or_equal:today',
            'heure'     => 'required|date_format:H:i',
        ]);

        if (!RendezVous::isSlotAvailable($request->doctor_id, $request->date, $request->heure)) {
            return response()->json(['message' => 'Slot not available'], 409);
        }

        $rdv = RendezVous::create([
            'patient_id' => $user->id,
            'doctor_id'  => $request->doctor_id,
            'date'       => $request->date,
            'heure'      => $request->heure,
            'status'     => 'en attente',
        ]);

        return response()->json([
            'message' => 'RDV created successfully',
            'data'    => $rdv
        ], 201);
    }

    // ==========================================
    // SHOW RDV
    // ==========================================
    public function show(Request $request, $id): JsonResponse
    {
        $user = $request->user();
        $rdv = RendezVous::with(['patient', 'doctor'])->findOrFail($id);

        if (
            ($user->role === 'patient' && $rdv->patient_id != $user->id) ||
            ($user->role === 'doctor' && $rdv->doctor_id != $user->id)
        ) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'message' => 'success',
            'data'    => $rdv
        ]);
    }

    // ==========================================
    // UPDATE RDV
    // ==========================================
    public function update(Request $request, $id): JsonResponse
    {
        $user = $request->user();
        $rdv = RendezVous::findOrFail($id);

        if (!in_array($user->role, ['admin', 'secretaire', 'secretary'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'date'   => 'sometimes|date|after_or_equal:today',
            'heure'  => 'sometimes|date_format:H:i',
            'status' => 'sometimes|in:en attente,confirmé,refusé,annulé,terminé',
        ]);

        $date = $request->date ?? $rdv->date;
        $heure = $request->heure ?? $rdv->heure;

        if ($request->has('date') || $request->has('heure')) {
            if (!RendezVous::isSlotAvailable($rdv->doctor_id, $date, $heure, $rdv->id)) {
                return response()->json(['message' => 'Slot not available'], 409);
            }
        }

        $rdv->update($request->only(['date', 'heure', 'status']));

        return response()->json([
            'message' => 'RDV updated',
            'data'    => $rdv
        ]);
    }

    // ==========================================
    // 🌟 NEW: CONFIRM RDV & SEND EMAIL
    // ==========================================
    public function confirm($id): JsonResponse
    {
        $rdv = RendezVous::with(['patient', 'doctor'])->findOrFail($id);
        
        $rdv->status = 'confirmé';
        $rdv->save();

        $patient = $rdv->patient;
        $doctor = $rdv->doctor;

        if ($patient && $patient->email) {
            Mail::raw(
                "Bonjour {$patient->name},\n\nNous vous informons que votre rendez-vous a été CONFIRMÉ par notre secrétariat.\n\n" .
                "Détails du rendez-vous :\n" .
                "• Médecin : Dr. " . ($doctor->name ?? 'Généraliste') . "\n" .
                "• Date : {$rdv->date}\n" .
                "• Heure : {$rdv->heure}\n\n" .
                "Merci de votre confiance !\nL'équipe SmartClinic.",
                function ($message) use ($patient) {
                    $message->to($patient->email)
                        ->subject('Confirmation de votre Rendez-vous - SmartClinic ✅');
                }
            );
        }

        return response()->json([
            'message' => 'Rendez-vous confirmé et e-mail envoyé',
            'data'    => $rdv
        ]);
    }

    // ==========================================
    // 🌟 NEW: CANCEL RDV & SEND EMAIL
    // ==========================================
    public function cancel($id): JsonResponse
    {
        $rdv = RendezVous::with(['patient', 'doctor'])->findOrFail($id);
        
        $rdv->status = 'annulé';
        $rdv->save();

        $patient = $rdv->patient;
        $doctor = $rdv->doctor;

        if ($patient && $patient->email) {
            Mail::raw(
                "Bonjour {$patient->name},\n\nNous vous informons avec regret que votre rendez-vous a été ANNULÉ.\n\n" .
                "Détails du rendez-vous initial :\n" .
                "• Médecin : Dr. " . ($doctor->name ?? 'Généraliste') . "\n" .
                "• Date : {$rdv->date}\n" .
                "• Heure : {$rdv->heure}\n\n" .
                "Vous pouvez reprendre un nouveau rendez-vous à tout moment sur notre plateforme en ligne.\n\n" .
                "Cordialement,\nL'équipe SmartClinic.",
                function ($message) use ($patient) {
                    $message->to($patient->email)
                        ->subject('Annulation de votre Rendez-vous - SmartClinic ❌');
                }
            );
        }

        return response()->json([
            'message' => 'Rendez-vous annulé et e-mail envoyé',
            'data'    => $rdv
        ]);
    }

    // ==========================================
    // DELETE RDV
    // ==========================================
    public function destroy(Request $request, $id): JsonResponse
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $rdv = RendezVous::findOrFail($id);
        $rdv->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }

    // ==========================================
    // AVAILABLE SLOTS
    // ==========================================
    public function availableSlots(Request $request): JsonResponse
    {
        $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'date'      => 'required|date|after_or_equal:today',
        ]);

        $bookedSlots = RendezVous::where('doctor_id', $request->doctor_id)
            ->where('date', $request->date)
            ->whereIn('status', ['en attente', 'confirmé'])
            ->pluck('heure')
            ->map(function($time) {
                return date('H:i', strtotime($time));
            })
            ->toArray();

        $start = strtotime("09:00");
        $end = strtotime("18:00");
        $slots = [];

        for ($time = $start; $time <= $end; $time += 30 * 60) {
            $heure = date("H:i", $time);

            if (!in_array($heure, $bookedSlots)) {
                $slots[] = $heure;
            }
        }

        return response()->json([
            'message' => 'success',
            'data'    => $slots
        ]);
    }
}