
"use client";

import React, { useState } from 'react';
import { Theme, Plan } from '../types';
import { gsap } from 'gsap';
import { Check } from 'lucide-react';

interface PricingProps {
  theme: Theme;
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$19',
    features: [
      'Single n8n Instance',
      '2GB RAM / 1 vCPU',
      'Daily Backups',
      'Community Support',
      'Unlimited Executions'
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    price: '$49',
    features: [
      'Dedicated n8n Instance',
      '8GB RAM / 2 vCPU',
      'Daily Backups + Snapshots',
      'Priority Email Support',
      'Custom Domain Support',
      'Binary Data Storage'
    ],
    recommended: true
  },
  {
    id: 'ent',
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'High-Availability Cluster',
      'Multi-node scaling',
      'Dedicated Account Manager',
      '24/7 Phone Support',
      'SSO Integration',
      'Custom SLA'
    ]
  }
];

export const Pricing: React.FC<PricingProps> = ({ theme }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      y: -10,
      duration: 0.4,
      ease: "power2.out"
    });

    const badge = card.querySelector('.popular-badge');
    if (badge) {
      gsap.to(badge, {
        x: (x - centerX) / 10,
        y: ((y - centerY) / 10) - 16, // Offset -16 for the top-4 positioning
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = (card: HTMLDivElement) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.6,
      ease: "back.out(1.7)"
    });

    const badge = card.querySelector('.popular-badge');
    if (badge) {
      gsap.to(badge, {
        x: 0,
        y: -16,
        duration: 0.6,
        ease: "back.out(1.7)"
      });
    }
  };

  return (
    <section id="pricing" className="py-32 px-6 perspective-1000">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 gsap-reveal">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Simple, Transparent Pricing</h2>

          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-semibold ${billingCycle === 'monthly' ? 'text-n8n-pink' : 'opacity-50'}`}>Monthly</span>
            <button
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
              className={`w-14 h-7 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-n8n-pink transition-transform ${billingCycle === 'yearly' ? 'translate-x-7' : ''}`}></div>
            </button>
            <span className={`text-sm font-semibold ${billingCycle === 'yearly' ? 'text-n8n-pink' : 'opacity-50'}`}>Yearly (Save 20%)</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => {
            const isRecommended = p.recommended;

            // Dynamic classes for the card container
            const cardBaseClasses = "gsap-reveal relative p-8 rounded-[2.5rem] border transition-colors duration-300 flex flex-col interactive-card preserve-3d cursor-default";
            const cardThemeClasses = isRecommended
              ? theme === 'dark'
                ? 'border-n8n-pink ring-4 ring-n8n-pink/10 z-10 bg-n8n-surface shadow-[0_20px_50px_rgba(234,75,113,0.15)] text-white'
                : 'border-n8n-pink ring-4 ring-n8n-pink/5 z-10 bg-white shadow-[0_20px_50px_rgba(234,75,113,0.1)] text-slate-900'
              : theme === 'dark'
                ? 'bg-n8n-surface/50 border-white/10 text-white'
                : 'bg-white border-slate-200 text-slate-900';

            return (
              <div
                key={p.id}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                className={`${cardBaseClasses} ${cardThemeClasses} ${isRecommended ? 'scale-105' : ''}`}
              >
                {isRecommended && (
                  <div className="popular-badge absolute -top-4 left-1/2 -translate-x-1/2 bg-n8n-pink text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-n8n-pink/30 whitespace-nowrap z-20 pointer-events-none">
                    Most Popular
                  </div>
                )}

                <div className="mb-8 pointer-events-none">
                  <h3 className={`text-2xl font-bold mb-2 tracking-tight ${isRecommended ? 'text-n8n-pink' : ''}`}>{p.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold">{p.price}</span>
                    {p.price !== 'Custom' && <span className="opacity-50 text-lg font-medium">/mo</span>}
                  </div>
                </div>

                <div className="flex-1 space-y-4 mb-10 pointer-events-none">
                  {p.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-n8n-pink/20 text-n8n-pink' : 'bg-n8n-pink/10 text-n8n-pink'
                        }`}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'opacity-80' : 'opacity-70'}`}>{f}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-4 rounded-2xl font-bold transition-all shadow-md active:scale-[0.98] ${isRecommended
                    ? 'bg-n8n-pink hover:brightness-110 text-white shadow-n8n-pink/30'
                    : theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}>
                  {p.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
