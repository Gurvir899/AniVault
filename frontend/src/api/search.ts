export default async function searchAnime(query: string) {
    const res = await fetch(
        `${process.env.API_URL}/search?q=${query}`
    );
    return res.json();
}