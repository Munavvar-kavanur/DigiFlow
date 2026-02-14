"use client";

import React from 'react';

interface LogoProps {
    className?: string;
    theme?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({ className = "", theme = 'dark' }) => {
    const logoSrc = theme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg';

    return (
        <div className={`flex items-center ${className}`}>
            <img
                src={logoSrc}
                alt="DigiFlow"
                className="h-10 w-auto"
            />
        </div>
    );
};
