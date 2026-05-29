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
        Schema::create('penduduk_news', function (Blueprint $table) {
            $table->id();

            // alamat
            $table->string('alamat')->nullable();
            $table->string('dusun')->nullable();
            $table->string('rw', 10)->nullable();
            $table->string('rt', 10)->nullable();

            // identitas
            $table->string('nama')->nullable();

            // penting: string supaya nol depan tidak hilang
            $table->string('no_kk', 25)->nullable();
            $table->string('nik', 25)->nullable();

            $table->string('sex', 20)->nullable();
            $table->string('tempatlahir')->nullable();
            $table->date('tanggallahir')->nullable();

            // master data
            $table->unsignedBigInteger('agama_id')->nullable();
            $table->unsignedBigInteger('pendidikan_kk_id')->nullable();
            $table->unsignedBigInteger('pendidikan_sedang_id')->nullable();
            $table->unsignedBigInteger('pekerjaan_id')->nullable();

            // status
            $table->string('status_kawin')->nullable();
            $table->string('kk_level')->nullable();

            // kewarganegaraan
            $table->unsignedBigInteger('warganegara_id')->nullable();

            // orang tua
            $table->string('ayah_nik', 25)->nullable();
            $table->string('nama_ayah')->nullable();

            $table->string('ibu_nik', 25)->nullable();
            $table->string('nama_ibu')->nullable();

            // dokumen
            $table->string('golongan_darah_id')->nullable();

            $table->string('akta_lahir')->nullable();

            $table->string('dokumen_pasport')->nullable();
            $table->date('tanggal_akhir_paspor')->nullable();
            $table->date('dokumen_kitas')->nullable();

            $table->string('akta_perkawinan')->nullable();
            $table->string('tanggalperkawinan')->nullable();

            $table->string('akta_perceraian')->nullable();
            $table->date('tanggalperceraian')->nullable();

            // kesehatan
            $table->unsignedBigInteger('cacat_id')->nullable();
            $table->unsignedBigInteger('cara_kb_id')->nullable();

            $table->string('hamil')->nullable();

            // e-ktp
            $table->string('ktp_el')->nullable();
            $table->string('status_rekam')->nullable();

            // domisili
            $table->string('alamat_sekarang')->nullable();

            // desa
            $table->string('status_dasar')->nullable();
            $table->string('suku')->nullable();

            // tambahan
            $table->string('tag_id_card')->nullable();

            // asuransi
            $table->string('id_asuransi')->nullable();
            $table->string('no_asuransi')->nullable();

            $table->timestamps();

            // index biar cepat cari
            $table->index('nik');
            $table->index('no_kk');
            $table->index('nama');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penduduk_news');
    }
};
