"use client";

import Link from "next/link";
import Navbar from "../../components/common/Navbar";

export default function Highlights() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-white">
      <Navbar />

      <section className="pt-32 sm:pt-40 pb-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-24 sm:mb-32">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-8">&gt; _Archive</p>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-heading">
              Strategic <br className="hidden md:block" /> Engagements
            </h1>
            <p className="text-lg sm:text-xl text-foreground/60 font-light max-w-2xl leading-relaxed mt-8">
              Documenting key milestones in cybersecurity, system architecture, and technical leadership.
            </p>
          </div>

          <div className="space-y-[1px] bg-white/5 border border-white/5">
            {/* BlackHat MEA */}
            <div className="bg-[#030406] p-8 sm:p-16 hover:bg-white/[0.01] transition-all duration-500 group">
              <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 items-start">
                <div className="lg:w-1/3">
                  <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-4 text-heading group-hover:text-accent transition-colors">BlackHat MEA</h2>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">Riyadh, Saudi Arabia // 2025</p>
                  <p className="font-mono text-[10px] mt-2 text-accent/60 uppercase tracking-widest">CTF Competitor & Participant</p>
                </div>

                <div className="lg:w-2/3 space-y-8">
                  <div className="space-y-6 text-base font-light text-foreground/80 leading-relaxed max-w-3xl">
                    <p>
                      Participated in one of the world&apos;s premier cybersecurity conferences, competing in Capture The Flag (CTF) challenges that tested advanced security skills and problem-solving abilities.
                    </p>
                    <p>
                      Engaged with industry leaders and security researchers, gaining valuable insights into emerging threat landscapes—expertise now applied to architecting secure AI platform infrastructures.
                    </p>
                  </div>

                  <div className="pt-10 border-t border-white/5">
                    <h3 className="font-mono text-[9px] uppercase tracking-widest font-bold mb-8 text-foreground/30">_Impact_Log</h3>
                    <ul className="space-y-6">
                      <li className="flex gap-6 items-start">
                        <span className="font-mono text-accent text-xs shrink-0 [01]">01</span>
                        <p className="text-sm font-light text-foreground/60 leading-relaxed">
                          Deepened understanding of secure application development for production-grade AI systems handling high-value enterprise data.
                        </p>
                      </li>
                      <li className="flex gap-6 items-start">
                        <span className="font-mono text-accent text-xs shrink-0 [02]">02</span>
                        <p className="text-sm font-light text-foreground/60 leading-relaxed">
                          Applied advanced threat modeling to AI agent architectures, mitigating risks like prompt injection and multi-hop data leakage.
                        </p>
                      </li>
                      <li className="flex gap-6 items-start">
                        <span className="font-mono text-accent text-xs shrink-0 [03]">03</span>
                        <p className="text-sm font-light text-foreground/60 leading-relaxed">
                          Refined analytical frameworks for debugging complex distributed workflows and optimizing asynchronous system synchronization.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Leadership */}
            <div className="bg-[#030406] p-8 sm:p-16 hover:bg-white/[0.01] transition-all duration-500 group">
              <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 items-start">
                <div className="lg:w-1/3">
                  <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-4 text-heading group-hover:text-accent transition-colors">Technical Leadership</h2>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">OutSecure // Riyadh</p>
                  <p className="font-mono text-[10px] mt-2 text-accent/60 uppercase tracking-widest">Community Architecture</p>
                </div>

                <div className="lg:w-2/3 space-y-8">
                  <div className="space-y-6 text-base font-light text-foreground/80 leading-relaxed max-w-3xl">
                    <p>
                      Spearheaded the organization of specialized cybersecurity events and CTF challenges in Riyadh, fostering a technical community focused on practical system defense.
                    </p>
                    <p>
                      Designed and led workshops for professional developers on secure coding practices, bridging the gap between functional engineering and security mitigation.
                    </p>
                  </div>

                  <div className="pt-10 border-t border-white/5">
                    <h3 className="font-mono text-[9px] uppercase tracking-widest font-bold mb-8 text-foreground/30">_Leadership_Output</h3>
                    <ul className="space-y-6">
                      <li className="flex gap-6 items-start">
                        <span className="font-mono text-accent text-xs shrink-0 [01]">01</span>
                        <p className="text-sm font-light text-foreground/60 leading-relaxed">
                          Cultivated cross-functional collaboration skills required to lead engineering squads in complex platform migrations.
                        </p>
                      </li>
                      <li className="flex gap-6 items-start">
                        <span className="font-mono text-accent text-xs shrink-0 [02]">02</span>
                        <p className="text-sm font-light text-foreground/60 leading-relaxed">
                          Standardized technical knowledge transfer protocols, significantly improving onboarding speed for junior engineering associates.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
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

      <footer className="py-12 text-center border-t border-white/5">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/20">
            &copy; 2025 EL_NOIR_SYSTEM
          </p>
      </footer>
    </div>
  );
}
