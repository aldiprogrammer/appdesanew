<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $jenisLabel }}</title>
    <style>
    @page {
        margin: 2cm;
    }

    body {
        font-family: "Times New Roman", Times, serif;
        font-size: 12pt;
        color: #000;
        line-height: 1.5;
    }

    /* KOP SURAT */
    .kop {
        width: 100%;
        margin-bottom: 10px;
    }

    .kop-table {
        width: 100%;
        border-collapse: collapse;
    }

    .kop-logo {
        width: 100px;
        text-align: center;
        vertical-align: middle;
    }

    .kop-logo img {
        width: 100px;
        height: 100px;
    }

    .kop-text {
        text-align: center;
        vertical-align: ;
    }

    .kop-text .baris1 {
        font-size: 14pt;
        font-weight: bold;
    }

    .kop-text .baris2 {
        font-size: 16pt;
        font-weight: bold;
    }

    .kop-text .baris3 {
        font-size: 20pt;
        font-weight: bold;
        text-transform: uppercase;
    }

    .kop-text .alamat {
        font-size: 10pt;
        margin-top: 2px;
    }

    .garis1 {
        border-top: 3px solid #000;
        margin-top: 8px;
    }

    .garis2 {
        border-top: 1px solid #000;
        margin-top: 2px;
    }

    /* Judul Surat */
    .judul {
        text-align: center;
        font-size: 14pt;
        font-weight: bold;
        text-decoration: underline;
        margin-top: 15px;
    }

    .nomor-surat {
        text-align: center;
        margin-bottom: 20px;
    }

    .isi {
        text-align: justify;
    }

    .isi p {
        text-indent: 40px;
        margin: 8px 0;
    }

    .data-grid {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .data-grid td {
        padding: 3px;
        vertical-align: top;
    }

    .label {
        width: 180px;
    }

    .separator {
        width: 20px;
        text-align: center;
    }

    .ttd {
        width: 300px;
        float: right;
        margin-top: 30px;
        text-align: center;
    }

    .spacer-ttd {
        height: 70px;
    }

    .footer {
        clear: both;
        margin-top: 50px;
        text-align: center;
        font-size: 9pt;
        color: #666;
    }
</style>
</head>
<body>

    {{-- Kop Surat --}}
   <!-- KOP SURAT -->
<div class="kop">
    <table class="kop-table">
        <tr>
            <td class="kop-logo">
                <img src="{{ public_path('logo/langkat.png') }}" alt="Logo">
            </td>

            <td class="kop-text">
                <div class="baris1">
                    PEMERINTAH KABUPATEN LANGKAT
                </div>

                <div class="baris2">
                    KECAMATAN PADANG TUALANG
                </div>

                <div class="baris3">
                    DESA TANJUNG PUTUS
                </div>

                <div class="alamat">
                    Jl. Besar Desa Tanjung Putus, Kecamatan Padang Tualang
                     Kabupaten Langkat, Provinsi Sumatera Utara, Kode Pos 20851
                </div>

                <div class="alamat">
                    Kabupaten Langkat, Provinsi Sumatera Utara, Kode Pos 20851
                </div>

                <div class="alamat">
                    Email : desatanjungputus@gmail.com
                </div>
            </td>

            
        </tr>
    </table>

    <div class="garis1"></div>
    <div class="garis2"></div>
</div>

    {{-- Judul Surat --}}
    <div class="judul">{{ $jenisLabel }}</div>
    <div class="nomor-surat">
        Nomor: {{ $nomorSurat }}
    </div>

    {{-- Yang bertanda tangan --}}
    <div class="isi">
        <p>Yang bertanda tangan di bawah ini, Kepala Desa Tanjung Putus, Kecamatan Padang Tualang, Kabupaten Langkat, menerangkan dengan sebenarnya bahwa:</p>

        <table class="data-grid">
            <tr><td class="label">Nama Lengkap</td><td class="separator">:</td><td>{{ $data['nama'] ?? '-' }}</td></tr>
            <tr><td class="label">NIK</td><td class="separator">:</td><td>{{ $data['nik'] ?? '-' }}</td></tr>
            @if($penduduk)
            <tr><td class="label">Tempat/Tgl Lahir</td><td class="separator">:</td><td>{{ $penduduk->tempatlahir ?? '-' }}, {{ $penduduk->tanggallahir ? \Carbon\Carbon::parse($penduduk->tanggallahir)->format('d F Y') : '-' }}</td></tr>
            <tr><td class="label">Jenis Kelamin</td><td class="separator">:</td><td>{{ ($penduduk->sex ?? '') == '1' ? 'Laki-laki' : (($penduduk->sex ?? '') == '2' ? 'Perempuan' : '-') }}</td></tr>
            <tr><td class="label">Kewarganegaraan</td><td class="separator">:</td><td>Indonesia</td></tr>
            <tr><td class="label">Agama</td><td class="separator">:</td><td>{{ \App\Models\Penduduk::AGAMA_MAP[$penduduk->agama_id] ?? $penduduk->agama_id ?? '-' }}</td></tr>
            <tr><td class="label">Pekerjaan</td><td class="separator">:</td><td>{{ \App\Models\Penduduk::PEKERJAAN_MAP[$penduduk->pekerjaan_id] ?? $penduduk->pekerjaan_id ?? '-' }}</td></tr>
            <tr><td class="label">Alamat</td><td class="separator">:</td><td>{{ $penduduk->alamat ?? '-' }}, Dusun {{ $penduduk->dusun ?? '-' }}, RT {{ $penduduk->rt ?? '-' }}/RW {{ $penduduk->rw ?? '-' }}</td></tr>
            @endif
        </table>

        @switch($jenis)
            @case('domisili')
                <p>Bahwa orang tersebut di atas benar-benar berdomisili di alamat <strong>{{ $data['alamat_domisili'] ?? '-' }}</strong>, RT {{ $data['rt'] ?? '-' }} / RW {{ $data['rw'] ?? '-' }}, Dusun {{ $data['dusun'] ?? ($penduduk->dusun ?? '-') }}, Desa Tanjung Putus, Kecamatan Padang Tualang, Kabupaten Langkat.</p>
                @if(!empty($data['keperluan']))
                <p>Surat keterangan ini dibuat untuk keperluan <strong>{{ $data['keperluan'] }}</strong>.</p>
                @endif
                @break

            @case('tidak_mampu')
                <p>Bahwa orang tersebut di atas adalah warga Desa Tanjung Putus yang termasuk dalam kategori <strong>Tidak Mampu / Kurang Mampu</strong> secara ekonomi.</p>
                @if(!empty($data['penghasilan']))
                <p>Penghasilan per bulan: <strong>{{ $data['penghasilan'] }}</strong>.</p>
                @endif
                @if(!empty($data['keterangan_tidak_mampu']))
                <p>{{ $data['keterangan_tidak_mampu'] }}</p>
                @endif
                @if(!empty($data['keperluan']))
                <p>Surat keterangan ini dibuat untuk keperluan <strong>{{ $data['keperluan'] }}</strong>.</p>
                @endif
                @break

            @case('usaha')
                <p>Bahwa orang tersebut di atas benar-benar memiliki dan menjalankan usaha:</p>
                <table class="data-grid">
                    <tr><td class="label">Nama Usaha</td><td class="separator">:</td><td>{{ $data['nama_usaha'] ?? '-' }}</td></tr>
                    <tr><td class="label">Bidang Usaha</td><td class="separator">:</td><td>{{ $data['bidang_usaha'] ?? '-' }}</td></tr>
                    <tr><td class="label">Alamat Usaha</td><td class="separator">:</td><td>{{ $data['alamat_usaha'] ?? '-' }}</td></tr>
                </table>
                @if(!empty($data['keperluan']))
                <p>Surat keterangan ini dibuat untuk keperluan <strong>{{ $data['keperluan'] }}</strong>.</p>
                @endif
                @break

            @case('belum_menikah')
                <p>Bahwa orang tersebut di atas benar-benar berstatus <strong>Belum Menikah</strong> menurut data yang ada di Desa Tanjung Putus.</p>
                @if(!empty($data['keperluan_surat']))
                <p>Surat keterangan ini dibuat untuk keperluan <strong>{{ $data['keperluan_surat'] }}</strong>.</p>
                @endif
                @if(!empty($data['keperluan']))
                <p>Surat keterangan ini dibuat untuk keperluan <strong>{{ $data['keperluan'] }}</strong>.</p>
                @endif
                @break

            @case('pindah')
                <p>Bahwa orang tersebut di atas benar-benar akan pindah domisili dari Desa Tanjung Putus ke:</p>
                <table class="data-grid">
                    <tr><td class="label">Alamat Tujuan</td><td class="separator">:</td><td>{{ $data['alamat_tujuan'] ?? '-' }}</td></tr>
                    <tr><td class="label">Alasan Pindah</td><td class="separator">:</td><td>{{ $data['alasan_pindah'] ?? '-' }}</td></tr>
                </table>
                <p>Dengan alamat asal: Desa Tanjung Putus, RT {{ $data['rt'] ?? ($penduduk->rt ?? '-') }} / RW {{ $data['rw'] ?? ($penduduk->rw ?? '-') }}, Kecamatan Padang Tualang, Kabupaten Langkat.</p>
                @if(!empty($data['keperluan']))
                <p>Surat keterangan ini dibuat untuk keperluan <strong>{{ $data['keperluan'] }}</strong>.</p>
                @endif
                @break
        @endswitch

        <p>Demikian surat keterangan ini dibuat dengan sebenarnya, untuk dapat dipergunakan sebagaimana mestinya.</p>
    </div>

    {{-- Tanda Tangan --}}
    <div class="ttd">
        <div class="keterangan">Tanjung Putus, {{ $tanggal }}</div>
        <div class="keterangan">a.n. Kepala Desa Tanjung Putus</div>
        <div class="keterangan">Sekretaris Desa</div>
        <div class="spacer-lg"></div>
        <div class="sign-line">_________________________</div>
        <div class="sign-name">({{ $sekdes }})</div>
    </div>

    <div class="footer">
        Dokumen ini dibuat secara digital oleh Sistem Layanan Surat Desa Tanjung Putus
    </div>

</body>
</html>
