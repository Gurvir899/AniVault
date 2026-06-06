export default async function searchAnime(query: string) {
    const res = await fetch(
        `${process.env.NEST_INTERNAL_URL}/search?q=${query}`
    );
    return res.json();
}