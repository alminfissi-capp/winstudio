<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of the user's projects.
     */
    public function index(Request $request): Response
    {
        $projects = $request->user()
            ->projects()
            ->with('client')
            ->withCount('frames')
            ->latest()
            ->paginate(20);

        $clients = $request->user()
            ->clients()
            ->orderBy('ragione_sociale')
            ->orderBy('cognome')
            ->orderBy('nome')
            ->get();

        return Inertia::render('projects/index', [
            'projects' => $projects,
            'clients' => $clients,
        ]);
    }

    /**
     * Store a newly created project in storage.
     */
    public function store(StoreProjectRequest $request): RedirectResponse
    {
        $project = $request->user()->projects()->create($request->validated());

        return redirect()->route('frame-builder.show', $project);
    }

    /**
     * Update the specified project in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project): RedirectResponse
    {
        if ($project->user_id !== $request->user()->id) {
            abort(403);
        }

        $project->update($request->validated());

        return back();
    }

    /**
     * Remove the specified project from storage.
     */
    public function destroy(Request $request, Project $project): RedirectResponse
    {
        if ($project->user_id !== $request->user()->id) {
            abort(403);
        }

        $project->delete();

        return redirect()->route('projects.index');
    }
}
