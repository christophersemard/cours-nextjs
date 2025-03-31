import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "À propos",
    description: "À propos du projet étudiant Next.js",
};

export default function AboutPage() {
    return (
        <section className="max-w-7xl mx-auto  space-y-10">
            <div className="max-w-3xl">
                <h2 className="text-4xl font-bold mb-4">À propos du projet</h2>
                <p className="text-secondary text-lg">
                    Ce projet a été réalisé dans le cadre d’un exercice encadré, avec pour objectif de maîtriser les fondements d’un développement frontend moderne. Il met en œuvre les dernières versions de Next.js, TypeScript et TailwindCSS.
                </p>
                <p className="text-secondary text-lg mt-4">
                    Nous avons appris à structurer une application proprement, à intégrer des APIs de manière efficace, et à offrir une expérience utilisateur fluide, accessible et responsive.
                </p>
            </div>

            <div className="bg-accent-muted rounded-xl p-12 flex flex-col lg:flex-row gap-12 items-start">
                <div className="flex-1 space-y-6">
                    <div>
                        <h3 className="text-2xl font-semibold text-accent mb-2">Technologies utilisées</h3>
                        <ul className="list-disc pl-5 text-secondary leading-relaxed">
                            <li><strong>Next.js 15</strong> avec App Router et rendu hybride</li>
                            <li><strong>TypeScript</strong> avec typage strict</li>
                            <li><strong>TailwindCSS 4</strong> entièrement configuré en CSS</li>
                            <li><strong>GitHub Actions</strong> pour la CI (lint à chaque commit)</li>
                            <li><strong>React Hot Toast</strong> pour les notifications</li>
                            <li><strong>Zod</strong> pour la validation des données</li>
                        </ul>
                    </div>

                </div>

                <div className="w-full lg:w-1/3 rounded-xl overflow-hidden shadow-lg">
                    <Image
                        src="/images/accueil.png"
                        alt="Image d'accueil du projet"
                        width={800}
                        height={400}
                        priority
                        className="w-full h-auto object-cover rounded-xl"
                    />
                </div>
            </div>
        </section>
    );
}
