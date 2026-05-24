"use client";

import { useState, useEffect } from "react";
import type { Anime } from "@/anime/anime";
import searchAnime from "@/api/search";
import type { SubmitEvent } from "react";
import SearchResults from "./searchresults";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Anime[]>([]);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [error, setError] = useState("");

    const router = useRouter();

    async function handleSearchValue(value: string) {
        setStatus("loading");
        setError("");

        try {
            const data = await searchAnime(query);
            setResults(data);
            setStatus("success");
        } catch (err) {
            setStatus("error");
            setError("Something went wrong");
        }
    }

    //if user deletes query completely, reset to default state
    useEffect(() => {
        if (query.length === 0) {
            setStatus("idle");
            setError("");
            setResults([]);
        }
    }, [query]);

    async function handleSearch(event: SubmitEvent) {
        event.preventDefault();
        router.push(`/search?q=${encodeURIComponent(query)}`);
    }

    //debounce for live updates
    useEffect(() => {
        if (!query) return;

        const handler = setTimeout(() => {
            handleSearchValue(query);
        }, 400);

        return () => clearTimeout(handler);
    }, [query]);

    const showDropdown = query.length > 0;

    return (
        <div className="relative w-full">
            <form className="flex gap-2" onSubmit={handleSearch}>
                <input
                    className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search anime..."
                />
                <button
                    className="rounded-lg bg-white text-black px-4 py-2"
                    disabled={status === "loading"}
                    type="submit"
                >
                    Search
                </button>
            </form>
            {showDropdown && (
                <div className="absolute left-0 top-full mt-2 w-full z-10 bg-zinc-900 border border-zinc-700 rounded-lg">
                    {status === "idle" && (
                        <div className="p-3 text-zinc-500">Start typing to search...</div>
                    )}

                    {status === "loading" && (
                        <div className="p-3 text-zinc-400">Searching...</div>
                    )}

                    {status === "error" && (
                        <div className="p-3 text-red-400">{error}</div>
                    )}

                    {status === "success" && results.length === 0 && (
                        <div className="p-3 text-zinc-400">No results found</div>
                    )}

                    {status === "success" && results.length > 0 && (
                        <SearchResults results={results} />
                    )}
                </div>
            )}
        </div>
    );
}