import { NextResponse } from "next/server";

export async function POST() {
    try {
        await fetch(`${process.env.NEST_INTERNAL_URL}/auth/logout`, {
            method: "POST",
        });
    } catch (err) {
        console.error("Logout proxy error:", err);
    }

    const response = NextResponse.redirect(
        new URL("/", process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000")
    );
    response.cookies.delete("token");
    return response;
}