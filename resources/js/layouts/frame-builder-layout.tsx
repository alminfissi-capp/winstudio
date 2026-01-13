import { ReactNode } from 'react';
import { Head } from '@inertiajs/react';

interface FrameBuilderLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function FrameBuilderLayout({
    children,
    title = 'Frame Builder',
}: FrameBuilderLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="flex min-h-screen w-full flex-col bg-background">
                <main className="flex flex-1 flex-col">{children}</main>
            </div>
        </>
    );
}
