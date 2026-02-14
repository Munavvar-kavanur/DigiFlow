
"use client";

import React from 'react';
import { Sun, Moon, Menu } from 'lucide-react';
import { Theme } from '../types';
import { Logo } from './Logo';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${theme === 'dark' ? 'bg-n8n-dark/80 border-white/10' : 'bg-white/80 border-slate-200'
      }`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Logo theme={theme} className="cursor-pointer group hover:scale-105 transition-transform" />

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#features" className="opacity-70 hover:opacity-100 hover:text-n8n-pink transition-all">Features</a>
          <a href="#pricing" className="opacity-70 hover:opacity-100 hover:text-n8n-pink transition-all">Pricing</a>
          <a href="#docs" className="opacity-70 hover:opacity-100 hover:text-n8n-pink transition-all">Docs</a>
          <a href="#support" className="opacity-70 hover:opacity-100 hover:text-n8n-pink transition-all">Support</a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-white' : 'hover:bg-slate-200 text-slate-900'
              }`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="hidden sm:block bg-n8n-pink hover:brightness-110 text-white px-5 py-2.5 rounded-full font-semibold transition-all shadow-md shadow-n8n-pink/20">
            Get Started
          </button>
          <button className="md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};
