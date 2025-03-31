"use server";

import { prisma } from "@/lib/prisma";
import { verifyPassword, setUserCookie, clearUserCookie } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function loginUser(formData: FormData) {
    const username = formData.get("username")?.toString().trim();
    const password = formData.get("password")?.toString();

    if (!username || !password) {
        return { error: "Champs requis manquants." };
    }

    const user = await prisma.users.findUnique({ where: { username } });
    if (!user) {
        return { error: "Identifiants incorrects." };
    }

    const valid = await verifyPassword(password, user.password);
    if (!valid) {
        return { error: "Identifiants incorrects." };
    }

    await setUserCookie(user.id, user.username);
    return { id: user.id, username: user.username };
}

export async function logout() {
    await clearUserCookie();
    revalidatePath("/", "layout"); // ou '*'
}
