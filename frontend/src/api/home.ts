export default async function getCatalogue(query: string) {
    const res = await fetch(
        `${process.env.NEST_INTERNAL_URL}/home?q=${query}`,
        { cache: 'no-store' }
    );

    if (!res.ok) {
        return null;
    }

    const data = await res.json();

    return data ?? null;
}