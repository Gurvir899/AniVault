import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    let res: Response;
    try {
        res = await fetch(`${process.env.NEST_INTERNAL_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            credentials: "include",
        });
    } catch (err) {
        console.error("Login proxy error:", err);
        return NextResponse.json({ message: "Something went wrong." }, { status: 502 });
    }

    const data = await res.json();

    if (!res.ok) {
        return NextResponse.json(data, { status: res.status });
    }

    // Forward the cookie from Nest to the browser
    const nestCookie = res.headers.get("set-cookie");
    const response = NextResponse.json(data);
    if (nestCookie) {
        response.headers.set("set-cookie", nestCookie);
    }

    return response;
}