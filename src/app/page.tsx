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
  Microscope
} from 'lucide-react';
import SubjectCard from '@/components/ui/SubjectCard';

const subjects = [
  {
    id: 'linear-algebra',
    title: 'Linear Algebra',
    desc: 'Deep exploration of vector spaces, matrices, and transformations.',
    icon: Grid,
    href: '/linear-algebra/vectors',
    theme: 1
  },
  {
    id: 'probability',
    title: 'Probability Theory',
    desc: 'Foundational concepts of randomness, distributions, and uncertainty.',
    icon: PieChart,
    href: '/probability/basics',
    theme: 2
  },
  {
    id: 'statistics',
    title: 'Descriptive Statistics',
    desc: 'Techniques for summarizing and interpreting data structures.',
    icon: BarChart,
    href: '/statistics/descriptive',
    theme: 3
  },
  {
    id: 'inference',
    title: 'Statistical Inference',
    desc: 'Drawing meaningful conclusions from complex datasets.',
    icon: Sigma,
    href: '/statistics/inference',
    theme: 4
  },
  {
    id: 'regression',
    title: 'Regression Analysis',
    desc: 'Modeling relationships between variables with mathematical rigor.',
    icon: TrendingUp,
    href: '/statistics/regression',
    theme: 1
  },
  {
    id: 'hypothesis',
    title: 'Hypothesis Testing',
    desc: 'Scientific methods for validating mathematical claims.',
    icon: Activity,
    href: '/statistics/testing',
    theme: 2
  },
  {
    id: 'time-series',
    title: 'Time Series Analysis',
    desc: 'Analyzing data ordered in time to forecast future points.',
    icon: Layers,
    href: '/statistics/time-series',
    theme: 3
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    desc: 'Algorithmic foundations for statistical pattern recognition.',
    icon: Microscope,
    href: '/ml/basics',
    theme: 4
  }
];

export default function Home() {
  return (
    <main className="min-h-screen showcase-container flex items-center justify-center">
      <div className="showcase-grid w-full">
        {subjects.map((sub) => (
          <SubjectCard
            key={sub.id}
            title={sub.title}
            description={sub.desc}
            href={sub.href}
            icon={sub.icon}
            theme={sub.theme}
          />
        ))}
      </div>
    </main>
  );
}
