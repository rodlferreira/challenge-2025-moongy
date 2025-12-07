'use server';

import fs from 'node:fs/promises';
import path from 'node:path';

const FAVORITES_PATH = path.join(process.cwd(), 'data', 'favorites.json');

export interface FavoriteEpisode {
    id: number;
}

async function readFavorites(): Promise<FavoriteEpisode[]> {
    try {
        const raw = await fs.readFile(FAVORITES_PATH, 'utf-8');
        return JSON.parse(raw) as FavoriteEpisode[];
    } catch {
        return [];
    }
}

async function writeFavorites(favs: FavoriteEpisode[]) {
    await fs.mkdir(path.dirname(FAVORITES_PATH), { recursive: true });
    await fs.writeFile(FAVORITES_PATH, JSON.stringify(favs, null, 2), 'utf-8');
}

export async function toggleFavoriteEpisode(id: number) {
    const current = await readFavorites();
    const exists = current.some((f) => f.id === id);
    const updated = exists
        ? current.filter((f) => f.id !== id)
        : [...current, { id }];

    await writeFavorites(updated);

    return updated;
}

export async function getFavorites() {
    return readFavorites();
}
