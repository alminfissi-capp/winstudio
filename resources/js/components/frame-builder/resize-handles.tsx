import { useState, useRef, useEffect } from 'react';

interface ResizeHandlesProps {
    width: number;
    height: number;
    onResize: (width: number, height: number) => void;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    scale?: number;
}

export default function ResizeHandles({
    width,
    height,
    onResize,
    minWidth = 400,
    maxWidth = 4000,
    minHeight = 600,
    maxHeight = 3000,
    scale = 1,
}: ResizeHandlesProps) {
    const [isDragging, setIsDragging] = useState<
        'width' | 'height' | 'both' | null
    >(null);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current || !isDragging) return;

            const deltaX = (e.clientX - dragStart.x) / scale;
            const deltaY = (e.clientY - dragStart.y) / scale;

            let newWidth = initialSize.width;
            let newHeight = initialSize.height;

            if (isDragging === 'width' || isDragging === 'both') {
                newWidth = Math.max(
                    minWidth,
                    Math.min(maxWidth, initialSize.width + deltaX * 2),
                );
            }

            if (isDragging === 'height' || isDragging === 'both') {
                newHeight = Math.max(
                    minHeight,
                    Math.min(maxHeight, initialSize.height + deltaY * 2),
                );
            }

            onResize(Math.round(newWidth), Math.round(newHeight));
        };

        const handleMouseUp = () => {
            setIsDragging(null);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [
        isDragging,
        dragStart,
        initialSize,
        onResize,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        scale,
    ]);

    const handleMouseDown = (
        type: 'width' | 'height' | 'both',
        e: React.MouseEvent,
    ) => {
        e.preventDefault();
        setIsDragging(type);
        setDragStart({ x: e.clientX, y: e.clientY });
        setInitialSize({ width, height });
    };

    const handleSize = Math.max(40, 40 / scale);
    const labelOffset = Math.max(50, 50 / scale);

    return (
        <div
            ref={containerRef}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
            {/* Width handle - right */}
            <div
                className="pointer-events-auto absolute right-0 top-1/2 flex -translate-y-1/2 cursor-ew-resize items-center"
                onMouseDown={(e) => handleMouseDown('width', e)}
                style={{ transform: `translateY(-50%) scale(${1 / scale})`, transformOrigin: 'left center' }}
            >
                <div className="flex h-20 w-12 items-center justify-center rounded-l-xl bg-blue-500/90 shadow-xl transition-all hover:bg-blue-600 hover:scale-110">
                    <div className="flex flex-col gap-1">
                        <div className="h-1 w-5 rounded-full bg-white" />
                        <div className="h-1 w-5 rounded-full bg-white" />
                        <div className="h-1 w-5 rounded-full bg-white" />
                    </div>
                </div>
            </div>

            {/* Height handle - bottom */}
            <div
                className="pointer-events-auto absolute bottom-0 left-1/2 flex -translate-x-1/2 cursor-ns-resize items-center"
                onMouseDown={(e) => handleMouseDown('height', e)}
                style={{ transform: `translateX(-50%) scale(${1 / scale})`, transformOrigin: 'center top' }}
            >
                <div className="flex h-12 w-20 items-center justify-center rounded-t-xl bg-blue-500/90 shadow-xl transition-all hover:bg-blue-600 hover:scale-110">
                    <div className="flex gap-1">
                        <div className="h-5 w-1 rounded-full bg-white" />
                        <div className="h-5 w-1 rounded-full bg-white" />
                        <div className="h-5 w-1 rounded-full bg-white" />
                    </div>
                </div>
            </div>

            {/* Corner handle - bottom-right */}
            <div
                className="pointer-events-auto absolute bottom-0 right-0 cursor-nwse-resize"
                onMouseDown={(e) => handleMouseDown('both', e)}
                style={{ transform: `scale(${1 / scale})`, transformOrigin: 'bottom right' }}
            >
                <div className="flex size-14 items-center justify-center rounded-tl-xl bg-blue-500/90 shadow-xl transition-all hover:bg-blue-600 hover:scale-110">
                    <svg
                        className="size-7 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                    </svg>
                </div>
            </div>

            {/* Dimension labels */}
            <div
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-lg bg-gray-900/90 px-4 py-2 text-base font-bold text-white shadow-xl"
                style={{
                    bottom: `-${labelOffset}px`,
                    transform: `translateX(-50%) scale(${1 / scale})`,
                    transformOrigin: 'center top'
                }}
            >
                {width} mm
            </div>
            <div
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-lg bg-gray-900/90 px-4 py-2 text-base font-bold text-white shadow-xl"
                style={{
                    right: `-${labelOffset + 30}px`,
                    transform: `translateY(-50%) scale(${1 / scale})`,
                    transformOrigin: 'left center'
                }}
            >
                {height} mm
            </div>
        </div>
    );
}
