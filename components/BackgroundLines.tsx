
"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const BackgroundLines: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = containerRef.current?.querySelectorAll('.cyber-line');
      const packets = containerRef.current?.querySelectorAll('.data-packet');

      if (lines) {
        lines.forEach((line) => {
          gsap.set(line, { strokeDasharray: 1000, strokeDashoffset: 1000 });
          gsap.to(line, {
            strokeDashoffset: 0,
            duration: 2 + Math.random() * 2,
            ease: "power2.inOut",
            opacity: 0.4 + Math.random() * 0.3,
          });
        });
      }

      if (packets) {
        packets.forEach((packet, i) => {
          // Animation for packets moving along paths
          const duration = 3 + Math.random() * 4;
          const delay = Math.random() * 5;

          gsap.to(packet, {
            motionPath: {
              path: `#path-${i % 6}`,
              align: `#path-${i % 6}`,
              autoRotate: true,
              alignOrigin: [0.5, 0.5]
            },
            duration: duration,
            repeat: -1,
            delay: delay,
            ease: "none",
            opacity: 1,
          });

          // Pulsing glow for the packet - made more intense
          gsap.to(packet, {
            filter: "drop-shadow(0 0 12px #EA4B71)",
            scale: 1.5,
            duration: 0.6,
            repeat: -1,
            yoyo: true
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60 dark:opacity-40">
      <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EA4B71" stopOpacity="0" />
            <stop offset="50%" stopColor="#EA4B71" stopOpacity="1" />
            <stop offset="100%" stopColor="#EA4B71" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Diagonal and Horizontal Circuit Paths */}
        <path id="path-0" d="M-100 200 L400 200 L600 400 L1600 400" className="cyber-line" stroke="url(#lineGrad)" strokeWidth="1.5" />
        <path id="path-1" d="M1600 100 L1000 100 L800 300 L-200 300" className="cyber-line" stroke="url(#lineGrad)" strokeWidth="1.5" />
        <path id="path-2" d="M200 -100 L200 400 L400 600 L400 1000" className="cyber-line" stroke="url(#lineGrad)" strokeWidth="1.5" />
        <path id="path-3" d="M1200 1000 L1200 600 L1000 400 L1000 -100" className="cyber-line" stroke="url(#lineGrad)" strokeWidth="1.5" />
        <path id="path-4" d="M-100 700 L500 700 L700 500 L1600 500" className="cyber-line" stroke="url(#lineGrad)" strokeWidth="1.5" />
        <path id="path-5" d="M1600 800 L1100 800 L900 600 L-100 600" className="cyber-line" stroke="url(#lineGrad)" strokeWidth="1.5" />

        {/* Data Packets (moving circles) */}
        {[...Array(15)].map((_, i) => (
          <circle key={i} r="2.5" fill="#EA4B71" className="data-packet opacity-0" />
        ))}
      </svg>
    </div>
  );
};