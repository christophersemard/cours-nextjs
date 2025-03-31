
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact",
    description: "Contactez-nous pour toute question ou collaboration.",
};

export default function ContactPage() {
    return (
        <section className="space-y-6 max-w-2xl">
            <h2 className="text-3xl font-bold">Contact</h2>
            <p className="text-secondary">
                Une question, une remarque, une envie de collaboration ? N’hésitez pas à nous écrire ! Un formulaire de contact interactif sera bientôt disponible.
            </p>
            <div className="bg-accent-muted p-6 rounded-xl">
                <p className="text-primary font-medium">
                    📬 En attendant, vous pouvez toujours nous envoyer un message fictif à : <span className="text-accent">contact@projet-etudiant.dev</span>
                </p>
            </div>
        </section>
    );
}
