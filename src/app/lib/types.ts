export interface TvMazeImage {
    medium: string;
    original: string;
}

export interface TvMazeEpisode {
    id: number;
    name: string;
    season: number;
    number: number;
    summary: string | null;
    image: TvMazeImage | null;
}

export interface TvMazeShow {
    id: number;
    name: string;
    summary: string | null;
    image: TvMazeImage | null;
}