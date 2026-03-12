import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
    if (!BACKEND_URL) {
        return NextResponse.json({ error: "BACKEND_URL is not configured" }, { status: 500 });
    }

    const formData = await req.formData();

    const upstream = await fetch(`${BACKEND_URL}/voice`, {
        method: "POST",
        body: formData,
    });

    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
}
