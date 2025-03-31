import Image from "next/image";

export default function HomePage() {
  return (
    <section className="space-y-10">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-bold mb-4">Bienvenue sur notre projet Next.js</h2>
        <p className="text-secondary text-lg">
          Ce site a été conçu dans le cadre d’un exercice encadré avec les technologies modernes de développement web : Next.js 15, TailwindCSS 4, TypeScript et bien plus encore.
        </p>
      </div>

      <div className="bg-accent-muted rounded-xl p-16 flex justify-between gap-32 items-center">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-accent mb-2">Une application moderne et efficace</h3>
          <p className="text-primary">
            Notre projet utilise les dernières fonctionnalités de Next.js pour offrir une expérience utilisateur fluide et rapide. Grâce à l’utilisation de TypeScript, nous garantissons un code robuste et maintenable.
          </p>
          <p className="text-primary mt-4">
            Nous avons également intégré TailwindCSS pour une personnalisation facile et rapide de l’interface, tout en respectant les normes d’accessibilité.
          </p>
          <p className="text-primary mt-4">
            Explorez notre site pour découvrir nos fonctionnalités, notre approche pédagogique et les technologies que nous utilisons.
          </p>
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg  w-1/3">
          <Image
            src="/images/accueil.png"
            alt="Image d’accueil du projet"
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
