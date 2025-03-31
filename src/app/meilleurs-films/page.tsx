import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Meilleurs films",
    description: "Découvrez les meilleurs films du moment.",
};

const TMDB_API_KEY = "4dcd8dc3ff5ffec70db30956e7a3c32f";

type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
};

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

    console.log(movies);

    return (
        <section className="space-y-8">
            <h2 className="text-3xl font-bold">Films populaires (chargement côté serveur)</h2>
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
