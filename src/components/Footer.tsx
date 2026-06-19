"use client"

import React from 'react'
import Link from 'next/link'
import { useTypingStore } from '@/store/typingStore'
import { GithubIcon, HeartIcon } from 'lucide-react'

export function Footer() {
    const status = useTypingStore(state => state.status)

    return (
        <footer className={`w-full py-10 mt-auto transition-opacity duration-500 ${status === 'running' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="max-w-7xl mx-auto px-6">
                {/* Main footer grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-white/[0.06]">
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">Platform</h4>
                        <div className="flex flex-col gap-2.5">
                            <Link href="/" className="text-xs text-text-muted hover:text-white transition-colors font-medium">Practice</Link>
                            <Link href="/leaderboard" className="text-xs text-text-muted hover:text-white transition-colors font-medium">Leaderboard</Link>
                            <Link href="/snippets" className="text-xs text-text-muted hover:text-white transition-colors font-medium">Snippets</Link>
                            <Link href="/dashboard" className="text-xs text-text-muted hover:text-white transition-colors font-medium">Dashboard</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">Resources</h4>
                        <div className="flex flex-col gap-2.5">
                            <Link href="/about" className="text-xs text-text-muted hover:text-white transition-colors font-medium">About</Link>
                            <Link href="/blog" className="text-xs text-text-muted hover:text-white transition-colors font-medium">Blog</Link>
                            <Link href="/shortcuts" className="text-xs text-text-muted hover:text-white transition-colors font-medium">Shortcuts</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">Community</h4>
                        <div className="flex flex-col gap-2.5">
                            <a href="https://github.com/yash23082007" target="_blank" rel="noopener noreferrer" className="text-xs text-text-muted hover:text-white transition-colors font-medium">GitHub</a>
                            <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="text-xs text-text-muted hover:text-white transition-colors font-medium">Discord</a>
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-xs text-text-muted hover:text-white transition-colors font-medium">Twitter / X</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">Legal</h4>
                        <div className="flex flex-col gap-2.5">
                            <Link href="/privacy" className="text-xs text-text-muted hover:text-white transition-colors font-medium">Privacy</Link>
                            <Link href="/terms" className="text-xs text-text-muted hover:text-white transition-colors font-medium">Terms</Link>
                            <a href="mailto:ktanayash@gmail.com" className="text-xs text-text-muted hover:text-white transition-colors font-medium">Contact</a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-white/20">DEVTYPE V1.0.4</span>
                        <span className="text-white/10">•</span>
                        <span className="text-xs font-mono text-white/20">ALWAYS FREE & OPEN SOURCE</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-white/20">
                        <span>Made with</span>
                        <HeartIcon className="w-3 h-3 text-red-500/60" />
                        <span>by Yash</span>
                        <span className="text-white/10 mx-1">•</span>
                        <span>© 2026 DevType</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
