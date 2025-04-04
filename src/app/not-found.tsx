"use client";

// import Lottie from "lottie-react";
import Link from "next/link";
import animation from "../../public/404.json";
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function NotFoundPage() {

    const style = {
        height: 250,
        width: 450,
    };

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
            <Lottie
                animationData={animation}
                loop={true}
                style={style}
            />
            <h2 className="text-2xl font-bold">Oups, cette page n’existe pas</h2>
            <p className="text-secondary">
                Il semble que vous soyez perdu… mais pas de panique !
            </p>
            <Link
                href="/"
                className="px-6 py-2 rounded-full bg-accent text-secondary hover:opacity-90 transition"
            >
                Retour à l’accueil
            </Link>
        </div>
    );
}
