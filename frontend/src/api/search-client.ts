export default async function searchAnimeClient(query: string) {
    const res = await fetch(`/api/search?q=${query}`);
    return res.json();
}