import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface SubjectCardProps {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
    theme: number; // 1, 2, 3, or 4
}

export default function SubjectCard({ title, description, href, icon: Icon, theme }: SubjectCardProps) {
    return (
        <Link href={href} className="block group">
            <div className={`showcase-card theme-${theme}`}>
                <div className="mb-6 flex items-center justify-between">
                    <div className="text-text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                        <Icon size={24} strokeWidth={1.5} />
                    </div>
                </div>

                <h3 className="text-xl mb-3 font-serif font-bold text-text-primary tracking-tight">
                    {title}
                </h3>

                <p className="text-sm text-text-secondary leading-relaxed font-sans line-clamp-3">
                    {description}
                </p>

                <div className="mt-auto flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary group-hover:text-text-primary transition-colors">
                        Enter Research Module
                    </span>
                </div>
            </div>
        </Link>
    );
}
