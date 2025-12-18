'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@atlaskit/button/new';
import Heading from '@atlaskit/heading';
import { TvMazeEpisode } from '@/app/lib/types';
import { cleanSummary } from '@/app/lib/summary';

interface Props {
    episode: TvMazeEpisode;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    detailHref?: string;
}

export default function EpisodeCard({ episode, isFavorite, onToggleFavorite, detailHref }: Props) {
    const displayTitle = `S${episode.season}E${episode.number} – ${episode.name}`;
    const summary = cleanSummary(episode.summary);

    return (
        <article className="flex flex-col h-full rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg shadow-pink-950/20 focus-within:ring-2 focus-within:ring-pink-500">
            <Link
                href={detailHref ?? `/episodes/${episode.id}`}
                className="relative block w-full aspect-video overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
            >
                {episode.image ? (
                    <Image
                        src={episode.image.medium ?? episode.image.original}
                        alt={`Cover episode ${episode.name}`}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500 bg-slate-900">
                        Without image
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" aria-hidden />
                {isFavorite && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-pink-600/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-md">
                        ★ Favorite
                    </span>
                )}
            </Link>

            <div className="flex flex-col flex-1 p-4 gap-3">
                <Heading size="large">{displayTitle}</Heading>
                <p className="text-xs text-slate-300 line-clamp-3">
                    {summary.length > 0 ? summary[0] : 'Without summary available.'}
                </p>

                <div className="mt-auto flex items-center justify-between gap-2">
                    <Link href={`/episodes/${episode.id}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded-lg">
                        <Button appearance="subtle">See details</Button>
                    </Link>
                    <Button
                        appearance={isFavorite ? 'primary' : 'subtle'}
                        onClick={onToggleFavorite}
                        isSelected={isFavorite}
                        aria-pressed={isFavorite}
                        aria-label={
                            isFavorite
                                ? `Remove episode ${displayTitle} from favorites`
                                : `Add episode ${displayTitle} to favorites`
                        }
                    >
                        {isFavorite ? '★ Favorited' : '☆ Favorite'}
                    </Button>
                </div>
            </div>
        </article>
    );
}
