import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings } from 'lucide-react';
import { Project } from '@/types';

interface FrameBuilderHeaderProps {
    project: Project;
}

export default function FrameBuilderHeader({
    project,
}: FrameBuilderHeaderProps) {
    return (
        <header className="sticky top-0 z-10 border-b border-sidebar-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="flex h-14 items-center gap-3 px-4">
                <Link href="/projects">
                    <Button variant="ghost" size="icon" className="shrink-0">
                        <ArrowLeft className="!size-5" />
                    </Button>
                </Link>

                <h1 className="flex-1 truncate text-lg font-semibold">
                    {project.name}
                </h1>

                <Button variant="ghost" size="icon" className="shrink-0">
                    <Settings className="!size-5" />
                </Button>
            </div>
        </header>
    );
}
