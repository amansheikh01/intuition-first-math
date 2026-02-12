'use client';

import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface ModuleCardProps {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
    active?: boolean;
}

export default function ModuleCard({ title, description, href, icon: Icon, active = true }: ModuleCardProps) {
    if (!active) {
        return (
            <div className="module-card opacity-60 grayscale cursor-not-allowed">
                <div className="flex justify-center mb-4">
                    <Icon className="w-10 h-10 text-text-dim" />
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <div className="card-divider" />
                <p className="text-sm text-text-dim text-center">{description}</p>
                <div className="mt-6">
                    <span className="px-6 py-2 border border-divider rounded-md text-sm font-medium text-text-dim">
                        Coming Soon
                    </span>
                </div>
            </div>
        );
    }

    return (
        <Link href={href} className="module-card group">
            <div className="flex justify-center mb-4">
                <Icon className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <div className="card-divider" />
            <p className="text-sm text-text-dim text-center">{description}</p>
            <div className="mt-6">
                <span className="px-6 py-2 bg-button text-white rounded-md text-sm font-medium transition-colors hover:bg-primary inline-block">
                    Explore Module
                </span>
            </div>
        </Link>
    );
}
