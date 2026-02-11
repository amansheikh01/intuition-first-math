'use client';

import React from 'react';
import LessonLayout from '@/components/layout/LessonLayout';
import TransformGrid from '@/components/viz/LinearAlgebra/TransformGrid';

export default function MatricesPage() {
    return (
        <LessonLayout
            title="The Machine of Space"
            subtitle="How to stretch, spin, and break the universe."
            visual={<TransformGrid />}
        >
            <section className="mb-12">
                <h2>The Grid Morph</h2>
                <p>
                    We often look at a Matrix and see a "box of numbers." This is boring and hides the truth.
                </p>
                <p>
                    A Matrix is actually a <strong>function</strong> that inputs space and outputs a distorted version of that space.
                    It can rotate the world. It can stretch the horizon. It can shear the ground beneath your feet.
                </p>
                <p className="mt-4">
                    Notice the grid on the right. It starts perfect. But we can break it.
                </p>
            </section>

            <section className="mb-12">
                <h2>The Secret of Basis Vectors</h2>
                <p>
                    How do we describe this morph with just 4 numbers? We only need to track two special vectors:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <span className="text-success font-bold">{'$$ \\hat{i} $$'} (Green)</span>:
                        Originally at $$[1, 0]$$.
                    </li>
                    <li>
                        <span className="text-secondary font-bold">{'$$ \\hat{j} $$'} (Purple)</span>:
                        Originally at $$[0, 1]$$.
                    </li>
                </ul>
                <p className="mt-4">
                    Where these two arrows land, the rest of the world must follow.
                    The matrix is just the <em>new coordinates</em> of these two arrows.
                </p>
            </section>

            <section className="mb-12">
                <h2>Interact to Explore</h2>
                <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>Drag the Green Arrow</strong> to $$[2, 0]$$. The grid stretches horizontally (2x).</li>
                    <li><strong>Drag the Purple Arrow</strong> to $$[0, 0.5]$$. The grid squashes vertically.</li>
                    <li>
                        <strong>Shear the Universe</strong>: Drag Green to $$[1, 0]$$ and Purple to $$[1, 1]$$.
                        Vertical lines tilt, but horizontal lines stay flat.
                    </li>
                </ol>
                <div className="glass-panel p-4 mt-6">
                    <h3 className="text-lg font-bold mb-2">The Determinant Squeeze</h3>
                    <p>
                        Try making the arrows parallel (e.g. Green at $$[1,1]$$, Purple at $$[2,2]$$).
                        The grid collapses into a single line. The area becomes zero.
                        This is what it means for a Determinant to be 0.
                    </p>
                </div>
            </section>
        </LessonLayout>
    );
}
