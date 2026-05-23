import { Injectable } from "@nestjs/common";
import type { Anime } from "../anime/anime.interface";
import { animeDatabase } from "../anime/anime.data"

@Injectable()
export class SearchService {
    searchAnime(data : string): Anime[] {
        let result: Anime[] = [];
        for (const anime of animeDatabase) {
            if (anime.title.toLowerCase().includes(data.toLowerCase())) {
                result.push(anime);
            }
        }
        return result;
    }
}