import Link from "next/link";
import Navbar from "../../components/common/Navbar";

export default function SkillsJourney() {
  const timeline = [
    {
      period: "Present",
      date: "26",
      title: "Full-Stack Developer & AI Specialist",
      skills: ["Next.js", "NestJS", "AI Integration", "LangChain", "LangGraph"],
      description: "Working as a full-stack developer with expertise across Next.js + NestJS architectures, scalable backend systems, and AI-driven applications with agent-based workflows.",
      isCurrent: true
    },
    {
      period: "August 2025",
      date: "25",
      title: "AI-Powered Applications & Agent Frameworks",
      skills: ["LangChain", "LangGraph", "LLM Integration", "AI Agents", "Automation"],
      description: "Entered the domain of AI-based application development, building LLM-powered applications with AI agents and multi-step workflows, focusing on intelligent automation and decision-making systems.",
      isCurrent: false
    },
    {
      period: "Mid-2025",
      date: "25",
      title: "Full-Stack Evolution with Next.js & NestJS",
      skills: ["Next.js", "NestJS", "SSR/SSG", "Dependency Injection", "Clean Architecture"],
      description: "Migrated to Next.js for production-grade frontend (SSR, SSG, API routes) and adopted NestJS for modular, scalable enterprise backends. This phase marked a move toward clean architecture and production-level systems.",
      isCurrent: false
    },
    {
      period: "December 2024",
      date: "24",
      title: "Frontend Development with React",
      skills: ["React.js", "Component Architecture", "State Management", "Performance Optimization"],
      description: "Expanded into frontend development after gaining solid backend experience. Focused on component-based UI development, state management, and API integration, transitioning to full-stack development.",
      isCurrent: false
    },
    {
      period: "December 2023",
      date: "23",
      title: "Backend Development Foundation",
      skills: ["JavaScript", "Node.js", "Express.js", "REST APIs", "Databases"],
      description: "Began professional journey learning JavaScript with backend focus. Built multiple projects including RESTful APIs, authentication systems, and database-driven applications.",
      isCurrent: false
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-white">
      <Navbar />

      <section className="pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-24 sm:mb-32">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-8">&gt; _Evolution</p>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 text-heading">
              Technical <br className="hidden md:block" /> Evolution
            </h1>
            <p className="text-lg sm:text-xl text-foreground/60 font-light max-w-2xl leading-relaxed">
              From low-level backend foundations to sophisticated AI-native architectures.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-[23px] md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-white/5" />

            <div className="space-y-24">
              {timeline.map((item, index) => (
                <div key={index} className="relative">
                  {/* Date Bubble */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 z-10">
                    <div className={`w-12 h-12 flex items-center justify-center font-mono text-[10px] font-bold tracking-widest border ${item.isCurrent
                      ? 'bg-accent text-background border-accent'
                      : 'bg-[#030406] text-foreground/40 border-white/10'
                      }`}>
                      {item.date}
                    </div>
                  </div>

                  <div className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                    <div className={`w-full md:w-5/12 pt-16 md:pt-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className={`p-8 border rounded-none transition-all duration-500 ${item.isCurrent
                        ? 'border-accent/30 bg-white/[0.01]'
                        : 'border-white/5 bg-[#030406] hover:border-white/10'
                        }`}>
                        <div className="flex items-center justify-between mb-6">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-accent">
                            {item.period}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-medium tracking-tight leading-tight mb-4 text-heading">
                          {item.title}
                        </h3>
                        <p className="text-sm font-light leading-relaxed mb-8 text-foreground/60">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-[9px] font-mono tracking-widest text-foreground/40 border border-white/5"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 sm:mt-32 text-center">
            <Link
              href="/"
              className="px-12 py-4 bg-transparent border border-white/10 text-heading font-mono text-xs tracking-widest uppercase hover:bg-white/5 transition-all rounded-none"
            >
              Return_To_Base
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/20">
          &copy; 2025 EL_NOIR_SYSTEM
        </p>
      </footer>
    </div>
  );
}
