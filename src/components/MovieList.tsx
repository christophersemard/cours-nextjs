
import Image from 'next/image';

type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
};

export default function MovieList({ movies }: { movies: Movie[] }) {
    return (
        <ul className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {movies.map((movie: Movie) => (
                <li key={movie.id} className="rounded-xl shadow-sm bg-accent-muted border border-primary overflow-hidden">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={200}
                        height={300}
                        className="w-full max-h-96 "
                    />
                    <div className="p-4">
                        <h3 className="text-xl font-semibold text-accent">{movie.title}</h3>
                        <p className="text-secondary text-sm line-clamp-4">{movie.overview}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}