'use client';

import React, { useRef, useState, useEffect } from 'react';
import * as D3 from 'd3';
import LessonLayout from '@/components/layout/LessonLayout';

function StabilitySandbox() {
    const svgRef = useRef<SVGSVGElement>(null);
    const [angle, setAngle] = useState(90); // Degrees between lines
    const [noise, setNoise] = useState(0); // Noise Level

    const width = 600;
    const height = 400;
    const scale = 40;
    const centerX = width / 2;
    const centerY = height / 2;

    useEffect(() => {
        if (!svgRef.current) return;
        const svg = D3.select(svgRef.current);
        svg.selectAll('*').remove();

        const g = svg.append('g').attr('transform', `translate(${centerX}, ${centerY})`);

        // Line 1: Fixed Horizontal y = 2 (in math coords) -> y = -2*scale (in svg)
        // Actually let's make Line 1 y = x for visual symmetry
        // Line 1: y = x.  Line 2: Rotated by 'angle' relative to Line 1.

        // Let's use intersection at (2, 2)
        // Line 1 passes through (2, 2) with angle 0 (Horizontal for simplicity)
        // y = 2.

        const intersectX = 2;
        const intersectY = 2;

        const drawLine = (thetaDeg: number, color: string, width: number) => {
            const theta = thetaDeg * Math.PI / 180;
            // Point-Slope: y - y1 = m(x - x1)
            // m = tan(theta)

            // Find endpoints at x = -10 and x = 10
            const x1 = -10, x2 = 10;
            const y1 = intersectY + Math.tan(theta) * (x1 - intersectX);
            const y2 = intersectY + Math.tan(theta) * (x2 - intersectX);

            g.append('line')
                .attr('x1', x1 * scale).attr('y1', -y1 * scale)
                .attr('x2', x2 * scale).attr('y2', -y2 * scale)
                .attr('stroke', color).attr('stroke-width', width);
        };

        // Draw "Ideal" Intersection
        g.append('circle')
            .attr('cx', intersectX * scale).attr('cy', -intersectY * scale)
            .attr('r', 4).attr('fill', '#fff');

        // Line 1 (Fixed Horizontal-ish for stability base, let's say -15 deg)
        const baseAngle = -15;
        drawLine(baseAngle, '#00f3ff', 2);

        // Line 2 (Variable)
        const line2Angle = baseAngle + angle;
        drawLine(line2Angle, '#7000ff', 2);

        // Visualize Noise / Uncertainty
        // We simulate 50 "perturbed" lines 2 and see where they intersect Line 1
        if (noise > 0) {
            const points = [];
            for (let i = 0; i < 50; i++) {
                const noiseAngle = (Math.random() - 0.5) * noise * 2; // +/- noise
                const noisyTheta = (line2Angle + noiseAngle) * Math.PI / 180;
                const baseTheta = baseAngle * Math.PI / 180;

                // Intersection of two lines:
                // L1: y - Iy = tan(base)(x - Ix)
                // L2: y - Iy = tan(noisy)(x - Ix) ... wait they intersect at same point if I just pivot.
                // Instability comes from *Parallel shift* noise usually, or pivoting. 
                // Let's Pivot Line 2 slightly around a DIFFERENT point (like origin) to show intersection move?
                // Or shift L2 up/down.

                // Let's Shift Line 2 vertically by noise*random
                const shift = (Math.random() - 0.5) * noise;
                // L1: y = tan(base)*x + C1
                // L2: y = tan(line2)*x + C2 + shift

                const m1 = Math.tan(baseTheta);
                const C1 = intersectY - m1 * intersectX;

                const m2 = Math.tan(line2Angle * Math.PI / 180);
                const C2 = intersectY - m2 * intersectX + shift;

                // Solve m1*x + C1 = m2*x + C2
                // x(m1 - m2) = C2 - C1
                const ix = (C2 - C1) / (m1 - m2);
                const iy = m1 * ix + C1;

                points.push({ x: ix, y: iy });
            }

            g.selectAll('.dot')
                .data(points).enter().append('circle')
                .attr('cx', d => d.x * scale).attr('cy', d => -d.y * scale)
                .attr('r', 2).attr('fill', '#ff0055').attr('opacity', 0.5);
        }

    }, [angle, noise]);

    return (
        <div className="w-full h-full flex flex-col items-center">
            <svg ref={svgRef} width={600} height={300} className="border border-white/10 rounded-lg bg-black/20" />

            <div className="flex gap-8 mt-4 w-full px-8">
                <div className="flex-1">
                    <label className="block text-xs text-text-dim mb-1">Intersection Angle (Conditioning)</label>
                    <input
                        type="range" min="1" max="90" value={angle}
                        onChange={e => setAngle(Number(e.target.value))}
                        className="w-full accent-primary"
                    />
                    <div className="text-right text-xs text-primary">{angle}°</div>
                </div>
                <div className="flex-1">
                    <label className="block text-xs text-text-dim mb-1">Sensor Noise (Input Error)</label>
                    <input
                        type="range" min="0" max="2" step="0.1" value={noise}
                        onChange={e => setNoise(Number(e.target.value))}
                        className="w-full accent-accent"
                    />
                    <div className="text-right text-xs text-accent">{noise} units</div>
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
