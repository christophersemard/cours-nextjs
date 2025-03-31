"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword, setUserCookie } from "@/lib/auth";

export async function createUser(formData: FormData) {
    const username = formData.get("username")?.toString().trim();
    const password = formData.get("password")?.toString();

    if (!username || !password) {
        return { error: "Champs requis manquants." };
    }

    const existing = await prisma.users.findUnique({ where: { username } });
    if (existing) {
        return { error: "Nom d’utilisateur déjà pris." };
    }

    const hashed = await hashPassword(password);

    const user = await prisma.users.create({
        data: { username, password: hashed },
    });

    await setUserCookie(user.id, user.username);
    return { id: user.id, username: user.username };
}
