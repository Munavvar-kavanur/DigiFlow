"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { WhySelfHost } from '@/components/WhySelfHost';
import { Features } from '@/components/Features';
import { Pricing } from '@/components/Pricing';
import { WorkflowAssistant } from '@/components/WorkflowAssistant';
import { TemplateLibrary } from '@/components/TemplateLibrary';
import { Footer } from '@/components/Footer';
import { BackgroundLines } from '@/components/BackgroundLines';
import { CustomCursor } from '@/components/CustomCursor';
import { ContextMenu } from '@/components/ContextMenu';
import { Theme } from '@/types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export default function Home() {
    const [theme, setTheme] = useState<Theme>('dark');
    const appRef = useRef<HTMLDivElement>(null);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Global reveal animation
            gsap.utils.toArray('.gsap-reveal').forEach((elem: any) => {
                gsap.fromTo(elem,
                    { y: 50, opacity: 0, visibility: 'hidden' },
                    {
                        duration: 1,
                        y: 0,
                        opacity: 1,
                        visibility: 'visible',
                        scrollTrigger: {
                            trigger: elem,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });
        }, appRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={appRef}
            className={`min-h-screen transition-colors duration-500 relative ${theme === 'dark' ? 'bg-n8n-dark text-white' : 'bg-slate-50 text-slate-900'
                }`}
        >
            <CustomCursor />
            <ContextMenu theme={theme} />
            <BackgroundLines />

            <Navbar theme={theme} toggleTheme={toggleTheme} />

            <main className="dot-grid relative z-10">
                <Hero theme={theme} />
                <WhySelfHost theme={theme} />
                <Features theme={theme} />

                <section className="py-24 px-6 max-w-7xl mx-auto">
                    <div className="text-center mb-16 gsap-reveal">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Stuck on a workflow?</h2>
                        <p className="text-xl opacity-70">Ask our AI Assistant to help you design your next n8n automation.</p>
                    </div>
                    <WorkflowAssistant theme={theme} />
                </section>

                <Pricing theme={theme} />
                <TemplateLibrary theme={theme} />
            </main>

            <Footer theme={theme} />
        </div>
    );
}
