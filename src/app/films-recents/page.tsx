import { Suspense } from "react";
import ClientMovies from "@/components/ClientMovies";

type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
};

async function fetchMovies(): Promise<Movie[]> {
    await new Promise((r) => setTimeout(r, 1500));
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=1&api_key=4dcd8dc3ff5ffec70db30956e7a3c32f`,
        { cache: "no-store" }
    );
    const data = await res.json();
    return data.results;
}

export default function FilmsClientPage() {
    const moviesPromise = fetchMovies();

    return (
        <section className="max-w-7xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">Films actuellement en salle (rendu client)</h2>

            <Suspense
                fallback={
                    <div className="flex justify-center items-center h-40">
                        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                    </div>
                }
            >
                <ClientMovies movies={moviesPromise} />
            </Suspense>
        </section>
    );
}
