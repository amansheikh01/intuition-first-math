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
        <div className={`academic-card h-full flex flex-col items-center text-center p-8 ${!active ? 'opacity-60 grayscale cursor-not-allowed' : 'group cursor-pointer'}`}>
            <div className="flex justify-center mb-6">
                <Icon className={`w-12 h-12 ${active ? 'text-primary' : 'text-muted'}`} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-text">{title}</h3>
            <div className="divider-elegant" />
            <p className="text-sm text-muted mb-8 flex-grow">{description}</p>
            <div className="mt-auto w-full">
                {active ? (
                    <span className="inline-block w-full py-3 bg-primary text-white rounded-lg text-sm font-semibold transition-colors hover:bg-accent">
                        Explore Subject
                    </span>
                ) : (
                    <span className="inline-block w-full py-3 border border-border text-muted rounded-lg text-sm font-semibold">
                        Coming Soon
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
