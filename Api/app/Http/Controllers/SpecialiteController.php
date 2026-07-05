<?php

namespace App\Http\Controllers;

use App\Models\Specialite;
use Illuminate\Http\Request;

class SpecialiteController extends Controller
{
    // 1. جلب جميع التخصصات
    public function index()
    {
        $specialites = Specialite::all();
        return response()->json($specialites, 200);
    }

    // 2. إضافة تخصص جديد
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:specialites,name',
            'desc' => 'required',
            'icon' => 'required'
        ]);

        $specialite = Specialite::create([
            'name' => $request->name,
            'desc' => $request->desc,
            'icon' => $request->icon,
        ]);

        return response()->json([
            'message' => 'Spécialité ajoutée avec succès! ✅',
            'data' => $specialite
        ], 201);
    }

    // 3. مسح تخصص (زدتها ليك كـ Bonus يحتاجوها الـ Group ديالك)
    public function destroy($id)
    {
        $specialite = Specialite::find($id);

        if (!$specialite) {
            return response()->json([
                'message' => 'Spécialité introuvable'
            ], 404);
        }

        $specialite->delete();

        return response()->json([
            'message' => 'Spécialité supprimée avec succès ✅'
        ], 200);
    }
}