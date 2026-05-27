import { Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common";
import mapAnime from "src/dto";

@Injectable()
export class DetailsService {
    async getAnimeById(id: number) {
        const response = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query: `
                    query ($id: Int) {
                        Media(id: $id, type: ANIME) {
                            id
                            title {
                                english
                                romaji
                                native
                            }
                            description
                            episodes
                            status
                            genres
                            averageScore
                            coverImage {
                                large
                                medium
                                extraLarge
                            }
                            bannerImage
                        }
                    }
                `,
                variables: { id }
            })
        });

        const json = await response.json();

        const anime = json?.data?.Media;

        if (!anime) {
            throw new NotFoundException("Anime not found");
        }

        return mapAnime(anime);
    }
}