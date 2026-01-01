"use client";

import Link from "next/link";

export default function Highlights() {

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.8s ease-out forwards; animation-delay: 0.2s; opacity: 0; }
        .animate-shimmer { animation: shimmer 3s infinite; }
        .animate-bounce-slow { animation: bounceSlow 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulseSlow 3s ease-in-out infinite; }
        .animate-fade-in { animation: fadeInUp 0.5s ease-out forwards; }
      `}} />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-black">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
            <Link href="/" className="text-xl sm:text-2xl font-bold hover:opacity-60 transition-opacity">
              MS
            </Link>
            <div className="flex gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm font-medium overflow-x-auto">
              <Link href="/#about" className="hover:text-gray-600 transition-colors whitespace-nowrap">About</Link>
              <Link href="/#experience" className="hover:text-gray-600 transition-colors whitespace-nowrap hidden sm:inline">Experience</Link>
              <Link href="/#projects" className="hover:text-gray-600 transition-colors whitespace-nowrap">Projects</Link>
              <Link href="/highlights" className="text-black font-bold border-b-2 border-black whitespace-nowrap">Highlights</Link>
              <Link href="/skills" className="hover:text-gray-600 transition-colors whitespace-nowrap">Skills</Link>
              <Link href="/#contact" className="hover:text-gray-600 transition-colors whitespace-nowrap">Contact</Link>
            </div>
          </div>
        </nav>

        <section className="pt-20 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 sm:mb-16 animate-fade-in-up">
              <div className="inline-block mb-3 sm:mb-4 animate-bounce-slow">
                <span className="text-4xl sm:text-6xl">🏆</span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent animate-fade-in-up">
                Highlights & Engagements
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl animate-fade-in-up">
                Key achievements, conferences, and community leadership experiences that shaped my professional journey
              </p>
            </div>

            <div className="space-y-12 sm:space-y-16">
              <div className="bg-white rounded-3xl border-2 border-gray-200 overflow-hidden hover:border-gray-400 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 animate-slide-in-left">
                <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 sm:px-8 py-4 sm:py-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                  <div className="flex items-start justify-between gap-4 relative z-10">
                    <div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 animate-fade-in">BlackHat MEA 2024</h2>
                      <p className="text-lg sm:text-xl opacity-90 mb-1 animate-fade-in">Riyadh, Saudi Arabia</p>
                      <p className="text-sm sm:text-base opacity-80 animate-fade-in">Conference Participant & CTF Competitor</p>
                    </div>
                    <div className="text-4xl sm:text-5xl animate-pulse-slow">🛡️</div>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="space-y-3 text-gray-700">
                    <p className="leading-relaxed text-sm sm:text-base transform transition-all duration-300 hover:translate-x-2">
                      Participated in one of the world&apos;s premier cybersecurity conferences, competing in Capture The Flag (CTF) challenges that tested advanced security skills and problem-solving abilities.
                    </p>
                    <p className="leading-relaxed text-sm sm:text-base transform transition-all duration-300 hover:translate-x-2">
                      Engaged with industry leaders, security researchers, and technical professionals from around the globe, gaining valuable insights into cutting-edge cybersecurity trends and emerging threat landscapes.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 hover:border-gray-400 transition-all duration-300 hover:shadow-lg">
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900 flex items-center gap-2">
                      <span className="text-2xl animate-pulse-slow">💡</span>
                      <span>Impact on AI & Development Journey</span>
                    </h3>
                    <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                      <li className="flex gap-3 items-start transform transition-all duration-300 hover:translate-x-2 hover:text-black">
                        <span className="text-black font-bold shrink-0">&rarr;</span>
                        <span>Deepened understanding of secure application development, crucial for building production-grade AI systems that handle sensitive data</span>
                      </li>
                      <li className="flex gap-3 items-start transform transition-all duration-300 hover:translate-x-2 hover:text-black">
                        <span className="text-black font-bold shrink-0">&rarr;</span>
                        <span>Learned advanced threat modeling techniques now applied to AI agent architectures and LLM-powered applications to prevent prompt injection and data leakage</span>
                      </li>
                      <li className="flex gap-3 items-start transform transition-all duration-300 hover:translate-x-2 hover:text-black">
                        <span className="text-black font-bold shrink-0">&rarr;</span>
                        <span>Enhanced problem-solving and analytical skills through CTF challenges, directly translating to debugging complex AI workflows and optimizing system performance</span>
                      </li>
                      <li className="flex gap-3 items-start transform transition-all duration-300 hover:translate-x-2 hover:text-black">
                        <span className="text-black font-bold shrink-0">&rarr;</span>
                        <span>Gained exposure to security best practices that now guide development of enterprise-grade backend systems with robust authentication and authorization</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border-2 border-gray-200 overflow-hidden hover:border-gray-400 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 animate-slide-in-right">
                <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white px-6 sm:px-8 py-4 sm:py-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                  <div className="flex items-start justify-between gap-4 relative z-10">
                    <div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 animate-fade-in">Community Leadership & Event Management</h2>
                      <p className="text-lg sm:text-xl opacity-90 animate-fade-in">OutSecure</p>
                    </div>
                    <div className="text-4xl sm:text-5xl animate-pulse-slow">🎯</div>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="space-y-3 text-gray-700">
                    <p className="leading-relaxed text-sm sm:text-base transform transition-all duration-300 hover:translate-x-2">
                      Lead the organization and execution of cybersecurity-focused events, including competitive CTF challenges designed to enhance practical security skills among participants.
                    </p>
                    <p className="leading-relaxed text-sm sm:text-base transform transition-all duration-300 hover:translate-x-2">
                      Conduct technical workshops and training sessions for junior developers and aspiring security professionals, covering topics from secure coding practices to vulnerability assessment.
                    </p>
                    <p className="leading-relaxed text-sm sm:text-base transform transition-all duration-300 hover:translate-x-2">
                      Foster a collaborative learning environment by coordinating knowledge-sharing sessions, hackathons, and industry networking events that bridge the gap between academia and professional cybersecurity practice.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 hover:border-gray-400 transition-all duration-300 hover:shadow-lg">
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900 flex items-center gap-2">
                      <span className="text-2xl animate-pulse-slow">💡</span>
                      <span>Impact on Professional Growth</span>
                    </h3>
                    <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                      <li className="flex gap-3 items-start transform transition-all duration-300 hover:translate-x-2 hover:text-black">
                        <span className="text-black font-bold shrink-0">&rarr;</span>
                        <span>Developed strong communication and leadership skills essential for technical team collaboration and project management in development environments</span>
                      </li>
                      <li className="flex gap-3 items-start transform transition-all duration-300 hover:translate-x-2 hover:text-black">
                        <span className="text-black font-bold shrink-0">&rarr;</span>
                        <span>Enhanced ability to break down complex technical concepts while teaching workshops, improving code documentation and knowledge transfer in development teams</span>
                      </li>
                      <li className="flex gap-3 items-start transform transition-all duration-300 hover:translate-x-2 hover:text-black">
                        <span className="text-black font-bold shrink-0">&rarr;</span>
                        <span>Built a strong professional network across the cybersecurity and development communities, leading to collaborative opportunities and technical mentorship</span>
                      </li>
                      <li className="flex gap-3 items-start transform transition-all duration-300 hover:translate-x-2 hover:text-black">
                        <span className="text-black font-bold shrink-0">&rarr;</span>
                        <span>Gained expertise in event planning, stakeholder management, and community building that translates to effective project coordination and client communication in software development</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 sm:mt-16 md:mt-20 text-center animate-fade-in-up">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-black to-gray-800 text-white rounded-full hover:shadow-2xl transition-all duration-300 font-medium text-sm sm:text-base transform hover:scale-105"
              >
                <span>&larr;</span>
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
