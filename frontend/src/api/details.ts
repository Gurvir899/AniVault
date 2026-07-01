export default async function getDetailsById(id: string) {
    const res = await fetch(
        `${process.env.NEST_INTERNAL_URL}/anime/${id}`
    );

    if (!res.ok) {
        if (res.status === 404) {
            return null;
        }
        throw new Error(`Failed to fetch anime ${id}: ${res.status}`);
    }

    const data = await res.json();

    return data ?? null;
}