import { Frame } from '@/types';

interface WindowFrameProps {
    frame: Frame;
    onPanelClick?: (panelIndex: number) => void;
}

export default function WindowFrame({
    frame,
    onPanelClick,
}: WindowFrameProps) {
    const width = frame.width || 1200;
    const height = frame.height || 1500;
    const frameThickness = 70;
    const glassInset = 10;

    const getNumPanels = (): number => {
        if (frame.frame_type === '1_anta') return 1;
        if (frame.frame_type === '2_ante') return 2;
        if (frame.frame_type === '3_ante') return 3;
        return 1;
    };

    const numPanels = getNumPanels();

    const renderPanel = (
        panelX: number,
        panelY: number,
        panelWidth: number,
        panelHeight: number,
        index: number,
    ) => {
        const innerX = panelX + glassInset;
        const innerY = panelY + glassInset;
        const innerWidth = panelWidth - glassInset * 2;
        const innerHeight = panelHeight - glassInset * 2;

        return (
            <g
                key={index}
                onClick={() => onPanelClick?.(index)}
                className="cursor-pointer transition-opacity hover:opacity-80"
            >
                {/* Frame border */}
                <rect
                    x={panelX}
                    y={panelY}
                    width={panelWidth}
                    height={panelHeight}
                    fill="#E5E5E5"
                    stroke="#737373"
                    strokeWidth="4"
                />

                {/* Inner frame detail */}
                <rect
                    x={panelX + 3}
                    y={panelY + 3}
                    width={panelWidth - 6}
                    height={panelHeight - 6}
                    fill="#D4D4D4"
                    stroke="#A3A3A3"
                    strokeWidth="2"
                />

                {/* Glass */}
                <rect
                    x={innerX}
                    y={innerY}
                    width={innerWidth}
                    height={innerHeight}
                    fill="#B3D9FF"
                    fillOpacity="0.5"
                    stroke="#4A90E2"
                    strokeWidth="2"
                />

                {/* Glass reflection */}
                <rect
                    x={innerX}
                    y={innerY}
                    width={innerWidth}
                    height={innerHeight / 3}
                    fill="url(#glassGradient)"
                    opacity="0.3"
                />

                {/* Opening symbol - cross for battente */}
                {frame.frame_type !== 'finestra_fissa' && (
                    <>
                        <line
                            x1={innerX + innerWidth / 2}
                            y1={innerY}
                            x2={innerX + innerWidth / 2}
                            y2={innerY + innerHeight}
                            stroke="#4A90E2"
                            strokeWidth="2"
                            opacity="0.6"
                        />
                        <line
                            x1={innerX}
                            y1={innerY + innerHeight / 2}
                            x2={innerX + innerWidth}
                            y2={innerY + innerHeight / 2}
                            stroke="#4A90E2"
                            strokeWidth="2"
                            opacity="0.6"
                        />
                        {/* Handle circle */}
                        <circle
                            cx={innerX + innerWidth / 2}
                            cy={innerY + innerHeight / 2}
                            r="20"
                            fill="#4A90E2"
                            opacity="0.3"
                        />
                    </>
                )}
            </g>
        );
    };

    const renderFrame = () => {
        if (numPanels === 1) {
            return renderPanel(0, 0, width, height, 0);
        }

        if (numPanels === 2) {
            const panelWidth = (width - frameThickness) / 2;
            return (
                <>
                    {renderPanel(0, 0, panelWidth, height, 0)}
                    <rect
                        x={panelWidth}
                        y={0}
                        width={frameThickness}
                        height={height}
                        fill="#A3A3A3"
                    />
                    {renderPanel(
                        panelWidth + frameThickness,
                        0,
                        panelWidth,
                        height,
                        1,
                    )}
                </>
            );
        }

        if (numPanels === 3) {
            const sideWidth = 600;
            const centerWidth = width - sideWidth * 2 - frameThickness * 2;

            return (
                <>
                    {renderPanel(0, 0, sideWidth, height, 0)}
                    <rect
                        x={sideWidth}
                        y={0}
                        width={frameThickness}
                        height={height}
                        fill="#A3A3A3"
                    />
                    {renderPanel(
                        sideWidth + frameThickness,
                        0,
                        centerWidth,
                        height,
                        1,
                    )}
                    <rect
                        x={sideWidth + frameThickness + centerWidth}
                        y={0}
                        width={frameThickness}
                        height={height}
                        fill="#A3A3A3"
                    />
                    {renderPanel(
                        sideWidth + frameThickness * 2 + centerWidth,
                        0,
                        sideWidth,
                        height,
                        2,
                    )}
                </>
            );
        }

        return null;
    };

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            className="max-h-full max-w-full drop-shadow-2xl"
        >
            <defs>
                <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#FFFFFF', stopOpacity: 0 }} />
                </linearGradient>
            </defs>
            {renderFrame()}
        </svg>
    );
}
