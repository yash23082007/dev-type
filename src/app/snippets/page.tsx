"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTypingStore } from '@/store/typingStore'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Code2Icon, SearchIcon, FilterIcon, ChevronRightIcon, XIcon, CopyIcon, CheckIcon } from 'lucide-react'

const SNIPPETS = [
    { 
        title: "React Context API", 
        desc: "Global state management patterns used in modern web apps.", 
        lang: "TSX", 
        lines: 42, 
        difficulty: "MID",
        code: `import React, { createContext, useContext, useReducer } from 'react';

const StateContext = createContext(undefined);

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);`
    },
    { 
        title: "Fast API Middleware", 
        desc: "Secure authentication headers and rate limiting logic.", 
        lang: "PY", 
        lines: 28, 
        difficulty: "PRO",
        code: `from fastapi import Request, HTTPException
import time

async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response`
    },
    { 
        title: "Rust Error Handling", 
        desc: "Result types, Optionals, and custom error propagation.", 
        lang: "RS", 
        lines: 56, 
        difficulty: "ELITE",
        code: `use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut username = String::new();
    File::open("hello.txt")?.read_to_string(&mut username)?;
    Ok(username)
}`
    },
    { 
        title: "Zustand Middleware", 
        desc: "Persistent storage and devtools integration for React.", 
        lang: "TS", 
        lines: 15, 
        difficulty: "EASY",
        code: `import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      bears: 0,
      addBear: () => set((state) => ({ bears: state.bears + 1 })),
    }),
    { name: 'food-storage' }
  )
)`
    },
    { 
        title: "K8s Operator Logic", 
        desc: "Custom resource definition controllers and reconciliation.", 
        lang: "GO", 
        lines: 120, 
        difficulty: "ELITE",
        code: `func (r *ReconcileIteration) Reconcile(request reconcile.Request) (reconcile.Result, error) {
    instance := &v1alpha1.Iteration{}
    err := r.client.Get(context.TODO(), request.NamespacedName, instance)
    if err != nil {
        return reconcile.Result{}, nil
    }
    return reconcile.Result{}, nil
}`
    },
    { 
        title: "Tailwind Grid System", 
        desc: "Complex responsive layouts using modern CSS utilities.", 
        lang: "CSS", 
        lines: 34, 
        difficulty: "MID",
        code: `.grid-layout {
  @apply grid grid-cols-1 md:grid-cols-12 gap-6;
}
.sidebar {
  @apply md:col-span-3 bg-surface border-r border-white/5;
}
.main-content {
  @apply md:col-span-9 p-8;
}`
    },
]

export default function SnippetsPage() {
    const router = useRouter()
    const [selectedSnippet, setSelectedSnippet] = useState<any>(null)
    const [copied, setCopied] = useState(false)

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handlePractice = (snippet: any) => {
        useTypingStore.getState().setCustomSnippet(snippet.code, snippet.lang)
        router.push('/')
    }

    return (
        <main className="min-h-screen bg-background text-white">
            <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <h1 className="text-7xl font-black tracking-tighter mb-6 leading-[0.9]">EXPLORE<br />SNIPPETS</h1>
                        <p className="text-text-muted text-xl max-w-2xl font-medium">Curated production code for elite technical training.</p>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="relative group">
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search syntax..." 
                                className="bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-primary/50 w-64 transition-all"
                            />
                        </div>
                        <button className="p-3 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                            <FilterIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
                    {['ALL', 'REACT', 'PYTHON', 'RUST', 'TYPESCRIPT', 'GO', 'SYSTEMS', 'UI'].map((cat, i) => (
                        <button key={i} className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all ${i === 0 ? 'bg-primary text-background' : 'bg-white/5 text-text-muted hover:text-white'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SNIPPETS.map((s, i) => (
                        <div 
                            key={i} 
                            onClick={() => setSelectedSnippet(s)}
                            className="glass-panel p-8 border border-white/5 hover:border-white/20 transition-all cursor-pointer group relative overflow-hidden"
                        >
                             <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronRightIcon className="w-5 h-5 text-primary" />
                             </div>
                             
                             <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <Code2Icon className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">{s.lang}</span>
                             </div>
                             
                             <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{s.title}</h3>
                             <p className="text-sm text-text-muted leading-relaxed mb-8">{s.desc}</p>
                             
                             <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">{s.lines} LINES</span>
                                <span className={`text-[10px] font-mono font-bold tracking-widest ${
                                    s.difficulty === 'ELITE' ? 'text-primary' : 
                                    s.difficulty === 'PRO' ? 'text-secondary' : 'text-white/40'
                                }`}>{s.difficulty}</span>
                             </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Snippet Detail Modal */}
            {selectedSnippet && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/90 backdrop-blur-md">
                    <div className="glass-panel w-full max-w-4xl max-h-[80vh] flex flex-col border border-white/10 shadow-2xl relative">
                        <button 
                            onClick={() => setSelectedSnippet(null)}
                            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
                        >
                            <XIcon className="w-6 h-6" />
                        </button>

                        <div className="p-10 flex-col overflow-y-auto">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold tracking-widest rounded-full uppercase">{selectedSnippet.lang}</span>
                                <h2 className="text-4xl font-black tracking-tighter">{selectedSnippet.title}</h2>
                            </div>

                            <p className="text-text-muted mb-10 text-lg">{selectedSnippet.desc}</p>

                            <div className="relative group">
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button 
                                        onClick={() => copyToClipboard(selectedSnippet.code)}
                                        className="p-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 transition-all flex items-center gap-2 text-xs font-mono"
                                    >
                                        {copied ? <CheckIcon className="w-4 h-4 text-primary" /> : <CopyIcon className="w-4 h-4 text-white/40" />}
                                        {copied ? 'COPIED' : 'COPY'}
                                    </button>
                                </div>
                                <pre className="bg-black/50 p-8 rounded-2xl border border-white/5 overflow-x-auto font-mono text-sm leading-relaxed text-blue-100/80">
                                    <code>{selectedSnippet.code}</code>
                                </pre>
                            </div>

                            <div className="mt-12 flex items-center justify-between">
                                <div className="flex gap-8">
                                    <div>
                                        <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1">Difficulty</p>
                                        <p className="font-bold text-primary tracking-widest">{selectedSnippet.difficulty}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1">Lines</p>
                                        <p className="font-bold text-white tracking-widest">{selectedSnippet.lines}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handlePractice(selectedSnippet)}
                                    className="premium-button py-3 px-8 text-xs font-bold tracking-widest uppercase"
                                >
                                    PRACTICE THIS SNIPPET
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}
