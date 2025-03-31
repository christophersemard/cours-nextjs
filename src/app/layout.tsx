import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cours NextJS",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-background text-foreground font-sans shadow">
        <header className="bg-accent-muted shadow-sm">
          <nav className="container mx-auto px-4 py-5 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-wide text-accent">
                Projet Étudiant
              </h1>
            </Link>
            <ul className="flex gap-4 text-sm font-medium text-primary">

              <li>
                <Link href="/" className="hover:text-accent transition-colors px-2">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-accent transition-colors px-2">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors px-2">
                  Contact
                </Link>
              </li>


              <li>
                <Link
                  href="/films-recents"
                  className="px-4 py-2 rounded-full bg-accent text-white hover:opacity-90 transition font-medium"
                >
                  Films récents
                </Link>
              </li>
              <li>
                <Link
                  href="/meilleurs-films"
                  className="px-4 py-2 rounded-full border border-accent text-accent hover:bg-accent hover:text-white transition font-medium"
                >
                  Meilleurs films
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-12">{children}</main>
      </body>
    </html>
  );
}
