'use client';

import React from 'react';
import {
  BarChart,
  Grid,
  PieChart,
  Sigma,
  TrendingUp,
  Activity,
  Layers,
  Microscope,
  ChevronRight,
  BookOpen,
  MousePointer2,
  Sparkles
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import ThemeToggle from '@/components/ui/ThemeToggle';
import SubjectCard from '@/components/ui/SubjectCard';

const subjects = [
  {
    id: 'linear-algebra',
    title: 'Linear Algebra',
    desc: 'Deep exploration of vector spaces, matrices, and transformations.',
    icon: Grid,
    href: '/linear-algebra/vectors',
  },
  {
    id: 'probability',
    title: 'Probability Theory',
    desc: 'Foundational concepts of randomness, distributions, and uncertainty.',
    icon: PieChart,
    href: '/probability/basics',
  },
  {
    id: 'statistics',
    title: 'Descriptive Statistics',
    desc: 'Techniques for summarizing and interpreting data structures.',
    icon: BarChart,
    href: '/statistics/descriptive',
  },
  {
    id: 'inference',
    title: 'Statistical Inference',
    desc: 'Drawing meaningful conclusions from complex datasets.',
    icon: Sigma,
    href: '/statistics/inference',
  },
  {
    id: 'regression',
    title: 'Regression Analysis',
    desc: 'Modeling relationships between variables with mathematical rigor.',
    icon: TrendingUp,
    href: '/statistics/regression',
  },
  {
    id: 'hypothesis',
    title: 'Hypothesis Testing',
    desc: 'Scientific methods for validating mathematical claims.',
    icon: Activity,
    href: '/statistics/testing',
  }
];

const features = [
  {
    title: 'Interactive Visuals',
    desc: 'Touch and manipulate mathematical objects to build genuine intuition.',
    icon: MousePointer2
  },
  {
    title: 'Computational Rigor',
    desc: 'Built on high-precision graphing engines and formal logic.',
    icon: Sigma
  },
  {
    title: 'Modern Pedagogy',
    desc: 'Abstract concepts explained through clarity and visual structure.',
    icon: Sparkles
  }
];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 math-grid opacity-[0.2] pointer-events-none" />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass">
        <div className="layout-container h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-serif italic text-xl">
              I
            </div>
            <span className="font-sans font-bold uppercase tracking-[0.2em] text-sm text-primary">
              IntuitionFirst
            </span>
          </motion.div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-text-muted">
              <a href="#" className="hover:text-accent transition-colors">Subjects</a>
              <a href="#" className="hover:text-accent transition-colors">Methodology</a>
              <a href="#" className="hover:text-accent transition-colors">Docs</a>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-32">
          <div className="layout-container text-center relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="inline-block py-1 px-4 mb-8 rounded-full bg-accent/5 border border-accent/10">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                  Academic Learning Reimagined
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl lg:text-8xl mb-10 leading-[1.05] tracking-tight"
              >
                Redefining <span className="text-gradient">Mathematical</span> <br />
                Understanding
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-2xl text-text-muted font-sans max-w-2xl mx-auto leading-relaxed mb-12 opacity-80"
              >
                Advanced interactive learning systems built with <br className="hidden md:block" />
                clarity, visual intuition, and computational rigor.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6">
                <button className="px-10 py-5 bg-primary text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-accent transition-all rounded-xl shadow-lg shadow-primary/10">
                  Explore Subjects
                </button>
                <button className="px-10 py-5 border border-primary/10 text-primary font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all rounded-xl">
                  View Research Approach
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Subjects Grid Section */}
        <section className="section-padding relative">
          <div className="layout-container">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl mb-6">Subject Library</h2>
                <p className="text-text-muted font-sans italic opacity-70">
                  A curated collection of mathematical modules designed for deep inquiry.
                </p>
              </div>
              <div className="h-[1px] flex-grow mx-12 mb-4 bg-border-subtle hidden lg:block" />
              <button className="text-[11px] font-black uppercase tracking-widest text-accent flex items-center gap-2 group">
                Browse Full Catalog <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {subjects.map((sub) => (
                <motion.div key={sub.id} variants={fadeInUp}>
                  <SubjectCard
                    title={sub.title}
                    description={sub.desc}
                    href={sub.href}
                    icon={sub.icon}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding bg-white/40 border-y border-border-subtle">
          <div className="layout-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-8">
                    <feature.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl mb-4">{feature.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed font-sans">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pedagogy Section */}
        <section className="section-padding">
          <div className="layout-container text-center">
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl mb-12 opacity-40 italic font-serif">Research Philosophy</h2>
              <blockquote className="text-2xl md:text-3xl leading-relaxed text-primary font-serif italic mb-8">
                "Mathematics is not a spectator sport. It is an exploration of structures, and our goal is to provide the light that reveals them."
              </blockquote>
              <div className="w-16 h-[2px] bg-accent mx-auto" />
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-border-subtle">
        <div className="layout-container text-center">
          <p className="font-sans font-bold uppercase tracking-[0.4em] text-[10px] text-primary mb-2">
            © 2026 IntuitionFirst
          </p>
          <p className="text-[10px] text-text-muted font-sans uppercase tracking-[0.2em] opacity-60">
            Advancing Mathematical Intelligence
          </p>
        </div>
      </footer>
    </div>
  );
}
