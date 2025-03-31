// lib/auth.ts
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "auth_user";
const secret = new TextEncoder().encode(
    process.env.AUTH_SECRET || "jwt_tres_tres_tres_secret"
);

export async function setUserCookie(userId: number, username: string) {
    const token = await new SignJWT({ userId, username })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        path: "/",
        secure: true,
    });
}

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}

export async function clearUserCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export async function getUserFromCookie() {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(COOKIE_NAME)?.value;
    if (!cookie) return null;

    try {
        const { payload } = await jwtVerify(cookie, secret);
        return {
            id: payload.userId as number,
            username: payload.username as string,
        };
    } catch {
        return null;
    }
}

export async function getUserFromRequest(request: NextRequest) {
    const id = request.cookies.get(COOKIE_NAME)?.value;
    if (!id) return null;

    return prisma.users.findUnique({ where: { id: Number(id) } });
}
