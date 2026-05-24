import { Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common";

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
                            title { romaji }
                        }
                    }
                `,
                variables: { id }
            })
        });

        const json = await response.json();

        const anime = json.data.Media;

        if (!anime) {
            throw new NotFoundException("Anime not found");
        }

        return {
            id: anime.id,
            title: anime.title.romaji
        };
    }
}