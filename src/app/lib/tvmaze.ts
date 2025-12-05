import {TvMazeEpisode, TvMazeShow} from "@/app/lib/types";


const BASE_URL = 'https://api.tvmaze.com'

export const POWERPUFF_SHOW_ID = 1955;

async function safeFetch<T> (input: string, init?: RequestInit): Promise<T> {
    const response = await fetch(input, {
     ...init,
        //cache to daily revalidation => see more about new changes that make it situation(revalidation) better on NEXT
        next: {revalidate: 60 * 60 * 24}
    });

    if (!response.ok) {
        throw new Error(`Error to search ${input}: ${response.status}`);
    }

    return (await response.json()) as T;
}

export async function getShowWithEpisodes(): Promise<{
    show: TvMazeShow;
    episodes: TvMazeEpisode[];
}> {
    const show = await safeFetch<TvMazeShow>(
        `${BASE_URL}/shows/${POWERPUFF_SHOW_ID}`
    )
    const episodes = await safeFetch<TvMazeEpisode[]>(
        `${BASE_URL}/shows/${POWERPUFF_SHOW_ID}/episodes`
    )

    return {show, episodes};
}

export async function getEpisodeById(
    id: string | number
): Promise<TvMazeEpisode>{
    return safeFetch<TvMazeEpisode>(`${BASE_URL}/episodes/${id}`)
}