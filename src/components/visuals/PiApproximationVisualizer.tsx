'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SIDES_SEQUENCE = [6, 12, 24, 48, 96, 192];
const RADIUS = 80; // Scaled for SVG viewBox
const CENTER = 100;

export default function PiApproximationVisualizer() {
    const [step, setStep] = useState(0);
    const n = SIDES_SEQUENCE[step];

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % SIDES_SEQUENCE.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    // Area of inscribed n-gon with r=1: (n/2) * sin(2pi/n)
    // We'll display this value
    const areaValue = (n / 2) * Math.sin((2 * Math.PI) / n);

    // Calculate polygon points
    const points = Array.from({ length: n }).map((_, i) => {
        const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
        const x = CENTER + RADIUS * Math.cos(angle);
        const y = CENTER + RADIUS * Math.sin(angle);
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="flex flex-col items-center justify-center p-6 w-full max-w-[300px]">
            <div className="relative aspect-square w-full bg-[#FAF7F2] dark:bg-[#0F172A] rounded-2xl border border-border/40 overflow-hidden flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 200 200" className="w-full h-full p-4">
                    {/* Main Circle */}
                    <circle
                        cx={CENTER}
                        cy={CENTER}
                        r={RADIUS}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-text-primary/10"
                    />

                    {/* Inscribed Polygon */}
                    <motion.polygon
                        points={points}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-accent lg:text-indigo-900 dark:lg:text-white"
                        style={{ stroke: 'var(--pi-stroke-color)' }}
                        initial={false}
                        animate={{
                            opacity: 1,
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />

                    {/* Radius Line (r=1) */}
                    <line
                        x1={CENTER}
                        y1={CENTER}
                        x2={CENTER}
                        y2={CENTER - RADIUS}
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="4 2"
                        className="text-text-secondary/40"
                    />
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
                        Polygon area approximation
                    </p>
                    <div className="font-serif text-lg italic text-text-primary">
                        Area of circle = πr²
                    </div>
                    <div className="text-xs text-text-secondary font-medium">
                        Since r = 1 → Area = π
                    </div>
                </div>

                <div className="pt-2 border-t border-border/50 grid grid-cols-2 gap-4 text-left">
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-text-secondary/40">Sides</span>
                        <div className="font-mono text-sm tabular-nums text-text-primary">
                            n = {n}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-text-secondary/40">Radius</span>
                        <div className="font-mono text-sm tabular-nums text-text-primary">
                            r = 1
                        </div>
                    </div>
                </div>

                <div className="space-y-1 pt-2">
                    <div className="flex justify-between items-baseline">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-text-secondary/40">Area ≈</span>
                        <motion.span
                            key={n}
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 1 }}
                            className="font-mono text-base font-bold tabular-nums text-accent"
                        >
                            {areaValue.toFixed(6)}
                        </motion.span>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-text-secondary/40">π ≈</span>
                        <motion.span
                            key={n + '-pi'}
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 1 }}
                            className="font-mono text-base font-bold tabular-nums text-text-primary"
                        >
                            {areaValue.toFixed(6)}
                        </motion.span>
                    </div>
                </div>
            </div>
        </div>
    );
}
