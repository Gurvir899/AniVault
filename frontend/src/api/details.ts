export default async function getDetailsById(id: string) {
    const res = await fetch(
        `http://127.0.0.1:3001/anime/${id}`
    );

    if (!res.ok) {
        return null;
    }

    const data = await res.json();

    return data ?? null;
}