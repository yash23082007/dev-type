"use client"

import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ShieldCheckIcon } from 'lucide-react'

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-background text-white">
            <div className="pt-32 pb-32 px-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <ShieldCheckIcon className="w-10 h-10 text-primary" />
                    <h1 className="text-5xl font-black tracking-tighter uppercase">Privacy Policy</h1>
                </div>
                
                <p className="text-text-muted mb-12 font-mono text-sm tracking-widest">LAST UPDATED: MARCH 20, 2026</p>

                <div className="space-y-12 text-lg leading-relaxed text-text-muted">
                    <section>
                        <h2 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">1. DATA ENCRYPTION</h2>
                        <p>At DEVTYPE, your performance data is treated with the same respect as production code. We use AES-256 encryption for all stored metrics, ensuring your typing patterns remain your intellectual property.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">2. TELEMETRY SCOPE</h2>
                        <p>We collect only the metrics required to calculate your WPM, accuracy, and consistency. We do not keylog outside of the active training sessions. No private data from your local environment is ever accessed.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">3. THIRD-PARTY INTEGRATION</h2>
                        <p>We do not sell your performance data. We use industry-standard providers like Vercel and MongoDB solely for infrastructure purposes. All integrations are vetted for high-security standards.</p>
                    </section>

                    <section className="p-8 bg-white/5 border border-white/10 rounded-2xl italic">
                        &quot;Your speed is yours. Your precision is yours. Your privacy is non-negotiable.&quot; — The DevType Protocol
                    </section>
                </div>
            </div>
        </main>
    )
}
