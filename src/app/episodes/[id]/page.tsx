import { getEpisodeById } from '@/app/lib/tvmaze';
import Image from 'next/image';
import Link from 'next/link';

interface EpisodePageProps {
    params: Promise<{ id: string }>;
}

export default async function EpisodePage({ params }: EpisodePageProps) {

    const { id } = await params;

    const episode = await getEpisodeById(Number(id));

    const displayTitle = `S${episode.season}E${episode.number} – ${episode.name}`;

    return (
        <div className="space-y-4">
            <Link
                href="/"
                className="text-sm text-pink-400 hover:text-pink-300 underline"
            >
                ← Turn to episodes list
            </Link>

            <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                {episode.image && (
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800">
                        <Image
                            src={episode.image.original ?? episode.image.medium}
                            alt={`Episode cover ${episode.name}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="space-y-3">
                    <h1 className="text-2xl md:text-3xl font-bold">{displayTitle}</h1>
                    <p className="text-sm text-slate-400">
                        Season {episode.season} • Episode {episode.number}
                    </p>
                    <div
                        className="prose prose-invert max-w-none text-sm"
                        dangerouslySetInnerHTML={{
                            __html:
                                episode.summary ??
                                '<p>Without resume enabled to this episode.</p>',
                        }}
                    />
                </div>
            </section>
        </div>
    );
}
