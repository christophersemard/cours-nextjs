// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "auth_user";
const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
const protectedRoutes = ["/admin"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    console.log("Middleware triggered for protected route:", pathname);
    // Vérification du cookie d'authentification

    const token = request.cookies.get(COOKIE_NAME)?.value;
    console.log("Token:", token);

    if (!token) {
        console.log("Il y a eu une erreur.");
        const url = request.nextUrl.clone();
        url.pathname = "/connexion";
        return NextResponse.redirect(url);
    }

    try {
        console.log("Vérification du token ...");
        await jwtVerify(token, secret); // token valide, on continue
        console.log("Token is valid.");
        return NextResponse.next();
    } catch (error) {
        console.log("Il y a eu une erreur.");
        console.error(error);
        const url = request.nextUrl.clone();
        url.pathname = "/connexion";
        return NextResponse.redirect(url);
    }
}
