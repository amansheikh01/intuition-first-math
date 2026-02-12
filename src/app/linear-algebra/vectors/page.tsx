'use client';

import React, { useState } from 'react';
import LayoutContainer from '@/components/layout/LayoutContainer';
import GraphContainer from '@/components/viz/GraphContainer';
import GraphControls, { ControlField } from '@/components/viz/GraphControls';
import { SectionBlock, MathBlock, ChallengeBox } from '@/components/ui/ContentBlocks';

export default function VectorsPage() {
    const [vector, setVector] = useState({ x: 3, y: 2 });

    const renderVector = ({ xScale, yScale, g }: any) => {
        g.selectAll('.vector-line').remove();
        g.selectAll('.arrowhead').remove();

        const pixelX = xScale(vector.x);
        const pixelY = yScale(vector.y);
        const centerX = xScale(0);
        const centerY = yScale(0);

        // Arrowhead definition
        const defs = g.append('defs');
        defs.append('marker')
            .attr('id', 'arrowhead-red')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 8)
            .attr('refY', 0)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('fill', 'var(--color-primary)');

        g.append('line')
            .attr('class', 'vector-line')
            .attr('x1', centerX)
            .attr('y1', centerY)
            .attr('x2', pixelX)
            .attr('y2', pixelY)
            .attr('stroke', 'var(--color-primary)')
            .attr('stroke-width', 3)
            .attr('marker-end', 'url(#arrowhead-red)');
    };

    return (
        <LayoutContainer
            title="The Vector space"
            description="Developing an intuition for movement, magnitude, and direction in linear systems."
        >
            {/* Middle Section: Interactive Graph */}
            <div className="w-full flex flex-col lg:flex-row gap-12 justify-center items-start mb-24">
                <GraphContainer>
                    {renderVector}
                </GraphContainer>

                <GraphControls>
                    <ControlField
                        label="X Component"
                        value={vector.x}
                        min={-10} max={10} step={1}
                        onChange={(v) => setVector(prev => ({ ...prev, x: parseFloat(v) }))}
                    />
                    <ControlField
                        label="Y Component"
                        value={vector.y}
                        min={-10} max={10} step={1}
                        onChange={(v) => setVector(prev => ({ ...prev, y: parseFloat(v) }))}
                    />
                    <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
                        <p className="text-xs font-bold text-muted uppercase tracking-widest mb-2">Properties</p>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted">Magnitude |v|:</span>
                                <span className="font-mono font-bold text-primary">
                                    {Math.sqrt(vector.x ** 2 + vector.y ** 2).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted">Angle θ:</span>
                                <span className="font-mono font-bold text-primary">
                                    {(Math.atan2(vector.y, vector.x) * 180 / Math.PI).toFixed(1)}°
                                </span>
                            </div>
                        </div>
                    </div>
                </GraphControls>
            </div>

            {/* Bottom Section: Theory & Content */}
            <SectionBlock title="Introduction to Vectors">
                <p>
                    In linear algebra, a vector is more than just a list of numbers. It is a fundamental unit of action—a geometric entity that possesses both magnitude and direction. While we often represent them as arrows on a 2D plane, they serve as the building blocks for high-dimensional data structures.
                </p>
                <p>
                    A vector <span className="italic">v</span> in <span className="italic">R²</span> is defined by its components along the horizontal (x) and vertical (y) axes.
                </p>
            </SectionBlock>

            <MathBlock
                formula="v = \begin{bmatrix} x \\ y \end{bmatrix}"
                caption="Standard column vector notation in 2D space."
            />

            <SectionBlock title="Magnitude and Direction">
                <p>
                    The length of the vector, known as its **magnitude**, is calculated using the Euclidean norm. This relationship is derived directly from the Pythagorean theorem.
                </p>
                <p>
                    Use the controls above to change the vector's components and watch how the magnitude updates in real-time.
                </p>
            </SectionBlock>

            <MathBlock
                formula="\|v\| = \sqrt{x^2 + y^2}"
                caption="The Euclidean norm (magnitude) of a 2D vector."
            />

            <ChallengeBox>
                Can you find three different pairs of integer components (x, y) that result in a magnitude of exactly 5?
                (Hint: Look for Pythagorean triples like 3-4-5).
            </ChallengeBox>

            <SectionBlock title="Why it Matters">
                <p>
                    In data science, vectors represent individual observations. In physics, they represent forces. In computer graphics, they define the orientation and movement of characters. Understanding them intuitively is the first step toward mastering Linear Algebra.
                </p>
            </SectionBlock>
        </LayoutContainer>
    );
}
