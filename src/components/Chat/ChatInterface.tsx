"use client";

import { useState } from "react";

export default function ChatInterface() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    { role: "ai", content: "Hi! I'm Mudasir's AI agent. Ask me about his experience, projects, or availability." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      
      setMessages((prev) => [...prev, { role: "ai", content: data.response }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "ai", content: "Sorry, I am having trouble connecting to the AI service right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 max-w-[calc(100vw-2rem)] bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
      <div className="bg-zinc-800 p-4 border-b border-zinc-700 font-semibold text-zinc-100 flex justify-between items-center">
        <span>Portfolio AI</span>
        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Online</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
              msg.role === "user" 
                ? "bg-blue-600 text-white rounded-br-none" 
                : "bg-zinc-800 text-zinc-200 rounded-bl-none"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 text-zinc-400 max-w-[80%] rounded-2xl rounded-bl-none px-4 py-2 animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="p-3 bg-zinc-800 border-t border-zinc-700 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
}
