'use client';

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
    const cardContent = (
        <div className={`academic-card ${!active ? 'opacity-60 grayscale cursor-not-allowed' : 'cursor-pointer group'}`}>
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-1.5 rounded-lg ${active ? 'bg-accent/5 text-accent' : 'bg-muted/10 text-muted'}`}>
                    <Icon className="w-3.5 h-3.5" />
                </div>
                <h3 className="card-title !mb-0 font-semibold">{title}</h3>
            </div>

            <p className="text-[12px] font-normal text-text-muted leading-relaxed mb-5 flex-grow">
                {description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-border-light">
                <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${active ? 'text-accent' : 'text-muted'}`}>
                    {active ? 'Research Core' : 'Proposed'}
                </span>
                {active && (
                    <span className="text-[10px] font-bold text-primary group-hover:text-accent transition-colors flex items-center gap-1">
                        Inquiry <ArrowRight size={10} />
                    </span>
                )}
            </div>
        </div>
    );

    if (active) {
        return <Link href={href} className="block">{cardContent}</Link>;
    }

    return <div className="block">{cardContent}</div>;
}
