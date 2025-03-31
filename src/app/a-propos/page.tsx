import { Metadata } from "next";

export const metadata: Metadata = {
    title: "À propos",
    description: "À propos du projet étudiant Next.js",
};

export default function AboutPage() {
    return (
        <section className="space-y-8">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold mb-2">À propos du projet</h2>
                <p className="text-secondary text-lg">
                    Ce projet a pour but de nous familiariser avec l’écosystème Next.js et les outils modernes de développement frontend. Il nous permet également de mettre en œuvre de bonnes pratiques de code, de structuration et de style.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-background border border-accent p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-accent mb-2">Technos utilisées</h3>
                    <ul className="list-disc pl-5 text-primary">
                        <li>Next.js 15 (App Router)</li>
                        <li>TypeScript strict</li>
                        <li>TailwindCSS 4 (via CSS variables)</li>
                        <li>GitHub Actions</li>
                    </ul>
                </div>
                <div className="bg-background border border-accent p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-accent mb-2">Objectifs pédagogiques</h3>
                    <p className="text-primary">
                        Comprendre la structure d’un projet Next.js moderne, appliquer les règles de l’accessibilité, créer des interfaces esthétiques et maintenables, et automatiser les processus avec des outils de CI.
                    </p>
                </div>
            </div>
        </section>
    );
}
