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
        Schema::table('dusuns', function (Blueprint $table) {
            if (!Schema::hasColumn('dusuns', 'polygon')) {
                $table->json('polygon')->nullable()->after('longitude');
            }

            if (!Schema::hasColumn('dusuns', 'luas_wilayah')) {
                $table->double('luas_wilayah')->nullable()->after('polygon');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('dusuns', function (Blueprint $table) {
            if (Schema::hasColumn('dusuns', 'polygon')) {
                $table->dropColumn('polygon');
            }

            if (Schema::hasColumn('dusuns', 'luas_wilayah')) {
                $table->dropColumn('luas_wilayah');
            }
        });
    }
};
