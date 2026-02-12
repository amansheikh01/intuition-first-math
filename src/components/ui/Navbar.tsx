'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
    return (
        <nav className="h-20 flex items-center border-b border-border-neutral bg-white/50 backdrop-blur-md sticky top-0 z-50">
            <div className="layout-container w-full flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded bg-text-primary flex items-center justify-center text-white font-serif italic text-lg">
                        I
                    </div>
                    <span className="font-sans font-bold uppercase tracking-[0.2em] text-sm text-text-primary">
                        IntuitionFirst
                    </span>
                </Link>

                <div className="flex items-center gap-8">
                    <Link href="/" className="nav-link">Home</Link>
                    <Link href="/subjects" className="nav-link">Subjects</Link>
                </div>
            </div>
        </nav>
    );
}
