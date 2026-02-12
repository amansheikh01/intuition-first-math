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
        <div className={`rebuilt-card ${!active ? 'opacity-50 grayscale cursor-not-allowed text-muted' : 'group cursor-pointer'}`}>
            <div className={`p-4 rounded-xl mb-6 transition-all ${active ? 'bg-accent/5 text-accent group-hover:scale-110' : 'bg-border-light/20 text-muted'}`}>
                <Icon className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-primary mb-1">{title}</h3>
            <div className="card-divider" />

            <p className="text-sm font-medium text-muted leading-relaxed mb-6">
                {description}
            </p>

            <div className="mt-auto pt-4">
                {active ? (
                    <span className="text-xs font-bold uppercase tracking-wider text-accent group-hover:underline">
                        Explore Department
                    </span>
                ) : (
                    <span className="text-xs font-bold uppercase tracking-wider text-muted">
                        Inactive Access
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
