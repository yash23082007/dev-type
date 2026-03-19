"use client"

import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Code2Icon } from 'lucide-react'

export default function SnippetsPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-4">EXPLORE SNIPPETS</h1>
                    <p className="text-text-muted text-lg max-w-2xl">Browse our curated library of production-ready code snippets. Master the syntax used by elite developers.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "React Hooks", desc: "Master useEffect, useMemo, and custom hooks.", lang: "TypeScript" },
                        { title: "Data Structures", desc: "Binary trees, linked lists, and sorting algorithms.", lang: "Python" },
                        { title: "API Patterns", desc: "REST, GraphQL, and robust error handling.", lang: "Go" },
                    ].map((s, i) => (
                        <div key={i} className="glass-panel p-6 border border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
                             <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/5 rounded-md group-hover:bg-primary/20 transition-colors">
                                    <Code2Icon className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">{s.lang}</span>
                             </div>
                             <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                             <p className="text-sm text-text-muted leading-relaxed">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    )
}
