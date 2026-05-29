export default async function getCatalogue(query: string) {
    const res = await fetch(
        `http://localhost:3001/home?q=${query}`
    );

    return res.json();
}