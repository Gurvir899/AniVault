import getDetailsById from "@/api/details";
import DOMPurify from "isomorphic-dompurify";

export default async function AnimePage({
    params,
}: {
    params: Promise<{id: string}>;
}) {
    const {id} = await params;

    try {
        const anime = await getDetailsById(id);
        if (!anime) {
            return <h1 className="px-6 py-8 text-slate-500">Anime not found.</h1>
        }

        return (
                <div>
                    {anime.banner && (
                        <img src={anime.banner} className="w-full object-cover mb-6"/>
                    )}
                    <div className="px-4 lg:px-12 py-8">
                        <img src={anime.cover.large} className="w-32 sm:w-48 h-56 sm:h-72 object-cover float-left mr-6 mb-2"/>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                                {anime.title.english || anime.title.romaji || anime.title.native}
                            </h1>
                            {anime.title.romaji && (
                                <p className="text-slate-500 text-sm">{anime.title.romaji}</p>
                            )}
                            <div className="flex gap-4 mt-3 text-sm text-slate-600">
                                <span>{anime.episodes} episodes</span>
                                <span>{anime.status}</span>
                                {anime.averageScore > 0 && <span>⭐ {anime.averageScore}/100</span>}
                            </div>
                            <div className="flex gap-2 mt-3 flex-wrap">
                                {anime.genres.map((genre: string) => (
                                    <span key={genre} className="text-xs px-2 py-1 bg-slate-100 text-slate-600">
                                        {genre}
                                    </span>
                                ))}
                            </div>
                            {anime.description && (
                                <div
                                    className="mt-6 text-slate-700 text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(anime.description)
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            );
    } catch (err) {
        return <h1 className="px-6 py-8 text-slate-500">Something went wrong.</h1>
    }
}