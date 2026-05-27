export default async function searchAnime(query: string) {
    const res = await fetch(
        `http://127.0.0.1:3001/search?q=${query}`
    );

    return res.json();
}