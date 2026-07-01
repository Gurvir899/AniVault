import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    let res: Response;
    try {
        res = await fetch(`${process.env.NEST_INTERNAL_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
    } catch (err) {
        console.error("Register proxy error:", err);
        return NextResponse.json({ message: "Something went wrong." }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}