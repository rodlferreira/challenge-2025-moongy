'use client';

import {useMemo, useOptimistic, useState, useTransition} from "react";
import type {ChangeEvent} from "react";
import Button from "@atlaskit/button/new";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {TvMazeEpisode} from "@/app/lib/types";
import EpisodeCard from "@/app/components/episodes/EpisodeCard";
import {toggleFavoriteEpisode} from "@/app/actions/favorites";

interface Props {
    episodes: TvMazeEpisode[];
    initialFavorites: number[];
    initialPage?: number;
    initialSearch?: string;
    initialOnlyFavorites?: boolean;
}

const PAGE_SIZE = 12;

export default function EpisodesList({
                                         episodes,
                                         initialFavorites,
                                         initialPage = 1,
                                         initialSearch = "",
                                         initialOnlyFavorites = false,
                                     }: Props) {
    const [search, setSearch] = useState(initialSearch);
    const [page, setPage] = useState(initialPage);
    const [isPending, startTransition] = useTransition();
    const [favorites, setFavorites] = useState(initialFavorites);
    const [actionError, setActionError] = useState<string | null>(null);
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(initialOnlyFavorites);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [optimisticFavorites, toggleOptimisticFavorite] = useOptimistic(
        favorites,
        (state: number[], episodeId: number) =>
            state.includes(episodeId)
                ? state.filter((id) => id !== episodeId)
                : [...state, episodeId],
    );

    const filtered = useMemo(() => {
        const lower = search.toLowerCase();
        const bySearch = episodes.filter((ep) => ep.name.toLowerCase().includes(lower));
        return showOnlyFavorites
            ? bySearch.filter((ep) => favorites.includes(ep.id) || optimisticFavorites.includes(ep.id))
            : bySearch;
    }, [episodes, favorites, optimisticFavorites, search, showOnlyFavorites]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const start = (page - 1) * PAGE_SIZE;
    const paged = filtered.slice(start, start + PAGE_SIZE);

    function updateUrl(nextPage: number, nextSearch: string, nextOnlyFavorites: boolean) {
        const params = new URLSearchParams(searchParams?.toString());
        if (nextPage > 1) params.set("page", String(nextPage));
        else params.delete("page");

        if (nextSearch.trim()) params.set("q", nextSearch.trim());
        else params.delete("q");

        if (nextOnlyFavorites) params.set("favorites", "1");
        else params.delete("favorites");

        const query = params.toString();
        const nextUrl = query ? `${pathname}?${query}` : pathname;
        router.replace(nextUrl, { scroll: false });
    }

    function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
        const nextSearch = e.target.value;
        setSearch(nextSearch);
        setPage(1);
        updateUrl(1, nextSearch, showOnlyFavorites);
    }

    function handleToggleFavorite(id: number) {
        setActionError(null);
        startTransition(async () => {
            toggleOptimisticFavorite(id);
            try {
                const result = await toggleFavoriteEpisode(id);
                setFavorites(result.map((fav) => fav.id));
            } catch (err) {
                console.error(err);
                setActionError("We could not update favorites. Please try again.");
                setFavorites((prev) => [...prev]);
            }
        });
    }

    function handleToggleOnlyFavorites() {
        const nextOnlyFavorites = !showOnlyFavorites;
        const nextPage = 1;
        setShowOnlyFavorites(nextOnlyFavorites);
        setPage(nextPage);
        updateUrl(nextPage, search, nextOnlyFavorites);
    }

    function handlePageChange(direction: "prev" | "next") {
        const nextPage =
            direction === "prev" ? Math.max(1, page - 1) : Math.min(totalPages, page + 1);
        setPage(nextPage);
        updateUrl(nextPage, search, showOnlyFavorites);
    }

    function buildEpisodeLink(id: number) {
        const params = new URLSearchParams();
        if (page > 1) params.set("page", String(page));
        if (search.trim()) params.set("q", search.trim());
        if (showOnlyFavorites) params.set("favorites", "1");

        const query = params.toString();
        return query ? `/episodes/${id}?${query}` : `/episodes/${id}`;
    }

    return (
        <div className="space-y-5">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-end">
                <div className="space-y-2">
                    <label className="block text-sm font-medium mb-1" htmlFor="search">
                        Search episodes
                    </label>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <input
                            id="search"
                            type="search"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Type a title keyword"
                            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-inner shadow-pink-950/40"
                        />
                        <Button
                            appearance={showOnlyFavorites ? "primary" : "subtle"}
                            isSelected={showOnlyFavorites}
                            onClick={handleToggleOnlyFavorites}
                        >
                            {showOnlyFavorites ? "Showing favorites" : "Only favorites"}
                        </Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300" aria-live="polite">
                        <span className="inline-flex items-center gap-1 rounded-md bg-slate-800/80 px-2 py-1 border border-slate-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                            {filtered.length} episodes found
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md bg-slate-800/80 px-2 py-1 border border-slate-700">
                            <span className="h-2 w-2 rounded-full bg-pink-400" aria-hidden />
                            {optimisticFavorites.length} favorited
                        </span>
                        {isPending && <span className="text-pink-200">Saving your favorites…</span>}
                        {actionError && <span className="text-amber-300" role="alert">{actionError}</span>}
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 text-xs text-slate-300">
                    <span className="hidden sm:inline">Page {page} of {totalPages}</span>
                    <div className="flex gap-2" aria-label="Pagination from episodes">
                        <Button
                            isDisabled={page <= 1}
                            onClick={() => handlePageChange("prev")}
                        >
                            Previous
                        </Button>
                        <Button
                            isDisabled={page >= totalPages}
                            onClick={() => handlePageChange("next")}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>

            <ul
                className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                aria-label="Lista de episódios filtrados"
            >
                {paged.length === 0 && (
                    <li className="list-none col-span-full rounded-2xl border border-dashed border-slate-800 bg-slate-900/70 p-6 text-center text-sm text-slate-300">
                        No episodes match your filters yet. Try a different search term or remove filters.
                    </li>
                )}
                {paged.map((episode) => (
                    <li key={episode.id} className="list-none">
                        <EpisodeCard
                            episode={episode}
                            isFavorite={optimisticFavorites.includes(episode.id)}
                            onToggleFavorite={() => handleToggleFavorite(episode.id)}
                            detailHref={buildEpisodeLink(episode.id)}
                        />
                    </li>
                ))}
            </ul>

            {totalPages > 1 && (
                <nav
                    className="flex items-center justify-center gap-3 mt-4"
                    aria-label="Pagination from episodes"
                >
                    <Button
                        isDisabled={page <= 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                        Previous page
                    </Button>
                    <span className="text-xs text-slate-300" aria-live="polite">
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        isDisabled={page >= totalPages}
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    >
                        Next page
                    </Button>
                </nav>
            )}
        </div>
    );
}
