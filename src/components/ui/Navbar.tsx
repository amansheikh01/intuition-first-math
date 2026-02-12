'use client';

import React from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    return (
        <nav className="h-20 flex items-center border-b border-border bg-nav-bg backdrop-blur-md sticky top-0 z-50 transition-colors duration-400">
            <div className="layout-container w-full flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded bg-text-primary flex items-center justify-center text-bg-page font-serif italic text-lg transition-colors">
                        I
                    </div>
                    <span className="font-serif font-bold text-lg text-text-primary tracking-tight">
                        IntuitionFirst
                    </span>
                </Link>

                <div className="flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="nav-link">Home</Link>
                        <Link href="/subjects" className="nav-link">Subjects</Link>
                        <Link href="/research" className="nav-link">Research</Link>
                        <Link href="/about" className="nav-link">About</Link>
                    </div>

                    <div className="h-6 w-[1px] bg-border hidden md:block" />

                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
