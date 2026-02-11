'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Grid, PieChart, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ui/ThemeToggle';

const modules = [
  {
    id: 'linear-algebra',
    title: 'Linear Algebra',
    desc: 'Vectors, Matrices, and the structure of space.',
    icon: Grid,
    color: 'primary',
    href: '/linear-algebra/vectors',
    active: true
  },
  {
    id: 'probability',
    title: 'Probability',
    desc: 'Uncertainty, Distributions, and Chance. (Coming Soon)',
    icon: PieChart,
    color: 'secondary',
    href: '#',
    active: false
  },
  {
    id: 'statistics',
    title: 'Statistics',
    desc: 'Describing the world with data. (Coming Soon)',
    icon: Activity,
    color: 'accent',
    href: '#',
    active: false
  }
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-color-background transition-colors duration-300">
      {/* Navbar overlay */}
      <nav className="fixed top-0 left-0 right-0 h-16 flex items-center px-6 justify-between z-50">
        <div className="text-xl font-bold tracking-tighter">
          <span className="text-color-text">Intuition</span>
          <span className="text-primary">.Math</span>
        </div>
        <ThemeToggle />
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter text-color-text">
          Intuition.Math
        </h1>

        <p className="text-lg md:text-xl text-text-dim max-w-2xl mb-12">
          Don&apos;t just read math. <span className="text-color-text font-semibold underline decoration-accent/50 underline-offset-4">Touch it.</span><br />
          Interactive explorations that make complex concepts feel natural.
        </p>

        <div>
          <Link
            href="/linear-algebra/vectors"
            className="group px-8 py-4 bg-primary text-white font-bold rounded-full text-lg hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-2"
          >
            Start Learning <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="px-6 py-12 md:py-24 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-12 text-text-dim uppercase tracking-widest text-center">Library</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((mod) => (
            <div key={mod.id}>
              {mod.active ? (
                <Link href={mod.href} className="flex flex-col items-center h-full glass-panel p-10 hover:border-primary/50 transition-all group relative overflow-hidden text-center">
                  <div className={`w-16 h-16 bg-${mod.color}/10 rounded-2xl flex items-center justify-center mb-6`}>
                    <mod.icon className={`text-${mod.color} w-8 h-8`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{mod.title}</h3>
                  <p className="text-text-dim text-base">{mod.desc}</p>
                </Link>
              ) : (
                <div className="flex flex-col items-center h-full glass-panel p-10 opacity-60 grayscale text-center">
                  <div className={`w-16 h-16 bg-text-dim/5 rounded-2xl flex items-center justify-center mb-6`}>
                    <mod.icon className="text-text-dim w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{mod.title}</h3>
                  <p className="text-text-dim text-base">{mod.desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-text-dim font-mono">
        Intuition.Math © 2026 | Built for Visual Thinkers
      </footer>
    </div>
  );
}
