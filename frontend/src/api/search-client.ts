export default async function searchAnimeClient(query: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/search?q=${query}`
    );
    return res.json();
}