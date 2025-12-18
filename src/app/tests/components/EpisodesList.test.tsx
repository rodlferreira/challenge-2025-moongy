import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EpisodesList from '@/app/components/episodes/EpisodesList';
import '@testing-library/jest-dom/vitest';

vi.mock('@/app/actions/favorites', () => ({
    toggleFavoriteEpisode: vi.fn().mockResolvedValue([{ id: 2 }]),
}));

vi.mock('next/navigation', () => ({
    useRouter: () => ({ replace: vi.fn() }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
}));

const episodes = [
    { id: 1, name: 'Monkey See, Doggie Do', season: 1, number: 1, summary: null, image: null },
    { id: 2, name: 'Bubblevicious', season: 1, number: 2, summary: null, image: null },
];

describe('EpisodesList', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('Filter episode to search', () => {
        render(<EpisodesList episodes={episodes} initialFavorites={[]} />);

        const input = screen.getByLabelText(/search episodes/i);
        fireEvent.change(input, { target: { value: 'bubble' } });

        expect(screen.getByText(/Bubblevicious/)).toBeInTheDocument();
        expect(screen.queryByText(/Monkey See/)).toBeNull();
    });

    it('marks episode as favorite optimistically', async () => {
        const user = userEvent.setup();
        render(<EpisodesList episodes={episodes} initialFavorites={[]} />);

        const card = screen.getByText(/Monkey See, Doggie Do/).closest('article');
        expect(card).toBeTruthy();
        const favoriteButton = within(card as HTMLElement).getByRole('button', { name: /favorite/i });
        await user.click(favoriteButton);

        expect(favoriteButton).toHaveTextContent('★ Favorited');
    });
});
