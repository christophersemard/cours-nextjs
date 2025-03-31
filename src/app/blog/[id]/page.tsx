import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 60;

type ArticlePageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {

    const { id } = await params;
    const article = await prisma.articles.findUnique({
        where: { id: Number(id) },
    });

    if (!article) return notFound();

    return (
        <section className=" py-20 px-4">
            <div className="max-w-7xl mx-auto bg-accent-muted p-10 rounded-xl shadow-md space-y-8">
                <h1 className="text-3xl font-bold text-accent">{article.title}</h1>
                <p className="text-white whitespace-pre-line leading-relaxed">
                    {article.content}
                </p>

                <div className="pt-6 border-t border-accent-muted">
                    <Link
                        href="/blog"
                        className="inline-block text-accent hover:underline font-medium"
                    >
                        ← Retour au blog
                    </Link>
                </div>
            </div>
        </section>
    );
}
