'use client';

import { useState, useEffect } from 'react';
import { createArticle, updateArticle, deleteArticle, getArticles } from '@/app/admin/actions';


type Article = {
    id: number;
    title: string;
    content: string;
};

type Props = {
    initialArticles: Article[];
};

export default function ArticleManager({ initialArticles }: Props) {
    const [articles, setArticles] = useState(initialArticles);
    const [editing, setEditing] = useState<Article | null>(null);
    const [showDeleteId, setShowDeleteId] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [updateTrigger, setUpdateTrigger] = useState(0); // pour forcer la mise à jour des articles

    useEffect(() => {
        getArticles().then(setArticles);
    }, [updateTrigger]); // déclenché après chaque action

    const handleCreateOrUpdate = async (formData: FormData) => {
        const id = formData.get('id')?.toString();
        const title = formData.get('title')?.toString() || '';
        const content = formData.get('content')?.toString() || '';

        if (id) {
            await updateArticle(Number(id), title, content);
        } else {
            await createArticle(title, content);
        }

        setEditing(null);
        setShowForm(false);

        setUpdateTrigger((prev) => prev + 1); // incrémenter pour forcer la mise à jour
    };

    const handleDelete = async () => {
        if (showDeleteId) {
            await deleteArticle(showDeleteId);
            setShowDeleteId(null);
            setUpdateTrigger((prev) => prev + 1); // incrémenter pour forcer la mise à jour
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-accent">Gestion des articles</h3>
                <button
                    onClick={() => {
                        setEditing(null);
                        setShowForm(true);
                    }}
                    className="px-4 py-2 bg-accent text-white rounded-full hover:opacity-90 transition cursor-pointer"
                >
                    Nouvel article
                </button>
            </div>

            <ul className="space-y-4">
                {articles.map((article) => (
                    <li key={article.id} className="bg-accent-muted rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <h4 className="text-xl font-semibold text-secondary">{article.title}</h4>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setEditing(article);
                                        setShowForm(true);
                                    }}
                                    className="text-sm px-3 py-1 border border-accent text-white rounded-full hover:bg-accent cursor-pointer"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => setShowDeleteId(article.id)}
                                    className="text-sm px-3 py-1 bg-red-600 text-white rounded-full cursor-pointer"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Modal Formulaire */}
            {showForm && (
                <form
                    action={handleCreateOrUpdate}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                >
                    <div className="bg-background p-6 rounded-xl max-w-lg w-full space-y-4 border border-accent-muted">
                        <h4 className="text-xl font-semibold text-accent">
                            {editing ? 'Modifier un article' : 'Nouvel article'}
                        </h4>
                        <input type="hidden" name="id" value={editing?.id} />
                        <div>
                            <label className="block text-secondary mb-1">Titre</label>
                            <input
                                name="title"
                                defaultValue={editing?.title}
                                className="w-full p-3 rounded-md border border-accent-muted bg-background"
                            />
                        </div>
                        <div>
                            <label className="block text-secondary mb-1">Contenu</label>
                            <textarea
                                name="content"
                                rows={6}
                                defaultValue={editing?.content}
                                className="w-full p-3 rounded-md border border-accent-muted bg-background resize-none"
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditing(null);
                                }}
                                className="px-4 py-2 bg-gray-300 rounded-full text-black hover:opacity-80 cursor-pointer"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-accent text-white rounded-full hover:opacity-90 cursor-pointer"
                            >
                                {editing ? 'Mettre à jour' : 'Créer'}
                            </button>
                        </div>
                    </div>
                </form>
            )}

            {/* Modal Confirmation suppression */}
            {showDeleteId !== null && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-background p-6 rounded-xl max-w-sm w-full space-y-4 border border-accent-muted text-center">
                        <p className="text-secondary">Confirmez-vous la suppression de l’article #{showDeleteId} ?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowDeleteId(null)}
                                className="px-4 py-2 bg-gray-300 rounded-full text-black hover:opacity-80 cursor-pointer"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-full hover:opacity-90 cursor-pointer"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}