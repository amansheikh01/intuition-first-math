'use client';

import React, { useRef, useState, useEffect } from 'react';
import * as D3 from 'd3';
import LessonLayout from '@/components/layout/LessonLayout';

function EigenHunter() {
    const svgRef = useRef<SVGSVGElement>(null);
    const [probeAngle, setProbeAngle] = useState(0);
    const [isEigen, setIsEigen] = useState(false);

    // Matrix A = [[2, 1], [0, 0.5]] (Example with real logic below)
    // Let's use a symmetric matrix for real eigenvalues: [[2, 1], [1, 2]] -> Eigenvalues 3, 1. Vectors [1,1], [-1,1] (45 deg and 135 deg)
    const matrix = { a: 2, b: 1, c: 1, d: 2 };

    // Helper: Apply Matrix to Vector
    const transform = (v: { x: number, y: number }) => ({
        x: matrix.a * v.x + matrix.b * v.y,
        y: matrix.c * v.x + matrix.d * v.y
    });

    const width = 600;
    const height = 400;
    const scale = 50;
    const centerX = width / 2;
    const centerY = height / 2;

    useEffect(() => {
        if (!svgRef.current) return;
        const svg = D3.select(svgRef.current);
        svg.selectAll('*').remove();

        const g = svg.append('g').attr('transform', `translate(${centerX}, ${centerY})`);

        // Draw Coordinate System
        g.append('line').attr('x1', -width / 2).attr('x2', width / 2).attr('stroke', '#fff').attr('stroke-opacity', 0.1);
        g.append('line').attr('y1', -height / 2).attr('y2', height / 2).attr('stroke', '#fff').attr('stroke-opacity', 0.1);

        // Draw the "Circle" (Transformed) represents the new space
        // We visualize transformation by sampling points on unit circle
        const circlePoints = D3.range(0, 2 * Math.PI, 0.1).map(angle => {
            const v = { x: Math.cos(angle), y: Math.sin(angle) };
            const t = transform(v);
            return t;
        });

        const lineGen = D3.line<{ x: number, y: number }>()
            .x(d => d.x * scale)
            .y(d => -d.y * scale) // Invert Y
            .curve(D3.curveLinearClosed);

        g.append('path')
            .datum(circlePoints)
            .attr('d', lineGen)
            .attr('fill', 'none')
            .attr('stroke', '#ffffff')
            .attr('stroke-opacity', 0.2)
            .attr('stroke-dasharray', '4 4');

        // Probe Vector (Input)
        const px = Math.cos(probeAngle);
        const py = Math.sin(probeAngle);

        // Result Vector (Output)
        const res = transform({ x: px, y: py });

        // Check Collinearity using Cross Product (2D)
        // v x w = vx*wy - vy*wx. If close to 0, they are aligned.
        const crossProduct = px * res.y - py * res.x;
        const aligned = Math.abs(crossProduct) < 0.1;
        setIsEigen(aligned);

        const probeColor = aligned ? '#00ff9d' : '#ff0055';

        // Draw Probe (Input)
        g.append('line')
            .attr('x1', 0).attr('y1', 0)
            .attr('x2', px * scale * 1.5).attr('y2', -py * scale * 1.5)
            .attr('stroke', probeColor).attr('stroke-width', 3)
            .attr('marker-end', `url(#arrow-probe)`);

        // Draw Result (Output) - Ghosted
        g.append('line')
            .attr('x1', 0).attr('y1', 0)
            .attr('x2', res.x * scale).attr('y2', -res.y * scale)
            .attr('stroke', '#ffffff').attr('stroke-width', 2).attr('stroke-opacity', 0.5)
            .attr('marker-end', `url(#arrow-res)`);

        // Define Markers
        const defs = svg.append('defs');
        defs.append('marker').attr('id', 'arrow-probe').attr('viewBox', '0 -5 10 10').attr('refX', 8).attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto')
            .append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', probeColor);
        defs.append('marker').attr('id', 'arrow-res').attr('viewBox', '0 -5 10 10').attr('refX', 8).attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto')
            .append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', '#ffffff');

        // Interaction Overlay
        const drag = D3.drag<SVGCircleElement, unknown>()
            .on('drag', (event) => {
                const angle = Math.atan2(-(event.y - centerY), event.x - centerX);
                setProbeAngle(angle);
            });

        g.append('circle')
            .attr('cx', px * scale * 1.5).attr('cy', -py * scale * 1.5)
            .attr('r', 15)
            .attr('fill', 'transparent')
            .style('cursor', 'grab')
            .call(drag as any);

    }, [probeAngle, matrix]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
            <svg ref={svgRef} width={600} height={400} className="block border border-white/10 rounded-lg bg-black/20" />
            <div className={`absolute bottom-4 left-4 glass-panel p-2 text-sm transition-colors ${isEigen ? 'border-success text-success' : 'text-text-dim'}`}>
                {isEigen ? "EIGENVECTOR FOUND!" : "Keep searching..."}
            </div>
            <div className="absolute top-4 right-4 text-xs text-text-dim text-right">
                Drag the colored probe.<br />
                Align it with the white ghost arrow.
            </div>
        </div>
    );
}

export default function EigenvaluesPage() {
    return (
        <LessonLayout
            title="The Axis of the World"
            subtitle="Finding the stable beams in a shifting universe."
            visual={<EigenHunter />}
        >
            <section className="mb-12">
                <h2>The Chaos of Transformation</h2>
                <p>
                    When a matrix transforms space, almost every vector gets knocked off course.
                    It feels like pure chaos. But look closely at the simulation.
                </p>
                <p>
                    There are specific directions where the input (Colored Arrow) and output (White Arrow) line up perfectly.
                </p>
            </section>

            <section className="mb-12">
                <h2>The Eigenvector</h2>
                <p>
                    These special vectors are called <strong>Eigenvectors</strong>.
                    When the matrix hits them, it doesn&apos;t spin them. It only <strong>Scales</strong> them.
                </p>
                <div className="glass-panel p-4 my-4 border-l-4 border-success">
                    <h3 className="text-lg font-bold">Try It</h3>
                    <p>Drag the probe around the circle. Can you find the two hidden directions where the arrows align?</p>
                    <p className="text-sm mt-2 text-text-dim">Hint: Look at 45° ($$[1,1]$$) and 135°.</p>
                </div>
            </section>
        </LessonLayout>
    );
}
