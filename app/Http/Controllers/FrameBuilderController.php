<?php

namespace App\Http\Controllers;

use App\Models\FramePreset;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FrameBuilderController extends Controller
{
    /**
     * Show the frame builder interface for a project.
     */
    public function show(Request $request, Project $project): Response
    {
        // Authorization check
        if ($project->user_id !== $request->user()->id) {
            abort(403);
        }

        return Inertia::render('frame-builder', [
            'project' => $project->load('frames'),
            'framePresets' => FramePreset::active()->get()->groupBy('category'),
        ]);
    }

    /**
     * Create a new project and redirect to builder.
     */
    public function create(Request $request): RedirectResponse
    {
        $project = $request->user()->projects()->create([
            'name' => 'Nuovo Progetto '.now()->format('d/m/Y H:i'),
            'status' => 'draft',
        ]);

        return redirect()->route('frame-builder.show', $project);
    }
}
