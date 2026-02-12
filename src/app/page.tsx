'use client';

import React from 'react';
import { Grid, PieChart, Activity } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ModuleCard from '@/components/ui/ModuleCard';

const modules = [
  {
    id: 'linear-algebra',
    title: 'Linear Algebra',
    desc: 'Explore the structure of space through vectors and matrices.',
    icon: Grid,
    href: '/linear-algebra/vectors',
    active: true
  },
  {
    id: 'probability',
    title: 'Probability',
    desc: 'Understand uncertainty and the laws of chance.',
    icon: PieChart,
    href: '#',
    active: false
  },
  {
    id: 'statistics',
    title: 'Statistics',
    desc: 'Describe the world through data and distributions.',
    icon: Activity,
    href: '#',
    active: false
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-color-background flex flex-col">
      {/* Navbar */}
      <nav className="h-16 flex items-center px-12 justify-between bg-card border-b border-divider sticky top-0 z-50">
        <div className="text-xl font-bold tracking-tighter">
          <span className="text-color-text">Intuition</span>
          <span className="text-primary">.Math</span>
        </div>
        <ThemeToggle />
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-6 flex flex-col items-center text-center">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight text-color-text">
            Intuition-First Mathematics
          </h1>
          <p className="text-xl md:text-2xl text-text-dim max-w-2xl mx-auto mb-8 font-medium">
            Building rigorous mathematical understanding through clean, interactive visualization.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>
      </section>

      {/* Modules Grid */}
      <section className="px-6 py-12 flex-grow bg-white/50 border-t border-divider">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-bold mb-12 text-text-dim uppercase tracking-[0.3em] text-center">
            Course Library
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {modules.map((mod) => (
              <ModuleCard
                key={mod.id}
                title={mod.title}
                description={mod.desc}
                href={mod.href}
                icon={mod.icon}
                active={mod.active}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-divider bg-card text-center text-sm text-text-dim font-medium tracking-wide">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>Intuition.Math © 2026 | Academic Edition</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary">Philosophy</a>
            <a href="#" className="hover:text-primary">Accessibility</a>
            <a href="#" className="hover:text-primary">About</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

