"use client"

import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AboutSection } from '@/components/AboutSection'
import { UsersIcon, EyeIcon, RocketIcon } from 'lucide-react'

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-white">
            <div className="pt-24">
                <AboutSection />
            </div>

            {/* Vision Section */}
            <section className="py-20 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-center mb-6">
                        <span className="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase mb-4 animate-pulse">EST. 2026</span>
                        <div className="w-16 h-1 bg-white/10 rounded-full mb-12">
                            <div className="w-1/2 h-full bg-white rounded-full"></div>
                        </div>
                    </div>
                    <h2 className="text-7xl font-black text-white italic tracking-tighter mb-8 leading-[0.8] uppercase text-center">
                        BORN IN THE<br />
                        <span className="text-white/40">TERMINAL.</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <div className="p-3 bg-primary/10 rounded-xl w-fit">
                                <EyeIcon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-black tracking-tight">OUR VISION</h3>
                            <p className="text-text-muted leading-relaxed">
                                To become the definitive training ground for developers who refuse to let their tools slow them down. We believe typing is the ultimate interface of thought.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="p-3 bg-secondary/10 rounded-xl w-fit">
                                <RocketIcon className="w-8 h-8 text-secondary" />
                            </div>
                            <h3 className="text-2xl font-black tracking-tight">THE MISSION</h3>
                            <p className="text-text-muted leading-relaxed">
                                Eliminating the friction between ideation and implementation. We provide the tactile feedback and real-world syntax required for elite performance.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="p-3 bg-white/10 rounded-xl w-fit">
                                <UsersIcon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-black tracking-tight">COMMUNITY</h3>
                            <p className="text-text-muted leading-relaxed">
                                A global network of high-performance engineers sharing snippets, breaking records, and pushing the boundaries of what&apos;s possible in the terminal.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-black mb-16 tracking-tighter">BORN IN THE TERMINAL.</h2>
                    <div className="flex justify-center">
                        {[
                            { name: "Yash Vijay", role: "Elite Architect", tag: "CORE" },
                        ].map((member, i) => (
                            <div key={i} className="glass-panel p-10 border border-white/5 group hover:border-primary/20 transition-all max-w-sm w-full">
                                <div className="w-24 h-24 bg-white/5 rounded-full mx-auto mb-8 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <span className="text-3xl font-black text-white/40 group-hover:text-primary transition-colors">
                                        YV
                                    </span>
                                </div>
                                <h4 className="text-2xl font-black mb-2 tracking-tight">{member.name}</h4>
                                <p className="text-sm text-text-muted mb-6 uppercase tracking-widest text-[10px]">{member.role}</p>
                                <span className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-mono text-secondary tracking-widest">{member.tag}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
