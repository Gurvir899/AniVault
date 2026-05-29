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
        return <p className="px-6 py-8 text-slate-500">Enter a search query.</p>;
    }

    try {
        const results = await searchAnime(query);

        return (
            <div className="px-24 py-8">
                <h1 className="text-xl font-semibold mb-6 text-slate-800">Search results for "{query}"</h1>
                <ul className="grid grid-cols-5 gap-6">
                    {results.map((anime: Anime) => (
                        <li key={anime.id} className="flex flex-col items-center hover:bg-slate-100">
                            <Link href={`/anime/${anime.id}`} className="block text-slate-800 hover:text-sky-500">
                                {anime.cover.extraLarge && (
                                    <img src={anime.cover.extraLarge} className="w-48 h-72 object-cover"/>
                                )}
                                <p className="text-sm py-2 px-1 truncate w-48">
                                    {anime.title.english || anime.title.romaji || anime.title.native || "Unknown title"}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } catch (err) {
        return <h1 className="px-6 py-8 text-slate-500">Something went wrong.</h1>
    }
}