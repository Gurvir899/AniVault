export default async function getCatalogue(query: string) {
    const res = await fetch(
        `http://localhost:3001/home?q=${query}`
    );

    if (!res.ok) {
        return null;
    }

    const data = await res.json();

    return data ?? null;
}