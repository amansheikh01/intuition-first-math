'use client';

import React, { ReactNode } from 'react';
import Latex from '../ui/Latex';

interface MathBlockProps {
    formula: string;
    caption?: string;
}

export function MathBlock({ formula, caption }: MathBlockProps) {
    return (
        <div className="math-block w-full max-w-3xl mx-auto my-12">
            <Latex formula={formula} inline={false} />
            {caption && (
                <p className="text-center text-sm font-medium mt-4 italic text-muted">
                    {caption}
                </p>
            )}
        </div>
    );
}

interface SectionBlockProps {
    title: string;
    children: ReactNode;
}

export function SectionBlock({ title, children }: SectionBlockProps) {
    return (
        <section className="w-full max-w-3xl mx-auto mb-16 text-left">
            <h2 className="text-2xl font-bold mb-6 text-text border-l-4 border-primary pl-4">
                {title}
            </h2>
            <div className="prose prose-slate prose-lg dark:prose-invert max-w-none text-muted">
                {children}
            </div>
        </section>
    );
}

interface ChallengeBoxProps {
    title?: string;
    children: ReactNode;
}

export function ChallengeBox({ title = "Exploration Challenge", children }: ChallengeBoxProps) {
    return (
        <div className="w-full max-w-3xl mx-auto p-8 rounded-2xl bg-primary/5 border border-primary/20 my-16">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">?</span>
                {title}
            </h3>
            <div className="text-text font-medium leading-relaxed">
                {children}
            </div>
        </div>
    );
}
