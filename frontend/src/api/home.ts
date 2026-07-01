export default async function getCatalogue(query: string) {
    const res = await fetch(
        `${process.env.NEST_INTERNAL_URL}/home?q=${query}`,
        { cache: 'no-store' }
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch catalogue for "${query}": ${res.status}`);
    }

    const data = await res.json();

    return data ?? null;
}