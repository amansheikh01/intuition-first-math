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
  return (
    <div className="min-h-screen">
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

        {/* Academic Modules Grid */}
        <section className="section-padding bg-surface">
          <div className="layout-container">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl">Departmental Modules</h2>
                <p className="text-sm text-text-muted font-medium">Standardized computational research tracks</p>
              </div>
              <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-accent">
                <span className="flex items-center gap-1"><BookOpen size={14} /> Core Curriculum</span>
                <span className="text-border-light">//</span>
                <span className="flex items-center gap-1 opacity-50"><Globe size={14} /> Peer Review</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-stretch">
              {subjects.map((sub, idx) => (
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
          </div>
        </section>
      </main>

      {/* Institutional Footer */}
      <footer className="py-16 border-t border-border-light bg-bg">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-6">
              <div className="text-xl font-bold tracking-tight text-primary flex items-center gap-2 opacity-80">
                <span className="font-serif italic font-bold text-2xl">I</span>
                <span className="uppercase tracking-[0.2em] text-sm pt-1">IntuitionFirst</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed max-w-sm">
                Dedicated to the advancement of mathematical pedagogy through interactive
                software systems and rigorous computational standards.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-6">Resources</h4>
              <ul className="space-y-3 text-xs text-text-muted">
                <li><a href="#" className="hover:text-accent font-medium transition-colors">Methods Library</a></li>
                <li><a href="#" className="hover:text-accent font-medium transition-colors">API Specification</a></li>
                <li><a href="#" className="hover:text-accent font-medium transition-colors">Institutional SSO</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-6">Foundation</h4>
              <ul className="space-y-3 text-xs text-text-muted">
                <li><a href="#" className="hover:text-accent font-medium transition-colors">Open Scholarship</a></li>
                <li><a href="#" className="hover:text-accent font-medium transition-colors">Ethics Protocol</a></li>
                <li><a href="#" className="hover:text-accent font-medium transition-colors">Contact Academy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border-light flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-text-muted opacity-60">
            <div>© 2026 IntuitionFirst Mathematics Foundation</div>
            <div className="flex gap-8">
              <a href="#">Security</a>
              <a href="#">Latency</a>
              <a href="#">v4.0.5-PRO</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
