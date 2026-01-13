<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFrameRequest;
use App\Http\Requests\UpdateFrameRequest;
use App\Models\Frame;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class FrameController extends Controller
{
    /**
     * Store a newly created frame in storage.
     */
    public function store(StoreFrameRequest $request, Project $project): RedirectResponse
    {
        if ($project->user_id !== $request->user()->id) {
            abort(403);
        }

        $maxOrder = $project->frames()->max('position_order') ?? -1;

        $project->frames()->create([
            ...$request->validated(),
            'position_order' => $maxOrder + 1,
        ]);

        return back();
    }

    /**
     * Update the specified frame in storage.
     */
    public function update(UpdateFrameRequest $request, Project $project, Frame $frame): RedirectResponse
    {
        if ($project->user_id !== $request->user()->id || $frame->project_id !== $project->id) {
            abort(403);
        }

        $frame->update($request->validated());

        return back();
    }

    /**
     * Remove the specified frame from storage.
     */
    public function destroy(Request $request, Project $project, Frame $frame): RedirectResponse
    {
        if ($project->user_id !== $request->user()->id || $frame->project_id !== $project->id) {
            abort(403);
        }

        $frame->delete();

        // Re-order remaining frames
        $project->frames()->each(function ($frame, $index) {
            $frame->update(['position_order' => $index]);
        });

        return back();
    }

    /**
     * Reorder frames within a project.
     */
    public function reorder(Request $request, Project $project): RedirectResponse
    {
        if ($project->user_id !== $request->user()->id) {
            abort(403);
        }

        $request->validate([
            'frame_ids' => ['required', 'array'],
            'frame_ids.*' => ['required', 'integer', 'exists:frames,id'],
        ]);

        foreach ($request->frame_ids as $index => $frameId) {
            Frame::where('id', $frameId)
                ->where('project_id', $project->id)
                ->update(['position_order' => $index]);
        }

        return back();
    }
}
