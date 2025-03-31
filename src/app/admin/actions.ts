"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createArticle(formData: FormData) {
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();

    if (!title || !content) return { error: "Champs requis." };

    await prisma.articles.create({
        data: { title, content },
    });

    revalidatePath("/blog"); // liste
    return { success: true };
}
