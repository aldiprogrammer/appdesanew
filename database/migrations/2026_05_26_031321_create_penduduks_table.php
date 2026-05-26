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
        Schema::create('penduduks', function (Blueprint $table) {
            $table->id();
            $table->text('alamat')->nullable();
            $table->string('dusun')->nullable();
            $table->string('rw')->nullable();
            $table->string('rt')->nullable();
            $table->string('nama')->nullable();
            $table->string('no_kk')->nullable();
            $table->string('nik')->nullable();
            $table->string('sex')->nullable();
            $table->string('tempatlahir')->nullable();
            $table->date('tanggallahir')->nullable();

            $table->string('agama_id')->nullable();
            $table->string('pendidikan_kk_id')->nullable();
            $table->string('pendidikan_sedang_id')->nullable();
            $table->string('pekerjaan_id')->nullable();
            $table->string('status_kawin')->nullable();
            $table->string('kk_level')->nullable();
            $table->string('warganegara_id')->nullable();

            $table->string('ayah_nik')->nullable();
            $table->string('nama_ayah')->nullable();

            $table->string('ibu_nik')->nullable();
            $table->string('nama_ibu')->nullable();

            $table->string('golongan_darah_id')->nullable();
            $table->string('akta_lahir')->nullable();
            $table->string('dokumen_pasport')->nullable();

            $table->date('tanggal_akhir_paspor')->nullable();

            $table->string('dokumen_kitas')->nullable();
            $table->string('akta_perkawinan')->nullable();

            $table->date('tanggalperkawinan')->nullable();

            $table->string('akta_perceraian')->nullable();

            $table->date('tanggalperceraian')->nullable();

            $table->string('cacat_id')->nullable();
            $table->string('cara_kb_id')->nullable();

            $table->string('hamil')->nullable();
            $table->string('ktp_el')->nullable();
            $table->string('status_rekam')->nullable();

            $table->text('alamat_sekarang')->nullable();

            $table->string('status_dasar')->nullable();
            $table->string('suku')->nullable();
            $table->string('tag_id_card')->nullable();
            $table->string('id_asuransi')->nullable();
            $table->string('no_asuransi')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penduduks');
    }
};
