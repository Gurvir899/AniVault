import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
        return NextResponse.json({ message: "Not authenticated." }, { status: 401 });
    }

    const body = await req.json();

    let res: Response;
    try {
        res = await fetch(`${process.env.NEST_INTERNAL_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `token=${token.value}`,
            },
            body: JSON.stringify(body),
        });
    } catch (err) {
        console.error("Posts proxy error:", err);
        return NextResponse.json({ message: "Something went wrong." }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}
