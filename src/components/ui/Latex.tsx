import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface LatexProps {
    formula: string;
    inline?: boolean;
}

export default function Latex({ formula, inline = true }: LatexProps) {
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            katex.render(formula, containerRef.current, {
                throwOnError: false,
                displayMode: !inline,
            });
        }
    }, [formula, inline]);

    return <span ref={containerRef} />;
}
