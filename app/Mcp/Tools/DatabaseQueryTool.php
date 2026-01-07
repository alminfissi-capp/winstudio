<?php

namespace App\Mcp\Tools;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Support\Facades\DB;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\ResponseFactory;
use Laravel\Mcp\Server\Tool;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;

#[IsReadOnly]
class DatabaseQueryTool extends Tool
{
    /**
     * The tool's name.
     */
    protected string $name = 'database-query';

    /**
     * The tool's description.
     */
    protected string $description = <<<'MARKDOWN'
        Esegue query SQL SELECT di sola lettura sul database PostgreSQL.
        ATTENZIONE: Solo query SELECT sono permesse per motivi di sicurezza.
    MARKDOWN;

    /**
     * Handle the tool request.
     */
    public function handle(Request $request): Response|ResponseFactory
    {
        $validated = $request->validate([
            'query' => 'required|string|max:5000',
        ]);

        $query = trim($validated['query']);

        // Sicurezza: permetti solo query SELECT
        if (!preg_match('/^\s*SELECT\s+/i', $query)) {
            return Response::error('Solo query SELECT sono permesse per motivi di sicurezza.');
        }

        // Blocca query pericolose
        $dangerousPatterns = [
            '/\bDROP\b/i',
            '/\bDELETE\b/i',
            '/\bUPDATE\b/i',
            '/\bINSERT\b/i',
            '/\bTRUNCATE\b/i',
            '/\bALTER\b/i',
            '/\bCREATE\b/i',
            '/\bEXEC\b/i',
            '/\bEXECUTE\b/i',
        ];

        foreach ($dangerousPatterns as $pattern) {
            if (preg_match($pattern, $query)) {
                return Response::error('Query non permessa: contiene operazioni di modifica dati.');
            }
        }

        try {
            $results = DB::select($query);

            return Response::structured([
                'success' => true,
                'rows' => count($results),
                'data' => $results,
            ]);
        } catch (\Exception $e) {
            return Response::error('Errore nell\'esecuzione della query: ' . $e->getMessage());
        }
    }

    /**
     * Get the tool's input schema.
     *
     * @return array<string, \Illuminate\Contracts\JsonSchema\JsonSchema>
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'query' => $schema->string()
                ->description('Query SQL SELECT da eseguire (solo lettura)')
                ->maxLength(5000)
                ->required(),
        ];
    }
}
