'use client';
import { useState, useEffect } from 'react';

export const useIsMobile = (breakpoint = 667) => {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        // Initial check
        checkIsMobile();

        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, [breakpoint]);

    // Return null during SSR/Initialization to avoid hydration mismatch
    return isMobile;
};
