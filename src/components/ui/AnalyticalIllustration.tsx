'use client';

import React from 'react';

export default function AnalyticalIllustration() {
    return (
        <div className="relative w-full h-full min-h-[300px] flex items-center justify-center animate-in fade-in zoom-in duration-1000">
            <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background Grid Lines (Subtle) */}
                <path d="M0 50H400" stroke="var(--border-light)" strokeWidth="0.5" />
                <path d="M0 100H400" stroke="var(--border-light)" strokeWidth="0.5" />
                <path d="M0 150H400" stroke="var(--border-light)" strokeWidth="0.5" />
                <path d="M0 200H400" stroke="var(--border-light)" strokeWidth="0.5" />
                <path d="M0 250H400" stroke="var(--border-light)" strokeWidth="0.5" />

                <path d="M50 0V300" stroke="var(--border-light)" strokeWidth="0.5" />
                <path d="M100 0V300" stroke="var(--border-light)" strokeWidth="0.5" />
                <path d="M150 0V300" stroke="var(--border-light)" strokeWidth="0.5" />
                <path d="M200 0V300" stroke="var(--border-light)" strokeWidth="0.5" />
                <path d="M250 0V300" stroke="var(--border-light)" strokeWidth="0.5" />
                <path d="M300 0V300" stroke="var(--border-light)" strokeWidth="0.5" />
                <path d="M350 0V300" stroke="var(--border-light)" strokeWidth="0.5" />

                {/* Main Graph Line */}
                <path d="M50 200C100 200 120 100 180 120C240 140 280 40 350 60"
                    stroke="var(--accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="400"
                    strokeDashoffset="400"
                    className="animate-[dash_2s_ease-in-out_forwards]"
                />

                {/* Vertical Bar Charts */}
                <rect x="80" y="180" width="12" height="20" fill="var(--primary)" opacity="0.2" rx="2" />
                <rect x="100" y="150" width="12" height="50" fill="var(--primary)" opacity="0.3" rx="2" />
                <rect x="120" y="170" width="12" height="30" fill="var(--primary)" opacity="0.4" rx="2" />
                <rect x="140" y="130" width="12" height="70" fill="var(--accent)" opacity="0.6" rx="2" />

                {/* Connecting Nodes */}
                <circle cx="180" cy="120" r="4" fill="var(--accent)" />
                <circle cx="350" cy="60" r="4" fill="var(--accent)" />

                {/* Upward Arrow */}
                <path d="M320 100L350 70M350 70H330M350 70V90" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* Floaties */}
            <div className="absolute top-10 right-10 p-3 bg-surface border border-border-light rounded-lg shadow-sm animate-bounce duration-[3000ms]">
                <div className="text-[10px] font-mono font-bold text-accent">σ = 0.842</div>
            </div>

            <style jsx>{`
                @keyframes dash {
                    to { stroke-dashoffset: 0; }
                }
            `}</style>
        </div>
    );
}
