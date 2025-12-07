import {getShowWithEpisodes} from "@/app/lib/tvmaze";
import Image from "next/image";
import EpisodesList from "@/app/components/episodes/EpisodesList";

export default async function Page() {
    const { show, episodes } = await getShowWithEpisodes();

    return (
        <div className="space-y-6">
            <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start">
                {show.image && (
                    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800">
                        <Image
                            src={show.image.original ?? show.image.medium}
                            alt={`Series cover ${show.name}`}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="space-y-3">
                    <h1 className="text-3xl md:text-4xl font-bold">{show.name}</h1>
                    {show.summary && (
                        <div
                            className="prose prose-invert max-w-none text-sm"
                            dangerouslySetInnerHTML={{ __html: show.summary }}
                        />
                    )}
                    <p className="text-xs text-slate-400">
                        Episodes provided by TVMaze. Use the search and favorites below.
                    </p>
                </div>
            </section>

            <section aria-label="Lista de episódios da série">
                <EpisodesList episodes={episodes} />
            </section>
        </div>
    );
}
