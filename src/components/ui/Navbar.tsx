'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/subjects', label: 'Subjects' },
        { href: '/research', label: 'Research' },
        { href: '/about', label: 'About' }
    ];

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
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative font-semibold text-sm transition-colors duration-300 group ${pathname === link.href ? 'text-text-primary' : 'text-text-secondary'
                                    }`}
                            >
                                {link.label}
                                <span className={`absolute -bottom-1 left-0 h-[2px] bg-accent transition-all duration-300 ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`} />
                            </Link>
                        ))}
                    </div>

                    <div className="h-6 w-[1px] bg-border hidden md:block" />

                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
