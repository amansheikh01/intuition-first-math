'use client';

import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import * as D3 from 'd3';

interface GraphContainerProps {
    domain?: [number, number];
    range?: [number, number];
    showGrid?: boolean;
    showAxes?: boolean;
    children?: (scales: { xScale: any, yScale: any, svg: any, g: any }) => void;
}

export interface GraphRef {
    svg: SVGSVGElement | null;
    zoomTo?: (x: number, y: number, k: number) => void;
}

const GraphContainer = forwardRef<GraphRef, GraphContainerProps>(({
    domain = [-10, 10],
    range = [-10, 10],
    showGrid = true,
    showAxes = true,
    children
}, ref) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const gRef = useRef<SVGGElement>(null);
    const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

    useImperativeHandle(ref, () => ({
        svg: svgRef.current
    }));

    useEffect(() => {
        if (!svgRef.current || !gRef.current) return;

        const svg = D3.select(svgRef.current);
        const g = D3.select(gRef.current);
        const { width, height } = dimensions;

        // Clear previous grid/axes but keep children
        g.selectAll('.grid-line').remove();
        g.selectAll('.axis').remove();

        const xScale = D3.scaleLinear().domain(domain).range([0, width]);
        const yScale = D3.scaleLinear().domain(range).range([height, 0]);

        // Zoom Behavior
        const zoom = D3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.5, 20])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
                // Update grid/axes on zoom if we want them static (but usually we want them to move)
            });

        svg.call(zoom as any);

        // Draw Grid
        if (showGrid) {
            const xTicks = xScale.ticks(20);
            const yTicks = yScale.ticks(20);

            g.selectAll('.x-grid')
                .data(xTicks).enter().append('line')
                .attr('class', 'grid-line x-grid')
                .attr('x1', d => xScale(d)).attr('y1', yScale(range[0]))
                .attr('x2', d => xScale(d)).attr('y2', yScale(range[1]))
                .attr('stroke', '#e5e7eb').attr('stroke-width', 0.5);

            g.selectAll('.y-grid')
                .data(yTicks).enter().append('line')
                .attr('class', 'grid-line y-grid')
                .attr('x1', xScale(domain[0])).attr('y1', d => yScale(d))
                .attr('x2', xScale(domain[1])).attr('y2', d => yScale(d))
                .attr('stroke', '#e5e7eb').attr('stroke-width', 0.5);
        }

        // Draw Axes
        if (showAxes) {
            // X-axis
            g.append('line')
                .attr('class', 'axis x-axis')
                .attr('x1', xScale(domain[0])).attr('y1', yScale(0))
                .attr('x2', xScale(domain[1])).attr('y2', yScale(0))
                .attr('stroke', '#0f172a').attr('stroke-width', 1.5);

            // Y-axis
            g.append('line')
                .attr('class', 'axis y-axis')
                .attr('x1', xScale(0)).attr('y1', yScale(range[0]))
                .attr('x2', xScale(0)).attr('y2', yScale(range[1]))
                .attr('stroke', '#0f172a').attr('stroke-width', 1.5);

            // Labels
            g.append('text')
                .attr('x', xScale(domain[1]) - 20)
                .attr('y', yScale(0) + 20)
                .attr('font-style', 'italic')
                .attr('font-family', 'KaTeX_Main')
                .text('x');

            g.append('text')
                .attr('x', xScale(0) + 10)
                .attr('y', yScale(range[1]) + 20)
                .attr('font-style', 'italic')
                .attr('font-family', 'KaTeX_Main')
                .text('y');
        }

        // Render children if any
        if (children) {
            children({ xScale, yScale, svg, g });
        }

    }, [domain, range, showGrid, showAxes, dimensions]);

    return (
        <div className="viz-container">
            <svg
                ref={svgRef}
                width={dimensions.width}
                height={dimensions.height}
                className="cursor-crosshair"
            >
                <g ref={gRef} />
            </svg>
            <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="w-8 h-8 flex items-center justify-center bg-surface border border-border rounded shadow-sm hover:bg-background text-text text-lg font-bold">
                    +
                </button>
                <button className="w-8 h-8 flex items-center justify-center bg-surface border border-border rounded shadow-sm hover:bg-background text-text text-lg font-bold">
                    -
                </button>
            </div>
        </div>
    );
});

GraphContainer.displayName = 'GraphContainer';

export default GraphContainer;
