import { useState, useEffect } from 'react';
import { Frame } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import NumericKeypad from './numeric-keypad';
import { Ruler } from 'lucide-react';

interface FrameBuilderCanvasProps {
    frame: Frame | undefined;
    onDimensionChange: (width: number, height: number) => void;
}

export default function FrameBuilderCanvas({
    frame,
    onDimensionChange,
}: FrameBuilderCanvasProps) {
    const [keypadOpen, setKeypadOpen] = useState(false);
    const [keypadType, setKeypadType] = useState<'width' | 'height'>('width');
    const [dragging, setDragging] = useState<'width' | 'height' | null>(null);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

    const handleDimensionClick = (type: 'width' | 'height') => {
        setKeypadType(type);
        setKeypadOpen(true);
    };

    const handleKeypadConfirm = (value: number) => {
        if (keypadType === 'width' && frame) {
            onDimensionChange(value, frame.height || 1500);
        } else if (keypadType === 'height' && frame) {
            onDimensionChange(frame.width || 1200, value);
        }
    };

    const handleMouseDown = (type: 'width' | 'height', e: React.MouseEvent) => {
        if (!frame) return;
        e.preventDefault();
        setDragging(type);
        setDragStart({
            x: e.clientX,
            y: e.clientY,
            width: frame.width || 1200,
            height: frame.height || 1500,
        });
    };

    useEffect(() => {
        if (!dragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - dragStart.x;
            const deltaY = e.clientY - dragStart.y;

            if (dragging === 'width') {
                const newWidth = Math.max(400, Math.min(4000, dragStart.width + deltaX * 3));
                onDimensionChange(Math.round(newWidth), dragStart.height);
            } else {
                const newHeight = Math.max(600, Math.min(3000, dragStart.height + deltaY * 3));
                onDimensionChange(dragStart.width, Math.round(newHeight));
            }
        };

        const handleMouseUp = () => {
            setDragging(null);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging, dragStart, onDimensionChange]);

    if (!frame) {
        return (
            <div className="flex flex-1 items-center justify-center bg-gray-50 p-6">
                <div className="text-center">
                    <p className="text-muted-foreground">
                        Nessun frame selezionato
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Clicca sul pulsante + per aggiungere un frame
                    </p>
                </div>
            </div>
        );
    }

    const width = frame.width || 1200;
    const height = frame.height || 1500;

    // Rendering ottimizzato con scala fissa
    const displayScale = 0.25; // 1mm = 0.25px
    const displayWidth = width * displayScale;
    const displayHeight = height * displayScale;

    const getNumPanels = () => {
        if (frame.frame_type === '1_anta' || frame.frame_type === 'finestra_fissa') return 1;
        if (frame.frame_type === '2_ante') return 2;
        if (frame.frame_type === '3_ante') return 3;
        // Fallback per preset di apertura (battente, scorrevole, etc)
        return 1;
    };

    const getFrameTypeName = () => {
        if (frame.frame_type === '1_anta') return '1 Anta';
        if (frame.frame_type === '2_ante') return '2 Ante';
        if (frame.frame_type === '3_ante') return '3 Ante';
        if (frame.frame_type === 'finestra_fissa') return 'Finestra Fissa';
        // Fallback mostra il codice formattato
        return frame.frame_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const numPanels = getNumPanels();
    const frameThickness = 15;
    const glassColor = '#B3D9FF';

    return (
        <>
            <div className="relative flex flex-1 flex-col overflow-hidden bg-gray-50">
                {/* Header con info */}
                <div className="border-b bg-white px-6 py-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-900">
                                {getFrameTypeName()}
                            </h3>
                            {frame.surface_area && (
                                <p className="text-sm text-gray-500">
                                    Superficie: {Number(frame.surface_area).toFixed(2)} m²
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <Ruler className="!size-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                                {width} × {height} mm
                            </span>
                        </div>
                    </div>
                </div>

                {/* Canvas */}
                <div className="flex flex-1 items-center justify-center p-8">
                    <Card className="relative border-2 bg-white p-8 shadow-xl">
                        <svg
                            width={displayWidth}
                            height={displayHeight}
                            className="drop-shadow-lg"
                        >
                            <defs>
                                <linearGradient id="glass" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor={glassColor} stopOpacity="0.6" />
                                </linearGradient>
                            </defs>

                            {numPanels === 1 && (
                                <g>
                                    <rect width={displayWidth} height={displayHeight} fill="#E0E0E0" stroke="#999" strokeWidth="3" />
                                    <rect x="5" y="5" width={displayWidth - 10} height={displayHeight - 10} fill="url(#glass)" stroke="#4A90E2" strokeWidth="2" />
                                    <line x1={displayWidth / 2} y1="5" x2={displayWidth / 2} y2={displayHeight - 5} stroke="#4A90E2" strokeWidth="1.5" opacity="0.5" />
                                    <line x1="5" y1={displayHeight / 2} x2={displayWidth - 5} y2={displayHeight / 2} stroke="#4A90E2" strokeWidth="1.5" opacity="0.5" />
                                    <circle cx={displayWidth / 2} cy={displayHeight / 2} r="6" fill="#4A90E2" opacity="0.7" />
                                </g>
                            )}

                            {numPanels === 2 && (
                                <g>
                                    {/* Pannello sinistro */}
                                    <rect width={displayWidth / 2 - frameThickness / 2} height={displayHeight} fill="#E0E0E0" stroke="#999" strokeWidth="3" />
                                    <rect x="5" y="5" width={displayWidth / 2 - frameThickness / 2 - 10} height={displayHeight - 10} fill="url(#glass)" stroke="#4A90E2" strokeWidth="2" />

                                    {/* Montante centrale */}
                                    <rect x={displayWidth / 2 - frameThickness / 2} width={frameThickness} height={displayHeight} fill="#999" />

                                    {/* Pannello destro */}
                                    <rect x={displayWidth / 2 + frameThickness / 2} width={displayWidth / 2 - frameThickness / 2} height={displayHeight} fill="#E0E0E0" stroke="#999" strokeWidth="3" />
                                    <rect x={displayWidth / 2 + frameThickness / 2 + 5} y="5" width={displayWidth / 2 - frameThickness / 2 - 10} height={displayHeight - 10} fill="url(#glass)" stroke="#4A90E2" strokeWidth="2" />
                                </g>
                            )}

                            {numPanels === 3 && (
                                <g>
                                    {/* Pannello sinistro */}
                                    <rect width={displayWidth / 3 - frameThickness} height={displayHeight} fill="#E0E0E0" stroke="#999" strokeWidth="3" />
                                    <rect x="5" y="5" width={displayWidth / 3 - frameThickness - 10} height={displayHeight - 10} fill="url(#glass)" stroke="#4A90E2" strokeWidth="2" />

                                    {/* Montante 1 */}
                                    <rect x={displayWidth / 3 - frameThickness} width={frameThickness} height={displayHeight} fill="#999" />

                                    {/* Pannello centrale */}
                                    <rect x={displayWidth / 3} width={displayWidth / 3} height={displayHeight} fill="#E0E0E0" stroke="#999" strokeWidth="3" />
                                    <rect x={displayWidth / 3 + 5} y="5" width={displayWidth / 3 - 10} height={displayHeight - 10} fill="url(#glass)" stroke="#4A90E2" strokeWidth="2" />

                                    {/* Montante 2 */}
                                    <rect x={displayWidth * 2 / 3} width={frameThickness} height={displayHeight} fill="#999" />

                                    {/* Pannello destro */}
                                    <rect x={displayWidth * 2 / 3 + frameThickness} width={displayWidth / 3 - frameThickness} height={displayHeight} fill="#E0E0E0" stroke="#999" strokeWidth="3" />
                                    <rect x={displayWidth * 2 / 3 + frameThickness + 5} y="5" width={displayWidth / 3 - frameThickness - 10} height={displayHeight - 10} fill="url(#glass)" stroke="#4A90E2" strokeWidth="2" />
                                </g>
                            )}
                        </svg>

                        {/* Dimension handles */}
                        <div
                            className="absolute -right-12 top-1/2 flex -translate-y-1/2 cursor-ns-resize flex-col items-center gap-2"
                            onMouseDown={(e) => handleMouseDown('height', e)}
                        >
                            <div className="flex h-24 w-10 items-center justify-center rounded-lg bg-blue-500 shadow-lg transition-all hover:bg-blue-600 hover:scale-110">
                                <div className="flex flex-col gap-1">
                                    <div className="h-1 w-6 rounded-full bg-white" />
                                    <div className="h-1 w-6 rounded-full bg-white" />
                                    <div className="h-1 w-6 rounded-full bg-white" />
                                </div>
                            </div>
                            <span className="rounded-md bg-gray-900 px-3 py-1 text-sm font-bold text-white">
                                {height}
                            </span>
                        </div>

                        <div
                            className="absolute -bottom-12 left-1/2 flex -translate-x-1/2 cursor-ew-resize items-center gap-2"
                            onMouseDown={(e) => handleMouseDown('width', e)}
                        >
                            <div className="flex h-10 w-24 items-center justify-center rounded-lg bg-blue-500 shadow-lg transition-all hover:bg-blue-600 hover:scale-110">
                                <div className="flex gap-1">
                                    <div className="h-6 w-1 rounded-full bg-white" />
                                    <div className="h-6 w-1 rounded-full bg-white" />
                                    <div className="h-6 w-1 rounded-full bg-white" />
                                </div>
                            </div>
                            <span className="rounded-md bg-gray-900 px-3 py-1 text-sm font-bold text-white">
                                {width}
                            </span>
                        </div>
                    </Card>
                </div>

                {/* Quick actions */}
                <div className="border-t bg-white px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => handleDimensionClick('width')}
                        >
                            Larghezza: {width} mm
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => handleDimensionClick('height')}
                        >
                            Altezza: {height} mm
                        </Button>
                    </div>
                </div>
            </div>

            <NumericKeypad
                isOpen={keypadOpen}
                onClose={() => setKeypadOpen(false)}
                title={
                    keypadType === 'width'
                        ? 'Inserisci Larghezza'
                        : 'Inserisci Altezza'
                }
                initialValue={keypadType === 'width' ? width : height}
                onConfirm={handleKeypadConfirm}
                min={keypadType === 'width' ? 400 : 600}
                max={keypadType === 'width' ? 4000 : 3000}
            />
        </>
    );
}
