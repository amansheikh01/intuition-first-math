import React from 'react';
import Link from 'next/link';

interface SubjectCardProps {
    title: string;
    description: string;
    href: string;
    theme: number; // 1, 2, 3, or 4
}

export default function SubjectCard({ title, description, href, theme }: SubjectCardProps) {
    return (
        <Link href={href} className="block group">
            <div className={`academic-card theme-${theme}`}>
                <div className="accent-bar" />

                <h3 className="text-2xl mb-4 font-serif font-bold text-text-primary tracking-tight">
                    {title}
                </h3>

                <p className="text-base text-text-secondary leading-relaxed font-sans line-clamp-4">
                    {description}
                </p>
            </div>
        </Link>
    );
}
