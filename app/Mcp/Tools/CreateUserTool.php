<?php

namespace App\Mcp\Tools;

use App\Models\User;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Support\Facades\Hash;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\ResponseFactory;
use Laravel\Mcp\Server\Tool;

class CreateUserTool extends Tool
{
    /**
     * The tool's name.
     */
    protected string $name = 'create-user';

    /**
     * The tool's description.
     */
    protected string $description = <<<'MARKDOWN'
        Crea un nuovo utente nel database.
        Richiede nome, email e password. L'email deve essere unica.
    MARKDOWN;

    /**
     * Handle the tool request.
     */
    public function handle(Request $request): Response|ResponseFactory
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => 'required|string|min:8',
        ]);

        try {
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);

            return Response::structured([
                'success' => true,
                'message' => 'Utente creato con successo',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'created_at' => $user->created_at->toIso8601String(),
                ],
            ]);
        } catch (\Exception $e) {
            return Response::error('Errore durante la creazione dell\'utente: ' . $e->getMessage());
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
            'name' => $schema->string()
                ->description('Nome completo dell\'utente')
                ->maxLength(255)
                ->required(),
            'email' => $schema->string()
                ->description('Indirizzo email univoco dell\'utente')
                ->format('email')
                ->maxLength(255)
                ->required(),
            'password' => $schema->string()
                ->description('Password dell\'utente (minimo 8 caratteri)')
                ->minLength(8)
                ->required(),
        ];
    }
}
