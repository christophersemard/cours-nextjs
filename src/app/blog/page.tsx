import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const revalidate = 60;


export default async function BlogPage() {
    const articles = await prisma.articles.findMany({
        orderBy: { id: "desc" },
    });

    return (
        <section className="max-w-7xl space-y-8  mx-auto">
            <h2 className="text-3xl font-bold text-accent">Articles du blog</h2>
            <ul className="space-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <li
                        key={article.id}
                        className=" bg-accent-muted p-6 rounded-lg shadow-sm"
                    >
                        <h3 className="text-xl font-semibold text-white mb-2">
                            {article.title}
                        </h3>
                        <p className="text-secondary line-clamp-3">{article.content}</p>
                        <Link
                            href={`/blog/${article.id}`}
                            className="inline-block mt-4 text-accent hover:underline font-medium"
                        >
                            Lire l’article
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
