import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30; // seconds — gives Railway time to respond

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
    if (!BACKEND_URL) {
        return NextResponse.json(
            { response: "Backend URL is not configured.", trace: { error: true } },
            { status: 500 }
        );
    }

    const body = await req.json();

    let upstream: Response;
    try {
        upstream = await fetch(`${BACKEND_URL}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(25_000),
        });
    } catch (err: any) {
        console.error("[proxy/chat] fetch failed:", err?.message);
        return NextResponse.json(
            { response: "The AI backend is unreachable. Please try again in a moment.", trace: { error: true, detail: err?.message } },
            { status: 503 }
        );
    }

    if (!upstream.ok) {
        const text = await upstream.text().catch(() => "");
        console.error(`[proxy/chat] upstream ${upstream.status}:`, text);
        return NextResponse.json(
            { response: `Backend error (${upstream.status}). Please try again in a moment.`, trace: { error: true, detail: text } },
            { status: upstream.status }
        );
    }

    const data = await upstream.json();
    return NextResponse.json(data);
}
