<?php

namespace App\Mcp\Servers;

use App\Mcp\Resources\DatabaseSchemaResource;
use App\Mcp\Tools\CreateUserTool;
use App\Mcp\Tools\DatabaseQueryTool;
use App\Mcp\Tools\GetUsersTool;
use Laravel\Mcp\Server;

class AlmRmiServer extends Server
{
    /**
     * The MCP server's name.
     */
    protected string $name = 'ALM-RMI Server';

    /**
     * The MCP server's version.
     */
    protected string $version = '1.0.0';

    /**
     * The MCP server's instructions for the LLM.
     */
    protected string $instructions = <<<'MARKDOWN'
        Server MCP per l'applicazione ALM-RMI (Laravel 12).

        Questo server fornisce accesso AI alle funzionalità principali dell'applicazione:

        ## Tools Disponibili
        - **get-users**: Recupera lista utenti con paginazione e ricerca
        - **create-user**: Crea un nuovo utente
        - **database-query**: Esegue query SELECT di sola lettura sul database PostgreSQL

        ## Resources Disponibili
        - **database-schema**: Schema completo del database PostgreSQL

        ## Caratteristiche
        - Database: PostgreSQL 17.7
        - Framework: Laravel 12
        - PHP: 8.4
        - Autenticazione: Laravel standard

        ## Sicurezza
        - Le query database sono limitate a SELECT only
        - Validazione input su tutti i tools
        - Protezione contro SQL injection
    MARKDOWN;

    /**
     * The tools registered with this MCP server.
     *
     * @var array<int, class-string<\Laravel\Mcp\Server\Tool>>
     */
    protected array $tools = [
        GetUsersTool::class,
        CreateUserTool::class,
        DatabaseQueryTool::class,
    ];

    /**
     * The resources registered with this MCP server.
     *
     * @var array<int, class-string<\Laravel\Mcp\Server\Resource>>
     */
    protected array $resources = [
        DatabaseSchemaResource::class,
    ];

    /**
     * The prompts registered with this MCP server.
     *
     * @var array<int, class-string<\Laravel\Mcp\Server\Prompt>>
     */
    protected array $prompts = [
        //
    ];
}
