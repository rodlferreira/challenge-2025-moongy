import Image from "next/image";
import {getShowWithEpisodes} from "@/app/lib/tvmaze";
import EpisodesList from "@/app/components/episodes/EpisodesList";
import {cleanSummary} from "@/app/lib/summary";
import {getFavorites} from "@/app/actions/favorites";

type HomeSearchParams = {
    page?: string;
    q?: string;
    favorites?: string;
};

export default async function Page({ searchParams }: { searchParams: Promise<HomeSearchParams> }) {
    const resolvedSearchParams = await searchParams;
    const [{ show, episodes }, favorites] = await Promise.all([
        getShowWithEpisodes(),
        getFavorites(),
    ]);

    const initialPage = Number(resolvedSearchParams?.page) > 0 ? Number(resolvedSearchParams.page) : 1;
    const initialSearch = typeof resolvedSearchParams?.q === "string" ? resolvedSearchParams.q : "";
    const initialOnlyFavorites = resolvedSearchParams?.favorites === "1";

    const seasons = new Set(episodes.map((ep) => ep.season));
    const summaryParagraphs = cleanSummary(show.summary);

    return (
        <div className="space-y-10" id="content">
            <section className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start rounded-3xl bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-800/30 border border-slate-800/70 p-6 shadow-xl shadow-pink-950/20">
                {show.image && (
                    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800/70 ring-1 ring-pink-500/30 ring-offset-2 ring-offset-slate-950">
                        <Image
                            src={show.image.original ?? show.image.medium}
                            alt={`Series cover ${show.name}`}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center rounded-full bg-pink-500/20 text-pink-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide border border-pink-500/30">
                            TV Maze Spotlight
                        </span>
                        <span className="inline-flex items-center rounded-full bg-slate-800/70 text-slate-200 px-3 py-1 text-xs font-semibold border border-slate-700">
                            {episodes.length} episodes
                        </span>
                        <span className="inline-flex items-center rounded-full bg-slate-800/70 text-slate-200 px-3 py-1 text-xs font-semibold border border-slate-700">
                            {seasons.size} seasons
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                        {show.name}
                    </h1>

                    {summaryParagraphs.length > 0 ? (
                        <div className="space-y-2 text-sm text-slate-200 leading-relaxed">
                            {summaryParagraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-300">No summary available for this show yet.</p>
                    )}

                    <div className="flex flex-wrap gap-3 text-xs text-slate-300" aria-live="polite">
                        <span className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                            Updated daily from TVMaze API
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2">
                            <span className="h-2 w-2 rounded-full bg-pink-400" aria-hidden />
                            Favorite episodes are saved locally for you
                        </span>
                    </div>
                </div>
            </section>

            <section aria-label="Lista de episódios da série" className="space-y-4">
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-slate-300">Explore every adventure, search quickly and keep a curated list of your favorite episodes.</p>
                </div>
                <EpisodesList
                    episodes={episodes}
                    initialFavorites={favorites.map((fav) => fav.id)}
                    initialPage={initialPage}
                    initialSearch={initialSearch}
                    initialOnlyFavorites={initialOnlyFavorites}
                />
            </section>
        </div>
    );
}
