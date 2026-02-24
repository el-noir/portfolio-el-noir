"use client";

import { useState, useEffect } from "react";
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
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "ai", content: "Noir AI: A premium personal concierge and intelligent assistant dedicated to showcasing Mudasir Shah's portfolio and orchestrating seamless professional connections. How may I assist you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("Thinking...");
    const [showTrace, setShowTrace] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showGreeting, setShowGreeting] = useState(false);

    // Fade in the greeting bubble after 3 seconds
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => {
                setShowGreeting(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Generate a unique session ID once per page load
    const [sessionId] = useState(() =>
        typeof window !== 'undefined' ? crypto.randomUUID?.() || Math.random().toString(36).substring(2) : "default"
    );

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setInput("");

        let newLoadingText = "Thinking...";
        const lowerMsg = userMessage.toLowerCase();
        if (lowerMsg.includes("book") || lowerMsg.includes("schedule") || lowerMsg.includes("meeting") || lowerMsg.includes("time") || lowerMsg.includes("tomorrow") || lowerMsg.includes("pm") || lowerMsg.includes("am")) {
            newLoadingText = "Booking... this can take some time 🗓️";
        } else if (lowerMsg.includes("project") || lowerMsg.includes("portfolio")) {
            newLoadingText = "Fetching portfolio details... 📂";
        }
        setLoadingText(newLoadingText);

        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    session_id: sessionId
                }),
            });

            if (!response.ok) throw new Error("Failed to fetch");

            const data = await response.json();

            setMessages((prev) => [...prev, {
                role: "ai",
                content: data.response,
                trace: data.trace
            }]);
        } catch (error: any) {
            console.error(error);
            setMessages((prev) => [...prev, { role: "ai", content: `Error: ${error.message}. Is the backend running?` }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Proactive Greeting Bubble */}
            {!isOpen && showGreeting && (
                <div className="fixed bottom-24 right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white border border-gray-100 shadow-2xl rounded-2xl p-4 w-72 relative animate-bounce-subtle">
                        <button
                            onClick={() => setShowGreeting(false)}
                            className="absolute -top-2 -right-2 bg-white border border-gray-100 shadow-md rounded-full p-1 text-gray-400 hover:text-black transition-colors"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <div className="flex items-start gap-3">
                            <div className="bg-black text-white rounded-full p-2 h-8 w-8 flex items-center justify-center text-xs shrink-0">
                                🤖
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-black uppercase tracking-widest">Noir AI</p>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Hi! I can showcase Mudasir's work or schedule a meeting for you. 👋
                                </p>
                            </div>
                        </div>
                        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45"></div>
                    </div>
                </div>
            )}

            {/* Floating Action Button */}
            <button
                onClick={() => {
                    setIsOpen(true);
                    setShowGreeting(false);
                }}
                className={`fixed bottom-6 right-6 z-40 bg-black border border-gray-200 text-white rounded-full p-4 shadow-2xl hover:bg-gray-800 transition-all duration-500 hover:scale-110 flex items-center justify-center font-bold overflow-hidden ${isOpen ? 'opacity-0 pointer-events-none translate-y-10' : 'opacity-100 translate-y-0'}`}
            >
                {/* Pulse Effect */}
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full animate-ping-slow bg-white/20"></span>
                )}

                <div className="relative flex items-center">
                    <span className="text-2xl leading-none sm:mr-2">💬</span>
                    <span className="hidden sm:inline">Chat with Noir AI</span>
                </div>
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-4 right-4 z-50 w-[450px] max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[calc(100vh-2rem)] transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}>
                <div className="bg-gray-50 border-b border-gray-200 p-4 font-semibold text-gray-900 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span>Noir AI</span>
                        <span className="text-[10px] bg-black/5 text-gray-600 px-2 py-0.5 rounded-full uppercase tracking-tighter">Testing Mode</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowTrace(!showTrace)}
                            className={`text-[10px] px-2 py-1 rounded border transition-colors ${showTrace ? 'bg-black text-white border-black' : 'text-gray-500 border-gray-300 hover:text-black'}`}
                        >
                            {showTrace ? "Hide Trace" : "Show Trace"}
                        </button>
                        <span className="text-[10px] text-green-500">● Online</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-black transition-colors ml-1 p-1 focus:outline-none focus:ring-1 focus:ring-gray-300 rounded"
                            aria-label="Close chat"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans bg-white">
                    {messages.map((msg, i) => (
                        <div key={i} className="space-y-2">
                            <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "user"
                                    ? "bg-black text-white rounded-br-none"
                                    : "bg-gray-100 text-gray-900 rounded-bl-none"
                                    }`}>
                                    {msg.role === "user" ? (
                                        msg.content
                                    ) : (
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                                                a: ({ node, ...props }) => <a className="text-blue-600 hover:text-blue-800 underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                                                ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2 space-y-1" {...props} />,
                                                ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-2 space-y-1" {...props} />,
                                                li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                                                h1: ({ node, ...props }) => <h1 className="text-lg font-bold mb-2 mt-3" {...props} />,
                                                h2: ({ node, ...props }) => <h2 className="text-base font-bold mb-2 mt-3" {...props} />,
                                                h3: ({ node, ...props }) => <h3 className="text-sm font-bold mb-2 mt-2" {...props} />,
                                                strong: ({ node, ...props }) => <strong className="font-semibold text-black" {...props} />,
                                                code: ({ className, children, ...props }: any) => {
                                                    const match = /language-(\w+)/.exec(className || "");
                                                    return !match ? (
                                                        <code className="bg-black/5 px-1.5 py-0.5 rounded text-[0.9em] font-mono" {...props}>
                                                            {children}
                                                        </code>
                                                    ) : (
                                                        <pre className="bg-black/5 p-3 rounded-lg overflow-x-auto text-[0.85em] mb-2 font-mono border border-gray-200">
                                                            <code className={className} {...props}>
                                                                {children}
                                                            </code>
                                                        </pre>
                                                    );
                                                }
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    )}
                                </div>
                            </div>

                            {showTrace && msg.trace && (
                                <div className="mx-2 p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-[10px] text-gray-500 space-y-1 mt-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Agent:</span>
                                        <span className="text-black font-bold uppercase tracking-widest">{msg.trace.active_agent || 'Unknown'}</span>
                                    </div>
                                    <div className="flex justify-between pt-1">
                                        <span className="text-blue-500">Intent:</span>
                                        <span>{msg.trace.intent_detected}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-purple-500">Tool:</span>
                                        <span>{msg.trace.tool_selected}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-green-600">Latency:</span>
                                        <span>{msg.trace.total_latency_ms}ms</span>
                                    </div>
                                    <div className="pt-1 mt-1 border-t border-gray-200">
                                        <span className="text-gray-400 block mb-1">Args:</span>
                                        <pre className="text-gray-600 overflow-x-auto">
                                            {JSON.stringify(msg.trace.tool_args, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 text-gray-600 max-w-[80%] rounded-2xl rounded-bl-none px-4 py-3 animate-pulse text-sm font-medium border border-gray-200 shadow-sm">
                                {loadingText}
                            </div>
                        </div>
                    )}
                </div>

                <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-200 flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g. 'Show me your React projects' or 'How do I hire you?'"
                        className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-black hover:bg-gray-800 text-white rounded-xl px-5 py-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                    >
                        Send
                    </button>
                </form>
            </div>
        </>
    );
}
