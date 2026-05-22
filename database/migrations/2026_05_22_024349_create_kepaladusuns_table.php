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
        Schema::create('kepaladusuns', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 50);
            $table->string('nik', 18);
            $table->string('foto');
            $table->string('dusun', 50);
            $table->string('id_dusun', 11);
            $table->string('tahun_kerja', 20);
            $table->string('tahun_akhir_kerja', 20);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kepaladusuns');
    }
};
