'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@atlaskit/button';
import Heading from '@atlaskit/heading';
import { TvMazeEpisode } from '@/app/lib/types';

interface Props {
    episode: TvMazeEpisode;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export default function EpisodeCard({
                                        episode,
                                        isFavorite,
                                        onToggleFavorite,
                                    }: Props) {
    const displayTitle = `S${episode.season}E${episode.number} – ${episode.name}`;

    return (
        <article className="flex flex-col h-full rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden">
            <Link
                href={`/episodes/${episode.id}`}
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
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500">
                        Without image
                    </div>
                )}
            </Link>

            <div className="flex flex-col flex-1 p-3 gap-2">
                <Heading size="large">{displayTitle}</Heading>
                <p className="text-xs text-slate-400 line-clamp-3">
                    {episode.summary
                        ? episode.summary.replace(/<[^>]+>/g, '')
                        : 'Without resume enabled .'}
                </p>

                <div className="mt-auto flex items-center justify-between gap-2">
                    <Link href={`/episodes/${episode.id}`}>
                        <Button appearance="subtle">See details</Button>
                    </Link>
                    <Button
                        appearance={isFavorite ? 'primary' : 'subtle'}
                        onClick={onToggleFavorite}
                        aria-pressed={isFavorite}
                        aria-label={
                            isFavorite
                                ? `Remove episodes ${displayTitle} from favorites`
                                : `Add episodes ${displayTitle} to favorites`
                        }
                    >
                        {isFavorite ? '★ Favorite' : '☆ To Favorite'}
                    </Button>
                </div>
            </div>
        </article>
    );
}
