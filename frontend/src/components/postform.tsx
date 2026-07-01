"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
    animeId: number;
    animeTitle: string;
    animeCoverUrl: string | null;
};

export default function PostForm({ animeId, animeTitle, animeCoverUrl }: Props) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, body, animeId, animeTitle, animeCoverUrl }),
            });

            if (!res.ok) {
                setError("Something went wrong.");
                return;
            }

            setTitle("");
            setBody("");
            router.refresh();
        } catch {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 border border-slate-200 p-4">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                required
            />
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="What's on your mind about this anime?"
                rows={3}
                className="border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                type="submit"
                disabled={loading}
                className="self-start bg-sky-500 text-white px-4 py-2 text-sm hover:bg-sky-400 disabled:opacity-50"
            >
                {loading ? "Posting..." : "Post"}
            </button>
        </form>
    );
}
