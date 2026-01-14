<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class FramePresetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $presets = [
            // Imposte (frame types)
            [
                'code' => '1_anta',
                'name' => '1 Anta',
                'description' => 'Finestra ad anta singola con apertura a battente',
                'category' => 'imposte',
                'is_active' => true,
                'sort_order' => 1,
                'default_config' => [
                    'num_panels' => 1,
                    'default_width' => 1200,
                    'default_height' => 1500,
                    'min_width' => 400,
                    'max_width' => 2000,
                    'min_height' => 600,
                    'max_height' => 2500,
                    'frame_thickness' => 70,
                    'glass_inset' => 10,
                    'opening_direction' => 'right',
                    'opening_symbol' => 'cross',
                ],
            ],
            [
                'code' => '2_ante',
                'name' => '2 Ante',
                'description' => 'Finestra a due ante simmetriche con apertura centrale',
                'category' => 'imposte',
                'is_active' => true,
                'sort_order' => 2,
                'default_config' => [
                    'num_panels' => 2,
                    'default_width' => 1500,
                    'default_height' => 1500,
                    'min_width' => 800,
                    'max_width' => 3000,
                    'min_height' => 600,
                    'max_height' => 2500,
                    'frame_thickness' => 70,
                    'glass_inset' => 10,
                    'opening_direction' => 'center',
                    'opening_symbol' => 'cross',
                ],
            ],
            [
                'code' => '3_ante',
                'name' => '3 Ante',
                'description' => 'Porta-finestra a tre ante con pannello centrale e laterali',
                'category' => 'imposte',
                'is_active' => true,
                'sort_order' => 3,
                'default_config' => [
                    'num_panels' => 3,
                    'default_width' => 2000,
                    'default_height' => 2200,
                    'min_width' => 1500,
                    'max_width' => 4000,
                    'min_height' => 1800,
                    'max_height' => 3000,
                    'frame_thickness' => 70,
                    'glass_inset' => 10,
                    'panel_widths' => [600, 800, 600],
                    'opening_direction' => 'center',
                    'opening_symbol' => 'cross',
                ],
            ],
            [
                'code' => 'finestra_fissa',
                'name' => 'Finestra Fissa',
                'description' => 'Finestra fissa senza apertura',
                'category' => 'imposte',
                'is_active' => true,
                'sort_order' => 4,
                'default_config' => [
                    'num_panels' => 1,
                    'default_width' => 1000,
                    'default_height' => 1200,
                    'min_width' => 400,
                    'max_width' => 2500,
                    'min_height' => 400,
                    'max_height' => 2500,
                    'frame_thickness' => 70,
                    'glass_inset' => 10,
                    'opening_symbol' => 'none',
                ],
            ],

            // Apertura (opening types)
            [
                'code' => 'scorrevole',
                'name' => 'Scorrevole',
                'description' => 'Apertura scorrevole laterale',
                'category' => 'apertura',
                'is_active' => true,
                'sort_order' => 1,
                'default_config' => [
                    'opening_symbol' => 'arrow',
                ],
            ],
            [
                'code' => 'battente',
                'name' => 'Battente',
                'description' => 'Apertura a battente tradizionale',
                'category' => 'apertura',
                'is_active' => true,
                'sort_order' => 2,
                'default_config' => [
                    'opening_symbol' => 'cross',
                ],
            ],
            [
                'code' => 'anta_ribalta',
                'name' => 'Anta Ribalta',
                'description' => 'Apertura combinata a battente e ribalta',
                'category' => 'apertura',
                'is_active' => true,
                'sort_order' => 3,
                'default_config' => [
                    'opening_symbol' => 'diagonal',
                ],
            ],
        ];

        foreach ($presets as $preset) {
            \App\Models\FramePreset::updateOrCreate(
                ['code' => $preset['code']], // Find by code
                $preset // Update or create with these values
            );
        }
    }
}
