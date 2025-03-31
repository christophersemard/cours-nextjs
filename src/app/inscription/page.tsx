'use client';

import { useRef, useState, useTransition } from 'react';
import { createUser } from './action';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/useAuth';
import { redirect } from 'next/navigation';

export default function RegisterPage() {
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState('');
    const [isPending, startTransition] = useTransition();
    const { setUser } = useAuth();

    const handleSubmit = (formData: FormData) => {
        setError('');
        startTransition(() => {
            createUser(formData).then((res) => {
                if (res?.error) {
                    setError(res.error);
                    toast.error(res.error);
                } else {
                    // ✅ On met à jour le contexte après succès
                    setUser({ id: res.id!, username: res.username! });
                    redirect('/admin');
                }
            });
        });
    };

    return (
        <section className="bg-accent-muted max-w-xl mx-auto p-10 rounded-xl space-y-6">
            <h2 className="text-3xl font-bold text-accent">Créer un compte</h2>

            <form
                ref={formRef}
                action={handleSubmit}
                className="space-y-4"
            >
                <div>
                    <label htmlFor="username" className="block font-medium text-secondary mb-1">
                        Nom d’utilisateur
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        className="w-full p-3 rounded-md border border-accent-muted bg-background"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block font-medium text-secondary mb-1">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="w-full p-3 rounded-md border border-accent-muted bg-background"
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-accent text-white px-6 py-2 rounded-full hover:opacity-90 transition disabled:opacity-60"
                >
                    {isPending ? 'Création…' : 'Créer le compte'}
                </button>
            </form>
        </section>
    );
}
