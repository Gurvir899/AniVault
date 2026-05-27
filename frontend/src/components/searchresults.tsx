import Link from "next/link";
import type { Anime } from "@/anime/anime";

type Props = {
    results: Anime[],
};

export default function SearchResults({ results }: Props) {
    return (
        <ul className="bg-white">
            {results.map((anime) => (
                <li key={anime.id} className="flex items-center gap-3 hover:bg-slate-100">
                    <img src={anime.cover.medium} className="w-14 h-20 object-cover flex-shrink-0"/>
                    <Link href={`/anime/${anime.id}`} className="block p-2 hover:text-sky-500">
                        {anime.title.english || anime.title.romaji || anime.title.native}
                    </Link>
                </li>
            ))}
        </ul>
    )
}