export default function mapAnime(media: any) {
    return {
        id: media?.id ?? null,

        title: {
            english: media?.title?.english ?? "",
            romaji: media?.title?.romaji ?? "",
            native: media?.title?.native ?? ""
        },

        description: media?.description ?? "",

        episodes: media?.episodes ?? 0,
        status: media?.status ?? "UNKNOWN",

        genres: media?.genres ?? [],

        averageScore: media?.averageScore ?? 0,

        cover: {
            medium: media?.coverImage?.medium ?? "",
            large: media?.coverImage?.large ?? "",
            extraLarge: media?.coverImage?.extraLarge ?? ""
        },

        banner: media?.bannerImage ?? ""
    };
}