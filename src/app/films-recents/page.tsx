import { Suspense } from "react";
import ClientMovies from "@/components/ClientMovies";


export default function ClientMoviesPage() {
    return (
        <section className="space-y-8">
            <h2 className="text-3xl font-bold">Films actuellement au cinéma (chargement côté client)</h2>

            <Suspense
                fallback={
                    <div className="flex justify-center items-center h-40">
                        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                    </div>
                }
            >
                <ClientMovies />
            </Suspense>
        </section>
    );
}
