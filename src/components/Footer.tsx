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
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-3 group mb-6">
                            <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors rounded-lg"></div>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 transition-transform duration-500 group-hover:rotate-[360deg]">
                                    <path d="M4 17L10 11L4 5" stroke="white" strokeWidth="4" strokeLinecap="square" />
                                    <rect x="12" y="15" width="8" height="3" fill="white" />
                                </svg>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-[8px] font-black tracking-[0.4em] text-white/20 uppercase mb-0.5 transition-colors group-hover:text-white/40">ELITE</span>
                                <span className="text-lg font-light tracking-[0.05em] text-white">
                                    DEV<span className="font-black">TYPE</span>
                                </span>
                            </div>
                        </Link>
                        <p className="text-text-muted text-sm max-w-xs leading-relaxed">
                            The definitive training ground for the elite 1% of software engineers. Master your tools. Silence the noise.
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
                            <li><Link href="/snippets" className="text-sm text-text-muted hover:text-white transition-colors">Explore Snippets</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white">Resources</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-sm text-text-muted hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/shortcuts" className="text-sm text-text-muted hover:text-white transition-colors">Shortcuts</Link></li>
                            <li><Link href="/blog" className="text-sm text-text-muted hover:text-white transition-colors">Dev Blog</Link></li>
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
