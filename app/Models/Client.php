<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    /** @use HasFactory<\Database\Factories\ClientFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nome',
        'cognome',
        'ragione_sociale',
        'indirizzo_via',
        'indirizzo_citta',
        'indirizzo_cap',
        'indirizzo_provincia',
        'telefono',
        'cellulare',
        'email',
        'pec',
        'codice_fiscale',
        'partita_iva',
        'note',
    ];

    protected $appends = ['display_name', 'full_address'];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }

    /**
     * Get the display name: ragione_sociale or nome + cognome.
     */
    protected function displayName(): Attribute
    {
        return Attribute::get(function () {
            if ($this->ragione_sociale) {
                return $this->ragione_sociale;
            }

            return trim("{$this->nome} {$this->cognome}");
        });
    }

    /**
     * Get the full formatted address.
     */
    protected function fullAddress(): Attribute
    {
        return Attribute::get(function () {
            $parts = array_filter([
                $this->indirizzo_via,
                trim("{$this->indirizzo_cap} {$this->indirizzo_citta}"),
                $this->indirizzo_provincia ? "({$this->indirizzo_provincia})" : null,
            ]);

            return implode(', ', $parts) ?: null;
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }
}
