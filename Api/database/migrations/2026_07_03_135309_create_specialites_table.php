<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('specialites', function (Blueprint $table) {
        $table->id();
        $table->string('name')->unique(); // سميت التخصص (مثلا: Cardiologue)
        $table->string('desc')->nullable(); // وصف قصير
        $table->string('icon')->nullable(); // اسم الأيقونة (مثلا: HeartPulse)
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('specialites');
    }
};
