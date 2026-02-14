
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Box,
  CreditCard,
  HelpCircle,
  PlayCircle,
  UserPlus,
  ChevronRight
} from 'lucide-react';
import { Theme } from '../types';

interface ContextMenuProps {
  theme: Theme;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();

      // Calculate position to keep menu inside viewport
      const menuWidth = 220;
      const menuHeight = 280;
      let x = e.clientX;
      let y = e.clientY;

      if (x + menuWidth > window.innerWidth) x -= menuWidth;
      if (y + menuHeight > window.innerHeight) y -= menuHeight;

      setPosition({ x, y });
      setIsVisible(true);
    };

    const handleClick = () => {
      if (isVisible) setIsVisible(false);
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleClick);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleClick);
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && menuRef.current) {
      gsap.fromTo(menuRef.current,
        { opacity: 0, scale: 0.9, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: "back.out(1.7)" }
      );

      // Animate items sequence
      const items = menuRef.current.querySelectorAll('.menu-item');
      gsap.fromTo(items,
        { x: -10, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, [isVisible]);

  const menuItems = [
    { label: 'Features', icon: <Box size={16} />, href: '#features' },
    { label: 'Pricing', icon: <CreditCard size={16} />, href: '#pricing' },
    { label: 'Support', icon: <HelpCircle size={16} />, href: '#support' },
    { type: 'divider' },
    { label: 'Request Demo', icon: <PlayCircle size={16} />, primary: true },
    { label: 'Sign Up', icon: <UserPlus size={16} />, primary: true },
  ];

  if (!isVisible) return null;

  return (
    <div
      ref={menuRef}
      className={`fixed z-[99999] w-[220px] py-2 rounded-2xl border transition-colors duration-300 backdrop-blur-xl shadow-2xl overflow-hidden ${theme === 'dark'
          ? 'bg-n8n-dark/90 border-white/10'
          : 'bg-white/95 border-slate-200 shadow-slate-200/50'
        }`}
      style={{ top: position.y, left: position.x }}
    >
      <div className={`px-3 py-2 mb-1 border-b ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'
        }`}>
        <span className="text-[10px] font-bold uppercase tracking-widest text-n8n-pink/70">DigiFlow Menu</span>
      </div>

      {menuItems.map((item, index) => {
        if (item.type === 'divider') {
          return <div key={index} className={`my-1 h-px ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'
            }`} />;
        }

        return (
          <a
            key={index}
            href={item.href || '#'}
            className={`menu-item group flex items-center justify-between px-3 py-2.5 mx-1 rounded-xl transition-all duration-200 ${item.primary
                ? 'text-n8n-pink font-semibold hover:bg-n8n-pink/10'
                : theme === 'dark'
                  ? 'text-white/80 hover:bg-white/5'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
          >
            <div className="flex items-center gap-3">
              <span className={`transition-colors ${item.primary
                  ? 'text-n8n-pink'
                  : theme === 'dark'
                    ? 'text-white/40 group-hover:text-n8n-pink'
                    : 'text-slate-400 group-hover:text-n8n-pink'
                }`}>
                {item.icon}
              </span>
              <span className="text-sm">{item.label}</span>
            </div>
            <ChevronRight size={14} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-40 group-hover:translate-x-0" />
          </a>
        );
      })}
    </div>
  );
};
