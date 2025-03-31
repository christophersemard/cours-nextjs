'use client';

import { useAuth } from '@/context/useAuth';
import { logout } from '@/app/connexion/action';
import { useTransition } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function AuthButtons() {
    const { user, setUser } = useAuth();
    const [isPending, startTransition] = useTransition();

    const handleLogout = () => {
        startTransition(() => {
            logout().then(() => {
                setUser(null);
                redirect('/');
            });
        });
    };

    if (!user) {
        return (
            <div className="flex gap-4">
                <Link
                    href="/inscription"
                    className="px-4 py-2 rounded-full bg-accent text-white hover:opacity-90 transition font-medium"
                >
                    Inscription
                </Link>
                <Link
                    href="/connexion"
                    className="px-4 py-2 rounded-full border border-accent text-accent hover:bg-accent hover:text-white transition font-medium"
                >
                    Connexion
                </Link>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <span className="text-secondary">Bienvenue, {user.username}</span>
            <button
                onClick={handleLogout}
                disabled={isPending}
                className="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-500 transition font-medium cursor-pointer "
            >
                {isPending ? 'Déconnexion…' : 'Déconnexion'}
            </button>
        </div>
    );
}
