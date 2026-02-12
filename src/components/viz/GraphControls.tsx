'use client';

import React from 'react';

interface ControlFieldProps {
    label: string;
    value: number | string;
    onChange: (val: any) => void;
    min?: number;
    max?: number;
    step?: number;
    type?: 'range' | 'text' | 'number';
}

export function ControlField({ label, value, onChange, min = -10, max = 10, step = 0.1, type = 'range' }: ControlFieldProps) {
    return (
        <div className="flex flex-col gap-2 p-4 bg-surface border border-border rounded-xl shadow-sm">
            <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-muted uppercase tracking-wider">
                    {label}
                </label>
                <span className="text-sm font-mono bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">
                    {value}
                </span>
            </div>
            <input
                type={type}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full accent-primary h-2 bg-background rounded-lg cursor-pointer"
            />
        </div>
    );
}

interface GraphControlsProps {
    children: React.ReactNode;
}

export default function GraphControls({ children }: GraphControlsProps) {
    return (
        <div className="w-full max-w-lg flex flex-col gap-4 mt-8 lg:mt-0">
            <h3 className="text-xs font-bold text-muted uppercase tracking-[0.2em] mb-2 px-1">
                Parameters & Input
            </h3>
            <div className="grid grid-cols-1 gap-4">
                {children}
            </div>
        </div>
    );
}
