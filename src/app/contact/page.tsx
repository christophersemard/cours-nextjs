"use client";

import { submitContactForm } from "./actions";
import { useState, useTransition, useRef } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
    const formRef = useRef<HTMLFormElement>(null);

    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [success, setSuccess] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);

    type ValidationError = {
        validation: boolean;
        errors?: Record<string, string[]>;
    };
    type Success = {
        success: boolean;
    };
    type Response = Success | ValidationError;

    const handleSubmit = (formData: FormData) => {

        startTransition(() => {
            setLoading(true);
            toast.promise(
                submitContactForm(formData).then((response: Response) => {

                    if ("validation" in response && response.validation) {
                        setErrors(response.errors || {});
                        setSuccess(false);

                        return new Promise((_, reject) =>
                            setTimeout(() => {
                                setLoading(false);
                                reject(new Error("Erreur de validation."));
                            }, 2000)
                        );
                    }

                    if ("success" in response && response.success) {
                        return new Promise((resolve) =>
                            setTimeout(() => {
                                setErrors({});
                                setSuccess(true);
                                setLoading(false);
                                resolve(true);
                            }, 2000)
                        );
                    }
                }),
                {
                    loading: "Envoi du message...",
                    success: <b>Message envoyé avec succès !</b>,
                    error: <b>Impossible d’envoyer le message.</b>,
                }
            );
        });
    };

    const fillInvalidData = () => {
        const form = formRef.current;
        if (!form) return;

        (form.elements.namedItem("name") as HTMLInputElement).value = "A";
        (form.elements.namedItem("email") as HTMLInputElement).value = "jean.dupont@email.com";
        (form.elements.namedItem("message") as HTMLTextAreaElement).value = "Trop court";
        setErrors({});
        setSuccess(false);
    };

    const fillValidData = () => {
        const form = formRef.current;
        if (!form) return;
        (form.elements.namedItem("name") as HTMLInputElement).value = "Jean Dupont";
        (form.elements.namedItem("email") as HTMLInputElement).value = "jean.dupont@email.com";
        (form.elements.namedItem("message") as HTMLTextAreaElement).value = "Bonjour, ceci est un message de test complet.";
        setErrors({});
        setSuccess(false);
    };

    return (
        <section className="bg-accent-muted rounded-xl p-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-accent">Contactez-nous</h2>



            {
                !success && (
                    <>
                        {/* Boutons de remplissage */}
                        <div className="flex gap-4">
                            <button
                                onClick={fillInvalidData}
                                type="button"
                                className="px-4 py-2 bg-red-700 text-white rounded-full hover:bg-red-600 transition cursor-pointer"
                            >
                                Remplir avec données invalides
                            </button>
                            <button
                                onClick={fillValidData}
                                type="button"
                                className="px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-600 transition cursor-pointer"
                            >
                                Remplir avec données valides
                            </button>
                        </div>

                        {/* Formulaire */}
                        <form
                            ref={formRef}
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                setSuccess(false);
                                handleSubmit(formData);
                            }}
                            className="space-y-6"
                        >
                            <div>
                                <label htmlFor="name" className="block font-medium text-primary mb-1">
                                    Nom
                                </label>
                                <input
                                    name="name"
                                    id="name"
                                    className="w-full border border-accent-muted bg-background p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent transition"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block font-medium text-primary mb-1">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    id="email"
                                    type="email"
                                    className="w-full border border-accent-muted bg-background p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent transition"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="message" className="block font-medium text-primary mb-1">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    className="w-full border border-accent-muted bg-background p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent transition resize-none"
                                />
                                {errors.message && (
                                    <p className="text-red-500 text-sm mt-1">{errors.message[0]}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-accent text-white px-6 py-2 rounded-full hover:opacity-90 transition disabled:opacity-60"
                            >
                                {loading ? "Envoi..." : "Envoyer"}
                            </button>
                        </form>

                    </>
                )
            }
            {success && (
                <p className="text-green-600 font-medium mt-4">
                    Merci pour votre message, nous vous répondrons rapidement.
                </p>
            )}
        </section>
    );
}
