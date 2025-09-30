const COLORS = [
    "#0C54F2", // Electric Blue
    "#7569F8", // Purple
    "#FFCE00", // Yellow
    "#FE9900", // Orange
];

function getColorFromName(name) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const hash = Array.from(initials).reduce(
        (acc, char) => acc + char.charCodeAt(0),
        0
    );

    return {
        initials,
        color: COLORS[hash % COLORS.length],
    };
}

export function GenerateRandoColorsAvatar({ name, size = 80 }) {
    const { initials, color } = getColorFromName(name);

    return (
        <div
            className="rounded-full flex items-center justify-center font-semibold uppercase select-none flex-shrink-0"
            style={{
                backgroundColor: color,
                color: "#fff",
                width: `${size}px`,
                height: `${size}px`,
                fontSize: `${size / 2}px`,
            }}
        >
            {initials}
        </div>
    );
}

export function GenerateAvatar({ name, size = 80 }) {
    const { initials, color } = getColorFromName(name);

    return (
        <div
            className="rounded-full flex items-center justify-center font-semibold uppercase select-none flex-shrink-0"
            style={{
                backgroundColor: color,
                color: "#fff",
                width: `${size}px`,
                height: `${size}px`,
                fontSize: `${size / 2}px`,
            }}
        >
            {initials}
        </div>
    );
}
