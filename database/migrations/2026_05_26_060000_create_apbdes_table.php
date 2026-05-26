<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('apbdes', function (Blueprint $table) {
            $table->id();
            $table->year('tahun');
            $table->decimal('total_pendapatan', 15, 2)->default(0);
            $table->decimal('total_belanja', 15, 2)->default(0);
            $table->text('keterangan')->nullable();
            $table->enum('status', ['draft', 'disetujui', 'ditolak', 'realisasi'])->default('draft');
            $table->timestamps();

            $table->unique(['tahun']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('apbdes');
    }
};
