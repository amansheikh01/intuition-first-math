'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const initialTheme = savedTheme || 'light';
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
            aria-label="Toggle Theme"
        >
            <div className="relative w-6 h-6 flex items-center justify-center">
                {/* Lamp Base/Stem */}
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full text-text-primary"
                >
                    {/* Stem */}
                    <path d="M12 21v-4" />
                    {/* Base */}
                    <path d="M9 21h6" />
                    {/* Arm */}
                    <path d="M12 17c-3 0-5-2-5-5s2-5 5-5" />
                    {/* Head Shape */}
                    <path d="M11 7h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2z" />
                </svg>

                {/* Dynamic Glow for Light Mode */}
                <AnimatePresence>
                    {theme === 'light' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute top-1 right-1 w-3 h-3 bg-accent rounded-full blur-[4px]"
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Tooltip or status indicator */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-60 transition-opacity whitespace-nowrap">
                {theme === 'light' ? 'Illuminate' : 'Dim'}
            </span>
        </button>
    );
}
