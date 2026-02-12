'use client';

import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface SubjectCardProps {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
    active?: boolean;
}

export default function SubjectCard({ title, description, href, icon: Icon, active = true }: SubjectCardProps) {
    const cardContent = (
        <div className={`academic-card ${!active ? 'opacity-60 grayscale cursor-not-allowed' : 'cursor-pointer group'}`}>
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-sm ${active ? 'bg-accent/5 text-accent' : 'bg-muted/10 text-muted'}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <h3 className="card-title !mb-0">{title}</h3>
            </div>

            <div className="card-divider" />

            <p className="text-sm font-normal text-text-muted leading-relaxed mb-6 flex-grow">
                {description}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-light">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${active ? 'text-accent' : 'text-muted'}`}>
                    {active ? 'Research Module' : 'In Development'}
                </span>
                {active && (
                    <span className="text-xs text-muted group-hover:text-accent font-medium transition-colors">
                        View Details
                    </span>
                )}
            </div>
        </div>
    );

    if (active) {
        return <Link href={href} className="block h-full">{cardContent}</Link>;
    }

    return <div className="block h-full">{cardContent}</div>;
}
