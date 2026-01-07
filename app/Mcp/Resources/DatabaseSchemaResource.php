<?php

namespace App\Mcp\Resources;

use Illuminate\Support\Facades\DB;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Resource;

class DatabaseSchemaResource extends Resource
{
    /**
     * The resource's name.
     */
    protected string $name = 'database-schema';

    /**
     * The resource's description.
     */
    protected string $description = <<<'MARKDOWN'
        Schema completo del database PostgreSQL dell'applicazione ALM-RMI.
        Include tutte le tabelle, colonne, tipi di dati, indici e relazioni.
    MARKDOWN;

    /**
     * The resource's URI.
     */
    protected string $uri = 'almrmi://database/schema';

    /**
     * The resource's MIME type.
     */
    protected string $mimeType = 'application/json';

    /**
     * Handle the resource request.
     */
    public function handle(Request $request): Response
    {
        try {
            // Ottieni lista tabelle
            $tables = DB::select("
                SELECT table_name,
                       pg_size_pretty(pg_total_relation_size(quote_ident(table_name)::regclass)) as size
                FROM information_schema.tables
                WHERE table_schema = 'public'
                  AND table_type = 'BASE TABLE'
                ORDER BY table_name
            ");

            $schema = [];

            foreach ($tables as $table) {
                $tableName = $table->table_name;

                // Ottieni colonne
                $columns = DB::select("
                    SELECT column_name, data_type, character_maximum_length,
                           is_nullable, column_default
                    FROM information_schema.columns
                    WHERE table_schema = 'public'
                      AND table_name = ?
                    ORDER BY ordinal_position
                ", [$tableName]);

                // Ottieni indici
                $indexes = DB::select("
                    SELECT indexname, indexdef
                    FROM pg_indexes
                    WHERE schemaname = 'public'
                      AND tablename = ?
                ", [$tableName]);

                // Ottieni foreign keys
                $foreignKeys = DB::select("
                    SELECT
                        tc.constraint_name,
                        kcu.column_name,
                        ccu.table_name AS foreign_table_name,
                        ccu.column_name AS foreign_column_name
                    FROM information_schema.table_constraints AS tc
                    JOIN information_schema.key_column_usage AS kcu
                      ON tc.constraint_name = kcu.constraint_name
                    JOIN information_schema.constraint_column_usage AS ccu
                      ON ccu.constraint_name = tc.constraint_name
                    WHERE tc.constraint_type = 'FOREIGN KEY'
                      AND tc.table_name = ?
                ", [$tableName]);

                $schema[$tableName] = [
                    'size' => $table->size,
                    'columns' => $columns,
                    'indexes' => $indexes,
                    'foreign_keys' => $foreignKeys,
                ];
            }

            $content = json_encode([
                'database' => config('database.connections.pgsql.database'),
                'connection' => 'pgsql',
                'tables' => $schema,
                'generated_at' => now()->toIso8601String(),
            ], JSON_PRETTY_PRINT);

            return Response::text($content);
        } catch (\Exception $e) {
            return Response::error('Errore nel recupero dello schema: ' . $e->getMessage());
        }
    }
}
