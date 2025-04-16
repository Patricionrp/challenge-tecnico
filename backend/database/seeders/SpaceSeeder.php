<?php

namespace Database\Seeders;

use App\Models\Space;
use Illuminate\Database\Seeder;

class SpaceSeeder extends Seeder
{
    public function run(): void
    {
        Space::insert([
            [
                'name' => 'Sala de Reuniones A',
                'description' => 'Sala equipada con proyector y aire acondicionado.',
                'status' => 'available',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sala de Capacitación',
                'description' => 'Espacio amplio para capacitaciones grupales.',
                'status' => 'available',

                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Auditorio Principal',
                'description' => 'Auditorio con capacidad para 100 personas.',
                'status' => 'available',

                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Oficina Privada 1',
                'description' => 'Oficina individual con escritorio y silla ergonómica.',
                'status' => 'available',

                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Terraza Coworking',
                'description' => 'Espacio al aire libre con mesas y wifi.',
                'status' => 'available',

                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}