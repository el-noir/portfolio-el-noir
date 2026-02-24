"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ChatInterface from "../components/Chat/ChatInterface";
import Navbar from "../components/common/Navbar";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore');

    if (!hasVisited) {
      const timer = setTimeout(() => {
        setShowModal(true);
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowModal(false);
      localStorage.setItem('hasVisitedBefore', 'true');
    }, 300);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }

        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fade-in-left { animation: fadeInLeft 0.8s ease-out forwards; }
        .animate-fade-in-right { animation: fadeInRight 0.8s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.6s ease-out forwards; }
        .animate-slide-down { animation: slideDown 0.5s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
        .delay-400 { animation-delay: 0.4s; opacity: 0; }
        .delay-500 { animation-delay: 0.5s; opacity: 0; }
        .delay-600 { animation-delay: 0.6s; opacity: 0; }
        .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hover-lift:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
      `}} />

      {showModal && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className={`relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-500 ${isVisible ? 'scale-100 translate-y-0' : 'scale-90 translate-y-4'
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-6">
              <div className="animate-bounce">

              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Want to see my skill journey?
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Explore my technical evolution from backend foundations to AI-powered applications
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/skills"
                  onClick={() => localStorage.setItem('hasVisitedBefore', 'true')}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
                >
                  Yes, Show Me! ✨
                </Link>
                <button
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-white text-black">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-4xl w-full">
            <div className="space-y-6">
              <div className="flex justify-center mb-8 animate-scale-in">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 hover-lift">
                  <Image
                    src="/"
                    alt="Mudasir Shah"
                    fill
                    className="rounded-full object-cover border-4 border-black"
                    priority
                  />
                </div>
              </div>
              <div className="space-y-2 animate-fade-in-up delay-100">
                <p className="text-sm uppercase tracking-widest opacity-60">Software Engineer & AI Solutions Expert</p>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                  I Build Systems That <br className="hidden md:block" /> Scale Your Business
                </h1>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl max-w-3xl opacity-80 leading-relaxed animate-fade-in-up delay-200">
                Hi, I'm Mudasir Shah. I turn complex problems into elegant, production-ready SaaS products and AI-powered workflows.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 animate-fade-in-up delay-300">
                <a
                  href="#contact"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-black text-white text-sm tracking-widest uppercase transition-all duration-300 hover:bg-gray-800 text-center"
                >
                  Discuss Project
                </a>
                <a
                  href="https://github.com/el-noir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 border border-black/20 hover:border-black transition-all duration-300 text-sm tracking-widest uppercase text-center"
                >
                  View Work
                </a>
                <a
                  href="https://www.linkedin.com/in/mudasir-shah43"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 border border-black/20 hover:border-black transition-all duration-300 text-sm tracking-widest uppercase text-center"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 sm:py-28 px-4 sm:px-6 border-t border-black/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-sm uppercase tracking-widest opacity-60 mb-12 sm:mb-16 animate-fade-in-up">Expertise & Focus</h2>
            <div className="flex flex-col gap-12 sm:gap-16 w-full">
              {/* Service 1 */}
              <div className="grid md:grid-cols-12 gap-6 md:gap-12 animate-fade-in-up delay-100 group">
                <div className="md:col-span-2 text-2xl font-light opacity-30 group-hover:opacity-100 transition-opacity">01/</div>
                <div className="md:col-span-4">
                  <h3 className="text-2xl sm:text-3xl font-bold">Custom SaaS<br className="hidden md:block" />Development</h3>
                </div>
                <div className="md:col-span-6">
                  <p className="opacity-80 leading-relaxed text-base sm:text-lg max-w-2xl">
                    End-to-end product development. I engineer scalable, highly performant web applications from the ground up utilizing enterprise-grade architectures in Next.js and NestJS.
                  </p>
                </div>
              </div>
              <div className="w-full h-px bg-black/10 animate-fade-in-up delay-150"></div>

              {/* Service 2 */}
              <div className="grid md:grid-cols-12 gap-6 md:gap-12 animate-fade-in-up delay-200 group">
                <div className="md:col-span-2 text-2xl font-light opacity-30 group-hover:opacity-100 transition-opacity">02/</div>
                <div className="md:col-span-4">
                  <h3 className="text-2xl sm:text-3xl font-bold">AI & Automation<br className="hidden md:block" />Systems</h3>
                </div>
                <div className="md:col-span-6">
                  <p className="opacity-80 leading-relaxed text-base sm:text-lg max-w-2xl">
                    Seamless integration of state-of-the-art LLMs, autonomous agent workflows, and deterministic automation to reduce operational friction and drive business intelligence.
                  </p>
                </div>
              </div>
              <div className="w-full h-px bg-black/10 animate-fade-in-up delay-250"></div>

              {/* Service 3 */}
              <div className="grid md:grid-cols-12 gap-6 md:gap-12 animate-fade-in-up delay-300 group">
                <div className="md:col-span-2 text-2xl font-light opacity-30 group-hover:opacity-100 transition-opacity">03/</div>
                <div className="md:col-span-4">
                  <h3 className="text-2xl sm:text-3xl font-bold">Enterprise<br className="hidden md:block" />Architecture</h3>
                </div>
                <div className="md:col-span-6">
                  <p className="opacity-80 leading-relaxed text-base sm:text-lg max-w-2xl">
                    Secure, scalable backend infrastructure and robust API design. Architected to accommodate high concurrency while protecting sensitive payloads with zero compromise on speed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 border-t border-black/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-sm uppercase tracking-widest opacity-60 mb-12 sm:mb-16 animate-fade-in-up">About Me</h2>
            <div className="grid md:grid-cols-12 gap-12 sm:gap-16">
              <div className="md:col-span-8 space-y-6 sm:space-y-8 animate-fade-in-up delay-100">
                <p className="text-xl sm:text-2xl font-light leading-relaxed">
                  I specialize in API design, functional database architecture, and secure, maintainable code. My foundation in backend development organically evolved into orchestrating complete, sophisticated SaaS platforms and novel AI integrations using LangChain and LangGraph.
                </p>
                <div className="w-16 h-px bg-black/40"></div>
                <p className="text-base sm:text-lg opacity-80 leading-relaxed max-w-3xl">
                  Having competed in cutting-edge environments like BlackHat MEA, I approach engineering with a security-first mindset. From the first line of code to global deployment, every layer is built to withstand scrutiny while delivering an uncompromised user experience.
                </p>
              </div>
              <div className="md:col-span-4 space-y-12 animate-fade-in-up delay-200">
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest opacity-60">Pillar I</h4>
                  <h5 className="font-bold text-lg">Rapid Iteration</h5>
                  <p className="text-sm opacity-80 leading-relaxed">Swift conceptualization to production MVP, prioritizing core business mechanics.</p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest opacity-60">Pillar II</h4>
                  <h5 className="font-bold text-lg">Security First</h5>
                  <p className="text-sm opacity-80 leading-relaxed">Architecting defenses into the data layer before deploying to the edge.</p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest opacity-60">Pillar III</h4>
                  <h5 className="font-bold text-lg">Clean Architecture</h5>
                  <p className="text-sm opacity-80 leading-relaxed">Modular, decoupled codebases built for future scaling and team extension.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 sm:py-28 px-4 sm:px-6 border-t border-black/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-sm uppercase tracking-widest opacity-60 mb-12 sm:mb-16 animate-fade-in-up">Experience</h2>
            <div className="space-y-16">
              <div className="grid md:grid-cols-12 gap-6 md:gap-12 animate-fade-in-up delay-100">
                <div className="md:col-span-3">
                  <p className="text-xs sm:text-sm uppercase tracking-widest opacity-60">Oct 2024 - Present</p>
                </div>
                <div className="md:col-span-9 space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold">Web Developer</h3>
                    <p className="text-base sm:text-lg opacity-80 mb-6">Out-Secure</p>
                  </div>
                  <ul className="space-y-4 opacity-80 text-sm sm:text-base leading-relaxed max-w-3xl border-l border-black/20 pl-6">
                    <li>Architected SaaS applications using Next.js and NestJS.</li>
                    <li>Designed scalable REST APIs and database architectures handling high-volume traffic.</li>
                    <li>Implemented secure authentication, authorization, and data protection mechanisms.</li>
                    <li>Optimized application performance and database queries for enterprise-grade solutions.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Works - Projects Section is already updated, skipping replacement here */}

        {/* Highlights & Engagements Section */}
        <section id="highlights" className="py-20 sm:py-32 px-4 sm:px-6 border-t border-black/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-sm uppercase tracking-widest opacity-60 mb-12 sm:mb-16 animate-fade-in-up">Highlights & Engagements</h2>

            <div className="space-y-16 sm:space-y-24">
              {/* BlackHat MEA */}
              <div className="grid md:grid-cols-12 gap-8 md:gap-12 animate-fade-in-up delay-100">
                <div className="md:col-span-4 lg:col-span-3">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">BlackHat MEA</h3>
                  <p className="text-sm uppercase tracking-widest opacity-60 mb-2">2025 &bull; Riyadh</p>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-40">CTF Competitor</p>
                </div>
                <div className="md:col-span-8 lg:col-span-9 space-y-6">
                  <p className="text-lg sm:text-xl opacity-80 leading-relaxed max-w-3xl">
                    Participated in one of the world's premier cybersecurity conferences, competing in Capture The Flag challenges that tested advanced security skills and problem-solving abilities.
                  </p>
                  <div className="pt-6 border-t border-black/10">
                    <p className="text-xs uppercase tracking-widest font-bold mb-4 opacity-60">Impact</p>
                    <ul className="space-y-3 text-sm opacity-80">
                      <li className="flex gap-4"><span className="opacity-40 font-bold">01/</span>Deepened understanding of secure application development for AI systems.</li>
                      <li className="flex gap-4"><span className="opacity-40 font-bold">02/</span>Learned advanced threat modeling techniques to prevent prompt injection.</li>
                      <li className="flex gap-4"><span className="opacity-40 font-bold">03/</span>Enhanced problem-solving skills for debugging complex AI workflows.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* OutSecure Community Leadership */}
              <div className="grid md:grid-cols-12 gap-8 md:gap-12 animate-fade-in-up delay-200">
                <div className="md:col-span-4 lg:col-span-3">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">Community Leadership</h3>
                  <p className="text-sm uppercase tracking-widest opacity-60 mb-2">OutSecure</p>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-40">Event Management</p>
                </div>
                <div className="md:col-span-8 lg:col-span-9 space-y-6">
                  <p className="text-lg sm:text-xl opacity-80 leading-relaxed max-w-3xl">
                    Lead the organization and execution of cybersecurity-focused events, including competitive CTF challenges and technical workshops for aspiring security professionals.
                  </p>
                  <div className="pt-6 border-t border-black/10">
                    <p className="text-xs uppercase tracking-widest font-bold mb-4 opacity-60">Impact</p>
                    <ul className="space-y-3 text-sm opacity-80">
                      <li className="flex gap-4"><span className="opacity-40 font-bold">01/</span>Developed strong communication and leadership skills for team collaboration.</li>
                      <li className="flex gap-4"><span className="opacity-40 font-bold">02/</span>Enhanced ability to break down complex concepts while teaching workshops.</li>
                      <li className="flex gap-4"><span className="opacity-40 font-bold">03/</span>Built a strong professional network leading to collaborative opportunities.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 sm:mt-24 pt-12 border-t border-black/10 text-center animate-fade-in-up">
              <Link
                href="/highlights"
                className="inline-flex items-center gap-4 px-8 py-4 bg-black text-white text-sm tracking-widest uppercase transition-all duration-300 hover:bg-gray-800"
              >
                View Full Details
                <span className="text-lg leading-none">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 bg-black text-white">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up tracking-tight">Ready to Build?</h2>
            <p className="text-lg sm:text-xl opacity-60 mb-12 max-w-2xl animate-fade-in-up delay-100 font-light">
              Let's engineer your next digital product with precision, performance, and impact.
            </p>
            <a
              href="mailto:mudasirshah9777@gmail.com"
              className="inline-block w-full sm:w-auto px-6 sm:px-10 py-4 bg-white text-black text-sm tracking-widest uppercase transition-all duration-300 hover:bg-gray-200 hover:scale-105 animate-fade-in-up delay-200"
            >
              Start the Conversation
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 border-t border-black/10 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <p className="opacity-40 text-sm tracking-widest uppercase">© 2026 Mudasir Shah.</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm uppercase tracking-widest font-medium">
              <a href="https://github.com/el-noir" target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/mudasir-shah43" target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity">
                LinkedIn
              </a>
              <a href="mailto:mudasirshah9777@gmail.com" className="opacity-40 hover:opacity-100 transition-opacity">
                Email
              </a>
            </div>
          </div>
        </footer>

        {/* Portfolio AI Chat */}
        <ChatInterface />
      </div>
    </>
  );
}
