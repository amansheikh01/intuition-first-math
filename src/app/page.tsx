'use client';

import React from 'react';
import {
  Activity,
  BarChart,
  Grid,
  PieChart,
  TrendingUp,
  Sigma,
  Layers,
  Microscope,
  FlaskConical
} from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import SubjectCard from '@/components/ui/SubjectCard';

const subjects = [
  {
    id: 'descriptive-statistics',
    title: 'Descriptive Statistics',
    desc: 'Summarizing and visualizing data patterns.',
    icon: BarChart,
    href: '/statistics/descriptive',
    active: false
  },
  {
    id: 'linear-algebra',
    title: 'Linear Algebra',
    desc: 'Vectors, matrices, and spatial transformations.',
    icon: Grid,
    href: '/linear-algebra/vectors',
    active: true
  },
  {
    id: 'probability-theory',
    title: 'Probability Theory',
    desc: 'Modeling uncertainty and random variables.',
    icon: PieChart,
    href: '/probability/basics',
    active: false
  },
  {
    id: 'statistical-inference',
    title: 'Statistical Inference',
    desc: 'Drawing conclusions from data populations.',
    icon: Sigma,
    href: '/statistics/inference',
    active: false
  },
  {
    id: 'regression-analysis',
    title: 'Regression Analysis',
    desc: 'Predicting relationships between variables.',
    icon: TrendingUp,
    href: '/statistics/regression',
    active: false
  },
  {
    id: 'hypothesis-testing',
    title: 'Hypothesis Testing',
    desc: 'Validating mathematical claims with data.',
    icon: Activity,
    href: '/statistics/testing',
    active: false
  },
  {
    id: 'time-series',
    title: 'Time Series Analysis',
    desc: 'Forecasting trends and seasonal cycles.',
    icon: Layers,
    href: '/statistics/time-series',
    active: false
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning Basics',
    desc: 'Algorithmic approaches to data patterns.',
    icon: Microscope,
    href: '/ml/basics',
    active: false
  },
  {
    id: 'experiment-design',
    title: 'Design of Experiment',
    desc: 'Structuring rigorous scientific inquiries.',
    icon: FlaskConical,
    href: '/statistics/doe',
    active: false
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <nav className="h-16 flex items-center px-12 justify-between bg-surface border-b border-border sticky top-0 z-50">
        <div className="text-xl font-bold tracking-tighter">
          <span className="text-text">Intuition</span>
          <span className="text-primary">.Math</span>
        </div>
        <ThemeToggle />
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 flex flex-col items-center text-center">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-text">
            Intuition-First Mathematics
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            A clean, academic interface for building rigorous understanding through interactive software.
          </p>
          <div className="divider-elegant w-32 mx-auto h-1 rounded-full" />
        </div>
      </section>

      {/* Subject Grid */}
      <section className="px-6 py-16 flex-grow bg-surface/30 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs font-bold mb-16 text-muted uppercase tracking-[0.4em] text-center">
            Departmental Library
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
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
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border bg-surface text-center">
        <div className="max-w-7xl mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-muted font-semibold tracking-wide">
          <div>Intuition.Math © 2026 | Mathematical Software Interface</div>
          <div className="flex gap-12">
            <a href="#" className="hover:text-primary underline-offset-4 hover:underline">Graphing Engine</a>
            <a href="#" className="hover:text-primary underline-offset-4 hover:underline">Documentation</a>
            <a href="#" className="hover:text-primary underline-offset-4 hover:underline">University Access</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
