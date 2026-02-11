'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import * as D3 from 'd3';
import { motion } from 'framer-motion';
import useMeasure from 'react-use-measure';

export default function VectorSandbox() {
  const [containerRef, { width: containerWidth }] = useMeasure();
  const svgRef = useRef<SVGSVGElement>(null);
  const [position, setPosition] = useState({ x: 3, y: 2 });
  const [isDragging, setIsDragging] = useState(false);

  // Constants
  const width = 500;
  const height = 500;
  const scale = width / 12;
  const centerX = width / 2;
  const centerY = height / 2;

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = D3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Definitions (Arrowhead)
    const defs = svg.append('defs');
    defs.append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 8)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', 'var(--color-primary)');

    // Grid System
    const xGrid = D3.range(-6, 7).map(i => i * scale);
    const yGrid = D3.range(-6, 7).map(i => i * scale);

    const gridGroup = svg.append('g')
      .attr('transform', `translate(${centerX}, ${centerY})`);

    // Grid Lines
    gridGroup.selectAll('line.v')
      .data(xGrid).enter().append('line')
      .attr('class', 'v')
      .attr('x1', d => d).attr('y1', -height / 2)
      .attr('x2', d => d).attr('y2', height / 2)
      .attr('stroke', 'var(--color-text)')
      .attr('stroke-opacity', 0.08);

    gridGroup.selectAll('line.h')
      .data(yGrid).enter().append('line')
      .attr('class', 'h')
      .attr('x1', -width / 2).attr('y1', d => d)
      .attr('x2', width / 2).attr('y2', d => d)
      .attr('stroke', 'var(--color-text)')
      .attr('stroke-opacity', 0.08);

    // Axes
    gridGroup.append('line')
      .attr('x1', -width / 2).attr('y1', 0)
      .attr('x2', width / 2).attr('y2', 0)
      .attr('stroke', 'var(--color-text)').attr('stroke-opacity', 0.3)
      .attr('stroke-width', 1.5);

    gridGroup.append('line')
      .attr('x1', 0).attr('y1', -height / 2)
      .attr('x2', 0).attr('y2', height / 2)
      .attr('stroke', 'var(--color-text)').attr('stroke-opacity', 0.3)
      .attr('stroke-width', 1.5);

    // Axis Labels
    gridGroup.append('text')
      .attr('x', width / 2 - 20).attr('y', 20)
      .attr('fill', 'var(--color-text-dim)')
      .attr('font-family', 'var(--font-math)')
      .attr('font-style', 'italic')
      .attr('font-size', '18px')
      .text('x');

    gridGroup.append('text')
      .attr('x', 15).attr('y', -height / 2 + 25)
      .attr('fill', 'var(--color-text-dim)')
      .attr('font-family', 'var(--font-math)')
      .attr('font-style', 'italic')
      .attr('font-size', '18px')
      .text('y');

    // The Vector
    const drag = D3.drag<SVGCircleElement, unknown>()
      .on('drag', (event) => {
        const newX = Math.round((event.x - centerX) / scale * 2) / 2;
        const newY = Math.round((-(event.y - centerY)) / scale * 2) / 2;
        // Clamp to grid
        setPosition({
          x: Math.max(-5, Math.min(5, newX)),
          y: Math.max(-5, Math.min(5, newY))
        });
      })
      .on('start', () => setIsDragging(true))
      .on('end', () => setIsDragging(false));

    const pixelX = position.x * scale;
    const pixelY = -position.y * scale;

    // Vector shadow/glow
    gridGroup.append('line')
      .attr('x1', 0).attr('y1', 0)
      .attr('x2', pixelX).attr('y2', pixelY)
      .attr('stroke', 'var(--color-primary)')
      .attr('stroke-width', 10)
      .attr('stroke-opacity', 0.05)
      .attr('stroke-linecap', 'round');

    // Vector Line
    gridGroup.append('line')
      .attr('x1', 0).attr('y1', 0)
      .attr('x2', pixelX).attr('y2', pixelY)
      .attr('stroke', 'var(--color-primary)')
      .attr('stroke-width', 3)
      .attr('marker-end', 'url(#arrowhead)');

    // Drag Handle
    const handle = gridGroup.append('circle')
      .attr('cx', pixelX).attr('cy', pixelY)
      .attr('r', 10)
      .attr('fill', 'var(--color-primary)')
      .attr('fill-opacity', 0.2)
      .attr('stroke', 'var(--color-primary)')
      .attr('stroke-width', 2)
      .style('cursor', 'grab')
      .call(drag as any);

    if (isDragging) handle.attr('cursor', 'grabbing');

  }, [position, isDragging]);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-start p-4 gap-4">
      <div className="relative w-full aspect-square border border-glass-border rounded-3xl overflow-hidden bg-glass-bg/30 shadow-inner group">
        <svg ref={svgRef} width={width} height={height} className="block mx-auto" />

        {/* Live Stats Overlay */}
        <div className="absolute bottom-4 left-4 glass-panel p-3 text-sm font-mono space-y-2 z-10 pointer-events-none border border-glass-border shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-text-dim italic font-math text-base">v = </span>
            <div className="flex flex-col border-l-2 border-r-2 border-primary/20 px-3 leading-tight font-bold">
              <span className="text-primary">{position.x.toFixed(1)}</span>
              <span className="text-primary">{position.y.toFixed(1)}</span>
            </div>
          </div>
          <div className="text-color-text border-t border-glass-border pt-1">
            <span className="text-text-dim italic font-math text-base">|v| = </span>
            <span className="font-bold text-secondary">{Math.sqrt(position.x ** 2 + position.y ** 2).toFixed(2)}</span>
          </div>
        </div>

        <div className="absolute top-4 right-4 text-[10px] uppercase tracking-tighter text-text-dim bg-glass-bg/80 px-3 py-1.5 rounded-full backdrop-blur-md border border-glass-border font-bold">
          Interactive Vector
        </div>
      </div>

      {/* Controls */}
      <div className="w-full max-w-md grid grid-cols-1 gap-6 p-6 glass-panel border border-glass-border">
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <label className="text-sm font-bold text-text-dim flex items-center gap-2">
              <span className="font-math italic">x</span> component
            </label>
            <span className="text-sm font-mono bg-primary/10 text-primary px-2 py-0.5 rounded">{position.x.toFixed(1)}</span>
          </div>
          <input
            type="range" min="-6" max="6" step="0.5"
            value={position.x}
            onChange={(e) => setPosition(p => ({ ...p, x: parseFloat(e.target.value) }))}
            className="w-full accent-primary"
          />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <label className="text-sm font-bold text-text-dim flex items-center gap-2">
              <span className="font-math italic">y</span> component
            </label>
            <span className="text-sm font-mono bg-primary/10 text-primary px-2 py-0.5 rounded">{position.y.toFixed(1)}</span>
          </div>
          <input
            type="range" min="-6" max="6" step="0.5"
            value={position.y}
            onChange={(e) => setPosition(p => ({ ...p, y: parseFloat(e.target.value) }))}
            className="w-full accent-primary"
          />
        </div>
      </div>
    </div>
  );
}
