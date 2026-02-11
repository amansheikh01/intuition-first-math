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
  const [orderedModules, setOrderedModules] = useState(modules);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // "Russian Roulette" Shuffle Effect
    let iterations = 0;
    const interval = setInterval(() => {
      setOrderedModules(prev => [...prev].sort(() => Math.random() - 0.5));
      iterations++;
      if (iterations > 6) {
        clearInterval(interval);
        // Settle on original order for consistency after the effect
        setOrderedModules(modules);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

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

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">
            Intuition
          </span>
          <span className="text-color-text">.Math</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-text-dim max-w-2xl mb-12"
        >
          Don&apos;t just read math. <span className="text-color-text font-semibold underline decoration-accent/50 underline-offset-4">Touch it.</span><br />
          Interactive explorations that make complex concepts feel natural.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/linear-algebra/vectors"
            className="group px-8 py-4 bg-primary text-white font-bold rounded-full text-lg hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-2"
          >
            Start Learning <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      {/* Modules Grid */}
      <section className="px-6 py-12 md:py-24 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-8 text-text-dim/50 uppercase tracking-widest text-center">Library</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isClient && (
            <AnimatePresence>
              {orderedModules.map((mod) => (
                <motion.div
                  key={mod.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  {mod.active ? (
                    <Link href={mod.href} className="flex flex-col h-full glass-panel p-8 hover:border-primary/50 transition-all group relative overflow-hidden active:scale-95">
                      <div className={`w-12 h-12 bg-${mod.color}/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <mod.icon className={`text-${mod.color}`} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{mod.title}</h3>
                      <p className="text-text-dim text-sm flex-1">{mod.desc}</p>

                      {/* Decorative gradient corner */}
                      <div className={`absolute -bottom-10 -right-10 w-24 h-24 bg-${mod.color}/5 rounded-full blur-2xl group-hover:bg-${mod.color}/20 transition-colors`} />
                    </Link>
                  ) : (
                    <div className="flex flex-col h-full glass-panel p-8 opacity-50 cursor-not-allowed grayscale">
                      <div className={`w-12 h-12 bg-text-dim/5 rounded-xl flex items-center justify-center mb-6`}>
                        <mod.icon className="text-text-dim" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{mod.title}</h3>
                      <p className="text-text-dim text-sm">{mod.desc}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-text-dim font-mono">
        Intuition.Math © 2026 | Built for Visual Thinkers
      </footer>
    </div>
  );
}
