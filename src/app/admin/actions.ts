"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createArticle(title: string, content: string) {
    if (!title || !content) return { error: "Champs requis." };

    await prisma.articles.create({
        data: { title, content },
    });

    revalidatePath("/blog");
    return { success: true };
}

export async function updateArticle(
    id: number,
    title: string,
    content: string
) {
    if (!id || !title || !content) return { error: "Champs invalides." };

    await prisma.articles.update({
        where: { id },
        data: { title, content },
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${id}`);
    return { success: true };
}

export async function deleteArticle(id: number) {
    if (!id) return { error: "ID manquant." };

    await prisma.articles.delete({ where: { id } });

    revalidatePath("/blog");
    return { success: true };
}

export async function getArticles() {
    return prisma.articles.findMany({ orderBy: { id: "desc" } });
}
