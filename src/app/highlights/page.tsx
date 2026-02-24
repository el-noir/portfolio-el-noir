"use client";

import Link from "next/link";
import Navbar from "../../components/common/Navbar";

export default function Highlights() {

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.8s ease-out forwards; animation-delay: 0.2s; opacity: 0; }
        .animate-fade-in { animation: fadeInUp 0.5s ease-out forwards; }
      `}} />

      <div className="min-h-screen bg-white text-black">
        <Navbar />

        <section className="pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-6">
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

            <div className="border-t border-black/10 pt-12 sm:pt-16 animate-fade-in-left">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">BlackHat MEA 2025</h2>
                <p className="text-lg sm:text-xl opacity-60 uppercase tracking-widest">Riyadh, Saudi Arabia</p>
                <p className="text-sm opacity-40 mt-1">Conference Participant & CTF Competitor</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4 text-base sm:text-lg opacity-80 leading-relaxed max-w-3xl">
                  <p>
                    Participated in one of the world's premier cybersecurity conferences, competing in Capture The Flag (CTF) challenges that tested advanced security skills and problem-solving abilities.
                  </p>
                  <p>
                    Engaged with industry leaders, security researchers, and technical professionals from around the globe, gaining valuable insights into cutting-edge cybersecurity trends and emerging threat landscapes.
                  </p>
                </div>

                <div className="mt-8 pt-8 border-l border-black/20 pl-6 sm:pl-8">
                  <h3 className="text-sm uppercase tracking-widest font-bold mb-6 opacity-60">Impact on AI & Development Journey</h3>
                  <ul className="space-y-4 text-sm sm:text-base opacity-80">
                    <li className="flex gap-4 items-start">
                      <span className="font-bold shrink-0 opacity-40">01/</span>
                      <span>Deepened understanding of secure application development, crucial for building production-grade AI systems that handle sensitive data.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="font-bold shrink-0 opacity-40">02/</span>
                      <span>Learned advanced threat modeling techniques now applied to AI agent architectures and LLM-powered applications to prevent prompt injection and data leakage.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="font-bold shrink-0 opacity-40">03/</span>
                      <span>Enhanced problem-solving and analytical skills through CTF challenges, directly translating to debugging complex AI workflows and optimizing system performance.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="font-bold shrink-0 opacity-40">04/</span>
                      <span>Gained exposure to security best practices that now guide development of enterprise-grade backend systems with robust authentication.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-black/10 pt-12 sm:pt-16 animate-fade-in-right">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">Community Leadership</h2>
                <p className="text-lg sm:text-xl opacity-60 uppercase tracking-widest">OutSecure</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4 text-base sm:text-lg opacity-80 leading-relaxed max-w-3xl">
                  <p>
                    Lead the organization and execution of cybersecurity-focused events, including competitive CTF challenges designed to enhance practical security skills among participants.
                  </p>
                  <p>
                    Conduct technical workshops and training sessions for junior developers and aspiring security professionals, covering topics from secure coding practices to vulnerability assessment.
                  </p>
                  <p>
                    Foster a collaborative learning environment by coordinating knowledge-sharing sessions, hackathons, and industry networking events that bridge the gap between academia and professional cybersecurity practice.
                  </p>
                </div>

                <div className="mt-8 pt-8 border-l border-black/20 pl-6 sm:pl-8">
                  <h3 className="text-sm uppercase tracking-widest font-bold mb-6 opacity-60">Impact on Professional Growth</h3>
                  <ul className="space-y-4 text-sm sm:text-base opacity-80">
                    <li className="flex gap-4 items-start">
                      <span className="font-bold shrink-0 opacity-40">01/</span>
                      <span>Developed strong communication and leadership skills essential for technical team collaboration and project management in development environments.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="font-bold shrink-0 opacity-40">02/</span>
                      <span>Enhanced ability to break down complex technical concepts while teaching workshops, improving code documentation and knowledge transfer in development teams.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="font-bold shrink-0 opacity-40">03/</span>
                      <span>Built a strong professional network across the cybersecurity and development communities, leading to collaborative opportunities and technical mentorship.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="font-bold shrink-0 opacity-40">04/</span>
                      <span>Gained expertise in event planning, stakeholder management, and community building that translates to effective project coordination.</span>
                    </li>
                  </ul>
                </div>
              </div>
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
        </section>
      </div>
    </>
  );
}
