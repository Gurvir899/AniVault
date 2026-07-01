"use client";

import { useState } from "react";
import PostCard from "@/components/postcard";
import type { Post } from "@/anime/post";

type Props = {
    posts: Post[];
    isOwner: boolean;
};

export default function ProfileTabs({ posts, isOwner }: Props) {
    const [tab, setTab] = useState<"posts" | "settings">("posts");

    return (
        <div>
            <div className="flex gap-4 border-b border-slate-200 mb-4">
                <button
                    onClick={() => setTab("posts")}
                    className={`pb-2 text-sm ${tab === "posts" ? "border-b-2 border-sky-500 text-sky-500" : "text-slate-500"}`}
                >
                    Posts
                </button>
                {isOwner && (
                    <button
                        onClick={() => setTab("settings")}
                        className={`pb-2 text-sm ${tab === "settings" ? "border-b-2 border-sky-500 text-sky-500" : "text-slate-500"}`}
                    >
                        Settings
                    </button>
                )}
            </div>

            {tab === "posts" && (
                posts.length === 0 ? (
                    <p className="text-sm text-slate-400">No posts yet.</p>
                ) : (
                    <ul className="flex flex-col gap-3">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} showAnime />
                        ))}
                    </ul>
                )
            )}

            {tab === "settings" && isOwner && (
                <form action="/api/auth/logout" method="POST">
                    <button
                        type="submit"
                        className="border border-slate-300 text-slate-600 py-2 px-4 text-sm hover:bg-slate-50"
                    >
                        Sign out
                    </button>
                </form>
            )}
        </div>
    );
}
