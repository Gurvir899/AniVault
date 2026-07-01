export interface Post {
    id: number;
    title: string;
    body: string;
    animeId: number;
    animeTitle: string;
    animeCoverUrl: string | null;
    createdAt: string;
    user: {
        id: number;
        username: string;
    };
}
