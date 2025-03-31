"use server";

import { z } from "zod";

const contactSchema = z.object({
    name: z
        .string()
        .min(2, "Le nom doit contenir au moins 2 caractères.")
        .max(50, "Le nom ne doit pas dépasser 50 caractères."),
    email: z.string().email("Adresse e-mail invalide."),
    message: z
        .string()
        .min(20, "Le message doit contenir au moins 10 caractères."),
});

export async function submitContactForm(formData: FormData) {
    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
    };

    // Attendre 3 secondes avant de valider le formulaire
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const result = contactSchema.safeParse(data);

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        // On jette une erreur pour que toast.promise la détecte
        return { validation: true, errors };
    }

    return { success: true };
}
