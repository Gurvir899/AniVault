import { Injectable } from "@nestjs/common";

@Injectable()
export class SearchService {
    async searchAnime(data: string) {
        const response = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
                    query ($search: String) {
                        Page(perPage: 5) {
                            media(search: $search, type: ANIME) {
                                id
                                title {
                                    romaji
                                }
                            }
                        }
                    }
                `,
                variables: {
                    search: data
                }
            })
        });

        const json = await response.json();
        
        return json.data.Page.media.map((a: any) => ({
            id: a.id,
            title: a.title.romaji
        }));
    }
}