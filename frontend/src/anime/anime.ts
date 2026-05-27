export interface Anime {
    id: number;

    title: {
        english: string;
        romaji: string;
        native: string;
    };

    description: string;

    episodes: number;
    status: string;

    genres: string[];

    averageScore: number;

    cover: {
        medium: string;
        large: string;
        extraLarge: string;
    };

    banner: string;
}