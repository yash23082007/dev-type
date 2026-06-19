"use client"

import React from 'react'
import { Code2Icon, ZapIcon, TargetIcon, LayersIcon } from 'lucide-react'
import Link from 'next/link'

export function AboutSection() {
    return (
        <section id="about" className="w-full py-32 px-6 relative overflow-hidden bg-[#0a0a0a]">
            {/* Subtle Gradient Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Text Content */}
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary">The Vision</span>
                            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-none">
                                FLOW STATE<br />
                                <span className="text-text-muted">FOR THE ELITE.</span>
                            </h2>
                        </div>
                        
                        <p className="text-xl text-text-muted leading-relaxed font-medium">
                            DevType isn&apos;t just a typing test. It&apos;s a high-performance environment designed to bridge the gap between thought and code. We use real-world production snippets to train your muscle memory for the syntax that matters.
                        </p>

                        <div className="flex pt-4">
                            <Link href="/" className="premium-button py-4 px-10 text-lg font-black tracking-widest transition-all hover:scale-105">
                                START TRAINING
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="space-y-4 pt-8 border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/5 rounded-md">
                                        <Code2Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="font-bold text-white tracking-tight">Real Code Only</h3>
                                </div>
                                <p className="text-sm text-text-muted leading-relaxed"> No more random words. Practice with React hooks, Python decorators, and complex algorithms.</p>
                            </div>
                            <div className="space-y-4 pt-8 border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/5 rounded-md">
                                        <ZapIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="font-bold text-white tracking-tight">Zero Friction</h3>
                                </div>
                                <p className="text-sm text-text-muted leading-relaxed">Minimalist interface designed to keep you focused. Every millisecond counts in the terminal.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual Card */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-white/5 rounded-2xl blur-2xl group-hover:bg-white/10 transition-all duration-700"></div>
                        <div className="relative bg-[#050505] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-8">
                            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                                </div>
                                <span className="text-[10px] font-mono text-text-muted">SYSTEM_STATUS: OPTIMIZED</span>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/20 transition-colors">
                                    <div className="text-[10px] font-mono text-secondary mb-1">ACCURACY_BENCHMARK</div>
                                    <div className="text-3xl font-black text-white">99.8<span className="text-lg font-normal text-text-muted">%</span></div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/20 transition-colors">
                                    <div className="text-[10px] font-mono text-secondary mb-1">PEAK_PERFORMANCE</div>
                                    <div className="text-3xl font-black text-white">142<span className="text-lg font-normal text-text-muted">WPM</span></div>
                                </div>
                            </div>

                            <div className="pt-4 flex items-center gap-4">
                                <TargetIcon className="w-8 h-8 text-white/20" />
                                <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
                                <LayersIcon className="w-8 h-8 text-white/20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
