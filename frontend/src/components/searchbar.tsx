"use client";

import { useState } from "react";
import type { Anime } from "@/anime/anime";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Anime[]>([]);

    async function handleSearch() {
        const res = await fetch(
            `http://localhost:3001/search?q=${query}`
        );

        const data = await res.json();
        setResults(data);
    }

    return (
        <div>
            <input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anime..."
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((anime) => (
                    <li key={anime.id}>{anime.title}</li>
                ))}
            </ul>
        </div>
    );
}