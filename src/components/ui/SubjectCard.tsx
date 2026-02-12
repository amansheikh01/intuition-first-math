import React from 'react';
import Link from 'next/link';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface SubjectCardProps {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
    active?: boolean;
}

export default function SubjectCard({ title, description, href, icon: Icon, active = true }: SubjectCardProps) {
    return (
        <Link href={href} className={`block h-full ${!active && 'pointer-events-none opacity-50'}`}>
            <div className="academic-card glow-border group">
                <div className="mb-6 flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-accent/5 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                        <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <ArrowRight size={16} className="text-border-subtle group-hover:text-accent transition-all transform group-hover:translate-x-1" />
                </div>

                <h3 className="text-xl mb-3 font-serif font-bold text-primary group-hover:text-accent transition-colors">
                    {title}
                </h3>

                <p className="text-sm text-text-muted leading-relaxed font-sans">
                    {description}
                </p>

                <div className="mt-auto pt-6 flex items-center gap-2">
                    <div className="h-[1px] w-6 bg-accent/20 group-hover:w-10 group-hover:bg-accent transition-all duration-300" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore Module
                    </span>
                </div>
            </div>
        </Link>
    );
}
