import Link from "next/link";
import type { Anime } from "@/anime/anime";

type Props = {
    results: Anime[],
};

export default function SearchResults({ results }: Props) {
    return (
        <ul className="bg-zinc-900 border border-zinc-700 rounded-lg">
            {results.map((anime) => (
                <li key={anime.id} className="p-2 hover:bg-zinc-800">
                    <Link href={`/anime/${anime.id}`} className="block p-2 hover:bg-zinc-800">
                        {anime.title}
                    </Link>
                </li>
            ))}
        </ul>
    )
}