interface PresetIconProps {
    code: string;
    className?: string;
}

export default function PresetIcon({ code, className = '' }: PresetIconProps) {
    const baseClasses = 'text-gray-600';
    const combinedClasses = `${baseClasses} ${className}`;

    if (code === '1_anta') {
        return (
            <svg
                viewBox="0 0 100 100"
                className={combinedClasses}
                fill="none"
                stroke="currentColor"
            >
                <rect
                    x="10"
                    y="10"
                    width="80"
                    height="80"
                    strokeWidth="3"
                    fill="#E5E5E5"
                />
                <rect
                    x="15"
                    y="15"
                    width="70"
                    height="70"
                    strokeWidth="2"
                    fill="#B3D9FF"
                    opacity="0.4"
                />
                <line x1="50" y1="15" x2="50" y2="85" strokeWidth="1.5" />
                <line x1="15" y1="50" x2="85" y2="50" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="8" fill="currentColor" />
                <text
                    x="50"
                    y="97"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                    fill="currentColor"
                >
                    1
                </text>
            </svg>
        );
    }

    if (code === '2_ante') {
        return (
            <svg
                viewBox="0 0 100 100"
                className={combinedClasses}
                fill="none"
                stroke="currentColor"
            >
                <rect
                    x="5"
                    y="10"
                    width="40"
                    height="80"
                    strokeWidth="3"
                    fill="#E5E5E5"
                />
                <rect
                    x="10"
                    y="15"
                    width="30"
                    height="70"
                    strokeWidth="2"
                    fill="#B3D9FF"
                    opacity="0.4"
                />
                <line x1="25" y1="15" x2="25" y2="85" strokeWidth="1.5" />
                <line x1="10" y1="50" x2="40" y2="50" strokeWidth="1.5" />
                <circle cx="25" cy="50" r="6" fill="currentColor" />

                <rect
                    x="55"
                    y="10"
                    width="40"
                    height="80"
                    strokeWidth="3"
                    fill="#E5E5E5"
                />
                <rect
                    x="60"
                    y="15"
                    width="30"
                    height="70"
                    strokeWidth="2"
                    fill="#B3D9FF"
                    opacity="0.4"
                />
                <line x1="75" y1="15" x2="75" y2="85" strokeWidth="1.5" />
                <line x1="60" y1="50" x2="90" y2="50" strokeWidth="1.5" />
                <circle cx="75" cy="50" r="6" fill="currentColor" />

                <rect
                    x="45"
                    y="10"
                    width="10"
                    height="80"
                    fill="#A3A3A3"
                    strokeWidth="0"
                />
                <text
                    x="50"
                    y="97"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                    fill="currentColor"
                >
                    2
                </text>
            </svg>
        );
    }

    if (code === '3_ante') {
        return (
            <svg
                viewBox="0 0 120 100"
                className={combinedClasses}
                fill="none"
                stroke="currentColor"
            >
                <rect
                    x="5"
                    y="10"
                    width="25"
                    height="80"
                    strokeWidth="2"
                    fill="#E5E5E5"
                />
                <rect
                    x="8"
                    y="13"
                    width="19"
                    height="74"
                    strokeWidth="1"
                    fill="#B3D9FF"
                    opacity="0.4"
                />
                <line x1="17" y1="13" x2="17" y2="87" strokeWidth="1" />
                <line x1="8" y1="50" x2="27" y2="50" strokeWidth="1" />
                <circle cx="17" cy="50" r="4" fill="currentColor" />

                <rect
                    x="42"
                    y="10"
                    width="36"
                    height="80"
                    strokeWidth="2"
                    fill="#E5E5E5"
                />
                <rect
                    x="45"
                    y="13"
                    width="30"
                    height="74"
                    strokeWidth="1"
                    fill="#B3D9FF"
                    opacity="0.4"
                />
                <line x1="60" y1="13" x2="60" y2="87" strokeWidth="1" />
                <line x1="45" y1="50" x2="75" y2="50" strokeWidth="1" />
                <circle cx="60" cy="50" r="5" fill="currentColor" />

                <rect
                    x="90"
                    y="10"
                    width="25"
                    height="80"
                    strokeWidth="2"
                    fill="#E5E5E5"
                />
                <rect
                    x="93"
                    y="13"
                    width="19"
                    height="74"
                    strokeWidth="1"
                    fill="#B3D9FF"
                    opacity="0.4"
                />
                <line x1="102" y1="13" x2="102" y2="87" strokeWidth="1" />
                <line x1="93" y1="50" x2="112" y2="50" strokeWidth="1" />
                <circle cx="102" cy="50" r="4" fill="currentColor" />

                <rect
                    x="30"
                    y="10"
                    width="12"
                    height="80"
                    fill="#A3A3A3"
                    strokeWidth="0"
                />
                <rect
                    x="78"
                    y="10"
                    width="12"
                    height="80"
                    fill="#A3A3A3"
                    strokeWidth="0"
                />
                <text
                    x="60"
                    y="97"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                    fill="currentColor"
                >
                    3
                </text>
            </svg>
        );
    }

    if (code === 'finestra_fissa') {
        return (
            <svg
                viewBox="0 0 100 100"
                className={combinedClasses}
                fill="none"
                stroke="currentColor"
            >
                <rect
                    x="10"
                    y="10"
                    width="80"
                    height="80"
                    strokeWidth="3"
                    fill="#E5E5E5"
                />
                <rect
                    x="15"
                    y="15"
                    width="70"
                    height="70"
                    strokeWidth="2"
                    fill="#B3D9FF"
                    opacity="0.4"
                />
            </svg>
        );
    }

    return (
        <div className="flex size-16 items-center justify-center text-xs text-muted-foreground">
            Icon
        </div>
    );
}
