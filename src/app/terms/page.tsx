"use client"

import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { FileTextIcon } from 'lucide-react'

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background text-white">
            <Navbar />
            <div className="pt-32 pb-32 px-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <FileTextIcon className="w-10 h-10 text-secondary" />
                    <h1 className="text-5xl font-black tracking-tighter uppercase">Terms of Service</h1>
                </div>
                
                <p className="text-text-muted mb-12 font-mono text-sm tracking-widest">EFFECTIVE DATE: MARCH 20, 2026</p>

                <div className="space-y-12 text-lg leading-relaxed text-text-muted">
                    <section>
                        <h2 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">1. ELITE CONDUCT</h2>
                        <p>Users are expected to engage with the platform in good faith. Any attempt to use automated scripts, bots, or external hardware to manipulate the leaderboards will result in permanent termination of the account.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">2. LICENSING</h2>
                        <p>While the snippets provided are for training purposes, the underlying engine and design system of DEVTYPE are proprietary. You are granted a limited, non-exclusive license to use the platform for personal skill development.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">3. PERFORMANCE DISCLAIMER</h2>
                        <p>Typing speed improvement is dependent on consistent practice. We provide the tools, but the execution is yours. We are not liable for any RSI or hardware wear-and-tear resulting from extreme training sessions.</p>
                    </section>

                    <section className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center font-bold tracking-widest uppercase text-sm">
                        BY ENTERING THE TERMINAL, YOU AGREE TO THE PROTOCOL.
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    )
}
