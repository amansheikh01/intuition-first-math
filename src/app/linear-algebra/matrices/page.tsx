'use client';

import React from 'react';
import LessonLayout from '@/components/layout/LessonLayout';
import TransformGrid from '@/components/viz/LinearAlgebra/TransformGrid';
import Latex from '@/components/ui/Latex';

export default function MatricesPage() {
    return (
        <LessonLayout
            title="The Machine of Space"
            subtitle="How to stretch, spin, and break the universe."
            visual={<TransformGrid />}
        >
            <section className="mb-12">
                <h2>The Machine of Space</h2>
                <p>
                    Most people see a matrix as a boring "box of numbers." In reality, it&apos;s a <strong>machine</strong>.
                    You put space inside, and it outputs a distorted version of that space.
                </p>
                <div className="glass-panel p-6 my-8 border-l-4 border-secondary">
                    <p className="text-xl font-medium text-color-text mb-2 italic">
                        "Matrices don&apos;t just move objects; they move the ground beneath them."
                    </p>
                </div>
            </section>

            <section className="mb-12">
                <h2>The Secret of Basis Vectors</h2>
                <p>
                    How do you describe a total transformation of the universe with just four numbers?
                    It turns out you only need to track <strong>two special arrows</strong>:
                </p>
                <ul className="list-disc pl-6 space-y-4 mt-6">
                    <li>
                        <span className="text-success font-bold">î (Green)</span>:
                        The vector that originally points to <Latex formula="[1, 0]" />.
                    </li>
                    <li>
                        <span className="text-secondary font-bold">ĵ (Purple)</span>:
                        The vector that originally points to <Latex formula="[0, 1]" />.
                    </li>
                </ul>
                <p className="mt-6">
                    Where these two arrows land, the rest of the world must follow.
                    A matrix is simply the <strong>new coordinates</strong> of these two arrows.
                </p>
            </section>

            <section className="mb-12">
                <h2>Try It Yourself</h2>
                <p>
                    On the right, the grid represents space. <strong>Grab the heads of the arrows</strong> to morph the world.
                </p>
                <div className="space-y-4 mt-8">
                    <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 text-secondary font-bold">1</div>
                        <p><strong>Stretch</strong>: Drag Green to the right. The entire grid expands horizontally.</p>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 text-secondary font-bold">2</div>
                        <p><strong>Shear</strong>: Drag Purple to $[1, 1]$. Watch the vertical lines tilt while horizontal ones stay flat.</p>
                    </div>
                </div>

                <div className="mt-12 p-6 bg-glass-bg border border-glass-border rounded-2xl">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        The Determinant Squeeze
                    </h3>
                    <p className="text-sm text-text-dim">
                        Try making the arrows parallel (e.g. both pointing at <Latex formula="[1,1]" />).
                        The grid collapses into a single line. The <strong>area</strong> of the squares becomes zero.
                        This is what it means for a matrix to be non-invertible!
                    </p>
                </div>
            </section>
        </LessonLayout>
    );
}
