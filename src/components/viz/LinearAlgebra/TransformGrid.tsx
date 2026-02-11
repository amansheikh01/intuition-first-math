'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import * as D3 from 'd3';
import useMeasure from 'react-use-measure';

export default function TransformGrid() {
    const [containerRef, { width: containerWidth }] = useMeasure();
    const svgRef = useRef<SVGSVGElement>(null);
    // Matrix state: [a, c] (col 1), [b, d] (col 2)
    const [matrix, setMatrix] = useState({ a: 1, c: 0, b: 0.5, d: 1 });
    const [isDragging, setIsDragging] = useState<string | null>(null);

    // Constants
    const width = containerWidth || 600;
    const height = Math.min(width * 0.66, 400);
    const scale = useMemo(() => Math.min(width, height) / 10, [width, height]);
    const centerX = width / 2;
    const centerY = height / 2;

    useEffect(() => {
        if (!svgRef.current || width === 0) return;

        const svg = D3.select(svgRef.current);
        svg.selectAll('*').remove();

        const g = svg.append('g')
            .attr('transform', `translate(${centerX}, ${centerY})`);

        // Helper: Apply Matrix to (x, y)
        const transform = (x: number, y: number) => {
            const px = (matrix.a * x + matrix.b * y) * scale;
            const py = -(matrix.c * x + matrix.d * y) * scale;
            return { x: px, y: py };
        };

        // Draw Transformed Grid
        const range = D3.range(-8, 9);

        // Grid Lines
        range.forEach(i => {
            // Verticalish lines
            const startV = transform(i, -10);
            const endV = transform(i, 10);
            g.append('line')
                .attr('x1', startV.x).attr('y1', startV.y)
                .attr('x2', endV.x).attr('y2', endV.y)
                .attr('stroke', 'var(--color-text)')
                .attr('stroke-opacity', i === 0 ? 0.2 : 0.05)
                .attr('stroke-width', i === 0 ? 2 : 1);

            // Horizontalish lines
            const startH = transform(-10, i);
            const endH = transform(10, i);
            g.append('line')
                .attr('x1', startH.x).attr('y1', startH.y)
                .attr('x2', endH.x).attr('y2', endH.y)
                .attr('stroke', 'var(--color-text)')
                .attr('stroke-opacity', i === 0 ? 0.2 : 0.05)
                .attr('stroke-width', i === 0 ? 2 : 1);
        });

        // Definitions (Arrowheads)
        const defs = svg.append('defs');
        const colors = {
            i: 'var(--color-success)',
            j: 'var(--color-secondary)'
        };

        Object.entries(colors).forEach(([key, color]) => {
            defs.append('marker')
                .attr('id', `arrow-${key}`)
                .attr('viewBox', '0 -5 10 10')
                .attr('refX', 8).attr('refY', 0)
                .attr('markerWidth', 6).attr('markerHeight', 6)
                .attr('orient', 'auto')
                .append('path').attr('d', 'M0,-5L10,0L0,5')
                .attr('fill', color);
        });

        // Draggable Basis Vectors Logic
        const setupDrag = (id: 'i' | 'j') => {
            return D3.drag<SVGCircleElement, unknown>()
                .on('start', () => setIsDragging(id))
                .on('end', () => setIsDragging(null))
                .on('drag', (event) => {
                    const x = (event.x - centerX) / scale;
                    const y = -(event.y - centerY) / scale;
                    const snapX = Math.round(x * 2) / 2;
                    const snapY = Math.round(y * 2) / 2;

                    if (id === 'i') {
                        setMatrix(m => ({ ...m, a: snapX, c: snapY }));
                    } else {
                        setMatrix(m => ({ ...m, b: snapX, d: snapY }));
                    }
                });
        };

        // Basis i (Green)
        const iHead = transform(1, 0);
        g.append('line')
            .attr('x1', 0).attr('y1', 0)
            .attr('x2', iHead.x).attr('y2', iHead.y)
            .attr('stroke', 'var(--color-success)').attr('stroke-width', 3)
            .attr('marker-end', 'url(#arrow-i)');

        g.append('circle')
            .attr('cx', iHead.x).attr('cy', iHead.y).attr('r', 12)
            .attr('fill', 'var(--color-success)').attr('fill-opacity', 0.1)
            .attr('stroke', 'var(--color-success)')
            .style('cursor', 'grab')
            .call(setupDrag('i') as any);

        // Label for i
        g.append('text')
            .attr('x', iHead.x + 10).attr('y', iHead.y - 10)
            .attr('fill', 'var(--color-success)')
            .attr('font-family', 'var(--font-math)')
            .attr('font-size', '14px')
            .text('î');

        // Basis j (Blue/Purple)
        const jHead = transform(0, 1);
        g.append('line')
            .attr('x1', 0).attr('y1', 0)
            .attr('x2', jHead.x).attr('y2', jHead.y)
            .attr('stroke', 'var(--color-secondary)').attr('stroke-width', 3)
            .attr('marker-end', 'url(#arrow-j)');

        g.append('circle')
            .attr('cx', jHead.x).attr('cy', jHead.y).attr('r', 12)
            .attr('fill', 'var(--color-secondary)').attr('fill-opacity', 0.1)
            .attr('stroke', 'var(--color-secondary)')
            .style('cursor', 'grab')
            .call(setupDrag('j') as any);

        // Label for j
        g.append('text')
            .attr('x', jHead.x + 10).attr('y', jHead.y - 10)
            .attr('fill', 'var(--color-secondary)')
            .attr('font-family', 'var(--font-math)')
            .attr('font-size', '14px')
            .text('ĵ');

    }, [matrix, width, scale, centerX, centerY]);

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center p-6 gap-6">
            <div className="relative w-full border border-glass-border rounded-2xl overflow-hidden bg-glass-bg shadow-inner">
                <svg ref={svgRef} width={width} height={height} className="block" />

                {/* Matrix Overlay */}
                <div className="absolute top-4 left-4 glass-panel p-4 font-mono z-10 pointer-events-none border border-glass-border">
                    <div className="text-xs text-text-dim mb-2 uppercase tracking-tight">Transformation Matrix</div>
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col border-l-2 border-r-2 border-glass-border px-3 py-1">
                            <span className="text-success font-bold">{matrix.a.toFixed(1)}</span>
                            <span className="text-success font-bold">{matrix.c.toFixed(1)}</span>
                        </div>
                        <div className="flex flex-col border-l-2 border-r-2 border-glass-border px-3 py-1">
                            <span className="text-secondary font-bold">{matrix.b.toFixed(1)}</span>
                            <span className="text-secondary font-bold">{matrix.d.toFixed(1)}</span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                        onClick={() => setMatrix({ a: 1, c: 0, b: 0, d: 1 })}
                        className="text-xs bg-glass-bg border border-glass-border px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
                    >
                        Reset Identity
                    </button>
                </div>
            </div>

            {/* Sliders for manual control */}
            <div className="w-full max-w-lg grid grid-cols-2 gap-4 p-6 glass-panel border border-glass-border">
                <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-wider text-text-dim block">Column 1 (î)</label>
                    <input type="range" min="-3" max="3" step="0.5" value={matrix.a} onChange={e => setMatrix(m => ({ ...m, a: parseFloat(e.target.value) }))} className="w-full accent-success" />
                    <input type="range" min="-3" max="3" step="0.5" value={matrix.c} onChange={e => setMatrix(m => ({ ...m, c: parseFloat(e.target.value) }))} className="w-full accent-success" />
                </div>
                <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-wider text-text-dim block">Column 2 (ĵ)</label>
                    <input type="range" min="-3" max="3" step="0.5" value={matrix.b} onChange={e => setMatrix(m => ({ ...m, b: parseFloat(e.target.value) }))} className="w-full accent-secondary" />
                    <input type="range" min="-3" max="3" step="0.5" value={matrix.d} onChange={e => setMatrix(m => ({ ...m, d: parseFloat(e.target.value) }))} className="w-full accent-secondary" />
                </div>
            </div>
        </div>
    );
}
