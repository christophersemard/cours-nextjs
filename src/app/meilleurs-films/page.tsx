
import { Metadata } from "next";
import MovieList from "@/components/MovieList";

export const metadata: Metadata = {
    title: "Meilleurs films",
    description: "Découvrez les meilleurs films du moment.",
};

const TMDB_API_KEY = "4dcd8dc3ff5ffec70db30956e7a3c32f";


export default async function PopularMoviesPage() {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page=1&api_key=${TMDB_API_KEY}`,
        { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
        throw new Error("Erreur lors du chargement des films.");
    }

    const data = await res.json();
    if (!data || !data.results) {
        throw new Error("Aucun film trouvé.");
    }
    const movies = data.results

    return (
        <section className="space-y-8">
            <h2 className="text-3xl font-bold">Films populaires (chargement côté serveur)</h2>

            <MovieList movies={movies} />
        </section>
    );
}
