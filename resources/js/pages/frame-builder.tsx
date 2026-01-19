import { useState } from 'react';
import { router } from '@inertiajs/react';
import FrameBuilderLayout from '@/layouts/frame-builder-layout';
import FrameBuilderHeader from '@/components/frame-builder/frame-builder-header';
import FrameBuilderCanvas from '@/components/frame-builder/frame-builder-canvas';
import FrameBuilderBottomNav from '@/components/frame-builder/frame-builder-bottom-nav';
import FrameSelectionModal from '@/components/frame-builder/frame-selection-modal';
import { Project, FramePresetsByCategory } from '@/types';

interface FrameBuilderPageProps {
    project: Project;
    framePresets: FramePresetsByCategory;
}

export default function FrameBuilder({
    project,
    framePresets,
}: FrameBuilderPageProps) {
    const [selectedFrameId, setSelectedFrameId] = useState<number | null>(
        project.frames?.[0]?.id ?? null,
    );
    const [isFrameSelectionOpen, setIsFrameSelectionOpen] = useState(false);

    const selectedFrame = project.frames?.find(
        (f) => f.id === selectedFrameId,
    );

    const handleAddFrame = () => {
        setIsFrameSelectionOpen(true);
    };

    const handleFrameSelect = (frameTypeCode: string) => {
        router.post(
            `/projects/${project.id}/frames`,
            {
                frame_type: frameTypeCode,
            },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    setIsFrameSelectionOpen(false);
                    // Seleziona automaticamente il nuovo frame (l'ultimo nella lista)
                    const updatedProject = (page.props as { project: Project }).project;
                    const newFrame = updatedProject.frames?.[updatedProject.frames.length - 1];
                    if (newFrame) {
                        setSelectedFrameId(newFrame.id);
                    }
                },
            },
        );
    };

    const handleDimensionChange = (width: number, height: number) => {
        if (selectedFrame) {
            router.patch(
                `/projects/${project.id}/frames/${selectedFrame.id}`,
                { width, height },
                { preserveScroll: true },
            );
        }
    };

    return (
        <FrameBuilderLayout title={project.name}>
            <FrameBuilderHeader project={project} />

            <FrameBuilderCanvas
                frame={selectedFrame}
                onDimensionChange={handleDimensionChange}
            />

            <FrameBuilderBottomNav
                frames={project.frames ?? []}
                selectedFrameId={selectedFrameId}
                onFrameSelect={setSelectedFrameId}
                onAddFrame={handleAddFrame}
                projectId={project.id}
            />

            <FrameSelectionModal
                isOpen={isFrameSelectionOpen}
                onClose={() => setIsFrameSelectionOpen(false)}
                framePresets={framePresets}
                onSelectPreset={handleFrameSelect}
            />
        </FrameBuilderLayout>
    );
}
