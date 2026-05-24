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
        return <h1>Enter a search query</h1>;
    }

    try {
        const results = await searchAnime(query);

        return (
            <div>
                <h1>Search results for "{query}"</h1>

                {results.length === 0 ? (
                    <p>No results found</p>
                ) : (
                    <ul>
                        {results.map((anime: Anime) => (
                            <li key={anime.id}>
                                <Link href={`/anime/${anime.id}`} className="block py-2 hover:underline">
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