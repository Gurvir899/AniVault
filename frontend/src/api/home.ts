export default async function getCatalogue(query: string) {
    const res = await fetch(
        `${process.env.API_URL}/home?q=${query}`
    );

    return res.json();
}