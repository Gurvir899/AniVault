import { Injectable } from "@nestjs/common";
import mapAnime from "src/dto";

@Injectable()
export class HomeService {
    async getHome(sort: string) {
        const response = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
                    query ($sort: [MediaSort]) {
                        Page(perPage: 10) {
                            media(type: ANIME, sort: $sort) {
                                id
                                title {
                                    english
                                    romaji
                                    native
                                }
                                coverImage {
                                    medium
                                    large
                                    extraLarge
                                }
                            }
                        }
                    }
                `,
                variables: {
                    sort: [sort]
                }
            })
        });

        const json = await response.json();
        
        return json.data.Page.media.map(mapAnime);
    }
}