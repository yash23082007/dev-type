"use client"

import React from 'react'
import Link from 'next/link'
import { TerminalIcon, GithubIcon, LinkedinIcon, InstagramIcon, MailIcon } from 'lucide-react'
import { useTypingStore } from '@/store/typingStore'

export function Footer() {
    return (
        <footer className="w-full border-t border-white/[0.04] bg-background pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="md:col-span-1 space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-white flex items-center justify-center rounded-sm">
                                <TerminalIcon className="w-4 h-4 text-black" />
                            </div>
                            <span className="text-lg font-black tracking-tighter text-white">DEVTYPE</span>
                        </Link>
                        <p className="text-sm text-text-muted leading-relaxed max-w-xs">
                            The ultimate typing platform for developers. Master your syntax speed and conquer the keyboard with real code snippets.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <a href="https://github.com/yash23082007" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                                <GithubIcon className="w-4 h-4 text-white" />
                            </a>
                            <a href="https://www.linkedin.com/in/yash-vijay-b0a75937a" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                                <LinkedinIcon className="w-4 h-4 text-white" />
                            </a>
                            <a href="https://www.instagram.com/yash_vj23" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                                <InstagramIcon className="w-4 h-4 text-white" />
                            </a>
                            <a href="mailto:ktanayash@gmail.com" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                                <MailIcon className="w-4 h-4 text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white">Platform</h4>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-sm text-text-muted hover:text-white transition-colors">Practice</Link></li>
                            <li><button onClick={() => useTypingStore.getState().setIsLeaderboardOpen(true)} className="text-sm text-text-muted hover:text-white transition-colors text-left w-full">Leaderboard</button></li>
                            <li><Link href="/" className="text-sm text-text-muted hover:text-white transition-colors">Explore Snippets</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white">Resources</h4>
                        <ul className="space-y-4">
                            <li><Link href="/#about" className="text-sm text-text-muted hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/shortcuts" className="text-sm text-text-muted hover:text-white transition-colors">Shortcuts</Link></li>
                            <li><Link href="/" className="text-sm text-text-muted hover:text-white transition-colors">Dev Blog</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white">Legal</h4>
                        <ul className="space-y-4">
                            <li><Link href="/privacy" className="text-sm text-text-muted hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-sm text-text-muted hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-text-muted font-mono">
                        © {new Date().getFullYear()} DEVTYPE. CRAFTED FOR THE MODERN ENGINEER.
                    </p>
                    <div className="flex items-center gap-6 text-xs font-mono text-text-muted">
                        <span>EST. 2026</span>
                        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                        <span className="text-secondary/60">V1.0.4</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
