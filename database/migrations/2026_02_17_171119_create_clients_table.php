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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('nome', 100)->nullable();
            $table->string('cognome', 100)->nullable();
            $table->string('ragione_sociale', 255)->nullable();
            $table->string('indirizzo_via', 255)->nullable();
            $table->string('indirizzo_citta', 100)->nullable();
            $table->string('indirizzo_cap', 10)->nullable();
            $table->string('indirizzo_provincia', 5)->nullable();
            $table->string('telefono', 30)->nullable();
            $table->string('cellulare', 30)->nullable();
            $table->string('email', 255)->nullable();
            $table->string('pec', 255)->nullable();
            $table->string('codice_fiscale', 16)->nullable();
            $table->string('partita_iva', 13)->nullable();
            $table->text('note')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
