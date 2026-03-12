import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30; // seconds — transcription + LLM can take a while

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
    console.log("[proxy/voice] incoming request");
    console.log("[proxy/voice] BACKEND_URL:", BACKEND_URL ?? "NOT SET");

    if (!BACKEND_URL) {
        console.error("[proxy/voice] BACKEND_URL env var is missing");
        return NextResponse.json(
            { error: "Backend URL is not configured." },
            { status: 500 }
        );
    }

    const formData = await req.formData();
    console.log("[proxy/voice] formData keys:", [...formData.keys()]);

    const target = `${BACKEND_URL}/voice`;
    console.log("[proxy/voice] forwarding to:", target);
    const t0 = Date.now();

    let upstream: Response;
    try {
        upstream = await fetch(target, {
            method: "POST",
            body: formData,
            signal: AbortSignal.timeout(30_000),
        });
    } catch (err: any) {
        console.error(`[proxy/voice] fetch threw after ${Date.now() - t0}ms:`, err?.message);
        return NextResponse.json(
            { error: "The AI backend is unreachable. Please try again.", detail: err?.message },
            { status: 503 }
        );
    }

    console.log(`[proxy/voice] upstream responded ${upstream.status} in ${Date.now() - t0}ms`);

    if (!upstream.ok) {
        const text = await upstream.text().catch(() => "");
        console.error(`[proxy/voice] upstream error body:`, text);
        return NextResponse.json(
            { error: `Backend error (${upstream.status}).`, detail: text },
            { status: upstream.status }
        );
    }

    const data = await upstream.json();
    console.log("[proxy/voice] success, returning response");
    return NextResponse.json(data);
}
