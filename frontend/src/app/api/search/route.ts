import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get('q') ?? '';

    let res: Response;
    try {
        res = await fetch(
            `${process.env.NEST_INTERNAL_URL}/search?q=${query}`
        );
    } catch (err) {
        console.error("Search proxy error:", err);
        return NextResponse.json({ message: "Something went wrong." }, { status: 502 });
    }

    if (!res.ok) {
        return NextResponse.json({ message: "Something went wrong." }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
}