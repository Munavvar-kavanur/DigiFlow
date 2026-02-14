
"use client";

import React from 'react';
import { Theme } from '../types';
import { gsap } from 'gsap';
import { ShieldCheck, Infinity, Terminal, PiggyBank, Database, Key } from 'lucide-react';

interface WhySelfHostProps {
  theme: Theme;
}

const benefits = [
  {
    icon: <ShieldCheck className="text-n8n-pink" size={32} />,
    title: "Full Data Sovereignty",
    description: "Keep your sensitive API keys, customer data, and proprietary logic on your own private infrastructure. No third-party access to your execution logs."
  },
  {
    icon: <Infinity className="text-n8n-pink" size={32} />,
    title: "Zero Execution Limits",
    description: "Forget paying per execution. Run millions of workflows for a single flat monthly fee. Your only limit is the hardware you choose."
  },
  {
    icon: <Terminal className="text-n8n-pink" size={32} />,
    title: "Technical Freedom",
    description: "Install community nodes, use custom Python/JS libraries, and connect to local databases or VPNs that SaaS clouds can't reach."
  },
  {
    icon: <PiggyBank className="text-n8n-pink" size={32} />,
    title: "Predictable Cost",
    description: "Scale your automation team without scaling your bill. Self-hosting is typically 70-90% cheaper for high-volume automation users."
  }
];

export const WhySelfHost: React.FC<WhySelfHostProps> = ({ theme }) => {
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
      scale: 1.03,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (card: HTMLDivElement) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out"
    });
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden perspective-1000">
      {/* Subtle section glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-n8n-pink/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 gsap-reveal">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight leading-tight">
              Why Choose <br />
              <span className="text-n8n-pink">Self-Hosted</span> n8n?
            </h2>
            <p className="text-xl opacity-70 mb-10 leading-relaxed">
              n8n is powerful, but its true potential is unlocked when you control the environment.
              DigiFlow gives you the power of self-hosting with the convenience of a managed cloud.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-n8n-pink/5 border border-transparent hover:border-n8n-pink/10">
                <div className="mt-1 bg-n8n-pink/10 p-2 rounded-lg">
                  <Database size={20} className="text-n8n-pink" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Unrestricted Database Access</h4>
                  <p className="text-sm opacity-60">Directly connect to your internal SQL or NoSQL databases without complex tunnels.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-n8n-pink/5 border border-transparent hover:border-n8n-pink/10">
                <div className="mt-1 bg-n8n-pink/10 p-2 rounded-lg">
                  <Key size={20} className="text-n8n-pink" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Proprietary Node Support</h4>
                  <p className="text-sm opacity-60">Upload and use private nodes developed specifically for your enterprise requirements.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                className={`p-8 rounded-[2rem] border transition-colors duration-300 gsap-reveal preserve-3d cursor-default ${theme === 'dark'
                    ? 'bg-n8n-surface/80 border-white/10 hover:border-n8n-pink/30'
                    : 'bg-white border-slate-200 shadow-sm hover:shadow-xl hover:border-n8n-pink/20'
                  }`}
              >
                <div className="mb-6 inline-block p-3 rounded-2xl bg-n8n-pink/5 pointer-events-none">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight pointer-events-none">{benefit.title}</h3>
                <p className="text-sm opacity-60 leading-relaxed pointer-events-none">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
