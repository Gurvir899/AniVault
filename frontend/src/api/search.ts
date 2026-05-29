export default async function searchAnime(query: string) {
    const res = await fetch(
        `http://localhost:3001/search?q=${query}`
    );
    return res.json();
}