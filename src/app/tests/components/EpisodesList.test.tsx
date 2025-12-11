import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EpisodesList from '@/app/components/episodes/EpisodesList';
import '@testing-library/jest-dom/vitest';

const episodes = [
    { id: 1, name: 'Monkey See, Doggie Do', season: 1, number: 1, summary: null, image: null },
    { id: 2, name: 'Bubblevicious', season: 1, number: 2, summary: null, image: null },
];

describe('EpisodesList', () => {
    it('Filter episode to search', () => {
        render(<EpisodesList episodes={episodes} />);

        const input = screen.getByLabelText(/search episodes/i);
        fireEvent.change(input, { target: { value: 'bubble' } });

        expect(screen.getByText(/Bubblevicious/)).toBeInTheDocument();
        expect(screen.queryByText(/Monkey See/)).toBeNull();
    });
});
