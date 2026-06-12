<?php

namespace Database\Seeders;

use App\Models\KontakLayanan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KontakLayananSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $kontak = [
            [
                'nama_layanan' => 'Polisi',
                'icon_class' => 'fas fa-shield-halved',
                'nomor' => '110',
            ],
            [
                'nama_layanan' => 'Pemadam Kebakaran',
                'icon_class' => 'fas fa-fire-extinguisher',
                'nomor' => '113',
            ],
            [
                'nama_layanan' => 'Ambulans / SAR',
                'icon_class' => 'fas fa-truck-medical',
                'nomor' => '118',
            ],
            [
                'nama_layanan' => 'PLN',
                'icon_class' => 'fas fa-bolt',
                'nomor' => '123',
            ],
            [
                'nama_layanan' => 'BPBD',
                'icon_class' => 'fas fa-house-flood-water',
                'nomor' => '129',
            ],
            [
                'nama_layanan' => 'PSC 119',
                'icon_class' => 'fas fa-heart-pulse',
                'nomor' => '119',
            ],
            [
                'nama_layanan' => 'PDAM',
                'icon_class' => 'fas fa-faucet-drip',
                'nomor' => '145',
            ],
            [
                'nama_layanan' => 'BPJS Kesehatan',
                'icon_class' => 'fas fa-hospital',
                'nomor' => '1500565',
            ],
        ];

        foreach ($kontak as $item) {
            KontakLayanan::create($item);
        }
    }
}
