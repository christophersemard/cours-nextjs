"use client";

import { submitContactForm } from "./actions";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
    const formRef = useRef<HTMLFormElement>(null);

    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [success, setSuccess] = useState(false);
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
        setLoading(true);
        toast.promise(
            submitContactForm(formData).then((response: Response) => {
                if ("validation" in response && response.validation) {
                    setErrors(response.errors || {});
                    setSuccess(false);
                    setLoading(false);
                    throw new Error("Erreur de validation.");
                }

                if ("success" in response && response.success) {
                    setErrors({});
                    setSuccess(true);
                    setLoading(false);
                    return response;
                }
            }),
            {
                loading: "Envoi du message...",
                success: <b>Message envoyé avec succès !</b>,
                error: <b>Impossible d&apos;envoyer le message.</b>,
            }
        );
    };

    const fillInvalidData = () => {
        const form = formRef.current;
        if (!form) return;

        (form.elements.namedItem("name") as HTMLInputElement).value = "A";
        (form.elements.namedItem("email") as HTMLInputElement).value = "jean.dupont@email.com";
        (form.elements.namedItem("message") as HTMLTextAreaElement).value = "Court";
        setErrors({});
        setSuccess(false);
    };

    const fillValidData = () => {
        const form = formRef.current;
        if (!form) return;

        (form.elements.namedItem("name") as HTMLInputElement).value = "Jean Dupont";
        (form.elements.namedItem("email") as HTMLInputElement).value = "jean.dupont@email.com";
        (form.elements.namedItem("message") as HTMLTextAreaElement).value =
            "Bonjour, ceci est un message de test complet.";
        setErrors({});
        setSuccess(false);
    };

    return (
        <section className="max-w-7xl mx-auto space-y-10">
            <div className="max-w-3xl">
                <h2 className="text-4xl font-bold mb-4">Une question ? Un message ?</h2>
                <p className="text-secondary text-lg">
                    Ce formulaire vous permet de nous contacter facilement. Il valide les données en temps réel côté serveur,
                    tout en offrant une expérience utilisateur fluide grâce à l&apos;intégration de Zod et React Hot Toast.
                </p>
            </div>

            <div className="bg-accent-muted rounded-xl p-16 flex flex-col lg:flex-row justify-between gap-16 items-start">
                <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-accent mb-4">Formulaire de contact intelligent</h3>
                    <p className="text-secondary">
                        Les données sont validées via une action serveur, avec retour des erreurs en temps réel.
                        Un toast vous informe du résultat de l&apos;envoi.
                    </p>
                    <p className="text-secondary mt-4">
                        Utilisez les boutons ci-dessous pour tester le comportement du formulaire avec des données valides ou invalides :
                    </p>

                    {!success && (
                        <div className="mt-6 flex flex-wrap gap-4">
                            <button
                                onClick={fillInvalidData}
                                type="button"
                                className="px-4 py-2 font-semibold bg-red-700 text-white rounded-full hover:bg-red-600 transition"
                            >
                                Remplir avec données invalides
                            </button>
                            <button
                                onClick={fillValidData}
                                type="button"
                                className="px-4 py-2 font-semibold bg-green-700 text-white rounded-full hover:bg-green-600 transition"
                            >
                                Remplir avec données valides
                            </button>
                        </div>
                    )}
                </div>



                {success && (
                    <p className="text-green-600 font-medium text-center flex-1 h-48 flex items-center justify-center">
                        Merci pour votre message, nous vous répondrons rapidement.
                    </p>
                )}

                {!success && (
                    <form
                        ref={formRef}
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            setSuccess(false);
                            handleSubmit(formData);
                        }}
                        className="flex-1 space-y-6 w-full"
                    >
                        <div>
                            <label htmlFor="name" className="block font-medium text-secondary mb-1">
                                Nom
                            </label>
                            <input
                                name="name"
                                id="name"
                                className="w-full border border-accent-muted bg-background px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent transition"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block font-medium text-secondary mb-1">
                                Email
                            </label>
                            <input
                                name="email"
                                id="email"
                                type="email"
                                className="w-full border border-accent-muted bg-background px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent transition"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
                        </div>

                        <div>
                            <label htmlFor="message" className="block font-medium text-secondary mb-1">
                                Message
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                rows={3}
                                className="w-full border border-accent-muted bg-background  px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent transition resize-none"
                            />
                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message[0]}</p>}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-accent text-white font-semibold px-6 py-2 rounded-full hover:opacity-90 transition disabled:opacity-60 cursor-pointer"
                            >
                                {loading ? "Envoi..." : "Envoyer"}
                            </button>
                        </div>
                    </form>
                )}
            </div>

        </section>
    );
}
