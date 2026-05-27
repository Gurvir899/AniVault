import getCatalogue from "@/api/home";
import type { Anime } from "@/anime/anime";
import CatalogueRow from "@/components/cataloguerow";

export default async function Home() {
  const sorts = ["TRENDING_DESC", "SCORE_DESC", "POPULARITY_DESC"];

  const [trending, topRated, popular] = await Promise.all(
      sorts.map(sort => getCatalogue(sort))
  );

  return (
    <div className="px-75 py-8 flex flex-col gap-10">
        {[["Trending", trending], ["Top Rated", topRated], ["Most Popular", popular]].map(([label, animes]) => (
            <section key={label}>
                <h2 className="text-lg font-semibold text-slate-800 mb-3 px-8">{label}</h2>
                    <CatalogueRow animes={animes as Anime[]} />
            </section>
        ))}
    </div>
  );
}
