"use client";

import { useState } from "react";

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
        { role: "ai", content: "Hi! I'm Mudasir's AI agent. Ask me about his experience, projects, or availability." }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showTrace, setShowTrace] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
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
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-40 bg-zinc-900 border border-zinc-800 text-white rounded-full p-4 shadow-2xl hover:bg-zinc-800 transition-all duration-300 hover:scale-110 flex items-center justify-center font-bold ${isOpen ? 'opacity-0 pointer-events-none scale-50' : 'opacity-100 scale-100'}`}
            >
                <span className="text-2xl leading-none sm:mr-2">💬</span>
                <span className="hidden sm:inline">Ask AI</span>
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-4 right-4 z-50 w-[450px] max-w-[calc(100vw-2rem)] bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[calc(100vh-2rem)] transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}>
                <div className="bg-zinc-800 p-4 border-b border-zinc-700 font-semibold text-zinc-100 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span>Portfolio AI</span>
                        <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-tighter">Structured Tools</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowTrace(!showTrace)}
                            className={`text-[10px] px-2 py-1 rounded border transition-colors ${showTrace ? 'bg-zinc-100 text-zinc-900 border-zinc-100' : 'text-zinc-400 border-zinc-600 hover:text-zinc-200'}`}
                        >
                            {showTrace ? "Hide Trace" : "Show Trace"}
                        </button>
                        <span className="text-[10px] text-green-400">● Online</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-zinc-400 hover:text-white transition-colors ml-1 p-1 focus:outline-none focus:ring-1 focus:ring-zinc-500 rounded"
                            aria-label="Close chat"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans">
                    {messages.map((msg, i) => (
                        <div key={i} className="space-y-2">
                            <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${msg.role === "user"
                                    ? "bg-blue-600 text-white rounded-br-none"
                                    : "bg-zinc-800 text-zinc-200 rounded-bl-none"
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>

                            {showTrace && msg.trace && (
                                <div className="mx-2 p-3 bg-zinc-950 border border-zinc-800 rounded-lg font-mono text-[10px] text-zinc-500 space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-zinc-400">Agent:</span>
                                        <span className="text-white font-bold uppercase tracking-widest">{msg.trace.active_agent || 'Unknown'}</span>
                                    </div>
                                    <div className="flex justify-between pt-1">
                                        <span className="text-blue-400">Intent:</span>
                                        <span>{msg.trace.intent_detected}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-purple-400">Tool:</span>
                                        <span>{msg.trace.tool_selected}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-green-400">Latency:</span>
                                        <span>{msg.trace.total_latency_ms}ms</span>
                                    </div>
                                    <div className="pt-1 mt-1 border-t border-zinc-800">
                                        <span className="text-zinc-400 block mb-1">Args:</span>
                                        <pre className="text-zinc-300 overflow-x-auto">
                                            {JSON.stringify(msg.trace.tool_args, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-zinc-800 text-zinc-400 max-w-[80%] rounded-2xl rounded-bl-none px-4 py-2 animate-pulse text-sm">
                                Analyzing query...
                            </div>
                        </div>
                    )}
                </div>

                <form onSubmit={sendMessage} className="p-3 bg-zinc-800 border-t border-zinc-700 flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g. 'Show me your React projects' or 'How do I hire you?'"
                        className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                    >
                        Send
                    </button>
                </form>
            </div>
        </>
    );
}
