'use client';

import React, { useRef, useState, useEffect } from 'react';
import * as D3 from 'd3';
import LessonLayout from '@/components/layout/LessonLayout';

function DistributionLab() {
    const svgRef = useRef<SVGSVGElement>(null);
    const [mode, setMode] = useState<'discrete' | 'continuous'>('discrete');
    const [param, setParam] = useState(0.5); // Mean or P

    const width = 600;
    const height = 350;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    useEffect(() => {
        if (!svgRef.current) return;
        const svg = D3.select(svgRef.current);
        svg.selectAll('*').remove();

        // X Scale
        const x = D3.scaleLinear().domain([0, 10]).range([margin.left, width - margin.right]);
        // Y Scale
        const y = D3.scaleLinear().domain([0, 0.5]).range([height - margin.bottom, margin.top]);

        // Axis
        svg.append('g').attr('transform', `translate(0,${height - margin.bottom})`)
            .call(D3.axisBottom(x));

        if (mode === 'discrete') {
            // Binomial Distribution n=10, p=param
            const n = 10;
            const combination = (n: number, k: number) => {
                if (k < 0 || k > n) return 0;
                let res = 1;
                for (let i = 1; i <= k; i++) res = res * (n + 1 - i) / i;
                return res;
            };
            const binomial = (k: number) => combination(n, k) * Math.pow(param, k) * Math.pow(1 - param, n - k);

            const data = D3.range(0, 11).map(k => ({ k, p: binomial(k) }));

            svg.selectAll('.bar')
                .data(data).enter().append('rect')
                .attr('x', d => x(d.k) - 15)
                .attr('y', d => y(d.p))
                .attr('width', 30)
                .attr('height', d => y(0) - y(d.p))
                .attr('fill', '#00f3ff')
                .attr('opacity', 0.8);

        } else {
            // Normal Distribution mu=param*10, sigma=1
            const mu = param * 10;
            const sigma = 1.0;
            const normal = (v: number) => (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((v - mu) / sigma, 2));

            const data = D3.range(0, 10, 0.1).map(v => ({ v, p: normal(v) }));

            const area = D3.area<{ v: number, p: number }>()
                .x(d => x(d.v))
                .y0(y(0))
                .y1(d => y(d.p))
                .curve(D3.curveBasis);

            svg.append('path')
                .datum(data)
                .attr('fill', '#00f3ff')
                .attr('fill-opacity', 0.3)
                .attr('stroke', '#00f3ff')
                .attr('stroke-width', 2)
                .attr('d', area);
        }

    }, [mode, param]);

    return (
        <div className="w-full h-full flex flex-col items-center p-4">
            <div className="flex gap-4 mb-4">
                <button onClick={() => setMode('discrete')} className={`px-4 py-2 rounded ${mode === 'discrete' ? 'bg-primary text-black' : 'bg-white/10'}`}>Discrete (Bricks)</button>
                <button onClick={() => setMode('continuous')} className={`px-4 py-2 rounded ${mode === 'continuous' ? 'bg-primary text-black' : 'bg-white/10'}`}>Continuous (Fluid)</button>
            </div>

            <svg ref={svgRef} width={600} height={350} className="bg-black/20 rounded-lg" />

            <div className="w-full mt-6 px-8">
                <label className="block text-xs text-text-dim mb-2">Parameter ({mode === 'discrete' ? 'Probability p' : 'Mean μ'})</label>
                <input
                    type="range" min="0.1" max="0.9" step="0.01" value={param}
                    onChange={e => setParam(Number(e.target.value))}
                    className="w-full accent-primary"
                />
            </div>
        </div>
    );
}

export default function DistributionsPage() {
    return (
        <LessonLayout
            title="The Architecture of Chance"
            subtitle="Building randomness from bricks and fluids."
            visual={<DistributionLab />}
        >
            <section className="mb-12">
                <h2>Bricks vs. Fluids</h2>
                <p>
                    Some events are distinct steps. You can roll a 1 or a 2, but never a 1.5. This is <strong>Discrete</strong>.
                    Think of it like stacking bricks.
                </p>
                <p>
                    Switch to <strong>Continuous</strong> mode.
                    What about height? Outliers? When outcomes are infinite and smooth, we stop stacking bricks and start pouring fluid.
                </p>
            </section>

            <section>
                <h2>Try It</h2>
                <p>
                    Use the slider to shift the distribution.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>In Discrete mode, watch the blocks climb and fall stepwise.</li>
                    <li>In Continuous mode, watch the wave glide smoothly.</li>
                </ul>
            </section>
        </LessonLayout>
    );
}
