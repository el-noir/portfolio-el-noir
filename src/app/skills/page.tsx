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
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-24 sm:mb-32 animate-fade-in-up">
            <p className="text-sm uppercase tracking-widest opacity-60 mb-8">Evolution</p>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-none mb-6">
              Skill Development <br className="hidden md:block" /> Journey
            </h1>
            <p className="text-lg sm:text-xl opacity-80 max-w-2xl leading-relaxed">
              From backend foundations to AI-powered applications.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-black/10" />

            <div className="md:hidden absolute left-6 top-0 bottom-0 w-px bg-black/10" />

            <div className="space-y-16 sm:space-y-24 md:space-y-32">
              {timeline.map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 top-6 sm:top-8">
                    <div className={`w-12 h-12 flex items-center justify-center text-lg font-bold tracking-tighter ${item.isCurrent
                        ? 'bg-black text-white'
                        : 'bg-white text-black border border-black/10'
                      }`}>
                      {item.date}
                    </div>
                  </div>

                  <div className={`md:flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                    <div className={`w-full md:w-5/12 pl-20 sm:pl-24 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className={`border transition-all duration-300 ${item.isCurrent ? 'border-black' : 'border-black/10 hover:border-black/30'
                        }`}>
                        <div className={`px-6 sm:px-8 py-6 ${item.isCurrent
                            ? 'bg-black text-white'
                            : 'bg-white'
                          }`}>
                          <div className="flex items-center justify-between mb-4">
                            <span className={`text-xs font-bold uppercase tracking-widest ${item.isCurrent ? 'text-white/60' : 'text-black/40'
                              }`}>
                              {item.period}
                            </span>
                            {item.isCurrent && (
                              <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">
                                Current
                              </span>
                            )}
                          </div>
                          <h3 className={`text-xl sm:text-2xl font-bold leading-tight mb-4 ${item.isCurrent ? 'text-white' : 'text-black'
                            }`}>
                            {item.title}
                          </h3>
                          <p className={`text-sm sm:text-base leading-relaxed mb-6 ${item.isCurrent ? 'text-white/80' : 'text-black/60'
                            }`}>
                            {item.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill, i) => (
                              <span
                                key={i}
                                className={`px-3 py-1 text-xs font-bold uppercase tracking-widest ${item.isCurrent
                                    ? 'bg-white/10 text-white border border-white/20'
                                    : 'bg-black/5 text-black border border-black/10'
                                  }`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 sm:mt-24 md:mt-32 text-center animate-fade-in-up">
            <Link
              href="/"
              className="inline-flex items-center gap-4 px-8 sm:px-12 py-4 bg-black text-white text-sm tracking-widest uppercase transition-all duration-300 hover:bg-gray-800"
            >
              <span className="text-lg leading-none">&larr;</span>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
