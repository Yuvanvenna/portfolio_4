import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Venna Venkata Yuvan | Full-Stack Developer & AI Enthusiast",
  description: "Personal portfolio of Venna Venkata Yuvan, a Full-Stack Engineer and AI/ML Enthusiast specializing in SaaS development and hybrid Quantum Deep Learning.",
  keywords: [
    "Venna Venkata Yuvan",
    "Full-Stack Engineer",
    "AI Enthusiast",
    "Quantum Deep Learning",
    "React",
    "Next.js",
    "Three.js",
    "PyTorch",
    "Qiskit"
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-bg-dark text-gray-100 selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}
