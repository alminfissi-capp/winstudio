<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->foreignId('client_id')->nullable()->after('user_id')->constrained()->nullOnDelete();
        });

        // Migrate existing client_name/client_address data to clients table
        $projects = DB::table('projects')
            ->whereNotNull('client_name')
            ->where('client_name', '!=', '')
            ->select('id', 'user_id', 'client_name', 'client_address')
            ->get();

        $clientMap = [];

        foreach ($projects as $project) {
            $key = $project->user_id.'|'.$project->client_name;

            if (! isset($clientMap[$key])) {
                $clientId = DB::table('clients')->insertGetId([
                    'user_id' => $project->user_id,
                    'nome' => $project->client_name,
                    'indirizzo_via' => $project->client_address,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                $clientMap[$key] = $clientId;
            }

            DB::table('projects')
                ->where('id', $project->id)
                ->update(['client_id' => $clientMap[$key]]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropConstrainedForeignId('client_id');
        });
    }
};
