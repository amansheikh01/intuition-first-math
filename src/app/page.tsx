'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import { Lightbulb, Shield, Zap } from 'lucide-react';

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
      {/* Subtle Background Animated Graph */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <motion.path
            d="M0 100 Q 200 50, 400 150 T 800 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <Navbar />

      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <section className="layout-container flex-grow flex items-center py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="z-10"
            >
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-[1.1] tracking-tight text-text-primary">
                Redefining Mathematical <br />
                <span className="italic text-accent">Understanding</span>
              </h1>

              <p className="text-xl md:text-2xl text-text-secondary font-sans max-w-xl leading-relaxed mb-12">
                Advancing research-oriented learning systems built with visual intuition, logic, and computational rigor.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/subjects" className="btn btn-primary">
                  Explore Subjects
                </Link>
                <Link href="/research" className="btn btn-secondary">
                  Read Research
                </Link>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="relative aspect-square lg:block flex items-center justify-center opacity-10 dark:opacity-20 translate-x-10 calm-anim"
            >
              <svg viewBox="0 0 400 400" className="w-full h-full text-text-primary">
                <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" />
                <motion.path
                  d="M100 200 Q 200 100 300 200"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  animate={{ d: ["M100 200 Q 200 100 300 200", "M100 200 Q 200 300 300 200", "M100 200 Q 200 100 300 200"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <rect x="150" y="150" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(45 200 200)" />
              </svg>
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
                { icon: Lightbulb, title: "Visual Intuition", desc: "Complex concepts dismantled into interactive, visual narratives that respect your intelligence." },
                { icon: Zap, title: "Scientific Rigor", desc: "No simplifications. We maintain complete mathematical correctness while enhancing clarity." },
                { icon: Shield, title: "Academic Standards", desc: "Designed for researchers and students who demand high-quality, professional educational systems." }
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
