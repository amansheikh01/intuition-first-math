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
import ThemeToggle from '@/components/ui/ThemeToggle';
import SubjectCard from '@/components/ui/SubjectCard';

const subjects = [
  {
    id: 'descriptive-statistics',
    title: 'Descriptive Statistics',
    desc: 'Methods for summarizing and visualizing data distributions.',
    icon: BarChart,
    href: '/statistics/descriptive',
    active: false
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
    active: false
  },
  {
    id: 'statistical-inference',
    title: 'Statistical Inference',
    desc: 'Drawing conclusions about populations from sample data.',
    icon: Sigma,
    href: '/statistics/inference',
    active: false
  },
  {
    id: 'regression-analysis',
    title: 'Regression Analysis',
    desc: 'Investigating relationships between dependent and independent variables.',
    icon: TrendingUp,
    href: '/statistics/regression',
    active: false
  },
  {
    id: 'hypothesis-testing',
    title: 'Hypothesis Testing',
    desc: 'Scientific methods for validating mathematical claims.',
    icon: Activity,
    href: '/statistics/testing',
    active: false
  },
  {
    id: 'time-series',
    title: 'Time Series Analysis',
    desc: 'Analyzing data ordered in time to forecast future points.',
    icon: Layers,
    href: '/statistics/time-series',
    active: false
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    desc: 'Algorithmic foundations for statistical pattern recognition.',
    icon: Microscope,
    href: '/ml/basics',
    active: false
  },
  {
    id: 'experiment-design',
    title: 'Design of Experiment',
    desc: 'Structured approaches to scientific data collection.',
    icon: FlaskConical,
    href: '/statistics/doe',
    active: false
  }
];

export default function Home() {
  const fanSubjects = subjects
    .filter(s => s.active || ['descriptive-statistics', 'probability-theory', 'statistical-inference', 'regression-analysis'].includes(s.id))
    .slice(0, 5);

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
        {/* Research Hero */}
        <section className="pt-24 pb-16 border-b border-border-light">
          <div className="layout-container">
            <div className="max-w-3xl animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="inline-flex items-center gap-2 text-accent font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Open Academic Platform
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-8 leading-[1.15]">
                Mathematical Intuition through <br />
                Computational Rigor.
              </h1>

              <p className="text-lg md:text-xl text-text-muted font-normal max-w-2xl leading-relaxed mb-10">
                A collaborative research environment providing structured foundations and advanced modeling
                for modern mathematical inquiry and institutional analysis.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-primary text-bg font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all rounded-[2px]">
                  Access Library
                </button>
                <button className="px-6 py-3 border border-primary text-primary font-bold text-xs uppercase tracking-widest hover:bg-surface transition-all rounded-[2px] flex items-center gap-2">
                  View Documentation <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Modules - Fan Layout */}
        <section className="section-padding bg-surface border-b border-border-light overflow-hidden">
          <div className="layout-container">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-block px-3 py-1 bg-accent/5 border border-accent/10 rounded-full text-accent text-[10px] font-bold uppercase tracking-[0.2em]">
                Academic Library
              </div>
              <h2 className="text-3xl md:text-4xl text-primary font-bold">Foundation Modules</h2>
              <p className="text-sm text-text-muted max-w-xl mx-auto italic">
                A curated selection of mathematical research tracks, fanning out for structured inquiry.
              </p>
            </div>

            {/* Fan Arc Layout (Desktop) */}
            <div className="hidden lg:flex arc-container items-center justify-center">
              {fanSubjects.map((sub, idx) => (
                <div key={sub.id} className={`arc-item-${idx}`}>
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

            {/* Tablet/Mobile Fallback */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
              {subjects.slice(0, 6).map((sub) => (
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

            <div className="mt-20 text-center">
              <button className="text-[11px] font-black uppercase tracking-[0.4em] text-text-muted hover:text-accent transition-colors flex items-center gap-2 mx-auto">
                Browse Full Catalog <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="py-16 bg-bg border-t border-border-light text-center space-y-2">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
          © 2026 IntuitionFirst
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted opacity-60">
          Advancing Mathematical Understanding
        </div>
      </footer>
    </div>
  );
}
