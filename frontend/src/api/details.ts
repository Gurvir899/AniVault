export default async function getDetailsById(id: string) {
    const res = await fetch(
        `${process.env.API_URL}/anime/${id}`
    );

    if (!res.ok) {
        return null;
    }

    const data = await res.json();

    return data ?? null;
}