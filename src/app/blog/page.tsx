"use client"

import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ZapIcon } from 'lucide-react'

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-4">DEV BLOG</h1>
                    <p className="text-text-muted text-lg max-w-2xl">Insights, tips, and high-performance engineering stories from the DevType team.</p>
                </div>
                
                <div className="space-y-8">
                    {[
                        { title: "The Art of Muscle Memory", date: "Jan 20, 2026", category: "Performance" },
                        { title: "Why Syntax Matters More Than You Think", date: "Jan 18, 2026", category: "Engineering" },
                        { title: "Building a Tactile Typing Experience", date: "Jan 15, 2026", category: "Design" },
                    ].map((b, i) => (
                        <div key={i} className="glass-panel p-8 border border-white/5 hover:border-white/20 transition-all cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                             <div>
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">{b.category}</span>
                                    <span className="text-[10px] font-mono text-text-muted">{b.date}</span>
                                </div>
                                <h3 className="text-2xl font-black text-white tracking-tight">{b.title}</h3>
                             </div>
                             <div className="p-3 bg-white/5 rounded-full">
                                <ZapIcon className="w-5 h-5 text-white opacity-40" />
                             </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    )
}
