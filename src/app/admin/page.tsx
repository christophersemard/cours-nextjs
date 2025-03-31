// app/admin/page.tsx
import { getUserFromCookie } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { createArticle } from './actions';

export default async function AdminPage() {
    const user = await getUserFromCookie();
    const articles = await prisma.articles.findMany({ orderBy: { id: 'desc' } });

    if (!user) {
        redirect('/connexion');
    }

    return (<>
        <section className="max-w-4xl mx-auto p-8 space-y-6">
            <h2 className="text-3xl font-bold text-accent">Espace Admin</h2>
            <p className="text-secondary">
                Bienvenue {user.username}, vous êtes connecté à votre espace administrateur.
            </p>
        </section>
        <section className="max-w-4xl mx-auto space-y-10 p-8">
            <h2 className="text-3xl font-bold text-accent">Gestion des articles</h2>

            {/* Liste des articles */}
            <ul className="space-y-4">
                {articles.map((article) => (
                    <li key={article.id} className="bg-accent-muted rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-accent">{article.title}</h3>
                            <div className="flex gap-2">
                                <button className="text-sm px-3 py-1 bg-yellow-500 text-white rounded-full">
                                    Modifier
                                </button>
                                <button className="text-sm px-3 py-1 bg-red-600 text-white rounded-full">
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Formulaire création */}
            <form
                action={createArticle}
                className="bg-background p-6 rounded-xl border border-accent-muted space-y-4"
            >
                <h3 className="text-xl font-semibold text-accent">Créer un nouvel article</h3>

                <div>
                    <label htmlFor="title" className="block font-medium text-secondary mb-1">
                        Titre
                    </label>
                    <input
                        id="title"
                        name="title"
                        className="w-full p-3 rounded-md border border-accent-muted bg-background"
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block font-medium text-secondary mb-1">
                        Contenu
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        rows={6}
                        className="w-full p-3 rounded-md border border-accent-muted bg-background resize-none"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-accent text-white px-6 py-2 rounded-full hover:opacity-90 transition"
                >
                    Créer l’article
                </button>
            </form>
        </section>
    </>
    );



}
