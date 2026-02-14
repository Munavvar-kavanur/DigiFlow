
"use client";

import React from 'react';
import { Theme } from '../types';
import { Twitter, Github, Linkedin } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  theme: Theme;
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  return (
    <footer className={`py-20 px-6 border-t ${theme === 'dark' ? 'border-white/10 bg-n8n-dark' : 'border-slate-200 bg-white'
      }`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Logo theme={theme} className="mb-6" />
            <p className="text-lg opacity-60 max-w-md leading-relaxed">
              The ultimate managed hosting for n8n. Scale your automations without the headache of infrastructure management.
            </p>
            <div className="flex gap-4 mt-8">
              <a href="#" className="p-3 rounded-full border border-white/10 hover:bg-n8n-pink hover:text-white hover:border-n8n-pink transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-3 rounded-full border border-white/10 hover:bg-n8n-pink hover:text-white hover:border-n8n-pink transition-all">
                <Github size={18} />
              </a>
              <a href="#" className="p-3 rounded-full border border-white/10 hover:bg-n8n-pink hover:text-white hover:border-n8n-pink transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 tracking-tight">Platform</h4>
            <ul className="space-y-4 opacity-60 text-sm">
              <li><a href="#" className="hover:text-n8n-pink transition-colors">Managed n8n</a></li>
              <li><a href="#" className="hover:text-n8n-pink transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-n8n-pink transition-colors">Edge Nodes</a></li>
              <li><a href="#" className="hover:text-n8n-pink transition-colors">Security</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 tracking-tight">Support</h4>
            <ul className="space-y-4 opacity-60 text-sm">
              <li><a href="#" className="hover:text-n8n-pink transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-n8n-pink transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-n8n-pink transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-n8n-pink transition-colors">Status Page</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-50 font-medium">
          <p>© 2024 DigiFlow Inc. Optimized for n8n automations.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-n8n-pink transition-colors">Security Audit</a>
            <a href="#" className="hover:text-n8n-pink transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-n8n-pink transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
