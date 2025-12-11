import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getShowWithEpisodes } from '@/app/lib/tvmaze';
import type { TvMazeShow, TvMazeEpisode } from '@/app/lib/types';

type MockFetchResponse<T> = {
    ok: boolean;
    json: () => Promise<T>;
};

describe('tvmaze client', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('Need to return SHOW and EPISODES', async () => {
        global.fetch = vi
            .fn()
            // First call: show
            .mockResolvedValueOnce({
                ok: true,
                json: async () =>
                    ({ id: 1955, name: 'The Powerpuff Girls' } as TvMazeShow),
            } as MockFetchResponse<TvMazeShow>)
            // Second call: episodes
            .mockResolvedValueOnce({
                ok: true,
                json: async () => [{ id: 1, name: 'Pilot' }],
            } as MockFetchResponse<TvMazeEpisode[]>);

        const result = await getShowWithEpisodes();
        expect(result.show.id).toBe(1955);
        expect(result.episodes).toHaveLength(1);
    });
});
