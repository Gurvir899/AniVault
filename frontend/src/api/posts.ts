import type { Post } from "@/anime/post";

export async function getPostsByAnime(animeId: string | number): Promise<Post[]> {
    const res = await fetch(
        `${process.env.NEST_INTERNAL_URL}/posts?animeId=${animeId}`,
        { cache: 'no-store' }
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch posts for anime ${animeId}: ${res.status}`);
    }

    return res.json();
}

export async function getPostsByUser(userId: string | number): Promise<Post[]> {
    const res = await fetch(
        `${process.env.NEST_INTERNAL_URL}/posts?userId=${userId}`,
        { cache: 'no-store' }
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch posts for user ${userId}: ${res.status}`);
    }

    return res.json();
}
