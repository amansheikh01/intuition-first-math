'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Point {
    x: number;
    y: number;
    inside: boolean;
}

const SQUARE_SIZE = 160;
const CENTER = 100;
const POINT_RADIUS = 1.5;

export default function MonteCarloPiVisualizer() {
    const [points, setPoints] = useState<Point[]>([]);
    const [totalPoints, setTotalPoints] = useState(0);
    const [insideCount, setInsideCount] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            const x = Math.random() * 2 - 1; // [-1, 1]
            const y = Math.random() * 2 - 1; // [-1, 1]
            const inside = x * x + y * y <= 1;

            setPoints((prev) => {
                const newPoints = [...prev, { x, y, inside }];
                // Keep only last 500 points for performance
                return newPoints.slice(-500);
            });

            setTotalPoints((prev) => prev + 1);
            if (inside) {
                setInsideCount((prev) => prev + 1);
            }
        }, 50); // Add point every 50ms

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const piApproximation = totalPoints > 0 ? (4 * insideCount) / totalPoints : 0;

    return (
        <div className="flex flex-col items-center justify-center p-6 w-full max-w-[300px]">
            <div className="relative aspect-square w-full bg-[#FAF7F2] dark:bg-[#0F172A] rounded-2xl border border-border/40 overflow-hidden flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 200 200" className="w-full h-full p-4">
                    {/* Square boundary */}
                    <rect
                        x={CENTER - SQUARE_SIZE / 2}
                        y={CENTER - SQUARE_SIZE / 2}
                        width={SQUARE_SIZE}
                        height={SQUARE_SIZE}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-text-primary/20"
                    />

                    {/* Circle (r=1) */}
                    <circle
                        cx={CENTER}
                        cy={CENTER}
                        r={SQUARE_SIZE / 2}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-accent"
                        style={{ stroke: 'var(--pi-stroke-color)' }}
                    />

                    {/* Random points */}
                    {points.map((point, idx) => {
                        const svgX = CENTER + (point.x * SQUARE_SIZE) / 2;
                        const svgY = CENTER + (point.y * SQUARE_SIZE) / 2;
                        return (
                            <circle
                                key={idx}
                                cx={svgX}
                                cy={svgY}
                                r={POINT_RADIUS}
                                fill={point.inside ? '#10B981' : '#EF4444'}
                                opacity={0.6}
                            />
                        );
                    })}
                </svg>

                <style jsx>{`
          div {
            --pi-stroke-color: #1E1B4B;
          }
          :global([data-theme='dark']) div {
            --pi-stroke-color: #F8FAFC;
          }
        `}</style>
            </div>

            <div className="mt-8 space-y-4 text-center w-full">
                <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-secondary/60">
                        Monte Carlo Method
                    </p>
                    <div className="font-serif text-lg italic text-text-primary">
                        π ≈ 4 × (inside / total)
                    </div>
                </div>

                <div className="pt-2 border-t border-border/50 grid grid-cols-2 gap-4 text-left">
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-text-secondary/40">Total Points</span>
                        <div className="font-mono text-sm tabular-nums text-text-primary">
                            {totalPoints}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-text-secondary/40">Inside Circle</span>
                        <div className="font-mono text-sm tabular-nums text-text-primary">
                            {insideCount}
                        </div>
                    </div>
                </div>

                <div className="space-y-1 pt-2">
                    <div className="flex justify-between items-baseline">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-text-secondary/40">π ≈</span>
                        <motion.span
                            key={Math.floor(totalPoints / 10)}
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 1 }}
                            className="font-mono text-base font-bold tabular-nums text-accent"
                        >
                            {piApproximation.toFixed(6)}
                        </motion.span>
                    </div>
                </div>
            </div>
        </div>
    );
}
