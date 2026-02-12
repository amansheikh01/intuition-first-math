'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import SubjectCard from '@/components/ui/SubjectCard';

const subjects = [
    {
        id: 'linear-algebra',
        title: 'Linear Algebra',
        desc: 'Advanced exploration of vector spaces, matrices, and linear transformations with geometric intuition.',
        href: '/linear-algebra/vectors',
        theme: 1
    },
    {
        id: 'probability',
        title: 'Probability Theory',
        desc: 'Foundational concepts of randomness, distributions, and the axioms of probability.',
        href: '/probability/basics',
        theme: 2
    },
    {
        id: 'statistics',
        title: 'Descriptive Statistics',
        desc: 'Mathematical techniques for summarizing and interpreting data structures and distributions.',
        href: '/statistics/descriptive',
        theme: 3
    },
    {
        id: 'inference',
        title: 'Statistical Inference',
        desc: 'Drawing meaningful and rigorous conclusions from complex mathematical datasets.',
        href: '/statistics/inference',
        theme: 4
    },
    {
        id: 'regression',
        title: 'Regression Analysis',
        desc: 'Modeling relationships between variables with high mathematical and computational rigor.',
        href: '/statistics/regression',
        theme: 1
    },
    {
        id: 'hypothesis',
        title: 'Hypothesis Testing',
        desc: 'Scientific methods for validating mathematical claims through rigorous testing frameworks.',
        href: '/statistics/testing',
        theme: 2
    },
    {
        id: 'time-series',
        title: 'Time Series Analysis',
        desc: 'Analyzing data ordered in time to forecast and understand temporal stochastic processes.',
        href: '/statistics/time-series',
        theme: 3
    },
    {
        id: 'ml',
        title: 'Machine Learning',
        desc: 'Foundational algorithms for statistical pattern recognition and semi-automated learning systems.',
        href: '/ml/basics',
        theme: 4
    }
];

export default function SubjectsPage() {
    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="showcase-container layout-container">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
                        Subject Showcase
                    </h1>
                    <p className="text-xl text-text-secondary font-sans">
                        A curated library of research-driven mathematical modules.
                    </p>
                </div>

                <div className="showcase-grid w-full">
                    {subjects.map((sub) => (
                        <SubjectCard
                            key={sub.id}
                            title={sub.title}
                            description={sub.desc}
                            href={sub.href}
                            theme={sub.theme}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
