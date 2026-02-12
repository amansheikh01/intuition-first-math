'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import { ArrowRight, Sparkles, Target, Award } from 'lucide-react';
import MonteCarloPiVisualizer from '@/components/visuals/MonteCarloPiVisualizer';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />

      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <section className="relative layout-container flex-grow flex items-center py-32 lg:py-40">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />

          <div className="grid lg:grid-cols-2 gap-16 items-center w-full relative z-10">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-[1.15] tracking-[-0.02em] text-text-primary">
                Redefining Mathematical{' '}
                <span className="italic text-accent bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                  Understanding
                </span>
              </h1>

              <p className="text-lg md:text-xl text-text-secondary font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
                Advancing research-oriented learning systems built with visual intuition, logic, and computational rigor.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/subjects"
                  className="group btn btn-primary gap-2"
                >
                  Explore Subjects
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/research"
                  className="group btn btn-secondary gap-2"
                >
                  Read Research
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Right Visual - Monte Carlo Pi Simulation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="relative flex items-center justify-center lg:justify-end"
            >
              {/* Radial glow */}
              <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent blur-3xl opacity-50" />
              <MonteCarloPiVisualizer />
            </motion.div>
          </div>
        </section>

        {/* Premium Features Section */}
        <section className="bg-card-bg/30 py-24 border-t border-border">
          <div className="layout-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">What Makes This Platform Different?</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">Bridging the gap between abstract theory and visual intuition through rigorous engineering.</p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                { icon: Sparkles, title: "Visual Intuition", desc: "Complex concepts dismantled into interactive, visual narratives that respect your intelligence." },
                { icon: Target, title: "Scientific Rigor", desc: "No simplifications. We maintain complete mathematical correctness while enhancing clarity." },
                { icon: Award, title: "Academic Standards", desc: "Designed for researchers and students who demand high-quality, professional educational systems." }
              ].map((feature, idx) => (
                <motion.div key={idx} variants={itemVariants} className="feature-card text-center group">
                  <div className="w-12 h-12 bg-accent-soft text-accent rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer minimal */}
      <footer className="py-12 border-t border-border bg-nav-bg">
        <div className="layout-container flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
          <p className="text-xs font-bold uppercase tracking-widest cursor-default">
            &copy; 2026 IntuitionFirst Mathematical Systems
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors">Privacy</Link>
            <Link href="#" className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
