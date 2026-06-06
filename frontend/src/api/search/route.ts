import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get('q') ?? '';
    const res = await fetch(
        `${process.env.NEST_INTERNAL_URL}/search?q=${query}`
    );
    const data = await res.json();
    return NextResponse.json(data);
}