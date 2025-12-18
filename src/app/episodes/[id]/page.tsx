import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cleanSummary } from '@/app/lib/summary';
import { getShowWithEpisodes } from '@/app/lib/tvmaze';

interface EpisodePageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] }>;
}

export default async function EpisodePage({ params, searchParams }: EpisodePageProps) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const id = Number(resolvedParams.id);
    const { episodes } = await getShowWithEpisodes();
    const episode = episodes.find((ep) => ep.id === id) ?? null;

    if (!episode) {
        notFound();
    }

    const displayTitle = `S${episode.season}E${episode.number} – ${episode.name}`;
    const summary = cleanSummary(episode.summary);

    const backParams = new URLSearchParams();
    if (typeof resolvedSearchParams?.page === "string") backParams.set("page", resolvedSearchParams.page);
    if (typeof resolvedSearchParams?.q === "string") backParams.set("q", resolvedSearchParams.q);
    if (resolvedSearchParams?.favorites === "1") backParams.set("favorites", "1");
    const backHref = backParams.toString() ? `/?${backParams.toString()}` : "/";

    return (
        <div className="space-y-4">
            <Link
                href={backHref}
                className="text-sm text-pink-300 hover:text-pink-200 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded"
            >
                ← Back to episodes list
            </Link>

            <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] rounded-3xl bg-slate-900/60 border border-slate-800 p-6 shadow-xl shadow-pink-950/20">
                {episode!.image && (
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800">
                        <Image
                            src={episode!.image.original ?? episode!.image.medium}
                            alt={`Episode cover ${episode!.name}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="space-y-3">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{displayTitle}</h1>
                    <p className="text-sm text-slate-300">
                        Season {episode!.season} • Episode {episode!.number}
                    </p>
                    {summary.length > 0 ? (
                        <div className="space-y-2 text-sm leading-relaxed text-slate-200">
                            {summary.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-300">Without summary available for this episode.</p>
                    )}
                </div>
            </section>
        </div>
    );
}
