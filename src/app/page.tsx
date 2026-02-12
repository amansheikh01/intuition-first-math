'use client';

import React from 'react';
import {
  BarChart,
  Grid,
  PieChart,
  TrendingUp,
  Sigma,
  Layers,
  Microscope,
  FlaskConical,
  Activity,
  ArrowRight,
  ChevronRight,
  Search,
  BookOpen,
  Globe
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import ThemeToggle from '@/components/ui/ThemeToggle';
import SubjectCard from '@/components/ui/SubjectCard';

const subjects = [
  {
    id: 'descriptive-statistics',
    title: 'Descriptive Statistics',
    desc: 'Methods for summarizing and visualizing data distributions.',
    icon: BarChart,
    href: '/statistics/descriptive',
    active: true
  },
  {
    id: 'linear-algebra',
    title: 'Linear Algebra',
    desc: 'The study of vector spaces and linear transformations.',
    icon: Grid,
    href: '/linear-algebra/vectors',
    active: true
  },
  {
    id: 'probability-theory',
    title: 'Probability Theory',
    desc: 'Mathematical foundations of random processes and uncertainty.',
    icon: PieChart,
    href: '/probability/basics',
    active: true
  },
  {
    id: 'statistical-inference',
    title: 'Statistical Inference',
    desc: 'Drawing conclusions about populations from sample data.',
    icon: Sigma,
    href: '/statistics/inference',
    active: true
  },
  {
    id: 'regression-analysis',
    title: 'Regression Analysis',
    desc: 'Investigating relationships between dependent and independent variables.',
    icon: TrendingUp,
    href: '/statistics/regression',
    active: true
  },
  {
    id: 'hypothesis-testing',
    title: 'Hypothesis Testing',
    desc: 'Scientific methods for validating mathematical claims.',
    icon: Activity,
    href: '/statistics/testing',
    active: true
  },
  {
    id: 'time-series',
    title: 'Time Series Analysis',
    desc: 'Analyzing data ordered in time to forecast future points.',
    icon: Layers,
    href: '/statistics/time-series',
    active: true
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    desc: 'Algorithmic foundations for statistical pattern recognition.',
    icon: Microscope,
    href: '/ml/basics',
    active: true
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
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
  const group1 = subjects.slice(0, 4);
  const group2 = subjects.slice(4, 8);

  return (
    <div className="min-h-screen bg-bg">
      {/* Academy Navigation */}
      <nav className="h-20 bg-bg border-b border-border-light sticky top-0 z-50">
        <div className="layout-container h-full flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
              <span className="font-serif italic font-bold text-2xl">I</span>
              <span className="uppercase tracking-[0.2em] text-sm pt-1">IntuitionFirst</span>
            </div>

            <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-text-muted">
              <a href="#" className="hover:text-primary transition-colors">Library</a>
              <a href="#" className="hover:text-primary transition-colors">Research Labs</a>
              <a href="#" className="hover:text-primary transition-colors">Documentation</a>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-text-muted hover:text-primary transition-colors">
              <Search size={18} />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main>
        {/* Research Hero - Centered */}
        <section className="pt-32 pb-24 border-b border-border-light text-center">
          <div className="layout-container flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 text-accent font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Open Academic Platform
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl mb-8 leading-[1.1] font-serif">
                Mathematical Intuition <br />
                meets Computational Rigor.
              </h1>

              <p className="text-lg md:text-xl text-text-muted font-normal max-w-2xl mx-auto leading-relaxed mb-12">
                A professional environment for exploring mathematical structures through
                interactive visualizations and rigorous academic inquiry.
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <button className="px-8 py-4 bg-primary text-bg font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all rounded-[2px] shadow-sm">
                  Access Library
                </button>
                <button className="px-8 py-4 border border-primary text-primary font-bold text-xs uppercase tracking-widest hover:bg-surface transition-all rounded-[2px] flex items-center gap-2">
                  View Documentation <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Academic Modules - Two Fan Groups */}
        <section className="section-padding bg-surface border-b border-border-light overflow-hidden">
          <div className="layout-container">
            <div className="text-center mb-24 space-y-4">
              <div className="inline-block px-3 py-1 bg-accent/5 border border-accent/10 rounded-full text-accent text-[10px] font-bold uppercase tracking-[0.2em]">
                Academic Library
              </div>
              <h2 className="text-3xl md:text-5xl text-primary font-bold">Research Tracks</h2>
              <p className="text-sm text-text-muted max-w-xl mx-auto italic font-serif opacity-80">
                Curated mathematical foundations, arranged for multi-dimensional inquiry.
              </p>
            </div>

            {/* Desktop Fan Groups */}
            <div className="hidden lg:block space-y-32">
              {/* Group 1 */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="fan-group-container"
              >
                {group1.map((sub, idx) => (
                  <motion.div
                    key={sub.id}
                    variants={itemVariants}
                    className={`fan-item fan-item-${idx}`}
                  >
                    <SubjectCard
                      title={sub.title}
                      description={sub.desc}
                      href={sub.href}
                      icon={sub.icon}
                      active={sub.active}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Group 2 */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="fan-group-container"
              >
                {group2.map((sub, idx) => (
                  <motion.div
                    key={sub.id}
                    variants={itemVariants}
                    className={`fan-item fan-item-${idx}`}
                  >
                    <SubjectCard
                      title={sub.title}
                      description={sub.desc}
                      href={sub.href}
                      icon={sub.icon}
                      active={sub.active}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Mobile/Tablet Fallback - Simple Grid */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {subjects.map((sub) => (
                <SubjectCard
                  key={sub.id}
                  title={sub.title}
                  description={sub.desc}
                  href={sub.href}
                  icon={sub.icon}
                  active={sub.active}
                />
              ))}
            </div>

            <div className="mt-32 text-center">
              <button className="group text-[11px] font-black uppercase tracking-[0.4em] text-text-muted hover:text-accent transition-colors flex items-center gap-3 mx-auto">
                Explore Full Mathematical Catalog
                <div className="w-8 h-[1px] bg-border-light group-hover:bg-accent group-hover:w-12 transition-all" />
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="py-20 bg-bg border-t border-border-light text-center space-y-3">
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
          © 2026 IntuitionFirst
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted opacity-50">
          Advancing Mathematical Understanding through Visual Inquiry
        </div>
      </footer>
    </div>
  );
}
