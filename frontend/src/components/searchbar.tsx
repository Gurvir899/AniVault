"use client";

import { useState } from "react";
import type { Anime } from "@/anime/anime";
import searchAnime from "@/api/search";
import type { SubmitEvent } from "react";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Anime[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false)
    const [error, setError] = useState("");

    async function handleSearch(event: SubmitEvent) {
        event.preventDefault();
        setHasSearched(true);
        setLoading(true);
        setError("");

        try {
            const data = await searchAnime(query);
            setResults(data);
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSearch}>
            <input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anime..."
            />
            <button type="submit" disabled={loading}>Search</button>
            {loading && <p>Searching...</p>}
            {results.length === 0 && !loading && hasSearched && <p>No Results</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {results.map((anime) => (
                    <li key={anime.id}>{anime.title}</li>
                ))}
            </ul>
        </form>
    );
}