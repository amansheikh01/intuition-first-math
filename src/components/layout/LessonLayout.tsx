'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
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
    <div className="flex flex-col min-h-screen bg-color-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-divider z-50 flex items-center px-6 justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-1">
          <span className="text-color-text">Intuition</span>
          <span className="text-primary">.Math</span>
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden md:block text-sm font-medium text-text-dim uppercase tracking-wider">
            {title}
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row pt-24 min-h-screen px-4 md:px-8 gap-12 max-w-[1400px] mx-auto w-full">

        {/* Left: Narrative Scroll */}
        <div className="w-full lg:w-1/2 flex flex-col pt-8 pb-32">
          <header className="mb-12 text-left border-l-4 border-primary pl-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-color-text text-left">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-text-dim max-w-2xl text-left italic">
                {subtitle}
              </p>
            )}
          </header>

          <div className="prose prose-slate prose-lg max-w-none dark:prose-invert
            prose-headings:text-color-text prose-headings:font-heading prose-headings:tracking-tight prose-headings:text-left
            prose-p:text-text-dim prose-p:leading-relaxed prose-p:mb-8 prose-p:text-left
            prose-strong:text-color-text prose-strong:font-bold
            prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-ul:text-text-dim prose-ol:text-text-dim
            prose-li:my-1
          ">
            {children}
          </div>

          {/* Footer Navigation */}
          <div className="mt-16 pt-8 border-t border-divider flex justify-start">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary transition-all font-bold group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Library
            </Link>
          </div>
        </div>

        {/* Right: Sticky Visualization - strictly 500x500 */}
        <div className="lg:w-1/2 flex justify-center items-start pt-8 pb-32 sticky top-24 h-[calc(100vh-6rem)]">
          <div className="viz-container shadow-sm">
            {visual}
          </div>
        </div>
      </main>
    </div>
  );
}
