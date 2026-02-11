'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

interface LessonLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode; // The text content
  visual: ReactNode;   // The sticky visualization
}

export default function LessonLayout({ title, subtitle, children, visual }: LessonLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 glass-panel z-50 flex items-center px-6 justify-between border-b border-glass-border mx-4 mt-4">
        <Link href="/" className="text-xl font-bold tracking-tighter hover:opacity-100 transition-opacity">
          <span className="text-color-text">Intuition</span>
          <span className="text-primary">.Math</span>
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden md:block text-sm font-mono text-text-dim">
            {title}
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row pt-28 min-h-screen px-4 md:px-8 gap-8">

        {/* Left: Narrative Scroll */}
        <div className="w-full lg:w-1/2 min-h-screen flex flex-col pt-8 pb-32 max-w-2xl mx-auto lg:mx-0">
          <header className="mb-12 text-center lg:text-left">
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tighter"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-lg md:text-xl text-text-dim"
              >
                {subtitle}
              </motion.p>
            )}
          </header>

          <div className="prose prose-invert prose-lg max-w-none 
            prose-headings:text-color-text prose-headings:font-heading prose-headings:tracking-tight
            prose-p:text-text-dim prose-p:leading-relaxed
            prose-strong:text-color-text prose-strong:font-bold
            prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1 prose-code:rounded
          ">
            {children}
          </div>

          {/* Footer Navigation */}
          <div className="mt-auto pt-12 border-t border-glass-border">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all font-bold">
              <ArrowLeft className="w-4 h-4" /> Back to Library
            </Link>
          </div>
        </div>

        {/* Right: Sticky Visualization */}
        <div className="hidden lg:block w-1/2 h-[calc(100vh-10rem)] sticky top-28">
          <div className="w-full h-full glass-panel overflow-hidden relative shadow-2xl shadow-primary/5 border border-glass-border rounded-3xl">
            {visual}
          </div>
        </div>
      </main>
    </div>
  );
}
