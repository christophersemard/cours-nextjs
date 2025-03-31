import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accueil",
  description: "Page d'accueil du projet Next.js",
};

export default function HomePage() {
  return (
    <section className="space-y-10 max-w-7xl mx-auto">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-bold mb-4">Bienvenue sur notre projet Next.js</h2>
        <p className="text-secondary text-lg">
          Ce site a été conçu dans le cadre d’un exercice encadré avec les technologies modernes de développement web : Next.js 15, TailwindCSS 4, TypeScript et bien plus encore.
        </p>
      </div>

      <div className="bg-accent-muted rounded-xl p-16 flex justify-between gap-32 items-center">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-accent mb-4">Une application moderne et efficace</h3>
          <p className="text-secondary">
            Ce projet met en avant les dernières technologies du web : Next.js 15 pour une navigation rapide, TypeScript pour un code fiable, et TailwindCSS pour un style sur mesure.
          </p>
          <p className="text-secondary mt-4">
            Nous avons intégré des appels à des APIs en temps réel afin de présenter les <strong>films les plus récents</strong> ainsi que les <strong>meilleurs films selon la critique</strong>.
          </p>
          <p className="text-secondary mt-4">
            Explorez ces deux pages pour voir notre intégration dynamique des données :
          </p>
          <div className="mt-6 flex gap-4">
            <Link
              href="/films-recents"
              className="px-6 py-2 rounded-full bg-accent text-white hover:opacity-90 transition font-medium"
            >
              Films récents (rendu côté client)
            </Link>
            <Link
              href="/meilleurs-films"
              className="px-6 py-2 rounded-full border border-accent text-accent hover:bg-accent hover:text-white transition font-medium"
            >
              Meilleurs films (rendu côté serveur)
            </Link>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg w-1/3">
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
      <div className="bg-accent-muted rounded-xl p-16 flex justify-between gap-32 items-center">
        <div className="rounded-xl overflow-hidden shadow-lg w-1/3">
          <Image
            src="/images/blog.png"
            alt="Illustration du blog"
            width={300}
            height={300}
            priority
            className="w-full mx-h-64 object-cover rounded-xl"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-accent mb-4">Un blog pour suivre notre progression</h3>
          <p className="text-secondary">
            Ce projet n’est pas seulement technique, il est aussi documenté étape par étape dans un blog intégré à l’application. Chaque article met en lumière une technologie, une décision ou une difficulté rencontrée pendant notre développement.
          </p>
          <p className="text-secondary mt-4">
            Vous y trouverez des réflexions sur l’utilisation de Next.js, Prisma, Supabase, mais aussi des conseils pratiques pour structurer un projet frontend moderne et maintenable.
          </p>
          <div className="mt-6">
            <Link
              href="/blog"
              className="px-6 py-2 rounded-full bg-accent text-white hover:opacity-90 transition font-medium"
            >
              Accéder au blog
            </Link>
          </div>
        </div>

      </div>


    </section>
  );
}
