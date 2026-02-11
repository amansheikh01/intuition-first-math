'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
      <nav className="fixed top-0 left-0 right-0 h-16 glass-panel z-50 flex items-center px-6 justify-between border-b border-white/10 mx-4 mt-4">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          <span className="text-white">Intuition</span>
          <span className="text-primary">.Math</span>
        </Link>
        <div className="text-sm font-mono text-text-dim">
           {title}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row pt-24 min-h-screen">
        
        {/* Left: Narrative Scroll */}
        <div className="w-full lg:w-1/2 px-6 lg:px-12 pb-24 z-10 relative">
          <header className="mb-12">
            <h1 className="text-4xl lg:text-5xl mb-4">{title}</h1>
            {subtitle && <p className="text-xl text-text-dim">{subtitle}</p>}
          </header>
          
          <div className="prose prose-invert prose-lg max-w-none">
            {children}
          </div>
          
           {/* Footer Navigation */}
           <div className="mt-20 pt-8 border-t border-white/10">
              <Link href="/" className="text-sm text-primary hover:underline">
                 ← Back to Library
              </Link>
           </div>
        </div>

        {/* Right: Sticky Visualization */}
        <div className="hidden lg:block w-1/2 h-[calc(100vh-6rem)] sticky top-24 px-6">
           <div className="w-full h-full glass-panel overflow-hidden relative shadow-2xl shadow-primary/5">
              {visual}
           </div>
        </div>
        
        {/* Mobile Viz Toggle (Simulated for now, purely hidden on very small screens or stacked) */}
        
      </main>
    </div>
  );
}
