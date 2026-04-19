"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: "Services", href: "/#services" },
        { name: "About", href: "/#about" },
        { name: "Experience", href: "/#experience" },
        { name: "Highlights", href: "/highlights" },
        { name: "Skills", href: "/skills" },
        { name: "Contact", href: "/#contact" },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030406] border-b border-white/5 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold text-heading tracking-tight hover:text-accent transition-colors flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-none bg-accent" />
                        MS
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-8 text-[10px] font-mono uppercase tracking-[0.2em]">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`transition-colors ${pathname === link.href || (pathname === "/" && link.href.startsWith("/#"))
                                    ? "text-accent font-bold"
                                    : "text-foreground/40 hover:text-white"
                                    }`}
                            >
                                {pathname === link.href ? `[ ${link.name} ]` : link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50 group"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <span
                            className={`block w-6 h-px bg-foreground group-hover:bg-accent transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
                                }`}
                        ></span>
                        <span
                            className={`block w-6 h-px bg-foreground transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-0" : "opacity-100"
                                }`}
                        ></span>
                        <span
                            className={`block w-6 h-px bg-foreground group-hover:bg-accent transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                                }`}
                        ></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-[#030406] z-40 transition-transform duration-500 ease-in-out md:hidden flex flex-col items-center justify-center space-y-8 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {navLinks.map((link, index) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-2xl font-mono tracking-widest uppercase transition-all duration-300 relative z-10 ${pathname === link.href || (pathname === "/" && link.href.startsWith("/#")) ? "text-accent" : "text-foreground"
                            }`}
                        style={{
                            transitionDelay: `${index * 50}ms`,
                            transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                            opacity: isMobileMenuOpen ? 1 : 0,
                        }}
                    >
                        {pathname === link.href ? `> ${link.name}` : link.name}
                    </Link>
                ))}
            </div>
        </>
    );
}
