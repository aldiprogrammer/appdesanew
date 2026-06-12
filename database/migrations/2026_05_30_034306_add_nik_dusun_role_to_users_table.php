<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('nik', 25)->unique()->nullable()->after('name');
            $table->string('dusun')->nullable()->after('nik');
            $table->string('role')->default('penduduk')->after('dusun');
            $table->string('email')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['nik', 'dusun', 'role']);
            $table->string('email')->unique()->change();
        });
    }
};
