<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kontak_layanans', function (Blueprint $table) {
            $table->id();
            $table->string('nama_layanan');
            $table->string('icon_class')->nullable();
            $table->string('nomor')->nullable();
            $table->string('icon_image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kontak_layanans');
    }
};
