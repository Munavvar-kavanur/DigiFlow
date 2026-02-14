
"use client";

import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Theme } from '../types';
import { Send, Sparkles, Loader2, PlayCircle } from 'lucide-react';

interface WorkflowAssistantProps {
  theme: Theme;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const WorkflowAssistant: React.FC<WorkflowAssistantProps> = ({ theme }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    nodes: string[];
    description: string;
    complexity: string;
  } | null>(null);

  const generateWorkflow = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as an n8n expert. Suggest an n8n workflow for: ${prompt}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              nodes: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of n8n node names needed."
              },
              description: {
                type: Type.STRING,
                description: "Brief explanation of how the workflow works."
              },
              complexity: {
                type: Type.STRING,
                description: "Beginner, Intermediate, or Advanced."
              }
            },
            required: ["nodes", "description", "complexity"]
          }
        }
      });

      if (response.text) {
        setResult(JSON.parse(response.text));
      }
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-8 rounded-[2rem] border max-w-4xl mx-auto shadow-2xl transition-all ${theme === 'dark' ? 'bg-n8n-surface border-white/10' : 'bg-white border-slate-200'
      }`}>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-n8n-pink flex items-center justify-center text-white shadow-lg shadow-n8n-pink/30">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight text-n8n-pink">Workflow Architect</h3>
          <p className="text-sm opacity-60">AI assistant for your n8n workflows</p>
        </div>
      </div>

      <div className="relative mb-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: Every morning, check a spreadsheet and send high-priority leads to Discord."
          className={`w-full h-32 p-6 rounded-2xl resize-none outline-none border transition-all ${theme === 'dark'
            ? 'bg-n8n-dark border-white/10 focus:border-n8n-pink focus:ring-1 focus:ring-n8n-pink/50'
            : 'bg-slate-50 border-slate-200 focus:border-n8n-pink focus:ring-1 focus:ring-n8n-pink/50'
            }`}
        />
        <button
          onClick={generateWorkflow}
          disabled={loading || !prompt}
          className="absolute bottom-4 right-4 bg-n8n-pink hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all shadow-lg"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
        </button>
      </div>

      {result && (
        <div className={`mt-8 p-6 rounded-2xl border animate-in fade-in slide-in-from-bottom-4 duration-500 ${theme === 'dark' ? 'bg-n8n-dark border-white/10' : 'bg-n8n-pink/5 border-n8n-pink/20'
          }`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-n8n-pink px-3 py-1 bg-n8n-pink/10 rounded-full">
              {result.complexity}
            </span>
          </div>
          <p className="text-lg font-medium mb-6 leading-relaxed italic opacity-90">
            "{result.description}"
          </p>

          <div className="flex flex-wrap gap-3">
            {result.nodes.map((node, i) => (
              <div key={i} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 border transition-colors ${theme === 'dark'
                ? 'bg-n8n-surface border-white/10 hover:border-n8n-pink/50'
                : 'bg-white border-slate-200 hover:border-n8n-pink/50'
                }`}>
                <PlayCircle size={14} className="text-n8n-pink" />
                {node}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
