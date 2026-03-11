"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Trace {
    intent_detected: string;
    tool_selected: string;
    tool_args: any;
    tool_latency_ms: number;
    total_latency_ms: number;
    active_agent?: string;
}

interface Message {
    role: "user" | "ai";
    content: string;
    trace?: Trace;
    isVoice?: boolean;
    timestamp: Date;
}

function TypingDots() {
    return (
        <div className="flex items-center gap-1 px-1 py-0.5">
            {[0, 1, 2].map((i) => (
                <span
                    key={i}
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full inline-block animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
                />
            ))}
        </div>
    );
}

function formatTime(date: Date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function MicIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
        </svg>
    );
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "ai",
        content: "Hi! I'm **Noir AI** \u2014 Mudasir Shah's personal concierge. I can walk you through his work or book a meeting with him. How can I help?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("Thinking...");
    const [showTrace, setShowTrace] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showGreeting, setShowGreeting] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingSeconds, setRecordingSeconds] = useState(0);
    const [isAtBottom, setIsAtBottom] = useState(true);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const [sessionId] = useState(() =>
        typeof window !== "undefined"
            ? crypto.randomUUID?.() || Math.random().toString(36).substring(2)
            : "default"
    );

    // Auto-scroll to bottom on new messages
    const scrollToBottom = useCallback((smooth = true) => {
        messagesEndRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });
    }, []);

    useEffect(() => {
        if (isAtBottom) scrollToBottom();
    }, [messages, isLoading, isAtBottom, scrollToBottom]);

    // Track whether user has scrolled up
    const handleScroll = () => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
        setIsAtBottom(atBottom);
    };

    // Greeting bubble delay
    useEffect(() => {
        if (!isOpen) {
            const t = setTimeout(() => setShowGreeting(true), 3000);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    // Recording timer
    useEffect(() => {
        if (isRecording) {
            setRecordingSeconds(0);
            recordingTimerRef.current = setInterval(() => {
                setRecordingSeconds((s) => s + 1);
            }, 1000);
        } else {
            if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
        }
        return () => {
            if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
        };
    }, [isRecording]);

    const formatRecordingTime = (s: number) =>
        `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mimeType = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4";
            const recorder = new MediaRecorder(stream, { mimeType });
            audioChunksRef.current = [];
            recorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
            recorder.onstop = handleVoiceSend;
            mediaRecorderRef.current = recorder;
            recorder.start();
            setIsRecording(true);
        } catch {
            alert("Microphone permission denied.");
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        mediaRecorderRef.current?.stream.getTracks().forEach((t) => t.stop());
        setIsRecording(false);
    };

    const handleVoiceSend = async () => {
        const mimeType = audioChunksRef.current[0]?.type || "audio/webm";
        const ext = mimeType.includes("mp4") ? "m4a" : "webm";
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        const formData = new FormData();
        formData.append("audio", blob, `recording.${ext}`);
        formData.append("session_id", sessionId);

        setIsLoading(true);
        setLoadingText("Transcribingâ€¦");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/voice`, { method: "POST", body: formData });
            if (!response.ok) throw new Error("Voice request failed");
            const data = await response.json();

            setMessages((prev) => [
                ...prev,
                { role: "user", content: data.transcript, isVoice: true, timestamp: new Date() },
                { role: "ai", content: data.response, trace: data.trace, timestamp: new Date() },
            ]);

            if (data.audio_base64) {
                const binary = atob(data.audio_base64);
                const bytes = new Uint8Array(binary.length);
                for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
                const audioBlob = new Blob([bytes], { type: "audio/mpeg" });
                const url = URL.createObjectURL(audioBlob);
                const audio = new Audio(url);
                audio.onended = () => URL.revokeObjectURL(url);
                audio.play().catch(() => {});
            }
        } catch (error: any) {
            setMessages((prev) => [
                ...prev,
                { role: "ai", content: `Sorry, I couldn't process that voice message. Please try again.`, timestamp: new Date() },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isRecording) return;

        const userMessage = input;
        setMessages((prev) => [...prev, { role: "user", content: userMessage, timestamp: new Date() }]);
        setInput("");

        const lower = userMessage.toLowerCase();
        if (lower.includes("book") || lower.includes("schedule") || lower.includes("meeting") || lower.includes("tomorrow") || /\d+(am|pm)/.test(lower)) {
            setLoadingText("Checking calendarâ€¦");
        } else if (lower.includes("project") || lower.includes("portfolio") || lower.includes("skill")) {
            setLoadingText("Fetching detailsâ€¦");
        } else {
            setLoadingText("Thinkingâ€¦");
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage, session_id: sessionId }),
            });
            if (!response.ok) throw new Error("Failed to fetch");
            const data = await response.json();
            setMessages((prev) => [...prev, { role: "ai", content: data.response, trace: data.trace, timestamp: new Date() }]);
        } catch (error: any) {
            setMessages((prev) => [...prev, { role: "ai", content: "Connection error â€” is the backend running?", timestamp: new Date() }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Greeting bubble */}
            {!isOpen && showGreeting && (
                <div className="fixed bottom-24 right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white border border-gray-100 shadow-2xl rounded-2xl p-4 w-72 relative">
                        <button
                            onClick={() => setShowGreeting(false)}
                            className="absolute -top-2 -right-2 bg-white border border-gray-100 shadow-md rounded-full p-1 text-gray-400 hover:text-black transition-colors"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="flex items-start gap-3">
                            <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shrink-0">N</div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-black uppercase tracking-widest">Noir AI</p>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Hi! Ask me about Mudasir's work, or book a meeting with him. ðŸ‘‹
                                </p>
                            </div>
                        </div>
                        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45" />
                    </div>
                </div>
            )}

            {/* FAB */}
            <button
                onClick={() => { setIsOpen(true); setShowGreeting(false); }}
                className={`fixed bottom-6 right-6 z-40 bg-black text-white rounded-full p-4 shadow-2xl hover:bg-gray-800 transition-all duration-500 hover:scale-110 flex items-center justify-center font-bold overflow-hidden ${isOpen ? "opacity-0 pointer-events-none translate-y-10" : "opacity-100 translate-y-0"}`}
            >
                {!isOpen && <span className="absolute inset-0 rounded-full animate-ping bg-white/10" />}
                <div className="relative flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                    <span className="hidden sm:inline text-sm">Chat with Noir AI</span>
                </div>
            </button>

            {/* Chat window */}
            <div className={`fixed bottom-4 right-4 z-50 w-[420px] max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[calc(100vh-2rem)] transition-all duration-300 origin-bottom-right ${isOpen ? "scale-100 opacity-100" : "scale-50 opacity-0 pointer-events-none"}`}>

                {/* Header */}
                <div className="bg-white border-b border-gray-100 px-4 py-3 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold">N</div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 leading-none">Noir AI</p>
                            <p className="text-[11px] text-green-500 mt-0.5 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
                                Online
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowTrace(!showTrace)}
                            className={`text-[10px] px-2 py-1 rounded-lg border transition-colors ${showTrace ? "bg-black text-white border-black" : "text-gray-400 border-gray-200 hover:border-gray-400 hover:text-gray-700"}`}
                        >
                            Trace
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-black transition-colors p-1 rounded-lg hover:bg-gray-100"
                            aria-label="Close"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50/40"
                >
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                            <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                {/* Avatar */}
                                {msg.role === "ai" && (
                                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 mb-0.5">N</div>
                                )}
                                {/* Bubble */}
                                <div className={`relative rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                                    msg.role === "user"
                                        ? "bg-black text-white rounded-br-sm"
                                        : "bg-white text-gray-900 rounded-bl-sm border border-gray-100 shadow-sm"
                                }`}>
                                    {/* Voice badge */}
                                    {msg.isVoice && (
                                        <span className="inline-flex items-center gap-1 text-[10px] font-medium mb-1 opacity-60">
                                            <MicIcon className="w-2.5 h-2.5" /> Voice
                                        </span>
                                    )}
                                    {msg.role === "user" ? (
                                        <p>{msg.content}</p>
                                    ) : (
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                p: ({ node, ...props }) => <p className="mb-1.5 last:mb-0 leading-relaxed" {...props} />,
                                                a: ({ node, ...props }) => <a className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                                                ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-1.5 space-y-0.5" {...props} />,
                                                ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-1.5 space-y-0.5" {...props} />,
                                                li: ({ node, ...props }) => <li className="pl-0.5" {...props} />,
                                                strong: ({ node, ...props }) => <strong className="font-semibold text-gray-900" {...props} />,
                                                code: ({ className, children, ...props }: any) => {
                                                    const match = /language-(\w+)/.exec(className || "");
                                                    return !match ? (
                                                        <code className="bg-gray-100 px-1 py-0.5 rounded text-[0.88em] font-mono" {...props}>{children}</code>
                                                    ) : (
                                                        <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto text-[0.82em] mb-1.5 font-mono border border-gray-200">
                                                            <code className={className} {...props}>{children}</code>
                                                        </pre>
                                                    );
                                                },
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    )}
                                </div>
                            </div>
                            {/* Timestamp */}
                            <span className={`text-[10px] text-gray-400 px-1 ${msg.role === "user" ? "pr-2" : "pl-8"}`}>
                                {formatTime(msg.timestamp)}
                            </span>
                            {/* Trace */}
                            {showTrace && msg.trace && (
                                <div className={`w-[85%] p-2.5 bg-white border border-gray-200 rounded-xl font-mono text-[10px] text-gray-500 space-y-1 ${msg.role === "user" ? "self-end" : "ml-8"}`}>
                                    <div className="flex justify-between"><span className="text-gray-400">Agent:</span><span className="font-bold text-gray-800">{msg.trace.active_agent}</span></div>
                                    <div className="flex justify-between"><span className="text-blue-500">Intent:</span><span>{msg.trace.intent_detected}</span></div>
                                    <div className="flex justify-between"><span className="text-purple-500">Tool:</span><span>{msg.trace.tool_selected}</span></div>
                                    <div className="flex justify-between"><span className="text-green-600">Latency:</span><span>{msg.trace.total_latency_ms}ms</span></div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isLoading && (
                        <div className="flex items-end gap-2">
                            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0">N</div>
                            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm px-3.5 py-3">
                                <TypingDots />
                                <p className="text-[10px] text-gray-400 mt-1">{loadingText}</p>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Scroll to bottom button */}
                {!isAtBottom && (
                    <button
                        onClick={() => { setIsAtBottom(true); scrollToBottom(); }}
                        className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 hover:bg-gray-800 transition-colors z-10"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                        New messages
                    </button>
                )}

                {/* Input bar */}
                <div className="shrink-0 bg-white border-t border-gray-100">
                    {/* Recording indicator */}
                    {isRecording && (
                        <div className="px-4 pt-3 pb-1 flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-xs font-medium text-red-500">Recording {formatRecordingTime(recordingSeconds)}</span>
                            <span className="text-xs text-gray-400 ml-auto">Tap mic to send</span>
                        </div>
                    )}
                    <form onSubmit={sendMessage} className="p-3 flex gap-2 items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isRecording || isLoading}
                            placeholder={isRecording ? "Recordingâ€¦" : "Ask about Mudasir or book a meetingâ€¦"}
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all disabled:opacity-50"
                        />
                        {/* Mic button */}
                        <button
                            type="button"
                            onClick={isRecording ? stopRecording : startRecording}
                            disabled={isLoading && !isRecording}
                            title={isRecording ? "Stop & send" : "Voice input"}
                            className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                                isRecording
                                    ? "bg-red-500 text-white shadow-lg shadow-red-200"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                            } disabled:opacity-40 disabled:cursor-not-allowed`}
                        >
                            {isRecording && <span className="absolute inset-0 rounded-xl bg-red-400 animate-ping opacity-50" />}
                            <MicIcon className="w-4 h-4 relative z-10" />
                        </button>
                        {/* Send button */}
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim() || isRecording}
                            className="w-9 h-9 bg-black hover:bg-gray-800 text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 shrink-0"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
