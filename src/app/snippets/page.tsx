"use client"

import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Code2Icon, SearchIcon, FilterIcon, ChevronRightIcon } from 'lucide-react'

export default function SnippetsPage() {
    return (
        <main className="min-h-screen bg-background text-white">
            <Navbar />
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
                    {[
                        { title: "React Context API", desc: "Global state management patterns used in modern web apps.", lang: "TSX", lines: 42, difficulty: "MID" },
                        { title: "Fast API Middleware", desc: "Secure authentication headers and rate limiting logic.", lang: "PY", lines: 28, difficulty: "PRO" },
                        { title: "Rust Error Handling", desc: "Result types, Optionals, and custom error propagation.", lang: "RS", lines: 56, difficulty: "ELITE" },
                        { title: "Zustand Middleware", desc: "Persistent storage and devtools integration for React.", lang: "TS", lines: 15, difficulty: "EASY" },
                        { title: "K8s Operator Logic", desc: "Custom resource definition controllers and reconciliation.", lang: "GO", lines: 120, difficulty: "ELITE" },
                        { title: "Tailwind Grid System", desc: "Complex responsive layouts using modern CSS utilities.", lang: "CSS", lines: 34, difficulty: "MID" },
                    ].map((s, i) => (
                        <div key={i} className="glass-panel p-8 border border-white/5 hover:border-white/20 transition-all cursor-pointer group relative overflow-hidden">
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
            <Footer />
        </main>
    )
}
