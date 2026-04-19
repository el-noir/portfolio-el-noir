import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mudasirshah.com'),
  title: "Mudasir Shah - Full-Stack Developer & AI Specialist",
  description: "Full-Stack Developer specializing in scalable SaaS applications, AI-powered systems, and production-grade solutions. Expert in Next.js, NestJS, LangChain, and modern web technologies.",
  keywords: [
    "Mudasir Shah",
    "Full-Stack Developer",
    "AI Specialist",
    "Next.js Developer",
    "NestJS Developer",
    "LangChain",
    "LangGraph",
    "Web Development",
    "Software Engineer",
    "AI Applications"
  ],
  authors: [{ name: "Mudasir Shah" }],
  creator: "Mudasir Shah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mudasirshah.com",
    siteName: "Mudasir Shah Portfolio",
    title: "Mudasir Shah - Full-Stack Developer & AI Specialist",
    description: "Full-Stack Developer specializing in scalable SaaS applications, AI-powered systems, and production-grade solutions.",
    images: [
      {
        url: "/profile-mudasir.png",
        width: 1200,
        height: 630,
        alt: "Mudasir Shah - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mudasir Shah - Full-Stack Developer & AI Specialist",
    description: "Full-Stack Developer specializing in scalable SaaS applications, AI-powered systems, and production-grade solutions.",
    images: ["/profile-mudasir.png"],
  },
  icons: {
    icon: "/profile-mudasir.png",
    apple: "/profile-mudasir.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
