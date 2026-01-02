"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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
      <style dangerouslySetInnerHTML={{__html: `
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
          className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-all duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div 
            className={`relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-500 ${
              isVisible ? 'scale-100 translate-y-0' : 'scale-90 translate-y-4'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-6">
              <div className="animate-bounce">
                <span className="text-6xl">🚀</span>
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-black/10 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold">MS</h1>
          <div className="flex gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm font-medium overflow-x-auto">
            <a href="#about" className="hover:text-gray-600 transition-colors whitespace-nowrap">About</a>
            <a href="#experience" className="hover:text-gray-600 transition-colors whitespace-nowrap hidden sm:inline">Experience</a>
            <a href="#projects" className="hover:text-gray-600 transition-colors whitespace-nowrap">Projects</a>
            <Link href="/highlights" className="hover:text-gray-600 transition-colors whitespace-nowrap">Highlights</Link>
            <Link href="/skills" className="hover:text-gray-600 transition-colors whitespace-nowrap">Skills</Link>
            <a href="#contact" className="hover:text-gray-600 transition-colors whitespace-nowrap">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl w-full">
          <div className="space-y-6">
            <div className="flex justify-center mb-8 animate-scale-in">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 hover-lift">
                <Image
                  src="/profile-mudasir.png"
                  alt="Mudasir Shah"
                  fill
                  className="rounded-full object-cover border-4 border-black"
                  priority
                />
              </div>
            </div>
            <div className="space-y-2 animate-fade-in-up delay-100">
              <p className="text-sm uppercase tracking-widest opacity-60">Full-Stack Developer & AI Specialist</p>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
                Mudasir Shah
              </h1>
            </div>
            <p className="text-xl md:text-2xl max-w-3xl opacity-80 leading-relaxed animate-fade-in-up delay-200">
              Full-Stack Developer specializing in scalable SaaS applications, AI-powered systems, and production-grade solutions. Expert in Next.js, NestJS, LangChain, and modern web technologies.
            </p>
            <div className="flex gap-4 pt-4 animate-fade-in-up delay-300">
              <a 
                href="https://github.com/el-noir" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 bg-black text-white hover:bg-black/80 transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/mudasir-shah43" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-10 animate-fade-in-up">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
            <div className="space-y-4 sm:space-y-6 animate-fade-in-left delay-100">
              <p className="text-base sm:text-lg opacity-80 leading-relaxed">
                Started my journey in December 2023 with backend development, mastering Node.js and Express. Evolved into full-stack development with React and Next.js, then advanced to building AI-powered applications using LangChain and LangGraph. Today, I deliver production-ready SaaS solutions combining scalable architectures, intelligent automation, and clean code practices.
              </p>
              <p className="text-base sm:text-lg opacity-80 leading-relaxed">
                I specialize in API design, database architecture, AI agent workflows, and secure, maintainable code, with a proven track record of delivering robust, high-performance applications from concept to deployment.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-xs sm:text-sm opacity-60 mb-1">Location</p>
                  <p className="text-sm sm:text-base font-medium">Emaralds Height C01, Islamabad</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm opacity-60 mb-1">Email</p>
                  <p className="text-sm sm:text-base font-medium break-all">mudasirshah9777@gmail.com</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm opacity-60 mb-1">Phone</p>
                  <p className="text-sm sm:text-base font-medium">+92 339 0081 0055</p>
                </div>
              </div>
            </div>
            <div className="animate-fade-in-right delay-200">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Technical Skills</h3>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <p className="text-sm sm:text-base font-semibold mb-2">Programming Languages</p>
                  <p className="text-sm sm:text-base opacity-80">JavaScript (ES6+), TypeScript, Python, C++, SQL</p>
                </div>
                <div>
                  <p className="text-sm sm:text-base font-semibold mb-2">Frontend Development</p>
                  <p className="text-sm sm:text-base opacity-80">HTML5, CSS3, Tailwind CSS, Bootstrap, React.js (Redux Toolkit, ShadCN UI, DaisyUI)</p>
                </div>
                <div>
                  <p className="text-sm sm:text-base font-semibold mb-2">Backend Development</p>
                  <p className="text-sm sm:text-base opacity-80">Node.js, Nest.js, Prisma ORM, Express.js (REST APIs), Inngest, WebSockets, Socket.IO</p>
                </div>
                <div>
                  <p className="text-sm sm:text-base font-semibold mb-2">Databases</p>
                  <p className="text-sm sm:text-base opacity-80">MongoDB (Mongoose), PostgreSQL, Appwrite, Firebase, SQL Server</p>
                </div>
                <div>
                  <p className="text-sm sm:text-base font-semibold mb-2">Tools & Software</p>
                  <p className="text-sm sm:text-base opacity-80">Git, GitHub, Docker, Postman, Firebase, Vite</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-10 animate-fade-in-up">Experience</h2>
          <div className="space-y-8 sm:space-y-12">
            <div className="border-l-2 border-black pl-4 sm:pl-6 md:pl-8 pb-8 sm:pb-12 animate-fade-in-left delay-100 hover-lift">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 sm:gap-4 mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">Web Developer</h3>
                  <p className="text-base sm:text-lg opacity-80">Out-Secure</p>
                </div>
                <p className="text-xs sm:text-sm opacity-60">Oct 2024 - Present</p>
              </div>
              <ul className="space-y-2 sm:space-y-3 opacity-80 text-sm sm:text-base">
                <li>• Architected SaaS applications using Next.js and NestJS</li>
                <li>• Designed scalable REST APIs and database architectures handling high-volume traffic</li>
                <li>• Implemented secure authentication, authorization, and data protection mechanisms</li>
                <li>• Optimized application performance and database queries for enterprise-grade solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-10 animate-fade-in-up">Featured Projects</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* UptimeGuard */}
            <div className="border border-black/10 p-5 sm:p-6 md:p-8 hover:border-black transition-colors group hover-lift animate-fade-in-up delay-100">
              <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold group-hover:opacity-60 transition-opacity">UptimeGuard</h3>
                <a 
                  href="https://github.com/el-noir/Sites_Uptime" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1 shrink-0"
                  aria-label="View UptimeGuard on GitHub"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </div>
              <p className="opacity-80 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                Decentralized uptime monitoring with crypto-verified validators. Tracks website status in real-time with historical analytics.
              </p>
              <p className="text-xs sm:text-sm opacity-60">React.js, Express.js, Node.js, PostgreSQL, WebSockets, Prisma</p>
            </div>

            {/* GoPlanIt */}
            <div className="border border-black/10 p-5 sm:p-6 md:p-8 hover:border-black transition-colors group hover-lift animate-fade-in-up delay-200">
              <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold group-hover:opacity-60 transition-opacity">GoPlanIt</h3>
                <a 
                  href="https://github.com/el-noir/GoPlanIt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1 shrink-0"
                  aria-label="View GoPlanIt on GitHub"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </div>
              <p className="opacity-80 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                Generated personalized AI travel itineraries using real-time flight and attraction data. Delivered tailored recommendations, simplifying travel planning.
              </p>
              <p className="text-xs sm:text-sm opacity-60">React, Node.js, Express, DaisyUI, Gemini API, Inngest, MongoDB</p>
            </div>

            {/* Tempify */}
            <div className="border border-black/10 p-5 sm:p-6 md:p-8 hover:border-black transition-colors group hover-lift animate-fade-in-up delay-300">
              <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold group-hover:opacity-60 transition-opacity">Tempify</h3>
                <a 
                  href="https://github.com/el-noir/Tempify" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1 shrink-0"
                  aria-label="View Tempify on GitHub"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </div>
              <p className="opacity-80 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                Enabled store launches in under 5 minutes, reducing setup friction. Boosted sales with time-limited storefronts that drive urgency.
              </p>
              <p className="text-xs sm:text-sm opacity-60">Next.js, ShadCN UI, MongoDB, Stripe</p>
            </div>

            {/* Airgpt */}
            <div className="border border-black/10 p-5 sm:p-6 md:p-8 hover:border-black transition-colors group hover-lift animate-fade-in-up delay-400">
              <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold group-hover:opacity-60 transition-opacity">Airgpt</h3>
                <a 
                  href="https://github.com/el-noir/au-chatbot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1 shrink-0"
                  aria-label="View Airgpt on GitHub"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </div>
              <p className="opacity-80 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                Retrieval-Augmented Generation (RAG) system built for Air University. Answers user queries by searching and reasoning over ingested documents.
              </p>
              <p className="text-xs sm:text-sm opacity-60">Next.js, React.js, FastAPI, Python, Qdrant, LangChain</p>
            </div>

            {/* StoreMaster */}
            <div className="border border-black/10 p-5 sm:p-6 md:p-8 hover:border-black transition-colors group hover-lift animate-fade-in-up delay-500">
              <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold group-hover:opacity-60 transition-opacity">StoreMaster</h3>
                <a 
                  href="https://github.com/el-noir/retail-system-frontend" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1 shrink-0"
                  aria-label="View StoreMaster on GitHub"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </div>
              <p className="opacity-80 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                Unified, real-time platform for inventory, procurement, and sales. Automated stock, procurement, and billing processes.
              </p>
              <p className="text-xs sm:text-sm opacity-60">Next.js, NestJS, PostgreSQL, Prisma, Stripe</p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights & Engagements Section */}
      <section id="highlights" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-10 animate-fade-in-up">Highlights & Engagements</h2>
          <div className="space-y-8 sm:space-y-12">
            {/* BlackHat MEA */}
            <div className="border-l-2 border-black pl-4 sm:pl-6 md:pl-8 pb-8 sm:pb-12 animate-fade-in-left delay-100 hover-lift">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">BlackHat MEA 2025</h3>
                <p className="text-base sm:text-lg opacity-80 mb-1">Riyadh, Saudi Arabia</p>
                <p className="text-xs sm:text-sm opacity-60">Conference Participant & CTF Competitor</p>
              </div>
              <div className="space-y-2 sm:space-y-3 opacity-80">
                <p className="leading-relaxed text-sm sm:text-base">
                  Participated in one of the world's premier cybersecurity conferences, competing in Capture The Flag (CTF) challenges that tested advanced security skills and problem-solving abilities.
                </p>
                <p className="leading-relaxed text-sm sm:text-base">
                  Engaged with industry leaders, security researchers, and technical professionals from around the globe, gaining valuable insights into cutting-edge cybersecurity trends and emerging threat landscapes.
                </p>
                <div className="mt-4 pt-4 border-t border-black/10">
                  <p className="text-xs sm:text-sm font-semibold mb-2 opacity-90">Impact on AI & Development Journey:</p>
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li className="flex gap-2">
                      <span className="opacity-60 shrink-0">→</span>
                      <span>Deepened understanding of secure application development, crucial for building production-grade AI systems that handle sensitive data</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="opacity-60 shrink-0">→</span>
                      <span>Learned advanced threat modeling techniques now applied to AI agent architectures and LLM-powered applications to prevent prompt injection and data leakage</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="opacity-60 shrink-0">→</span>
                      <span>Enhanced problem-solving and analytical skills through CTF challenges, directly translating to debugging complex AI workflows and optimizing system performance</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="opacity-60 shrink-0">→</span>
                      <span>Gained exposure to security best practices that now guide development of enterprise-grade backend systems with robust authentication and authorization</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* OutSecure Community Leadership */}
            <div className="border-l-2 border-black pl-4 sm:pl-6 md:pl-8 animate-fade-in-right delay-200 hover-lift">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Community Leadership & Event Management</h3>
                <p className="text-base sm:text-lg opacity-80">OutSecure</p>
              </div>
              <div className="space-y-2 sm:space-y-3 opacity-80">
                <p className="leading-relaxed text-sm sm:text-base">
                  Lead the organization and execution of cybersecurity-focused events, including competitive CTF challenges designed to enhance practical security skills among participants.
                </p>
                <p className="leading-relaxed text-sm sm:text-base">
                  Conduct technical workshops and training sessions for junior developers and aspiring security professionals, covering topics from secure coding practices to vulnerability assessment.
                </p>
                <p className="leading-relaxed text-sm sm:text-base">
                  Foster a collaborative learning environment by coordinating knowledge-sharing sessions, hackathons, and industry networking events that bridge the gap between academia and professional cybersecurity practice.
                </p>
                <div className="mt-4 pt-4 border-t border-black/10">
                  <p className="text-xs sm:text-sm font-semibold mb-2 opacity-90">Impact on Professional Growth:</p>
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li className="flex gap-2">
                      <span className="opacity-60 shrink-0">→</span>
                      <span>Developed strong communication and leadership skills essential for technical team collaboration and project management in development environments</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="opacity-60 shrink-0">→</span>
                      <span>Enhanced ability to break down complex technical concepts while teaching workshops, improving code documentation and knowledge transfer in development teams</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="opacity-60 shrink-0">→</span>
                      <span>Built a strong professional network across the cybersecurity and development communities, leading to collaborative opportunities and technical mentorship</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="opacity-60 shrink-0">→</span>
                      <span>Gained expertise in event planning, stakeholder management, and community building that translates to effective project coordination and client communication in software development</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-10 animate-fade-in-up">Education</h2>
          <div className="space-y-6 sm:space-y-8">
            <div className="border-l-2 border-black pl-4 sm:pl-6 md:pl-8 animate-fade-in-left delay-100 hover-lift">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">Bachelor's of Science in Computer Science</h3>
                  <p className="text-base sm:text-lg opacity-80">Air University Islamabad</p>
                </div>
                <p className="text-xs sm:text-sm opacity-60">Sep 2023 - Present</p>
              </div>
              <p className="opacity-80 text-sm sm:text-base">Specializing in Web Development and Backend Technologies</p>
            </div>

            <div className="border-l-2 border-black pl-4 sm:pl-6 md:pl-8 animate-fade-in-left delay-200 hover-lift">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">Intermediate in Computer Science</h3>
                  <p className="text-base sm:text-lg opacity-80">Govt Degree College Mingora Swat</p>
                </div>
                <p className="text-xs sm:text-sm opacity-60">Aug 2021 - Aug 2023</p>
              </div>
              <p className="opacity-80 text-sm sm:text-base">Studied Programming in C++</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-black/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 animate-fade-in-up">Let's Work Together</h2>
          <p className="text-base sm:text-lg md:text-xl opacity-80 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 animate-fade-in-up delay-100">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <a 
            href="mailto:mudasirshah9777@gmail.com" 
            className="inline-block px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-black text-white text-base sm:text-lg hover:bg-black/80 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up delay-200"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 border-t border-black/10 animate-fade-in-up">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <p className="opacity-60 text-sm sm:text-base">© 2026 Mudasir Shah. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6 text-sm sm:text-base">
            <a href="https://github.com/el-noir" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/mudasir-shah43" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
              LinkedIn
            </a>
            <a href="mailto:mudasirshah9777@gmail.com" className="opacity-60 hover:opacity-100 transition-opacity">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
