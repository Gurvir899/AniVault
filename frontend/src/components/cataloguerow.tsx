"use client"

import { useRef } from "react"
import Link from "next/link"
import type { Anime } from "@/anime/anime"

type Props = {
    animes: Anime[];
};

export default function CatalogueRow({ animes }: Props) {
    const ref = useRef<HTMLUListElement>(null);

    function scrollLeft() {
        ref.current?.scrollBy({ left: -200, behavior: "smooth" });
    }

    function scrollRight() {
        ref.current?.scrollBy({ left: 200, behavior: "smooth"});
    }

    return(
        <div className="flex items-center gap-2">
            <button onClick={scrollLeft} className="flex-shrink-0 bg-sky-500 text-white border border-sky-500 px-1.5 sm:px-2 py-3 sm:py-4 hover:bg-sky-400">‹</button>

            <ul ref={ref} className="catalogue-scroll flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory flex-1">
                {animes.map((anime: Anime) => (
                    <li key={anime.id} className="flex-shrink-0 w-32 lg:w-48 snap-start hover:bg-slate-100">
                        <Link href={`/anime/${anime.id}`} className="block text-slate-800 hover:text-sky-500">
                            {anime.cover.extraLarge && (
                                <img src={anime.cover.extraLarge} className="w-32 lg:w-48 h-48 lg:h-72 object-cover"/>
                            )}
                            <p className="text-xs lg:text-sm py-2 px-1 truncate">
                                {anime.title.english || anime.title.romaji || anime.title.native || "Unknown title"}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>

            <button onClick={scrollRight} className="flex-shrink-0 bg-sky-500 text-white border border-sky-500 px-1.5 sm:px-2 py-3 sm:py-4 hover:bg-sky-400">›</button>
        </div>
    )
}