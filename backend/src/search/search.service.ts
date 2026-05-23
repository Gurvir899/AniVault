import { Injectable } from "@nestjs/common";
import type { Anime } from "../anime/anime.interface";

@Injectable()
export class SearchService {
    searchAnime(data : string): Anime[] {
        if (data.toLowerCase() === "jojo") {
            return [{ "id": 1, "title": "JoJo's Bizarre Adventure" }];
        }
        else if (data.toLowerCase() === "one piece") {
            return [{ "id": 2, "title": "One Piece"}]
        }
        else if (data.toLowerCase() === "naruto") {
            return [{ "id": 3, "title": "Naruto"}]
        }
        else if (data.toLowerCase() === "bleach") {
            return [{ "id": 4, "title": "Bleach"}]
        }
        else {
            return [];
        }
    }
}