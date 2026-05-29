export default async function getDetailsById(id: string) {
    const res = await fetch(
        `http://localhost:3001/anime/${id}`
    );

    if (!res.ok) {
        return null;
    }

    const data = await res.json();

    return data ?? null;
}