import Link from "next/link";

export default function SkillsJourney() {
  const timeline = [
    {
      period: "Present",
      date: "2026",
      title: "Full-Stack Developer & AI Specialist",
      icon: "🎯",
      skills: ["Next.js", "NestJS", "AI Integration", "LangChain", "LangGraph"],
      description: "Working as a full-stack developer with expertise across Next.js + NestJS architectures, scalable backend systems, and AI-driven applications with agent-based workflows.",
      isCurrent: true
    },
    {
      period: "August 2025",
      date: "2025",
      title: "AI-Powered Applications & Agent Frameworks",
      icon: "🤖",
      skills: ["LangChain", "LangGraph", "LLM Integration", "AI Agents", "Automation"],
      description: "Entered the domain of AI-based application development, building LLM-powered applications with AI agents and multi-step workflows, focusing on intelligent automation and decision-making systems.",
      isCurrent: false
    },
    {
      period: "Mid-2025",
      date: "2025",
      title: "Full-Stack Evolution with Next.js & NestJS",
      icon: "⚡",
      skills: ["Next.js", "NestJS", "SSR/SSG", "Dependency Injection", "Clean Architecture"],
      description: "Migrated to Next.js for production-grade frontend (SSR, SSG, API routes) and adopted NestJS for modular, scalable enterprise backends. This phase marked a move toward clean architecture and production-level systems.",
      isCurrent: false
    },
    {
      period: "December 2024",
      date: "2024",
      title: "Frontend Development with React",
      icon: "⚛️",
      skills: ["React.js", "Component Architecture", "State Management", "Performance Optimization"],
      description: "Expanded into frontend development after gaining solid backend experience. Focused on component-based UI development, state management, and API integration, transitioning to full-stack development.",
      isCurrent: false
    },
    {
      period: "December 20, 2023",
      date: "2023",
      title: "Backend Development Foundation",
      icon: "🚀",
      skills: ["JavaScript", "Node.js", "Express.js", "REST APIs", "Databases"],
      description: "Began professional journey learning JavaScript with backend focus. Built multiple projects including RESTful APIs, authentication systems, and database-driven applications.",
      isCurrent: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link href="/" className="text-xl sm:text-2xl font-bold hover:opacity-60 transition-opacity">
            MS
          </Link>
          <div className="flex gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm font-medium overflow-x-auto">
            <Link href="/#about" className="hover:text-gray-600 transition-colors whitespace-nowrap">About</Link>
            <Link href="/#experience" className="hover:text-gray-600 transition-colors whitespace-nowrap hidden sm:inline">Experience</Link>
            <Link href="/#projects" className="hover:text-gray-600 transition-colors whitespace-nowrap">Projects</Link>
            <Link href="/highlights" className="hover:text-gray-600 transition-colors whitespace-nowrap">Highlights</Link>
            <Link href="/skills" className="text-black font-bold border-b-2 border-black whitespace-nowrap">Skills</Link>
            <Link href="/#contact" className="hover:text-gray-600 transition-colors whitespace-nowrap">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-20">
            <div className="inline-block mb-3 sm:mb-4">
              <span className="text-4xl sm:text-6xl">🚀</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent px-4">
              Skill Development Journey
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              From backend foundations to AI-powered applications
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center line - hidden on mobile, shown on md+ */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-black via-gray-400 to-gray-200" />
            
            {/* Left line for mobile */}
            <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-black via-gray-400 to-gray-200" />

            {/* Timeline items */}
            <div className="space-y-8 sm:space-y-12 md:space-y-16">
              {timeline.map((item, index) => (
                <div key={index} className="relative">
                  {/* Timeline node */}
                  <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 top-6 sm:top-8">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-lg ${
                      item.isCurrent 
                        ? 'bg-black ring-4 ring-black ring-opacity-20 animate-pulse' 
                        : 'bg-white border-4 border-gray-300'
                    }`}>
                      {item.icon}
                    </div>
                  </div>

                  {/* Content - stacked on mobile, alternating on desktop */}
                  <div className={`md:flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                    <div className={`w-full md:w-5/12 pl-20 sm:pl-24 md:pl-0 ${index % 2 === 0 ? 'md:pr-8 lg:pr-12' : 'md:pl-8 lg:pl-12'}`}>
                      <div className={`bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                        item.isCurrent ? 'ring-2 ring-black' : 'border border-gray-200'
                      }`}>
                        {/* Card header */}
                        <div className={`px-4 sm:px-6 py-3 sm:py-4 ${
                          item.isCurrent 
                            ? 'bg-gradient-to-r from-black to-gray-800 text-white' 
                            : 'bg-gradient-to-r from-gray-50 to-white'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-bold uppercase tracking-wider ${
                              item.isCurrent ? 'text-white/80' : 'text-gray-500'
                            }`}>
                              {item.period}
                            </span>
                            {item.isCurrent && (
                              <span className="px-2 sm:px-3 py-1 bg-white text-black text-xs font-bold rounded-full uppercase tracking-wide">
                                Current
                              </span>
                            )}
                          </div>
                          <h3 className={`text-lg sm:text-xl md:text-2xl font-bold leading-tight ${
                            item.isCurrent ? 'text-white' : 'text-gray-900'
                          }`}>
                            {item.title}
                          </h3>
                        </div>

                        {/* Card body */}
                        <div className="p-4 sm:p-6">
                          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                            {item.description}
                          </p>

                          {/* Skills tags */}
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {item.skills.map((skill, i) => (
                              <span
                                key={i}
                                className={`px-2 sm:px-3 py-1 text-xs font-semibold rounded-full ${
                                  item.isCurrent
                                    ? 'bg-black text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                } transition-colors`}
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

          {/* Footer */}
          <div className="mt-12 sm:mt-16 md:mt-20 text-center">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-sm sm:text-base"
            >
              <span>←</span>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
