<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Frame extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'frame_type',
        'opening_type',
        'width',
        'height',
        'surface_area',
        'position_order',
        'configuration',
    ];

    protected function casts(): array
    {
        return [
            'configuration' => 'array',
            'surface_area' => 'decimal:2',
        ];
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function calculateSurfaceArea(): void
    {
        if ($this->width && $this->height) {
            $this->surface_area = ($this->width * $this->height) / 1_000_000;
        }
    }

    protected static function booted(): void
    {
        static::saving(function (Frame $frame) {
            $frame->calculateSurfaceArea();
        });
    }
}
