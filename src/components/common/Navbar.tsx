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
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/10 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
                    <Link href="/" className="text-xl sm:text-2xl font-bold hover:opacity-60 transition-opacity">
                        MS
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-6 text-sm font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`transition-colors whitespace-nowrap uppercase tracking-widest ${pathname === link.href || (pathname === "/" && link.href.startsWith("/#"))
                                    ? "text-black"
                                    : "opacity-60 hover:opacity-100"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <span
                            className={`block w-6 h-0.5 bg-black transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
                                }`}
                        ></span>
                        <span
                            className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-0" : "opacity-100"
                                }`}
                        ></span>
                        <span
                            className={`block w-6 h-0.5 bg-black transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                                }`}
                        ></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-white z-40 transition-transform duration-500 ease-in-out md:hidden flex flex-col items-center justify-center space-y-8 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {navLinks.map((link, index) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-2xl sm:text-3xl font-bold tracking-widest uppercase transition-all duration-300 hover:text-gray-500 ${pathname === link.href ? "opacity-100" : "opacity-60"
                            }`}
                        style={{
                            transitionDelay: `${index * 50}ms`,
                            transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                            opacity: isMobileMenuOpen ? (pathname === link.href || (pathname === "/" && link.href.startsWith("/#")) ? 1 : 0.6) : 0,
                        }}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </>
    );
}
