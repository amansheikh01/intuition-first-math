'use client';

import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Sliders, Type } from 'lucide-react';
import GraphContainer from './GraphContainer';
import * as D3 from 'd3';

export default function LiveGraphDemo() {
    const [funcString, setFuncString] = useState('Math.sin(x)');
    const [offset, setOffset] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setOffset(prev => (prev + 0.05) % (Math.PI * 2));
        }, 30);

        return () => clearInterval(interval);
    }, [isRunning]);

    const renderFunction = ({ xScale, yScale, g }: any) => {
        const points: [number, number][] = [];
        const domain = xScale.domain();
        const step = (domain[1] - domain[0]) / 200;

        for (let x = domain[0]; x <= domain[1]; x += step) {
            try {
                // Safely evaluate function string
                // Note: In a real app, use a proper math parser like mathjs
                const y = eval(funcString.replace(/x/g, `(${x} - ${offset})`));
                if (!isNaN(y)) {
                    points.push([x, y]);
                }
            } catch (e) {
                // Silently fail for invalid formulas
            }
        }

        const line = D3.line<[number, number]>()
            .x(d => xScale(d[0]))
            .y(d => yScale(d[1]))
            .curve(D3.curveBasis);

        g.selectAll('.demo-path').remove();
        g.append('path')
            .datum(points)
            .attr('class', 'demo-path')
            .attr('fill', 'none')
            .attr('stroke', 'var(--color-primary)')
            .attr('stroke-width', 3)
            .attr('d', line);
    };

    return (
        <div className="flex flex-col gap-4 p-6 bg-surface border border-border rounded-xl shadow-lg w-full max-w-[450px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-muted">Real-time Analysis</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsRunning(!isRunning)}
                        className="p-1.5 rounded-md hover:bg-background transition-colors text-muted"
                    >
                        {isRunning ? <RotateCcw size={16} /> : <Play size={16} />}
                    </button>
                </div>
            </div>

            <div className="relative aspect-square w-full bg-background rounded-lg border border-border overflow-hidden group">
                <GraphContainer
                    domain={[-6, 6]}
                    range={[-3, 3]}
                    showGrid={true}
                    showAxes={true}
                >
                    {renderFunction}
                </GraphContainer>

                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-2 py-1 bg-surface/90 backdrop-blur border border-border rounded text-[10px] font-mono text-primary shadow-sm">
                        f(x) = {funcString}
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-2">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted flex items-center gap-2">
                        <Type size={12} /> Function Definition
                    </label>
                    <input
                        type="text"
                        value={funcString}
                        onChange={(e) => setFuncString(e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        placeholder="e.g. Math.sin(x)"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted flex items-center gap-2">
                        <Sliders size={12} /> Phase Shift: {offset.toFixed(2)}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max={Math.PI * 2}
                        step="0.01"
                        value={offset}
                        onChange={(e) => {
                            setIsRunning(false);
                            setOffset(parseFloat(e.target.value));
                        }}
                        className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>
            </div>
        </div>
    );
}
