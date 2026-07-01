import getDetailsById from "@/api/details";
import { getPostsByAnime } from "@/api/posts";
import DOMPurify from "isomorphic-dompurify";
import ErrorMessage from "@/components/error-message";
import PostCard from "@/components/postcard";
import PostForm from "@/components/postform";
import Link from "next/link";
import { cookies } from "next/headers";

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

        const [posts, cookieStore] = await Promise.all([getPostsByAnime(id), cookies()]);
        const isLoggedIn = Boolean(cookieStore.get("token"));

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

                    <div className="px-4 lg:px-12 pb-12 flex flex-col gap-4">
                        <h2 className="text-lg font-semibold text-slate-800">Posts</h2>

                        {isLoggedIn ? (
                            <PostForm
                                animeId={anime.id}
                                animeTitle={anime.title.english || anime.title.romaji || anime.title.native}
                                animeCoverUrl={anime.cover.extraLarge ?? null}
                            />
                        ) : (
                            <p className="text-sm text-slate-500">
                                <Link href="/login" className="text-sky-500 hover:underline">Sign in</Link> to post about this anime.
                            </p>
                        )}

                        {posts.length === 0 ? (
                            <p className="text-sm text-slate-400">No posts yet.</p>
                        ) : (
                            <ul className="flex flex-col gap-3">
                                {posts.map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            );
    } catch (err) {
        return <ErrorMessage />
    }
}