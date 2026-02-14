
"use client";

import React from 'react';
import { Theme } from '../types';
import { gsap } from 'gsap';
import { LayoutTemplate, Bot, Zap, FileJson, ArrowUpRight, Star } from 'lucide-react';

interface TemplateLibraryProps {
  theme: Theme;
}

const templates = [
  {
    title: "AI Content Architect",
    category: "Generative AI",
    nodes: 12,
    complexity: "Advanced",
    icon: <Bot size={24} className="text-n8n-pink" />,
    description: "Automated multi-channel content engine using advanced AI to turn 1 prompt into  social posts."
  },
  {
    title: "Lead Magnet Pro",
    category: "Marketing",
    nodes: 8,
    complexity: "Intermediate",
    icon: <Zap size={24} className="text-n8n-pink" />,
    description: "Connect Typeform to Google Sheets and Slack with automated personalized PDF generation."
  },
  {
    title: "DevOps Sentinel",
    category: "Infrastructure",
    nodes: 15,
    complexity: "Expert",
    icon: <LayoutTemplate size={24} className="text-n8n-pink" />,
    description: "Monitor GitHub webhooks, run CI tests, and deploy to production with automated rollback logic."
  },
  {
    title: "Financial Sync",
    category: "Operations",
    nodes: 6,
    complexity: "Beginner",
    icon: <FileJson size={24} className="text-n8n-pink" />,
    description: "Daily synchronization between Stripe, QuickBooks, and your internal SQL database."
  }
];

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ theme }) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out"
    });

    const glow = card.querySelector('.card-glow') as HTMLDivElement;
    if (glow) {
      gsap.to(glow, {
        opacity: 1,
        x: x - 100,
        y: y - 100,
        duration: 0.1
      });
    }
  };

  const handleMouseLeave = (card: HTMLDivElement) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out"
    });

    const glow = card.querySelector('.card-glow') as HTMLDivElement;
    if (glow) {
      gsap.to(glow, { opacity: 0, duration: 0.3 });
    }
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden perspective-1000">
      {/* Background Section Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-n8n-pink/5 blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 gsap-reveal">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Star size={18} className="text-n8n-pink fill-current" />
              <span className="text-n8n-pink font-bold tracking-widest uppercase text-xs">Members Only Library</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Accelerate with <br />
              <span className="text-n8n-pink">Premium Templates</span>
            </h2>
            <p className="text-xl opacity-70">
              Don't start from scratch. Access our curated library of 500+ production-ready workflows designed by n8n experts.
            </p>
          </div>
          <button className="px-8 py-4 bg-transparent border-2 border-n8n-pink text-n8n-pink font-bold rounded-full hover:bg-n8n-pink hover:text-white transition-all group shrink-0">
            Browse All Templates
            <ArrowUpRight className="inline-block ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, idx) => (
            <div
              key={idx}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 gsap-reveal preserve-3d overflow-hidden cursor-pointer ${theme === 'dark'
                ? 'bg-n8n-surface/50 border-white/10 hover:border-n8n-pink/40'
                : 'bg-white border-slate-200 shadow-sm hover:shadow-2xl hover:border-n8n-pink/30'
                }`}
            >
              {/* Radial Mouse Glow */}
              <div className="card-glow absolute w-52 h-52 bg-n8n-pink/20 blur-[60px] rounded-full pointer-events-none opacity-0" />

              <div className="relative z-10">
                <div className={`mb-6 w-14 h-14 rounded-2xl flex items-center justify-center pointer-events-none transition-transform group-hover:scale-110 ${theme === 'dark' ? 'bg-white/5' : 'bg-n8n-pink/5'
                  }`}>
                  {template.icon}
                </div>

                <div className="flex items-center justify-between mb-3 pointer-events-none">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{template.category}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme === 'dark' ? 'bg-n8n-pink/10 text-n8n-pink' : 'bg-n8n-pink text-white'
                    }`}>
                    {template.complexity}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-4 tracking-tight pointer-events-none group-hover:text-n8n-pink transition-colors">
                  {template.title}
                </h3>

                <p className="text-sm opacity-60 leading-relaxed mb-8 pointer-events-none">
                  {template.description}
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-white/5 pointer-events-none">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase opacity-40 font-bold">Node Count</span>
                    <span className="text-sm font-bold">{template.nodes} Nodes</span>
                  </div>
                  <div className="h-8 w-px bg-white/5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase opacity-40 font-bold">Updated</span>
                    <span className="text-sm font-bold">2d ago</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Grid Lines Overlay (Subtle) */}
        <div className={`absolute inset-0 -z-20 opacity-10 pointer-events-none ${theme === 'dark' ? 'invert' : ''}`} style={{
          backgroundImage: `linear-gradient(#EA4B71 1px, transparent 1px), linear-gradient(90deg, #EA4B71 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
      </div>
    </section>
  );
};
