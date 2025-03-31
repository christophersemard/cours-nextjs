# Projet Next.js – Suivi des Exercices

Projet étudiant réalisé avec **Next.js 15**, **TailwindCSS 4**, **TypeScript strict**, **Prisma**, et **Supabase**.  
Ce dépôt respecte l’ensemble des consignes d’un projet structuré, accessible et moderne.

Voici le lien de déploiement : https://cours-nextjs-git-master-christophersemards-projects.vercel.app/

---

## Partie 1 – Frontend

| Étape | Description | Fait | Commentaire |
|-------|-------------|------|-------------|
| 1 | Initialisation du projet avec Tailwind, TypeScript, ESLint, App Router, GitHub Actions | ✅ | Tout est fonctionnel dès le démarrage |
| 2 | Navbar commune + pages “Accueil”, “À propos”, “Contact” | ✅ | Navbar centralisée dans le layout |
| 3 | Image optimisée + page 404 personnalisée (Lottie) | ✅ | Animation Lottie bien intégrée |
| 4 | Appels API côté serveur (`/meilleurs-films`) et client (`/films-recents`) | ✅ | `Suspense` + `use()` bien utilisés avec animation de loading |
| 5 | Formulaire de contact avec Zod + toasts dynamiques | ✅ | Pré-remplissage, erreurs par champ, UX propre |

---

## Partie 2 – Backend / Auth / Admin

| Étape | Description | Fait | Commentaire |
|-------|-------------|------|-------------|
| 1 | Connexion à Supabase, table `articles`, pages `/blog` et `/blog/[id]` avec `revalidate` | ✅ | Fonctionne parfaitement en build et sur Vercel |
| 2 | Déploiement Vercel + Preview Deployments | ✅ | Variables sécurisées + pool Supabase configuré |
| 3 | Authentification sans Auth0 (`users`, cookies, etc.) | ✅ | Tout est fait + gestion du context |
| 4 | Admin CRUD (création, édition d'article + invalidation de cache) | ✅ |  |

---
