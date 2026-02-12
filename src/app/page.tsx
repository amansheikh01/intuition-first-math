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
  Database,
  LineChart,
  FunctionSquare
} from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import SubjectCard from '@/components/ui/SubjectCard';
import LiveGraphDemo from '@/components/viz/LiveGraphDemo';
import AnalyticalIllustration from '@/components/ui/AnalyticalIllustration';

const subjects = [
  {
    id: 'descriptive-statistics',
    title: 'Descriptive Statistics',
    desc: 'Quantitative summarization of data distributions and patterns.',
    icon: BarChart,
    href: '/statistics/descriptive',
    active: false
  },
  {
    id: 'linear-algebra',
    title: 'Linear Algebra',
    desc: 'Vector spaces and linear transformations in modern analytics.',
    icon: Grid,
    href: '/linear-algebra/vectors',
    active: true
  },
  {
    id: 'probability-theory',
    title: 'Probability Theory',
    desc: 'Mathematical foundations of uncertainty and random variables.',
    icon: PieChart,
    href: '/probability/basics',
    active: false
  },
  {
    id: 'statistical-inference',
    title: 'Statistical Inference',
    desc: 'Deductive reasoning and population parameter estimation.',
    icon: Sigma,
    href: '/statistics/inference',
    active: false
  },
  {
    id: 'regression-analysis',
    title: 'Regression Analysis',
    desc: 'Predictive modeling and relationship quantification.',
    icon: TrendingUp,
    href: '/statistics/regression',
    active: false
  },
  {
    id: 'hypothesis-testing',
    title: 'Hypothesis Testing',
    desc: 'Rigorous validation of mathematical claims via data.',
    icon: Activity,
    href: '/statistics/testing',
    active: false
  },
  {
    id: 'time-series',
    title: 'Time Series Analysis',
    desc: 'Longitudinal data trends and seasonal forecasting.',
    icon: Layers,
    href: '/statistics/time-series',
    active: false
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning Basics',
    desc: 'Algorithmic approaches to heavy-duty data harvesting.',
    icon: Microscope,
    href: '/ml/basics',
    active: false
  },
  {
    id: 'experiment-design',
    title: 'Design of Experiment',
    desc: 'Systematic approaches to rigorous scientific inquiry.',
    icon: FlaskConical,
    href: '/statistics/doe',
    active: false
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <nav className="h-16 border-b border-border-light bg-surface/80 backdrop-blur-md sticky top-0 z-50">
        <div className="layout-container h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1 rounded-md text-surface">
              <LineChart size={18} />
            </div>
            <span className="text-lg font-black tracking-tighter text-primary">ANALYSIS.HUB</span>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-6 text-[11px] font-black uppercase tracking-widest text-text-muted">
              <a href="#" className="hover:text-accent transition-colors">Infrastructure</a>
              <a href="#" className="hover:text-accent transition-colors">Methods</a>
              <a href="#" className="hover:text-accent transition-colors">Academic Log</a>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section className="section-padding border-b border-border-light bg-surface relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          </div>

          <div className="layout-container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 text-left animate-in fade-in slide-in-from-left-8 duration-1000">
                <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent text-[10px] font-black uppercase tracking-[0.2em]">
                  Statistical Standards v4.0
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-primary leading-[1] tracking-tighter">
                  Rigorous <br />
                  Analytics <br />
                  Interface.
                </h1>

                <p className="text-lg md:text-xl text-text-muted font-medium max-w-xl leading-relaxed">
                  A high-performance computational platform for building intuition through rigorous mathematical modeling and real-time visualization systems.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-primary text-surface rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/10">
                    Deploy Engine <ArrowRight size={18} />
                  </button>
                  <button className="px-8 py-4 bg-surface border-2 border-primary text-primary rounded-xl font-black text-sm uppercase tracking-widest hover:bg-bg transition-all">
                    Core Methods
                  </button>
                </div>
              </div>

              <div className="relative">
                <AnalyticalIllustration />
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE DEMO SECTION */}
        <section className="section-padding bg-bg relative">
          <div className="layout-container flex flex-col items-center">
            <div className="max-w-2xl text-center mb-16 space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-1 bg-accent rounded-full mb-4" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-primary tracking-tight">
                Live Computational Proof
              </h2>
              <p className="text-text-muted font-medium leading-relaxed">
                Interact with the underlying mathematical core. Modify parameters and observe real-time divergence in deterministic systems.
              </p>
            </div>

            <div className="w-full flex justify-center">
              <LiveGraphDemo />
            </div>
          </div>
        </section>

        {/* SUBJECT GRID SECTION */}
        <section className="section-padding bg-surface border-t border-border-light relative overflow-hidden">
          <div className="layout-container relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-sm font-black text-accent uppercase tracking-[0.6em] mb-4">Analytical Departments</h2>
              <div className="h-px w-24 bg-border-light mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 items-stretch">
              {subjects.map((sub, idx) => (
                <div key={idx} className={`animate-in fade-in slide-in-from-bottom-8 duration-700 delay-${idx * 100}`}>
                  <SubjectCard
                    title={sub.title}
                    description={sub.desc}
                    href={sub.href}
                    icon={sub.icon}
                    active={sub.active}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 bg-primary text-surface/50 border-t border-primary-light">
        <div className="layout-container text-center space-y-8">
          <div className="flex justify-center items-center gap-2 opacity-80">
            <LineChart size={24} />
            <span className="text-xl font-black tracking-tighter text-surface uppercase italic">Analysis.Hub</span>
          </div>

          <div className="flex flex-wrap justify-center gap-12 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-accent transition-colors">Open Source Base</a>
            <a href="#" className="hover:text-accent transition-colors">Institutional License</a>
            <a href="#" className="hover:text-accent transition-colors">API Keys</a>
            <a href="#" className="hover:text-accent transition-colors">Changelog</a>
          </div>

          <div className="pt-8 border-t border-surface/10 text-[10px] font-mono tracking-widest opacity-40 uppercase">
            Intuition.Math Engine © 2026 // Integrated Analytical Systems // Version 4.0.2-Stable
          </div>
        </div>
      </footer>
    </div>
  );
}
