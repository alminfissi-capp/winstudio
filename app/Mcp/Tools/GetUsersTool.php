<?php

namespace App\Mcp\Tools;

use App\Models\User;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\ResponseFactory;
use Laravel\Mcp\Server\Tool;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;

#[IsReadOnly]
class GetUsersTool extends Tool
{
    /**
     * The tool's name.
     */
    protected string $name = 'get-users';

    /**
     * The tool's description.
     */
    protected string $description = <<<'MARKDOWN'
        Recupera la lista degli utenti dal database.
        Supporta paginazione e filtri per nome ed email.
    MARKDOWN;

    /**
     * Handle the tool request.
     */
    public function handle(Request $request): Response|ResponseFactory
    {
        $validated = $request->validate([
            'limit' => 'integer|min:1|max:100',
            'offset' => 'integer|min:0',
            'search' => 'string|max:255',
        ]);

        $query = User::query();

        if (!empty($validated['search'])) {
            $search = $validated['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'ilike', "%{$search}%")
                  ->orWhere('email', 'ilike', "%{$search}%");
            });
        }

        $total = $query->count();

        $users = $query
            ->skip($validated['offset'] ?? 0)
            ->take($validated['limit'] ?? 10)
            ->orderBy('created_at', 'desc')
            ->get(['id', 'name', 'email', 'email_verified_at', 'created_at']);

        return Response::structured([
            'total' => $total,
            'count' => $users->count(),
            'users' => $users->toArray(),
        ]);
    }

    /**
     * Get the tool's input schema.
     *
     * @return array<string, \Illuminate\Contracts\JsonSchema\JsonSchema>
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'limit' => $schema->integer()
                ->description('Numero massimo di utenti da recuperare (default: 10, max: 100)')
                ->minimum(1)
                ->maximum(100)
                ->default(10),
            'offset' => $schema->integer()
                ->description('Numero di utenti da saltare per la paginazione (default: 0)')
                ->minimum(0)
                ->default(0),
            'search' => $schema->string()
                ->description('Cerca per nome o email (case-insensitive)')
                ->maxLength(255),
        ];
    }
}
