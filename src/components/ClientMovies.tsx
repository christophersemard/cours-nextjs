"use client";

import Image from "next/image";
import { use } from "react";

type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
};

// simulate async fetch with a real Promise that "suspends"
function fetchMovies(): Promise<Movie[]> {
    return new Promise(async (resolve) => {
        await new Promise((r) => setTimeout(r, 2500)); // simulate delay

        const res = await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=1&api_key=4dcd8dc3ff5ffec70db30956e7a3c32f`
        );

        const data = await res.json();
        resolve(data.results.slice(0, 6));
    });
}

export default function ClientMovies() {
    const movies = use(fetchMovies()); // ← SUSPENDS the component!


    return (

        <section className="space-y-8">
            <ul className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                {movies.map((movie: Movie) => (
                    <li key={movie.id} className="rounded-xl shadow-sm bg-background border border-accent-muted overflow-hidden">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={200}
                            height={300}
                            className="w-full max-h-96"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-accent">{movie.title}</h3>
                            <p className="text-secondary text-sm line-clamp-4">{movie.overview}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
