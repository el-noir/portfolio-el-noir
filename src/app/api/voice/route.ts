import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30; // seconds — transcription + LLM can take a while

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
    if (!BACKEND_URL) {
        return NextResponse.json(
            { error: "Backend URL is not configured." },
            { status: 500 }
        );
    }

    const formData = await req.formData();

    let upstream: Response;
    try {
        upstream = await fetch(`${BACKEND_URL}/voice`, {
            method: "POST",
            body: formData,
            signal: AbortSignal.timeout(30_000),
        });
    } catch (err: any) {
        console.error("[proxy/voice] fetch failed:", err?.message);
        return NextResponse.json(
            { error: "The AI backend is unreachable. Please try again.", detail: err?.message },
            { status: 503 }
        );
    }

    if (!upstream.ok) {
        const text = await upstream.text().catch(() => "");
        console.error(`[proxy/voice] upstream ${upstream.status}:`, text);
        return NextResponse.json(
            { error: `Backend error (${upstream.status}).`, detail: text },
            { status: upstream.status }
        );
    }

    const data = await upstream.json();
    return NextResponse.json(data);
}
