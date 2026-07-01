const COLORS = [
    "bg-rose-500", "bg-orange-500", "bg-amber-500", "bg-lime-500",
    "bg-emerald-500", "bg-teal-500", "bg-sky-500", "bg-indigo-500",
    "bg-violet-500", "bg-fuchsia-500",
];

function colorForUsername(username: string) {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = (hash * 31 + username.charCodeAt(i)) | 0;
    }
    return COLORS[Math.abs(hash) % COLORS.length];
}

type Props = {
    username: string;
    size?: "sm" | "md";
};

export default function Avatar({ username, size = "md" }: Props) {
    const dimension = size === "sm" ? "w-6 h-6 text-xs" : "w-10 h-10 text-base";

    return (
        <div
            className={`${dimension} ${colorForUsername(username)} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}
        >
            {username.charAt(0).toUpperCase()}
        </div>
    );
}
