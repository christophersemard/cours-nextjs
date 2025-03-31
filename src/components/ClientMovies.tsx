"use client";

import { use } from "react";
import MovieList from "./MovieList";

type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
};

export default function ClientMovies({
    movies,
}: {
    movies: Promise<Movie[]>;
}) {
    const data = use(movies);

    return (
        <MovieList movies={data} />
    );
}
