import Link from "next/link";
import type { Anime } from "@/anime/anime";

type Props = {
    results: Anime[],
};

export default function SearchResults({ results }: Props) {
    return (
        <ul className="bg-slate-900">
            {results.map((anime) => (
                <li key={anime.id} className="hover:bg-slate-800">
                    <Link href={`/anime/${anime.id}`} className="block p-2 hover:text-sky-400">
                        {anime.title}
                    </Link>
                </li>
            ))}
        </ul>
    )
}