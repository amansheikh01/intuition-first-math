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
    const width = 500;
    const height = 500;
    const scale = width / 10; // 5 units each way
    const centerX = width / 2;
    const centerY = height / 2;

    useEffect(() => {
        if (!svgRef.current) return;

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
                .attr('stroke-opacity', i === 0 ? 0.3 : 0.08)
                .attr('stroke-width', i === 0 ? 1.5 : 1);

            // Horizontalish lines
            const startH = transform(-10, i);
            const endH = transform(10, i);
            g.append('line')
                .attr('x1', startH.x).attr('y1', startH.y)
                .attr('x2', endH.x).attr('y2', endH.y)
                .attr('stroke', 'var(--color-text)')
                .attr('stroke-opacity', i === 0 ? 0.3 : 0.08)
                .attr('stroke-width', i === 0 ? 1.5 : 1);
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

                    // Clamping for safety
                    const clampedX = Math.max(-5, Math.min(5, snapX));
                    const clampedY = Math.max(-5, Math.min(5, snapY));

                    if (id === 'i') {
                        setMatrix(m => ({ ...m, a: clampedX, c: clampedY }));
                    } else {
                        setMatrix(m => ({ ...m, b: clampedX, d: clampedY }));
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
            .attr('cx', iHead.x).attr('cy', iHead.y).attr('r', 10)
            .attr('fill', 'var(--color-success)').attr('fill-opacity', 0.2)
            .attr('stroke', 'var(--color-success)')
            .attr('stroke-width', 2)
            .style('cursor', 'grab')
            .call(setupDrag('i') as any);

        // Label for i
        g.append('text')
            .attr('x', iHead.x + 12).attr('y', iHead.y - 12)
            .attr('fill', 'var(--color-success)')
            .attr('font-family', 'var(--font-math)')
            .attr('font-size', '18px')
            .attr('font-weight', 'bold')
            .text('î');

        // Basis j (Blue/Purple)
        const jHead = transform(0, 1);
        g.append('line')
            .attr('x1', 0).attr('y1', 0)
            .attr('x2', jHead.x).attr('y2', jHead.y)
            .attr('stroke', 'var(--color-secondary)').attr('stroke-width', 3)
            .attr('marker-end', 'url(#arrow-j)');

        g.append('circle')
            .attr('cx', jHead.x).attr('cy', jHead.y).attr('r', 10)
            .attr('fill', 'var(--color-secondary)').attr('fill-opacity', 0.2)
            .attr('stroke', 'var(--color-secondary)')
            .attr('stroke-width', 2)
            .style('cursor', 'grab')
            .call(setupDrag('j') as any);

        // Label for j
        g.append('text')
            .attr('x', jHead.x + 12).attr('y', jHead.y - 12)
            .attr('fill', 'var(--color-secondary)')
            .attr('font-family', 'var(--font-math)')
            .attr('font-size', '18px')
            .attr('font-weight', 'bold')
            .text('ĵ');

    }, [matrix]);

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-start p-4 gap-4">
            <div className="relative w-full aspect-square border border-glass-border rounded-3xl overflow-hidden bg-glass-bg/30 shadow-inner group">
                <svg ref={svgRef} width={width} height={height} className="block mx-auto" />

                {/* Matrix Overlay */}
                <div className="absolute top-4 left-4 glass-panel p-4 font-mono z-10 pointer-events-none border border-glass-border shadow-lg">
                    <div className="text-[10px] text-text-dim mb-3 uppercase tracking-widest font-bold">Transformation Machine</div>
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col border-l-2 border-r-2 border-success/30 px-3 py-1 bg-success/5 rounded-sm">
                            <span className="text-success font-bold text-lg">{matrix.a.toFixed(1)}</span>
                            <span className="text-success font-bold text-lg">{matrix.c.toFixed(1)}</span>
                        </div>
                        <div className="flex flex-col border-l-2 border-r-2 border-secondary/30 px-3 py-1 bg-secondary/5 rounded-sm">
                            <span className="text-secondary font-bold text-lg">{matrix.b.toFixed(1)}</span>
                            <span className="text-secondary font-bold text-lg">{matrix.d.toFixed(1)}</span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                        onClick={() => setMatrix({ a: 1, c: 0, b: 0, d: 1 })}
                        className="text-[10px] font-bold uppercase tracking-wider bg-color-background/50 backdrop-blur-md border border-glass-border px-4 py-2 rounded-full hover:bg-white/20 transition-all active:scale-95 shadow-sm"
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
