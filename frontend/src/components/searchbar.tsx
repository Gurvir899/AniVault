"use client";

import { useState, useEffect, useRef } from "react";
import type { Anime } from "@/anime/anime";
import searchAnime from "@/api/search-client";
import type { SubmitEvent } from "react";
import SearchResults from "./searchresults";
import { useRouter, usePathname } from "next/navigation";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Anime[]>([]);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [error, setError] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    function unfocus() {
        inputRef.current?.blur();
        setIsFocused(false);
    }

    async function handleSearchValue(value: string) {
        setStatus("loading");
        setError("");

        try {
            const data = await searchAnime(value);
            setResults(data);
            setStatus("success");
        } catch (err) {
            setStatus("error");
            setError("Something went wrong");
        }
    }

    //remove focus when user clicks outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsFocused(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    //remove focus from searchbar and clear when path changes
    useEffect(() => {
        setIsFocused(false);
        setQuery("");
        setStatus("idle");
    }, [pathname]);

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

    const showDropdown = query.length > 0 && isFocused;

    return (
        <div ref={containerRef} className="relative w-full">
            <form className="flex gap-2" onSubmit={(event) => {handleSearch(event); unfocus();}}>
                <input
                    ref={inputRef}
                    onFocus={() => setIsFocused(true)}
                    className="flex-1 border border-slate-300 bg-white text-black px-4 py-3 outline-none focus:border-slate-500 rounded-none placeholder:text-slate-400"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search anime..."
                />
                <button
                    className="bg-sky-500 text-black px-4 py-2"
                    disabled={status === "loading"}
                    type="submit"
                >
                    Search
                </button>
            </form>
            {showDropdown && (
                <div className="absolute left-0 top-full mt-2 w-full z-10 bg-white border border-slate-300">
                    {((status === "loading") || (status === "idle")) && (
                        <div className="p-3 text-slate-400">Searching...</div>
                    )}

                    {status === "error" && (
                        <div className="p-3 text-red-400">{error}</div>
                    )}

                    {status === "success" && results.length === 0 && (
                        <div className="p-3 text-slate-400">No results found</div>
                    )}

                    {status === "success" && results.length > 0 && (
                        <SearchResults results={results} />
                    )}
                </div>
            )}
        </div>
    );
}