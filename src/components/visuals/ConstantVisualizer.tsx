'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const constants = [
    {
        id: 'pi',
        symbol: 'π',
        value: '3.1415926535',
        name: 'Archimedes\' Constant'
    },
    {
        id: 'e',
        symbol: 'e',
        value: '2.7182818284',
        name: 'Euler\'s Number'
    },
    {
        id: 'phi',
        symbol: 'φ',
        value: '1.6180339887',
        name: 'Golden Ratio'
    }
];

export default function ConstantVisualizer() {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isPaused) {
            timerRef.current = setInterval(() => {
                setIndex((prev) => (prev + 1) % constants.length);
            }, 7000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPaused]);

    const active = constants[index];

    return (
        <div
            className="relative w-full max-w-[300px] aspect-square flex flex-col items-center justify-center p-8 bg-card-bg/20 rounded-[32px] border border-border/50 transition-colors"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active.id}
                        initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 1.1, rotateY: 20 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        {active.id === 'pi' && <PiVisual />}
                        {active.id === 'e' && <EulerVisual />}
                        {active.id === 'phi' && <GoldenVisual />}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-auto pt-16 text-center z-10">
                <motion.div
                    key={active.id + '-text'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-1"
                >
                    <div className="text-3xl font-serif font-bold text-text-primary">
                        {active.symbol}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                        {active.name}
                    </div>
                    <div className="font-mono text-xs text-text-secondary opacity-80 tabular-nums">
                        {active.value}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function PiVisual() {
    return (
        <svg viewBox="0 0 200 200" className="w-48 h-48 text-text-primary">
            {/* Circle */}
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
            {/* Circumference Trace */}
            <motion.circle
                cx="100" cy="100" r="60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="377"
                initial={{ strokeDashoffset: 377 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            {/* Rotating Radius */}
            <motion.line
                x1="100" y1="100" x2="160" y2="100"
                stroke="currentColor"
                strokeWidth="1.5"
                animate={{ rotate: 360 }}
                style={{ originX: '100px', originY: '100px' }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
        </svg>
    );
}

function EulerVisual() {
    return (
        <svg viewBox="0 0 200 200" className="w-48 h-48 text-text-primary">
            {[1, 2, 3].map((i) => (
                <motion.circle
                    key={i}
                    cx="100" cy="100" r={20 * i}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                />
            ))}
            <motion.path
                d="M60 100 Q 100 20 140 100"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                animate={{ d: ["M60 100 Q 100 20 140 100", "M60 100 Q 100 180 140 100", "M60 100 Q 100 20 140 100"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
        </svg>
    );
}

function GoldenVisual() {
    return (
        <svg viewBox="0 0 200 200" className="w-48 h-48 text-text-primary">
            <motion.path
                d="M100 100 a 10 10 0 0 1 10 10 a 20 20 0 0 1 -20 20 a 30 30 0 0 1 -30 -30 a 50 50 0 0 1 50 -50 a 80 80 0 0 1 80 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Subtle Construction Squares */}
            <rect x="90" y="100" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
            <rect x="100" y="100" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
            <rect x="90" y="80" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        </svg>
    );
}
