import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus, Menu, Trash2 } from 'lucide-react';
import { Frame } from '@/types';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { router } from '@inertiajs/react';

interface FrameBuilderBottomNavProps {
    frames: Frame[];
    selectedFrameId: number | null;
    onFrameSelect: (id: number) => void;
    onAddFrame: () => void;
    projectId: number;
}

export default function FrameBuilderBottomNav({
    frames,
    selectedFrameId,
    onFrameSelect,
    onAddFrame,
    projectId,
}: FrameBuilderBottomNavProps) {
    return (
        <div className="sticky bottom-0 left-0 right-0 border-t border-sidebar-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="flex items-center gap-2 p-3">
                <Button
                    variant="default"
                    size="icon"
                    onClick={onAddFrame}
                    className="shrink-0"
                >
                    <Plus className="!size-5" />
                </Button>

                <div className="flex flex-1 gap-2 overflow-x-auto scrollbar-hide">
                    {frames.map((frame, index) => (
                        <button
                            key={frame.id}
                            onClick={() => onFrameSelect(frame.id)}
                            className={cn(
                                'flex shrink-0 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors',
                                selectedFrameId === frame.id
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'border-input bg-background hover:bg-accent',
                            )}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0"
                        >
                            <Menu className="!size-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => {
                                if (selectedFrameId) {
                                    const frame = frames.find(
                                        (f) => f.id === selectedFrameId,
                                    );
                                    if (frame) {
                                        router.delete(
                                            `/projects/${projectId}/frames/${frame.id}`,
                                            { preserveScroll: true },
                                        );
                                    }
                                }
                            }}
                            disabled={!selectedFrameId}
                            className="text-destructive"
                        >
                            <Trash2 className="mr-2 !size-4" />
                            Elimina Frame
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
