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
                    In traditional school math, we focus on <strong>points</strong>—fixed locations like $$(3, 2)$$ that sit frozen on a graph.
                    This is fine for maps, but life isn&apos;t static.
                </p>
                <div className="glass-panel p-6 my-8 border-l-4 border-primary">
                    <p className="text-xl font-medium text-color-text mb-2 italic">
                        "A vector is an instruction waiting to happen."
                    </p>
                    <p className="text-sm text-text-dim">
                        It doesn&apos;t say where you are. It says <strong>where to go</strong> and <strong>how fast</strong>.
                    </p>
                </div>
            </section>

            <section className="mb-12">
                <h2>The "Wind" Intuition</h2>
                <p>
                    Imagine you are a pilot. The control tower tells you there is a wind of "30 knots North."
                    Does it matter where the plane is? No. The wind is the same instruction for everyone:
                    <span className="text-primary font-bold italic"> "Shift 30 units North."</span>
                </p>
                <ul className="list-disc pl-6 space-y-4 mt-6">
                    <li>
                        <strong>Magnitude</strong>: The speed (30 knots).
                        On the graph, this is the <em>length</em> of our arrow.
                    </li>
                    <li>
                        <strong>Direction</strong>: The orientation (North).
                        On the graph, this is the <em>angle</em>.
                    </li>
                </ul>
            </section>

            <section className="mb-12">
                <h2>Try It Yourself</h2>
                <p>
                    On the right, you have a sandbox. <strong>Grab the tip of the arrow</strong> and stretch the universe.
                </p>
                <div className="space-y-4 mt-8">
                    <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">1</div>
                        <p>Watch the <strong>components</strong> $$(x, y)$$ change. They tell you the "recipe" for the movement.</p>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">2</div>
                        <p>Notice the <strong>magnitude</strong> $$|v|$$. It follows the Pythagorean theorem: $$x^2 + y^2 = |v|^2$$.</p>
                    </div>
                </div>

                <p className="mt-8 p-4 bg-accent/5 rounded-xl border border-accent/20 text-sm italic">
                    <strong>Challenge:</strong> Can you create a vector with a magnitude of exactly 5?
                    Look for the "3-4-5" triangle pattern in the sliders below!
                </p>
            </section>
        </LessonLayout>
    );
}
