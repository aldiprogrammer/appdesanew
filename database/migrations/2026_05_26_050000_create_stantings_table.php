<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stantings', function (Blueprint $table) {
            $table->id();
            $table->string('nik');
            $table->string('nama');
            $table->foreignId('dusun_id')->constrained('dusuns')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stantings');
    }
};
