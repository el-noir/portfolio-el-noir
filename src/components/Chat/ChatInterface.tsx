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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/voice`, { method: "POST", body: formData });
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
                audio.play().catch(() => { });
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
            setLoadingText("Checking calendar\u2026");
        } else if (lower.includes("project") || lower.includes("portfolio") || lower.includes("skill")) {
            setLoadingText("Fetching details\u2026");
        } else {
            setLoadingText("Thinking\u2026");
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
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
                <div className="fixed bottom-28 right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-[#030406] border border-white/10 shadow-2xl rounded-none p-4 w-72 relative">
                        <button
                            onClick={() => setShowGreeting(false)}
                            className="absolute -top-2 -right-2 bg-[#030406] border border-white/10 rounded-none p-1 text-foreground hover:text-white transition-colors"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="flex items-start gap-3">
                            <div className="bg-accent text-background rounded-none border border-accent w-8 h-8 flex items-center justify-center font-mono text-xs font-bold shrink-0">N</div>
                            <div className="space-y-1">
                                <p className="font-mono text-[10px] font-bold text-accent uppercase tracking-widest flex items-center gap-2">
                                    Noir AI
                                </p>
                                <p className="text-sm text-foreground/80 font-light leading-relaxed">
                                    Hi! Ask me about Mudasir&apos;s work. 👋
                                </p>
                            </div>
                        </div>
                        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-[#030406] border-r border-b border-white/10 rotate-45" />
                    </div>
                </div>
            )}

            {/* FAB */}
            <button
                onClick={() => { setIsOpen(true); setShowGreeting(false); }}
                className={`fixed bottom-6 right-6 z-40 bg-white text-background rounded-none p-4 shadow-xl hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center font-bold overflow-hidden ${isOpen ? "opacity-0 pointer-events-none translate-y-10" : "opacity-100 translate-y-0"}`}
            >
                <div className="relative flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                    <span className="hidden sm:inline font-mono text-xs uppercase tracking-widest">Connect</span>
                </div>
            </button>

            {/* Chat window */}
            <div className={`fixed bottom-4 right-4 z-50 w-[420px] max-w-[calc(100vw-2rem)] bg-[#030406] border border-white/10 rounded-none shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[calc(100vh-2rem)] transition-all duration-300 origin-bottom-right ${isOpen ? "scale-100 opacity-100" : "scale-50 opacity-0 pointer-events-none"}`}>

                {/* Header */}
                <div className="bg-white/5 border-b border-white/5 px-4 py-3 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-accent border border-accent rounded-none flex items-center justify-center text-background font-mono text-xs font-bold">N</div>
                        <div>
                            <p className="text-sm font-medium text-heading leading-none font-mono uppercase tracking-widest">Noir AI</p>
                            <p className="font-mono text-[9px] text-accent mt-1 flex items-center gap-1.5 uppercase tracking-widest">
                                <span className="w-1 h-1 bg-accent rounded-none inline-block" />
                                Online
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowTrace(!showTrace)}
                            className={`font-mono uppercase tracking-widest text-[9px] px-2 py-1 rounded-none border transition-colors ${showTrace ? "bg-accent text-background border-accent" : "text-foreground/40 border-white/10 hover:border-white/30 hover:text-white"}`}
                        >
                            Trace
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-foreground/40 hover:text-white transition-colors p-1 rounded-none hover:bg-white/5"
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
                    className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
                >
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                            <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                {/* Avatar */}
                                {msg.role === "ai" && (
                                    <div className="w-6 h-6 bg-accent rounded-none border border-accent flex items-center justify-center text-background font-mono text-[10px] font-bold shrink-0 mb-0.5">N</div>
                                )}
                                {/* Bubble */}
                                <div className={`relative rounded-none px-3.5 py-2.5 text-sm leading-relaxed ${
                                    msg.role === "user"
                                        ? "bg-white text-background font-medium"
                                        : "bg-white/5 text-foreground border border-white/10 font-light"
                                }`}>
                                    {/* Voice badge */}
                                    {msg.isVoice && (
                                        <span className={`inline-flex items-center gap-1 font-mono uppercase text-[9px] font-medium mb-1 ${msg.role === 'user' ? 'opacity-60' : 'opacity-40'}`}>
                                            <MicIcon className="w-2 h-2" /> Voice
                                        </span>
                                    )}
                                    {msg.role === "user" ? (
                                        <p>{msg.content}</p>
                                    ) : (
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                p: ({ node, ...props }) => <p className="mb-1.5 last:mb-0 leading-relaxed font-light" {...props} />,
                                                a: ({ node, ...props }) => <a className="text-accent underline hover:text-white transition-all font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                                                ul: ({ node, ...props }) => <ul className="list-square pl-4 mb-1.5 space-y-1 opacity-90" {...props} />,
                                                ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-1.5 space-y-1 font-mono text-xs opacity-90" {...props} />,
                                                li: ({ node, ...props }) => <li className="pl-0.5" {...props} />,
                                                strong: ({ node, ...props }) => <strong className="font-semibold text-heading" {...props} />,
                                                code: ({ className, children, ...props }: any) => {
                                                    const match = /language-(\w+)/.exec(className || "");
                                                    return !match ? (
                                                        <code className="bg-white/10 px-1 py-0.5 rounded-none text-[0.88em] font-mono" {...props}>{children}</code>
                                                    ) : (
                                                        <pre className="bg-background p-3 rounded-none overflow-x-auto text-[0.82em] mb-1.5 font-mono border border-white/10">
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
                            <span className={`font-mono text-[9px] uppercase tracking-wide text-foreground/30 px-1 ${msg.role === "user" ? "pr-2" : "pl-8"}`}>
                                {formatTime(msg.timestamp)}
                            </span>
                            {/* Trace */}
                            {showTrace && msg.trace && (
                                <div className={`w-[85%] p-2.5 bg-white/5 border border-white/5 rounded-none font-mono text-[9px] text-foreground/40 space-y-1 mt-1 ${msg.role === "user" ? "self-end" : "ml-8"}`}>
                                    <div className="flex justify-between"><span>Agent:</span><span className="text-accent uppercase">{msg.trace.active_agent}</span></div>
                                    <div className="flex justify-between border-t border-white/5 pt-1 mt-1"><span>Intent:</span><span>{msg.trace.intent_detected}</span></div>
                                    <div className="flex justify-between border-t border-white/5 pt-1 mt-1"><span>Latency:</span><span>{msg.trace.total_latency_ms}ms</span></div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isLoading && (
                        <div className="flex items-end gap-2">
                            <div className="w-6 h-6 bg-accent border border-accent rounded-none flex items-center justify-center text-background font-mono text-[10px] font-bold shrink-0 mb-0.5">N</div>
                            <div className="bg-white/5 border border-white/5 rounded-none px-3.5 py-3">
                                <TypingDots />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input bar */}
                <div className="shrink-0 bg-white/5 border-t border-white/5">
                    {/* Recording indicator */}
                    {isRecording && (
                        <div className="px-4 pt-3 pb-1 flex items-center gap-2 font-mono uppercase tracking-wide">
                            <span className="w-1 h-1 bg-red-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-red-500">Recording {formatRecordingTime(recordingSeconds)}</span>
                        </div>
                    )}
                    <form onSubmit={sendMessage} className="p-3 flex gap-2 items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isRecording || isLoading}
                            placeholder={isRecording ? "Processing..." : "> Query system..."}
                            className="flex-1 bg-white/5 border border-white/10 rounded-none px-3.5 py-2.5 text-sm text-foreground placeholder-foreground/20 font-mono focus:outline-none focus:border-accent transition-all disabled:opacity-50"
                        />
                        {/* Mic button */}
                        <button
                            type="button"
                            onClick={isRecording ? stopRecording : startRecording}
                            disabled={isLoading && !isRecording}
                            className={`w-10 h-10 rounded-none border flex items-center justify-center transition-all shrink-0 ${
                                isRecording
                                    ? "bg-red-500 text-white border-red-500"
                                    : "bg-white/5 text-foreground/40 border-white/10 hover:text-white hover:border-white/30"
                            } disabled:opacity-40`}
                        >
                            <MicIcon className="w-4 h-4" />
                        </button>
                        {/* Send button */}
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim() || isRecording}
                            className="w-10 h-10 bg-white hover:bg-white/90 text-background rounded-none flex items-center justify-center transition-all disabled:opacity-40 shrink-0"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
