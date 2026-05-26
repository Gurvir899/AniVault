import searchAnime from "@/api/search";
import type { Anime } from "@/anime/anime";
import Link from "next/link";

export default async function searchPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const params = await searchParams;

    const query = typeof params.q === "string" ? params.q : "";

    if (!query) {
        return <p className="px-6 py-8 text-slate-400">Enter a search query.</p>;
    }

    try {
        const results = await searchAnime(query);

        return (
            <div className="px-6 py-8">
                <h1 className="text-xl font-semibold mb-4 text-slate-200">Search results for "{query}"</h1>

                {results.length === 0 ? (
                    <p className="text-slate-400">No results found</p>
                ) : (
                    <ul>
                        {results.map((anime: Anime) => (
                            <li key={anime.id} className="border-b border-slate-800 hover:bg-slate-900">
                                <Link href={`/anime/${anime.id}`} className="block py-3 px-2 text-slate-200 hover:text-sky-400">
                                    {anime.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    } catch (err) {
        return <h1>Something went wrong</h1>;
    }
}