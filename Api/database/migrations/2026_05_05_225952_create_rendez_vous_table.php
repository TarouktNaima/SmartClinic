<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rendez_vous', function (Blueprint $table) {
            $table->id();

            // 👤 patient (from users)
            $table->foreignId('patient_id')
                ->constrained('users')
                ->onDelete('cascade');

            // 👨‍⚕️ doctor (from users)
            $table->foreignId('doctor_id')
                ->constrained('users')
                ->onDelete('cascade');

            // 📅 RDV data
            $table->date('date');
            $table->time('heure');

            // 🔥 status
            $table->enum('status', [
                'en attente',
                'confirmé',
                'refusé',
                'annulé',
                'terminé'
            ])->default('en attente');

            $table->timestamps();

            // 🚀 prevent double booking
            $table->unique(['doctor_id', 'date', 'heure']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rendez_vous');
    }
};