import getDetailsById from "@/api/details";

export default async function AnimePage({
    params,
}: {
    params: Promise<{id: string}>;
}) {
    const {id} = await params;

    try {
        const anime = await getDetailsById(id);
        if (!anime) {
            return <h1>Anime not found.</h1>
        }

        return (
            <div>
                <h1>{anime.title}</h1>
                <p>{anime.id}</p>
            </div>
        );
    } catch (err) {
        return <h1>Something went wrong.</h1>
    }
}