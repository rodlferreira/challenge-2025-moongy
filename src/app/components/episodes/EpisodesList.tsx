'use client'

import {TvMazeEpisode} from "@/app/lib/types";
import {useMemo, useOptimistic, useState, useTransition} from "react";
import Button from "@atlaskit/button";
import EpisodeCard from "@/app/components/episodes/EpisodeCard";
import {toggleFavoriteEpisode} from "@/app/actions/favorites";

interface Props {
    episodes: TvMazeEpisode[]
}

const PAGE_SIZE = 12;

export default function EpisodesList({episodes}: Props) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [isPending, startTransition] = useTransition()
    const [favoriteState, setFavoriteState] = useOptimistic<number[], number>(
        [],
        (state, episodeId) =>
     state.includes(episodeId)
     ? state.filter((id) => id !== episodeId)
     : [...state, episodeId]
    )

    const filtered = useMemo(() => {
        const lower = search.toLowerCase();
        return episodes.filter((ep) =>
        ep.name.toLowerCase().includes(lower)
        )
    }, [episodes, search]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const start = (page - 1) * PAGE_SIZE;
    const paged = filtered.slice(start, start + PAGE_SIZE);

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
        setPage(1);
    }

    function handleToggleFavorite(id: number) {
        startTransition(async () => {
            setFavoriteState(id);
            await toggleFavoriteEpisode(id)
        })
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-end gap-3 justify-between">
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1" htmlFor="search">
                        Search episodes
                    </label>
                    <input
                        id="search"
                        type="search"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Type some part from title..."
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <p className="text-xs text-slate-400 mt-1">
                        {filtered.length} episodes founded
                    </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                    Page {page} to {totalPages}
                    {isPending && <span aria-live="polite">Loading favorites…</span>}
                </div>
            </div>

            <ul
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                aria-label="Lista de episódios filtrados"
            >
                {paged.map((episode) => (
                    <li key={episode.id} className="list-none">
                        <EpisodeCard
                            episode={episode}
                            isFavorite={favoriteState.includes(episode.id)}
                            onToggleFavorite={() => handleToggleFavorite(episode.id)}
                        />
                    </li>
                ))}
            </ul>

            {totalPages > 1 && (
                <nav
                    className="flex items-center justify-center gap-2 mt-4"
                    aria-label="Pagination from episodes"
                >
                    <Button
                        isDisabled={page <= 1}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        Previous
                    </Button>
                    <Button
                        isDisabled={page >= totalPages}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        Next
                    </Button>
                </nav>
            )}
        </div>
    );
}