'use client';

import React, { useRef, useState, useEffect } from 'react';
import * as D3 from 'd3';

export default function TransformGrid() {
    const svgRef = useRef<SVGSVGElement>(null);
    // Matrix state: [a, c] (col 1), [b, d] (col 2)
    // Initial Identity: [1, 0, 0, 1]
    const [matrix, setMatrix] = useState({ a: 1, c: 0, b: 0, d: 1 });
    const [isDragging, setIsDragging] = useState<string | null>(null);

    // Constants
    const width = 600;
    const height = 400;
    const scale = 40; // Pixels per unit
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
            // x' = ax + by
            // y' = cx + dy
            const px = (matrix.a * x + matrix.b * y) * scale;
            const py = -(matrix.c * x + matrix.d * y) * scale; // Invert Y for SVG
            return { x: px, y: py };
        };

        // Draw Transformed Grid
        const range = D3.range(-10, 11);

        // Vertical lines (transformed)
        range.forEach(i => {
            const start = transform(i, -10);
            const end = transform(i, 10);

            g.append('line')
                .attr('x1', start.x).attr('y1', start.y)
                .attr('x2', end.x).attr('y2', end.y)
                .attr('stroke', i === 0 ? '#fff' : '#ffffff')
                .attr('stroke-opacity', i === 0 ? 0.3 : 0.1)
                .attr('stroke-width', i === 0 ? 2 : 1);
        });

        // Horizontal lines (transformed)
        range.forEach(i => {
            const start = transform(-10, i);
            const end = transform(10, i);

            g.append('line')
                .attr('x1', start.x).attr('y1', start.y)
                .attr('x2', end.x).attr('y2', end.y)
                .attr('stroke', i === 0 ? '#fff' : '#ffffff')
                .attr('stroke-opacity', i === 0 ? 0.3 : 0.1)
                .attr('stroke-width', i === 0 ? 2 : 1);
        });

        // Definitions (Arrowhead)
        const defs = svg.append('defs');
        ['green', 'red', 'blue'].forEach(color => {
            defs.append('marker')
                .attr('id', `arrow-${color}`)
                .attr('viewBox', '0 -5 10 10')
                .attr('refX', 8).attr('refY', 0)
                .attr('markerWidth', 6).attr('markerHeight', 6)
                .attr('orient', 'auto')
                .append('path').attr('d', 'M0,-5L10,0L0,5')
                .attr('fill', color === 'green' ? '#00ff9d' : color === 'red' ? '#7000ff' : '#00f3ff');
        });

        // Draggable Basis Vectors
        const setupDrag = (id: 'i' | 'j') => {
            return D3.drag<SVGCircleElement, unknown>()
                .on('start', () => setIsDragging(id))
                .on('end', () => setIsDragging(null))
                .on('drag', (event) => {
                    const x = (event.x - centerX) / scale;
                    const y = -(event.y - centerY) / scale;
                    // Snap to 0.5 grid
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
        const iHead = transform(1, 0); // Where it *lands*, which is [a, c]
        // Wait, basis i is (1,0) in input space. In output space it is (a, c).
        // So we draw line from (0,0) to (a*scale, -c*scale).
        // My transform function handles this: transform(1,0) returns (a*sc, -c*sc).

        // Basis i Line
        g.append('line')
            .attr('x1', 0).attr('y1', 0)
            .attr('x2', iHead.x).attr('y2', iHead.y)
            .attr('stroke', '#00ff9d').attr('stroke-width', 3)
            .attr('marker-end', 'url(#arrow-green)');

        // Basis i Handle
        g.append('circle')
            .attr('cx', iHead.x).attr('cy', iHead.y).attr('r', 10)
            .attr('fill', '#00ff9d').attr('fill-opacity', 0.2)
            .attr('stroke', '#00ff9d')
            .style('cursor', 'grab')
            .call(setupDrag('i') as any);

        // Basis j (Red)
        const jHead = transform(0, 1);
        g.append('line')
            .attr('x1', 0).attr('y1', 0)
            .attr('x2', jHead.x).attr('y2', jHead.y)
            .attr('stroke', '#7000ff').attr('stroke-width', 3)
            .attr('marker-end', 'url(#arrow-red)');

        // Basis j Handle
        g.append('circle')
            .attr('cx', jHead.x).attr('cy', jHead.y).attr('r', 10)
            .attr('fill', '#7000ff').attr('fill-opacity', 0.2)
            .attr('stroke', '#7000ff')
            .style('cursor', 'grab')
            .call(setupDrag('j') as any);

    }, [matrix]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <div className="relative border border-white/10 rounded-lg overflow-hidden bg-black/20">
                <svg ref={svgRef} width={600} height={400} className="block" />

                {/* Matrix Overlay */}
                <div className="absolute top-4 left-4 glass-panel p-4 font-mono text-lg z-10 pointer-events-none">
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col border-l-2 border-r-2 border-white/20 px-2 py-1">
                            <span className="text-success">{matrix.a.toFixed(1)}</span>
                            <span className="text-success">{matrix.c.toFixed(1)}</span>
                        </div>
                        <div className="flex flex-col border-l-2 border-r-2 border-white/20 px-2 py-1">
                            <span className="text-secondary">{matrix.b.toFixed(1)}</span>
                            <span className="text-secondary">{matrix.d.toFixed(1)}</span>
                        </div>
                    </div>
                </div>

                <div className="absolute top-4 right-4 text-xs text-text-dim text-right">
                    Drag <span className="text-success">i-hat (green)</span><br />
                    or <span className="text-secondary">j-hat (purple)</span>
                </div>

                <button
                    onClick={() => setMatrix({ a: 1, c: 0, b: 0, d: 1 })}
                    className="absolute bottom-4 right-4 text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
