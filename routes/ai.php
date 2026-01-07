<?php

use App\Mcp\Servers\AlmRmiServer;
use Laravel\Mcp\Facades\Mcp;

// Registrazione server MCP ALM-RMI
Mcp::web('/mcp/almrmi', AlmRmiServer::class)
    ->middleware(['throttle:api']);

// Server locale per testing via Artisan
Mcp::local('almrmi', AlmRmiServer::class);
