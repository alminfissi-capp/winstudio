<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    /**
     * Display a listing of the user's clients.
     */
    public function index(Request $request): Response
    {
        $clients = $request->user()
            ->clients()
            ->withCount('projects')
            ->latest()
            ->paginate(20);

        return Inertia::render('clients/index', [
            'clients' => $clients,
        ]);
    }

    /**
     * Store a newly created client in storage.
     */
    public function store(StoreClientRequest $request): RedirectResponse
    {
        $request->user()->clients()->create($request->validated());

        return back();
    }

    /**
     * Update the specified client in storage.
     */
    public function update(UpdateClientRequest $request, Client $client): RedirectResponse
    {
        if ($client->user_id !== $request->user()->id) {
            abort(403);
        }

        $client->update($request->validated());

        return back();
    }

    /**
     * Remove the specified client from storage.
     */
    public function destroy(Request $request, Client $client): RedirectResponse
    {
        if ($client->user_id !== $request->user()->id) {
            abort(403);
        }

        $client->delete();

        return redirect()->route('clients.index');
    }
}
