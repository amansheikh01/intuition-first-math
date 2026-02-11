'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import * as D3 from 'd3';
import LessonLayout from '@/components/layout/LessonLayout';

import useMeasure from 'react-use-measure';

function EigenHunter() {
    const [containerRef, { width: containerWidth }] = useMeasure();
    const svgRef = useRef<SVGSVGElement>(null);
    const [probeAngle, setProbeAngle] = useState(0);
    const [isEigen, setIsEigen] = useState(false);

    // Matrix A = [[2, 1], [1, 2]] 
    const matrix = { a: 2, b: 1, c: 1, d: 2 };

    const transform = (v: { x: number, y: number }) => ({
        x: matrix.a * v.x + matrix.b * v.y,
        y: matrix.c * v.x + matrix.d * v.y
    });

    const width = containerWidth || 600;
    const height = 400;
    const scale = useMemo(() => Math.min(width, height) / 10, [width, height]);
    const centerX = width / 2;
    const centerY = height / 2;

    useEffect(() => {
        if (!svgRef.current || width === 0) return;
        const svg = D3.select(svgRef.current);
        svg.selectAll('*').remove();

        const g = svg.append('g').attr('transform', `translate(${centerX}, ${centerY})`);

        // Coordinate Grid
        const range = D3.range(-10, 11).map(i => i * scale);
        g.selectAll('line.grid')
            .data(range).enter()
            .append('line')
            .attr('x1', d => d).attr('y1', -height).attr('x2', d => d).attr('y2', height)
            .attr('stroke', 'var(--color-text)').attr('stroke-opacity', 0.05);
        g.selectAll('line.grid-h')
            .data(range).enter()
            .append('line')
            .attr('x1', -width).attr('y1', d => d).attr('x2', width).attr('y2', d => d)
            .attr('stroke', 'var(--color-text)').attr('stroke-opacity', 0.05);

        // Transformed Circle (The Transformation Profile)
        const circlePoints = D3.range(0, 2 * Math.PI, 0.05).map(angle => {
            const v = { x: Math.cos(angle), y: Math.sin(angle) };
            const t = transform(v);
            return t;
        });

        const lineGen = D3.line<{ x: number, y: number }>()
            .x(d => d.x * scale)
            .y(d => -d.y * scale)
            .curve(D3.curveLinearClosed);

        g.append('path')
            .datum(circlePoints)
            .attr('d', lineGen)
            .attr('fill', 'var(--color-primary)')
            .attr('fill-opacity', 0.05)
            .attr('stroke', 'var(--color-text)')
            .attr('stroke-opacity', 0.1)
            .attr('stroke-dasharray', '4 4');

        // Logic
        const px = Math.cos(probeAngle);
        const py = Math.sin(probeAngle);
        const res = transform({ x: px, y: py });

        // Normalizing result for comparison
        const resMag = Math.sqrt(res.x ** 2 + res.y ** 2);
        const crossProduct = px * (res.y / resMag) - py * (res.x / resMag);
        const aligned = Math.abs(crossProduct) < 0.05;
        setIsEigen(aligned);

        const probeColor = aligned ? 'var(--color-success)' : 'var(--color-accent)';

        // Draw Result (Action)
        g.append('line')
            .attr('x1', 0).attr('y1', 0)
            .attr('x2', res.x * scale).attr('y2', -res.y * scale)
            .attr('stroke', 'var(--color-text)').attr('stroke-width', 2).attr('stroke-opacity', 0.3)
            .attr('marker-end', `url(#arrow-res)`);

        // Draw Probe (Input)
        g.append('line')
            .attr('x1', 0).attr('y1', 0)
            .attr('x2', px * scale * 2).attr('y2', -py * scale * 2)
            .attr('stroke', probeColor).attr('stroke-width', 4)
            .attr('marker-end', `url(#arrow-probe)`);

        // Markers
        const defs = svg.append('defs');
        defs.append('marker').attr('id', 'arrow-probe').attr('viewBox', '0 -5 10 10').attr('refX', 8).attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto')
            .append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', probeColor);
        defs.append('marker').attr('id', 'arrow-res').attr('viewBox', '0 -5 10 10').attr('refX', 8).attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto')
            .append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', 'var(--color-text)');

        // Interaction
        const drag = D3.drag<SVGCircleElement, unknown>()
            .on('drag', (event) => {
                const angle = Math.atan2(-(event.y - centerY), event.x - centerX);
                setProbeAngle(angle);
            });

        g.append('circle')
            .attr('cx', px * scale * 2).attr('cy', -py * scale * 2)
            .attr('r', 20)
            .attr('fill', 'transparent')
            .style('cursor', 'grab')
            .call(drag as any);

    }, [probeAngle, matrix, width, scale, centerX, centerY]);

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center p-6 gap-6">
            <div className="relative w-full aspect-[3/2] border border-glass-border rounded-2xl overflow-hidden bg-glass-bg shadow-inner">
                <svg ref={svgRef} width={width} height={height} className="block" />

                <div className={`absolute bottom-6 left-6 glass-panel py-2 px-4 text-sm font-bold transition-all border-2 ${isEigen ? 'border-success text-success bg-success/5 animate-pulse' : 'border-glass-border text-text-dim'}`}>
                    {isEigen ? "EIGEN-DIRECTION DETECTED" : "HUNTING FOR AXIS..."}
                </div>

                <div className="absolute top-6 right-6 text-xs text-text-dim text-right bg-glass-bg/50 px-3 py-2 rounded-full backdrop-blur-sm border border-glass-border">
                    Drag the <span className="text-accent font-bold">Probe</span> to find stable axes
                </div>
            </div>

            <div className="w-full max-w-md p-4 glass-panel border border-glass-border text-center">
                <input
                    type="range" min="0" max={2 * Math.PI} step="0.01"
                    value={probeAngle}
                    onChange={(e) => setProbeAngle(parseFloat(e.target.value))}
                    className="w-full accent-accent"
                />
                <div className="text-[10px] uppercase tracking-widest text-text-dim mt-2">Adjust Probe Angle Manually</div>
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
