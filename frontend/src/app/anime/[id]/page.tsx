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
            return <h1 className="px-6 py-8 text-slate-400">Anime not found.</h1>
        }

        return (
            <div className="px-6 py-8">
                <h1 className="text-2xl font-bold text-slate-100">{anime.title}</h1>
                <p className="text-slate-500 text-sm mt-1">{anime.id}</p>
            </div>
        );
    } catch (err) {
        return <h1 className="px-6 py-8 text-slate-400">Something went wrong.</h1>
    }
}