import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30; // seconds — gives Railway time to respond

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
    console.log("[proxy/chat] incoming request");
    console.log("[proxy/chat] BACKEND_URL:", BACKEND_URL ?? "NOT SET");

    if (!BACKEND_URL) {
        console.error("[proxy/chat] BACKEND_URL env var is missing");
        return NextResponse.json(
            { response: "Backend URL is not configured.", trace: { error: true } },
            { status: 500 }
        );
    }

    let body: unknown;
    try {
        body = await req.json();
        console.log("[proxy/chat] parsed body:", JSON.stringify(body));
    } catch (err: any) {
        console.error("[proxy/chat] failed to parse request body:", err?.message);
        return NextResponse.json({ response: "Invalid request body.", trace: { error: true } }, { status: 400 });
    }

    const target = `${BACKEND_URL}/chat`;
    console.log("[proxy/chat] forwarding to:", target);
    const t0 = Date.now();

    let upstream: Response;
    try {
        upstream = await fetch(target, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(25_000),
        });
    } catch (err: any) {
        console.error(`[proxy/chat] fetch threw after ${Date.now() - t0}ms:`, err?.message);
        return NextResponse.json(
            { response: "The AI backend is unreachable. Please try again in a moment.", trace: { error: true, detail: err?.message } },
            { status: 503 }
        );
    }

    console.log(`[proxy/chat] upstream responded ${upstream.status} in ${Date.now() - t0}ms`);

    if (!upstream.ok) {
        const text = await upstream.text().catch(() => "");
        console.error(`[proxy/chat] upstream error body:`, text);
        return NextResponse.json(
            { response: `Backend error (${upstream.status}). Please try again in a moment.`, trace: { error: true, detail: text } },
            { status: upstream.status }
        );
    }

    const data = await upstream.json();
    console.log("[proxy/chat] success, returning response");
    return NextResponse.json(data);
}
