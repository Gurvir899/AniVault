import Link from "next/link";
import Avatar from "@/components/avatar";
import type { Post } from "@/anime/post";

type Props = {
    post: Post;
    showAnime?: boolean;
};

export default function PostCard({ post, showAnime = false }: Props) {
    return (
        <li className="border border-slate-200 p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <Avatar username={post.user.username} size="sm" />
                <Link href={`/users/${post.user.id}`} className="text-sm font-medium text-slate-800 hover:text-sky-500">
                    {post.user.username}
                </Link>
                <span className="text-xs text-slate-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                </span>
            </div>

            {showAnime && (
                <Link href={`/anime/${post.animeId}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-sky-500">
                    {post.animeCoverUrl && (
                        <img src={post.animeCoverUrl} className="w-6 h-8 object-cover" />
                    )}
                    {post.animeTitle}
                </Link>
            )}

            <p className="text-sm font-semibold text-slate-900">{post.title}</p>
            <p className="text-sm text-slate-600 whitespace-pre-wrap">{post.body}</p>
        </li>
    );
}
