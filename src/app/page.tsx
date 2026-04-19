"use client";

import Image from "next/image";
import Link from "next/link";
import ChatInterface from "../components/Chat/ChatInterface";
import Navbar from "../components/common/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-accent/30 selection:text-white">
      <Navbar />

      <div className="relative">
        {/* Minimalist Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
          <div className="max-w-4xl mx-auto text-center z-10">
            <div className="animate-fade-in-up">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6 block font-bold">
                Deploying Intelligence
              </span>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-heading tracking-tighter leading-[0.9] mb-8">
                Building the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Next Generation</span> <br />
                of AI Platforms.
              </h1>
              <p className="text-lg sm:text-xl text-foreground font-light leading-relaxed max-w-2xl mx-auto mb-10 opacity-80">
                Focused on architecting scalable, secure backend systems and sophisticated AI-native interfaces.
                Based in Riyadh, Engineering globally.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/#services"
                  className="px-8 py-3 bg-white text-background font-mono text-xs tracking-widest uppercase transition-all duration-300 hover:bg-white/90 rounded-none border border-white"
                >
                  View Systems
                </Link>
                <Link
                  href="/#contact"
                  className="px-8 py-3 bg-transparent text-heading font-mono text-xs tracking-widest uppercase transition-all duration-300 hover:bg-white/5 border border-white/10 rounded-none"
                >
                  Connect
                </Link>
              </div>
            </div>
          </div>

          {/* Subtle bottom indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/40">Scroll_Module</span>
            <div className="w-px h-12 bg-white/10"></div>
          </div>
        </section>

        {/* Services / Expertise - Sharp Minimalist Bento */}
        <section id="services" className="py-24 sm:py-32 px-4 sm:px-6 relative border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 sm:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="font-mono text-[10px] uppercase tracking-widest text-accent mb-4">&gt; _Engineering_Stack</h2>
                <h3 className="text-4xl sm:text-5xl font-medium text-heading tracking-tight leading-none">
                  Architecting resilient <br /> digital infrastructure.
                </h3>
              </div>
              <p className="text-sm font-light text-foreground/60 max-w-xs leading-relaxed uppercase tracking-wider font-mono">
                [ Protocol 01 ] <br />
                End-to-end sovereignty <br />
                from data to edge.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-[1px] bg-white/5 border border-white/5">
              {/* Service 1: AI & LLM Systems */}
              <div className="md:col-span-8 bg-background p-8 sm:p-12 hover:bg-white/[0.02] transition-colors duration-500 group">
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-12">
                    <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">01 . System_Intelligence</span>
                    <h4 className="text-3xl font-medium text-heading mt-6 mb-4 group-hover:text-accent transition-colors">AI & LLM Orchestration</h4>
                    <p className="text-lg text-foreground font-light leading-relaxed max-w-xl">
                      Developing custom LangChain and LangGraph workflows. Building specialized agents with complex RAG implementation and long-term memory architectures.
                    </p>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {["LangChain", "OpenAI", "Vector DB", "RAG"].map((tag) => (
                      <span key={tag} className="px-3 py-1 border border-white/5 font-mono text-[9px] uppercase tracking-widest text-foreground/40">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Service 2: Backend Architecture */}
              <div className="md:col-span-4 bg-background p-8 sm:p-12 hover:bg-white/[0.02] transition-colors duration-500 group">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">02 . Core_Infrastructure</span>
                    <h4 className="text-2xl font-medium text-heading mt-6 mb-4">Scalable Backend Engineering</h4>
                    <p className="text-sm text-foreground/60 font-light leading-relaxed">
                      Microservices, RESTful & GraphQL API design, and functional database schemas built with NestJS and Node.js.
                    </p>
                  </div>
                  <div className="mt-8 flex gap-3 flex-wrap">
                    {["NestJS", "PostgreSQL", "Redis"].map((tag) => (
                      <span key={tag} className="px-3 py-1 border border-white/5 font-mono text-[9px] uppercase tracking-widest text-foreground/40">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Service 3: Security */}
              <div className="md:col-span-4 bg-background p-8 sm:p-12 hover:bg-white/[0.02] transition-colors duration-500 group">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">03 . Defense_Protocol</span>
                    <h4 className="text-2xl font-medium text-heading mt-6 mb-4">Security-First Development</h4>
                    <p className="text-sm text-foreground/60 font-light leading-relaxed">
                      Drawing from BlackHat competition experience to build production-ready applications protected against specialized threats.
                    </p>
                  </div>
                  <div className="mt-8 flex gap-3 flex-wrap">
                    {["AuthZ", "JWT", "Pentesting"].map((tag) => (
                      <span key={tag} className="px-3 py-1 border border-white/5 font-mono text-[9px] uppercase tracking-widest text-foreground/40">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Service 4: Full-Stack SaaS */}
              <div className="md:col-span-8 bg-background p-8 sm:p-12 hover:bg-white/[0.02] transition-colors duration-500 group">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">04 . Surface_Logic</span>
                    <h4 className="text-3xl font-medium text-heading mt-6 mb-4">Next.js SaaS Platforms</h4>
                    <p className="text-lg text-foreground font-light leading-relaxed max-w-xl">
                      Crafting high-speed, SEO-optimized dashboards and data platforms that provide seamless user experiences across all devices.
                    </p>
                  </div>
                  <div className="mt-8 flex gap-3 flex-wrap">
                    {["Next.js 15", "TypeScript", "Tailwind"].map((tag) => (
                      <span key={tag} className="px-3 py-1 border border-white/5 font-mono text-[9px] uppercase tracking-widest text-foreground/40">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section - Minimalist Precision */}
        <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-mono text-[10px] uppercase tracking-widest text-accent mb-12">&gt; _Identity</h2>
            <div className="grid md:grid-cols-12 gap-12 sm:gap-24 items-start">
              <div className="md:col-span-4 grayscale hover:grayscale-0 transition-all duration-700 aspect-square bg-white/5 border border-white/10 overflow-hidden relative group">
                <Image
                  src="/pfp.jpg"
                  alt="Mudasir Shah"
                  fill
                  className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
              </div>
              <div className="md:col-span-8 space-y-10">
                <p className="text-2xl sm:text-3xl font-light leading-tight text-heading tracking-tight">
                  I architect systems where security meets speed. Based in Riyadh, I help teams build production-grade AI applications that actually scale.
                </p>
                <div className="w-12 h-px bg-accent"></div>
                <div className="grid sm:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <h5 className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">Philosophy</h5>
                    <p className="text-sm text-foreground/80 leading-relaxed font-light">
                      Code is meant to be read by humans and executed by machines. I prioritize maintainability and clean abstractions in every layer of the stack.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h5 className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">Background</h5>
                    <p className="text-sm text-foreground/80 leading-relaxed font-light">
                      From competing in BlackHat MEA to leading community CTFs, my foundation is built on testing and breaking systems to build better ones.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience - Clean Vertical Timeline */}
        <section id="experience" className="py-24 sm:py-32 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-mono text-[10px] uppercase tracking-widest text-accent mb-16">&gt; _Timeline</h2>
            <div className="space-y-[1px] bg-white/5 border border-white/5">
              <div className="bg-background p-8 sm:p-12 flex flex-col md:flex-row gap-8 md:items-start group hover:bg-white/[0.01] transition-colors">
                <div className="md:w-1/4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">Oct 2024 - Now</span>
                </div>
                <div className="md:w-3/4">
                  <h4 className="text-2xl font-medium text-heading mb-1 group-hover:text-accent transition-colors">Web Developer</h4>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/60 mb-6">@ Out-Secure</p>
                  <ul className="grid sm:grid-cols-2 gap-4 text-sm text-foreground/60 font-light leading-relaxed">
                    <li className="flex gap-3"><span className="text-accent shrink-0 font-mono">[+]</span>SaaS Architecture (Next.js/NestJS)</li>
                    <li className="flex gap-3"><span className="text-accent shrink-0 font-mono">[+]</span>REST/GraphQL API Scaling</li>
                    <li className="flex gap-3"><span className="text-accent shrink-0 font-mono">[+]</span>Security Mitigation (AuthN/AuthZ)</li>
                    <li className="flex gap-3"><span className="text-accent shrink-0 font-mono">[+]</span>DB Optimization (Postgres/Redis)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Final Direct Link */}
        <section id="contact" className="py-32 px-4 sm:px-6 border-t border-white/5 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="font-mono text-[10px] uppercase tracking-widest text-accent">&gt; _Connection</h2>
            <h3 className="text-5xl sm:text-6xl font-bold text-heading tracking-tighter">Ready to build.</h3>
            <p className="text-lg text-foreground/60 font-light mb-12">
              Open for specialized consulting, platform architecture, or AI integration projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:contact@el-noir.com"
                className="w-full sm:w-auto px-12 py-4 bg-white text-background font-mono text-xs tracking-widest uppercase hover:bg-white/90 transition-all rounded-none"
              >
                Send Message
              </a>
              <Link
                href="/highlights"
                className="w-full sm:w-auto px-12 py-4 bg-transparent text-heading border border-white/10 font-mono text-xs tracking-widest uppercase hover:bg-white/5 transition-all rounded-none"
              >
                View Highlights
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 text-center">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/30">
              Generated by EL_NOIR_SYSTEM &copy; 2025
            </p>
            <div className="flex gap-8 font-mono text-[9px] uppercase tracking-widest">
              <a href="#" className="text-foreground/40 hover:text-white transition-colors">Github</a>
              <a href="#" className="text-foreground/40 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-foreground/40 hover:text-white transition-colors">X / Twitter</a>
            </div>
          </div>
        </footer>
      </div>

      <ChatInterface />
    </main>
  );
}
