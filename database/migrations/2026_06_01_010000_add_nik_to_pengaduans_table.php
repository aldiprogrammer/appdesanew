<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pengaduans', function (Blueprint $table) {
            $table->string('nik', 20)->nullable()->after('id_user');
            $table->dropForeign(['id_user']);
        });

        if (Schema::getConnection()->getDriverName() === 'mysql') {
            DB::statement('ALTER TABLE pengaduans MODIFY id_user BIGINT UNSIGNED NULL');
        }

        Schema::table('pengaduans', function (Blueprint $table) {
            $table->foreign('id_user')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('pengaduans', function (Blueprint $table) {
            $table->dropForeign(['id_user']);
            $table->dropColumn('nik');
        });

        if (Schema::getConnection()->getDriverName() === 'mysql') {
            DB::statement('ALTER TABLE pengaduans MODIFY id_user BIGINT UNSIGNED NOT NULL');
        }

        Schema::table('pengaduans', function (Blueprint $table) {
            $table->foreign('id_user')->references('id')->on('users')->cascadeOnDelete();
        });
    }
};
