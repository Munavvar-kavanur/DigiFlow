
"use client";

import React, { useRef } from 'react';
import { Theme } from '../types';
import { gsap } from 'gsap';
import {
  Cloud,
  Lock,
  Zap,
  RefreshCcw,
  BarChart3,
  Globe
} from 'lucide-react';

interface FeaturesProps {
  theme: Theme;
}

const featureList = [
  {
    icon: <Cloud className="text-n8n-pink" />,
    title: "1-Click Deploy",
    description: "Launch your dedicated n8n instance in seconds. No terminal knowledge required."
  },
  {
    icon: <Lock className="text-n8n-pink" />,
    title: "Military-Grade Security",
    description: "Encryption at rest and in transit. Automated SSL and dedicated firewall."
  },
  {
    icon: <RefreshCcw className="text-n8n-pink" />,
    title: "Daily Backups",
    description: "Never lose a workflow. We perform full instance snapshots every 24 hours."
  },
  {
    icon: <Zap className="text-n8n-pink" />,
    title: "Turbo Speed",
    description: "AMD EPYC processors and NVMe drives ensure your nodes execute instantly."
  },
  {
    icon: <BarChart3 className="text-n8n-pink" />,
    title: "Smart Monitoring",
    description: "Real-time resource usage graphs and automated error alerts via email or Slack."
  },
  {
    icon: <Globe className="text-n8n-pink" />,
    title: "Global Edge",
    description: "Choose from 12 locations across US, Europe, and Asia for minimal latency."
  }
];

export const Features: React.FC<FeaturesProps> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });

    const icon = card.querySelector('.icon-container');
    if (icon) {
      gsap.to(icon, {
        x: (x - centerX) / 8,
        y: (y - centerY) / 8,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = (card: HTMLDivElement) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)"
    });

    const icon = card.querySelector('.icon-container');
    if (icon) {
      gsap.to(icon, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
    }
  };

  return (
    <section id="features" className="py-32 px-6 perspective-1000">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <div className="text-center max-w-3xl mx-auto mb-20 gsap-reveal">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Built for High-Scale Automation</h2>
          <p className="text-xl opacity-70 leading-relaxed">
            Stop worrying about server maintenance and start building the workflows that drive your business growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((f, i) => (
            <div
              key={i}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              className={`gsap-reveal group p-8 rounded-3xl border transition-colors duration-300 interactive-card cursor-pointer preserve-3d shadow-sm ${theme === 'dark'
                  ? 'bg-n8n-surface border-white/10 hover:border-n8n-pink/50'
                  : 'bg-white border-slate-200 hover:shadow-2xl hover:border-n8n-pink/20'
                }`}
            >
              <div className={`icon-container w-14 h-14 rounded-2xl flex items-center justify-center mb-6 pointer-events-none ${theme === 'dark' ? 'bg-white/5' : 'bg-n8n-pink/5'
                }`}>
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight pointer-events-none">{f.title}</h3>
              <p className="opacity-60 leading-relaxed pointer-events-none">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
      `}} />
    </section>
  );
};
