export default async function getCatalogue(query: string) {
    const res = await fetch(
        `http://127.0.0.1:3001/home?q=${query}`
    );

    return res.json();
}