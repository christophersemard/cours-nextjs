// app/admin/page.tsx
import { getUserFromCookie } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ArticleManager from '@/components/ArticleManager';


export default async function AdminPage() {
    const user = await getUserFromCookie();
    console.log("USER DANS ADMIN", user);
    if (!user) redirect('/connexion');

    const articles = await prisma.articles.findMany({ orderBy: { id: 'desc' } });

    return (
        <section className="max-w-4xl mx-auto space-y-10 p-8">
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-accent">Espace Admin</h2>
                <p className="text-secondary">
                    Bienvenue {user.username}, vous êtes connecté à votre espace administrateur.
                </p>
            </div>

            <ArticleManager initialArticles={articles} />
        </section>
    );
}