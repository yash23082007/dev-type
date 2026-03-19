"use client"

import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ZapIcon, ClockIcon, ArrowRightIcon } from 'lucide-react'

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-background text-white">
            <Navbar />
            <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
                <div className="mb-20">
                    <h1 className="text-8xl font-black tracking-tighter mb-8 italic">THE<br />DEV LOG.</h1>
                    <p className="text-text-muted text-2xl max-w-2xl font-medium leading-relaxed">Engineering insights for the 1%. Tactics, tools, and terminal philosophy.</p>
                </div>

                {/* Featured Post */}
                <div className="glass-panel p-12 border border-white/10 mb-20 group cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent -z-10 group-hover:w-full transition-all duration-700"></div>
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-3 py-1 bg-primary text-background text-[10px] font-bold tracking-widest rounded-full uppercase">Featured</span>
                            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">March 20, 2026</span>
                        </div>
                        <h2 className="text-5xl font-black text-white mb-6 tracking-tighter leading-tight">Mastering the Neovim Workflow for High-Efficiency Development</h2>
                        <p className="text-text-muted text-lg mb-8 leading-relaxed">We break down the exact configurations and muscle memory patterns used by top-tier engineers to maintain flow state throughout an 8-hour sprint.</p>
                        <div className="flex items-center gap-2 text-primary group-hover:gap-4 transition-all font-bold tracking-widest text-sm uppercase">
                            Read Article <ArrowRightIcon className="w-5 h-5" />
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { title: "The Hidden Cost of Visual Distractions in IDEs", date: "Mar 18, 2026", cat: "PSYCHOLOGY", time: "5 MIN" },
                        { title: "Static Typing in Python: A Production Case Study", date: "Mar 15, 2026", cat: "ENGINEERING", time: "12 MIN" },
                        { title: "Building a Tactile UI with GSAP 4.0", date: "Mar 12, 2026", cat: "DESIGN", time: "8 MIN" },
                        { title: "Why We Switched to a Custom Typing Engine", date: "Mar 10, 2026", cat: "PRODUCT", time: "10 MIN" },
                        { title: "The Future of Terminal-Based Interfaces", date: "Mar 05, 2026", cat: "FUTURE", time: "15 MIN" },
                        { title: "Optimizing React Hydration for Low-End Devices", date: "Mar 01, 2026", cat: "PERF", time: "6 MIN" },
                    ].map((b, i) => (
                        <div key={i} className="glass-panel p-10 border border-white/5 hover:border-white/20 transition-all cursor-pointer group">
                             <div className="flex items-center justify-between mb-6">
                                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">{b.cat}</span>
                                <div className="flex items-center gap-2 text-text-muted text-[10px] font-mono uppercase tracking-widest">
                                    <ClockIcon className="w-3 h-3" /> {b.time}
                                </div>
                             </div>
                             <h3 className="text-3xl font-black text-white tracking-tighter leading-tight mb-4 group-hover:text-primary transition-colors">{b.title}</h3>
                             <p className="text-sm text-text-muted font-mono mb-8 uppercase tracking-widest">{b.date}</p>
                             <div className="p-3 bg-white/5 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                                <ZapIcon className="w-5 h-5 text-white opacity-40 group-hover:opacity-100" />
                             </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    )
}
