
"use client";

import React, { useEffect, useRef } from 'react';
import { Theme } from '../types';
import { gsap } from 'gsap';
import { ArrowRight, Play, Server, Shield, Cpu, Zap, Activity, TrendingUp } from 'lucide-react';

interface HeroProps {
  theme: Theme;
}

export const Hero: React.FC<HeroProps> = ({ theme }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.2 }
      )
        .fromTo(subtitleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.7"
        )
        .fromTo(ctaRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(visualRef.current,
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2 },
          "-=1"
        );

      // The SVG width in viewBox is 400. 
      // We loop across 450px segments to ensure seamless coverage.
      const loopWidth = 450;

      // Slower, majestic loop speeds for high-end feel
      gsap.to('.layer-back', {
        x: -loopWidth,
        duration: 25,
        ease: "none",
        repeat: -1
      });

      gsap.to('.layer-mid', {
        x: -loopWidth,
        duration: 18,
        ease: "none",
        repeat: -1
      });

      gsap.to('.layer-front', {
        x: -loopWidth,
        duration: 12,
        ease: "none",
        repeat: -1
      });

      // Pulse effect for the glowing nodes
      gsap.to('.node-outer-glow', {
        scale: 2.2,
        opacity: 0,
        duration: 2.5,
        repeat: -1,
        ease: "sine.out",
        stagger: 0.8
      });

      // Subtle jitter for the small status bars to show "activity"
      const jitterStats = () => {
        gsap.to('.stat-bar', {
          scaleY: () => 0.4 + Math.random() * 0.6,
          duration: 0.6,
          stagger: 0.1,
          onComplete: jitterStats
        });
      };
      jitterStats();

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative pt-40 pb-20 px-6 overflow-hidden min-h-[90vh] flex flex-col justify-center"
    >
      {/* Background Ambience */}
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -z-10 transition-colors duration-500 ${theme === 'dark' ? 'bg-n8n-pink/10' : 'bg-n8n-pink/10'
        }`} />
      <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] -z-10 transition-colors duration-500 ${theme === 'dark' ? 'bg-blue-600/10' : 'bg-blue-200/20'
        }`} />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-n8n-pink/10 border border-n8n-pink/20 text-n8n-pink text-sm font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-n8n-pink opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-n8n-pink"></span>
            </span>
            Premium n8n Hosting v2.0
          </div>

          <h1 ref={titleRef} className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">
            Automate <span className="text-n8n-pink">Faster</span>.<br />
            Scale Smarter.
          </h1>

          <p ref={subtitleRef} className="text-xl md:text-2xl opacity-70 mb-10 max-w-lg leading-relaxed">
            Enterprise-grade managed hosting for n8n. Dedicated resources, daily backups, and instant worldwide deployment.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <button className="bg-n8n-pink hover:brightness-110 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 group transition-all shadow-xl shadow-n8n-pink/20">
              Start Your Free Trial
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className={`px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 border transition-all ${theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-slate-300 hover:bg-slate-100'
              }`}>
              <Play size={20} className="fill-current text-n8n-pink" />
              Watch Demo
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8 opacity-60">
            <div className="flex items-center gap-2">
              <Server size={18} className="text-n8n-pink" />
              <span className="text-sm">99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-n8n-pink" />
              <span className="text-sm">DDoS Protection</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu size={18} className="text-n8n-pink" />
              <span className="text-sm">NVMe Storage</span>
            </div>
          </div>
        </div>

        <div ref={visualRef} className="relative hidden lg:block">
          {/* Main Card with Monitoring Graph */}
          <div className={`p-8 rounded-[3rem] border backdrop-blur-xl shadow-2xl transition-all duration-500 relative overflow-hidden ${theme === 'dark' ? 'bg-n8n-surface border-white/10' : 'bg-white border-slate-200 shadow-slate-200/40'
            }`}>
            <div className="space-y-8">
              {/* Header section of the card */}
              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-2xl bg-n8n-pink/10 flex items-center justify-center text-n8n-pink">
                    <Activity size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Cluster Health</h4>
                    <p className="text-[10px] opacity-40 uppercase tracking-widest font-black">Live Pulse Analysis</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 ${theme === 'dark' ? 'bg-white/5 text-green-400' : 'bg-green-50 text-green-600'}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  System Optimal
                </div>
              </div>

              {/* Stacked Area Chart with Precision Nodes */}
              <div className="relative h-56 w-full overflow-hidden rounded-[2rem]">
                <svg viewBox="0 0 400 150" className="w-full h-full overflow-visible">
                  <defs>
                    <filter id="nodeGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>

                    {/* Gradients for the areas */}
                    <linearGradient id="gradient-pink" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#EA4B71" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#EA4B71" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Subtle Grid Lines */}
                  <g className="opacity-[0.05]">
                    {[0, 1, 2, 3].map((i) => (
                      <line key={i} x1="0" y1={i * 40 + 20} x2="1000" y2={i * 40 + 20} stroke="currentColor" strokeWidth="1" />
                    ))}
                  </g>

                  {/* 1. Purple Layer (Back) */}
                  <g className="layer-back">
                    <path d="M0 130 C50 140, 100 120, 150 130 C200 140, 250 120, 300 130 C350 140, 400 120, 450 130 C500 140, 550 120, 600 130 C650 140, 700 120, 750 130 C800 140, 850 120, 900 130 L900 150 L0 150 Z"
                      fill="url(#gradient-purple)" />
                    <path d="M0 130 C50 140, 100 120, 150 130 C200 140, 250 120, 300 130 C350 140, 400 120, 450 130 C500 140, 550 120, 600 130 C650 140, 700 120, 750 130 C800 140, 850 120, 900 130"
                      fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeOpacity="0.3" />
                  </g>

                  {/* 2. Blue Layer (Middle) */}
                  <g className="layer-mid">
                    <path d="M0 100 C50 85, 100 115, 150 100 C200 85, 250 115, 300 100 C350 85, 400 115, 450 100 C500 85, 550 115, 600 100 C650 85, 700 115, 750 100 C800 85, 850 115, 900 100 L900 150 L0 150 Z"
                      fill="url(#gradient-blue)" />
                    <path d="M0 100 C50 85, 100 115, 150 100 C200 85, 250 115, 300 100 C350 85, 400 115, 450 100 C500 85, 550 115, 600 100 C650 85, 700 115, 750 100 C800 85, 850 115, 900 100"
                      fill="none" stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.5" filter="url(#nodeGlowFilter)" />
                  </g>

                  {/* 3. Pink Layer (Front - Most Detailed) */}
                  <g className="layer-front">
                    <path d="M0 60 C50 40, 100 80, 150 60 C200 40, 250 80, 300 60 C350 40, 400 80, 450 60 C500 40, 550 80, 600 60 C650 40, 700 80, 750 60 C800 40, 850 80, 900 60 L900 150 L0 150 Z"
                      fill="url(#gradient-pink)" />
                    <path d="M0 60 C50 40, 100 80, 150 60 C200 40, 250 80, 300 60 C350 40, 400 80, 450 60 C500 40, 550 80, 600 60 C650 40, 700 80, 750 60 C800 40, 850 80, 900 60"
                      fill="none" stroke="#EA4B71" strokeWidth="4" filter="url(#nodeGlowFilter)" />

                    {/* Glowing Nodes exactly on the Pink Line peaks */}
                    {[0, 150, 300, 450, 600, 750, 900].map((x) => (
                      <g key={x}>
                        <circle cx={x} cy="60" r="10" fill="#EA4B71" fillOpacity="0.15" className="node-outer-glow" />
                        <circle cx={x} cy="60" r="4.5" fill="#EA4B71" filter="url(#nodeGlowFilter)" />
                        <circle cx={x} cy="60" r="2" fill="white" />
                      </g>
                    ))}
                  </g>
                </svg>
              </div>

              {/* Performance Stats Overlay */}
              <div className="grid grid-cols-3 gap-4">
                <div className={`p-4 rounded-2xl border transition-colors ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                  <p className="text-[10px] opacity-40 uppercase font-black mb-1">Executions</p>
                  <p className="text-lg font-bold">12.4k<span className="text-[10px] text-green-500 ml-1">↑</span></p>
                </div>
                <div className={`p-4 rounded-2xl border transition-colors ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                  <p className="text-[10px] opacity-40 uppercase font-black mb-1">Response</p>
                  <p className="text-lg font-bold">24ms</p>
                </div>
                <div className={`p-4 rounded-2xl border transition-colors ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                  <p className="text-[10px] opacity-40 uppercase font-black mb-1">Cluster Load</p>
                  <div className="flex items-end gap-1 h-6 pt-1">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="flex-1 bg-n8n-pink/30 rounded-t-sm stat-bar origin-bottom" style={{ height: `60%` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Indicator */}
            <div className="absolute top-6 right-8">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-green-500" size={18} />
                <span className="text-[10px] font-bold text-green-500">Peak Performance</span>
              </div>
            </div>
          </div>

          {/* Floating UI Accents */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-n8n-pink/20 rounded-full blur-[80px] -z-10"></div>

          <div className="absolute -bottom-10 -left-10 p-5 rounded-3xl bg-n8n-pink shadow-2xl shadow-n8n-pink/50 z-20 group hover:scale-110 transition-transform">
            <Zap className="text-white fill-current" size={28} />
          </div>

          <div className={`absolute top-1/2 -right-16 p-6 rounded-[2.5rem] border backdrop-blur-xl z-20 transition-all ${theme === 'dark' ? 'bg-n8n-surface/90 border-white/20' : 'bg-white/95 border-slate-200 shadow-2xl shadow-slate-200/50'
            }`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-green-500 animate-ping"></div>
              </div>
              <div>
                <span className="text-[10px] opacity-50 block font-bold tracking-[0.2em]">NODE-01</span>
                <span className="text-sm font-black text-green-500">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
