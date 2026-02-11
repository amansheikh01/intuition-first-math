'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import * as D3 from 'd3';
import LessonLayout from '@/components/layout/LessonLayout';

import useMeasure from 'react-use-measure';

function StabilitySandbox() {
    const [containerRef, { width: containerWidth }] = useMeasure();
    const svgRef = useRef<SVGSVGElement>(null);
    const [angle, setAngle] = useState(90);
    const [noise, setNoise] = useState(0);

    const width = containerWidth || 600;
    const height = 300;
    const scale = useMemo(() => Math.min(width, height) / 10, [width, height]);
    const centerX = width / 2;
    const centerY = height / 2;

    useEffect(() => {
        if (!svgRef.current || width === 0) return;
        const svg = D3.select(svgRef.current);
        svg.selectAll('*').remove();

        const g = svg.append('g').attr('transform', `translate(${centerX}, ${centerY})`);

        // Ideal intersection point
        const intersectX = 2;
        const intersectY = 2;

        const drawLine = (thetaDeg: number, color: string, width: number, opacity: number = 1) => {
            const theta = thetaDeg * Math.PI / 180;
            const x1 = -15, x2 = 15;
            const y1 = intersectY + Math.tan(theta) * (x1 - intersectX);
            const y2 = intersectY + Math.tan(theta) * (x2 - intersectX);

            g.append('line')
                .attr('x1', x1 * scale).attr('y1', -y1 * scale)
                .attr('x2', x2 * scale).attr('y2', -y2 * scale)
                .attr('stroke', color).attr('stroke-width', width)
                .attr('stroke-opacity', opacity);
        };

        // Draw Reference Grid
        const range = D3.range(-15, 16).map(i => i * scale);
        g.selectAll('line.grid-v').data(range).enter().append('line')
            .attr('x1', (d: number) => d).attr('y1', -height).attr('x2', (d: number) => d).attr('y2', height)
            .attr('stroke', 'var(--color-text)').attr('stroke-opacity', 0.05);

        // Ideal lines
        const baseAngle = -15;
        drawLine(baseAngle, 'var(--color-primary)', 3);
        const line2Angle = baseAngle + angle;
        drawLine(line2Angle, 'var(--color-secondary)', 3);

        // Noise Simulation
        if (noise > 0) {
            const points = [];
            for (let i = 0; i < 40; i++) {
                const shift = (Math.random() - 0.5) * noise;
                const m1 = Math.tan(baseAngle * Math.PI / 180);
                const C1 = intersectY - m1 * intersectX;

                const m2 = Math.tan((line2Angle + (Math.random() - 0.5) * (noise * 0.5)) * Math.PI / 180);
                const C2 = intersectY - m2 * intersectX + shift;

                const ix = (C2 - C1) / (m1 - m2);
                const iy = m1 * ix + C1;
                points.push({ x: ix, y: iy });
            }

            g.selectAll('.noisy-point')
                .data(points).enter().append('circle')
                .attr('cx', (d: any) => d.x * scale).attr('cy', (d: any) => -d.y * scale)
                .attr('r', 3)
                .attr('fill', 'var(--color-accent)')
                .attr('fill-opacity', 0.4);
        }

        // Ideal Point
        g.append('circle')
            .attr('cx', intersectX * scale).attr('cy', -intersectY * scale)
            .attr('r', 6).attr('fill', 'var(--color-text)').attr('stroke', 'var(--color-background)').attr('stroke-width', 2);

    }, [angle, noise, width, scale, centerX, centerY]);

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center p-6 gap-8">
            <div className="relative w-full aspect-[2/1] border border-glass-border rounded-2xl overflow-hidden bg-glass-bg shadow-inner">
                <svg ref={svgRef} width={width} height={height} className="block" />

                <div className="absolute top-6 right-6 text-xs text-text-dim text-right bg-glass-bg/50 px-3 py-2 rounded-full backdrop-blur-sm border border-glass-border">
                    Observe how <span className="text-accent font-bold">Uncertainty</span> explodes near 0°
                </div>
            </div>

            <div className="w-full max-w-xl grid grid-cols-1 md:grid-cols-2 gap-8 p-6 glass-panel border border-glass-border">
                <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-text-dim block">Intersection Angle</label>
                    <input
                        type="range" min="2" max="90" value={angle}
                        onChange={e => setAngle(Number(e.target.value))}
                        className="w-full accent-primary"
                    />
                    <div className="text-right text-sm font-mono text-primary font-bold">{angle}°</div>
                </div>
                <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-text-dim block">Measurement Noise</label>
                    <input
                        type="range" min="0" max="2" step="0.1" value={noise}
                        onChange={e => setNoise(Number(e.target.value))}
                        className="w-full accent-accent"
                    />
                    <div className="text-right text-sm font-mono text-accent font-bold">±{noise} units</div>
                </div>
            </div>
        </div>
    );
}

export default function StabilityPage() {
    return (
        <LessonLayout
            title="The Butterfly Effect"
            subtitle="When approximate math goes wrong."
            visual={<StabilitySandbox />}
        >
            <section className="mb-12">
                <h2>The Wiggle</h2>
                <p>
                    Real-world data is never perfect. Sensors have noise. Measurements have error.
                    Solving a system of equations is geometrically equivalent to finding where lines intersect.
                </p>
                <p>
                    Move the <strong>Sensor Noise</strong> slider. See how the intersection point "fuzzes" into a cloud?
                    That cloud is your uncertainty.
                </p>
            </section>

            <section>
                <h2>Ill-Conditioning (The Explosion)</h2>
                <p>
                    Now, make the lines <strong>almost parallel</strong> (Angle close to 1°).
                </p>
                <p>
                    Add the <em>exact same</em> amount of sensor noise.
                </p>
                <p className="text-accent font-bold">
                    Explosion.
                </p>
                <p>
                    The intersection cloud shoots across the screen.
                    A 0.1% error in angle causes a 1000% error in position.
                    This system is <strong>Ill-Conditioned</strong>. No calculator can fix this.
                </p>
            </section>
        </LessonLayout>
    );
}
