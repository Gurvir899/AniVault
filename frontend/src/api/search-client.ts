export default async function searchAnimeClient(query: string) {
    const res = await fetch(`/api/search?q=${query}`);

    if (!res.ok) {
        throw new Error(`Failed to search for "${query}": ${res.status}`);
    }

    return res.json();
}