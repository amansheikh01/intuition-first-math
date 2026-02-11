'use client';

import React, { useRef, useState, useEffect } from 'react';
import * as D3 from 'd3';
import { motion } from 'framer-motion';

export default function VectorSandbox() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [position, setPosition] = useState({ x: 3, y: 2 });
  const [isDragging, setIsDragging] = useState(false);

  // Constants
  const width = 600;
  const height = 400;
  const scale = 40; // Pixels per unit
  const centerX = width / 2;
  const centerY = height / 2;

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = D3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous

    // Definitions (Arrowhead)
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 8)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#00f3ff');

    // Grid System
    const xGrid = D3.range(-10, 10).map(i => i * scale);
    const yGrid = D3.range(-10, 10).map(i => i * scale);

    const gridGroup = svg.append('g')
        .attr('transform', `translate(${centerX}, ${centerY})`);

    // Vertical Lines
    gridGroup.selectAll('line.v')
        .data(xGrid).enter().append('line')
        .attr('class', 'v')
        .attr('x1', d => d).attr('y1', -height/2)
        .attr('x2', d => d).attr('y2', height/2)
        .attr('stroke', '#ffffff')
        .attr('stroke-opacity', 0.1);

    // Horizontal Lines
    gridGroup.selectAll('line.h')
        .data(yGrid).enter().append('line')
        .attr('class', 'h')
        .attr('x1', -width/2).attr('y1', d => d)
        .attr('x2', width/2).attr('y2', d => d)
        .attr('stroke', '#ffffff')
        .attr('stroke-opacity', 0.1);

    // Axes
    gridGroup.append('line')
        .attr('x1', -width/2).attr('y1', 0)
        .attr('x2', width/2).attr('y2', 0)
        .attr('stroke', '#fff').attr('stroke-opacity', 0.3);
    
    gridGroup.append('line')
        .attr('x1', 0).attr('y1', -height/2)
        .attr('x2', 0).attr('y2', height/2)
        .attr('stroke', '#fff').attr('stroke-opacity', 0.3);

    // The Vector
    const drag = D3.drag<SVGCircleElement, unknown>()
      .on('drag', (event) => {
         const newX = Math.round((event.x - centerX) / scale * 10) / 10;
         const newY = Math.round((-(event.y - centerY)) / scale * 10) / 10; // Flip Y
         setPosition({ x: newX, y: newY });
      })
      .on('start', () => setIsDragging(true))
      .on('end', () => setIsDragging(false));

    // Vector Line
    const pixelX = position.x * scale;
    const pixelY = -position.y * scale; // Invert Y for SVG

    gridGroup.append('line')
        .attr('x1', 0).attr('y1', 0)
        .attr('x2', pixelX).attr('y2', pixelY)
        .attr('stroke', '#00f3ff')
        .attr('stroke-width', 3)
        .attr('marker-end', 'url(#arrowhead)');

    // Drag Handle (The Tip)
    const handle = gridGroup.append('circle')
        .attr('cx', pixelX).attr('cy', pixelY)
        .attr('r', 10)
        .attr('fill', '#00f3ff')
        .attr('fill-opacity', 0.2)
        .attr('stroke', '#00f3ff')
        .style('cursor', 'grab')
        .call(drag as any);

     if (isDragging) handle.attr('cursor', 'grabbing');

  }, [position, isDragging]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="relative border border-white/10 rounded-lg overflow-hidden bg-black/20">
         <svg ref={svgRef} width={600} height={400} className="block" />
         
         {/* Live Stats Overlay */}
         <div className="absolute bottom-4 left-4 glass-panel p-3 text-sm font-mono space-y-1 z-10 pointer-events-none">
            <div className="text-primary">
              <span className="opacity-50">v = </span>
              [{position.x.toFixed(1)}, {position.y.toFixed(1)}]
            </div>
            <div className="text-white">
               <span className="opacity-50">|v| = </span>
               {Math.sqrt(position.x**2 + position.y**2).toFixed(2)}
            </div>
         </div>
         
         <div className="absolute top-4 right-4 text-xs text-text-dim text-right">
             Drag the tip<br/>to change the vector
         </div>
      </div>
    </div>
  );
}
