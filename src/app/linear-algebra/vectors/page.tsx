'use client';

import React from 'react';
import LessonLayout from '@/components/layout/LessonLayout';
import VectorSandbox from '@/components/viz/Vectors/VectorSandBox';

export default function VectorsPage() {
    return (
        <LessonLayout
            title="The Arrow of Action"
            subtitle="How math describes movement in a frozen world."
            visual={<VectorSandbox />}
        >
            <section className="mb-12">
                <h2>The Point vs. The Arrow</h2>
                <p>
                    In standard math, we deal with points—dots frozen in space at coordinate $$(x, y)$$.
                    This is static. It&apos;s a map location.
                </p>
                <p>
                    Linear Algebra introduces the <strong>Vector</strong>. A vector isn&apos;t a place; it&apos;s an <em>instruction</em>.
                    It says: <span className="text-primary font-bold">"Move this much in this direction."</span>
                </p>
                <div className="p-4 border-l-2 border-primary bg-primary/5 my-4">
                    <p className="m-0 italic">
                        "A number describes <strong>how much</strong>. A vector describes <strong>which way</strong>."
                    </p>
                </div>
            </section>

            <section className="mb-12">
                <h2>Magnitude & Direction (The Polar Intuition)</h2>
                <p>
                    Regardless of the grid, every vector has two core properties:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Magnitude</strong>: The length of the arrow (Speed or Strength).</li>
                    <li><strong>Direction</strong>: The angle it points (Orientation).</li>
                </ul>
                <p>
                    You can describe a wind gust as "50mph North" without ever defining an origin.
                </p>
            </section>

            <section className="mb-12">
                <h2>Interact to Explore</h2>
                <p>
                    On the right, you see a vector in a 2D space.
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>Drag the tip</strong> of the arrow.</li>
                    <li>Notice how the coordinates $$(x, y)$$ update.</li>
                    <li>Watch the <strong>Magnitude</strong> $$|v|$$ change as you stretch it.</li>
                </ol>
                <p className="mt-4 text-sm text-text-dim">
                    <em>Try to find a vector with Magnitude exactly 5.0. Hint: Think of a 3-4-5 triangle.</em>
                </p>
            </section>

            <section>
                <h2>The "Location" Fallacy</h2>
                <p>
                    Does a vector change if you move it? No.
                    An instruction to "Walk North" is valid whether you start in New York or Tokyo.
                    Vectors are defined by their <em>displacement</em>, not their position.
                </p>
            </section>
        </LessonLayout>
    );
}
