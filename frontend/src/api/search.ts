export default async function searchAnime(query: string) {
    const res = await fetch(
        `${process.env.NEST_INTERNAL_URL}/search?q=${query}`
    );

    if (!res.ok) {
        throw new Error(`Failed to search for "${query}": ${res.status}`);
    }

    return res.json();
}