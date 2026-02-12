'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

interface LayoutContainerProps {
    title: string;
    description: string;
    children: ReactNode; // Middle (Graph & Controls) + Bottom (Theory)
    backHref?: string;
}

export default function LayoutContainer({ title, description, children, backHref = "/" }: LayoutContainerProps) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Navbar */}
            <nav className="h-16 flex items-center px-12 justify-between bg-surface border-b border-border sticky top-0 z-50">
                <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
                    <span className="text-text">Intuition</span>
                    <span className="text-primary">.Math</span>
                </Link>
                <div className="flex items-center gap-6">
                    <Link href={backHref} className="text-sm font-semibold text-muted hover:text-primary flex items-center gap-1">
                        <ArrowLeft className="w-4 h-4" /> Library
                    </Link>
                    <ThemeToggle />
                </div>
            </nav>

            <main className="flex-grow flex flex-col items-center py-12 px-6">
                {/* Top Section */}
                <header className="max-w-4xl w-full text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-text">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
                        {description}
                    </p>
                    <div className="divider-elegant" />
                </header>

                {/* Content Section (Middle & Bottom) */}
                <div className="max-w-7xl w-full flex flex-col items-center">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-border bg-surface text-center">
                <div className="text-sm text-muted font-semibold tracking-wide">
                    Intuition.Math © 2026 | Professional Academic Platform
                </div>
            </footer>
        </div>
    );
}
