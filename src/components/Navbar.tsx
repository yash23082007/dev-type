"use client"

import React from 'react'
import Link from 'next/link'
import { TerminalIcon, UserIcon, LogOutIcon, LayoutDashboardIcon, TrophyIcon } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useTypingStore } from '@/store/typingStore'

export function Navbar() {
    const user = useAuthStore(state => state.user)
    const logout = useAuthStore(state => state.logout)
    const authLoading = useAuthStore(state => state.loading)
    
    const handleLogout = async () => {
        await logout()
        window.location.reload()
    }

    const openLeaderboard = () => {
        useTypingStore.getState().setIsLeaderboardOpen(true)
    }

    return (
        <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/[0.04] bg-background/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden">
                        {/* Kinetic Background */}
                        <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors rounded-lg"></div>
                        <div className="absolute inset-0 border border-white/10 group-hover:border-white/20 transition-colors rounded-lg"></div>
                        
                        {/* Geometric Mark */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110">
                            <path d="M4 17L10 11L4 5" stroke="white" strokeWidth="4" strokeLinecap="square" />
                            <rect x="12" y="15" width="8" height="3" fill="white" />
                        </svg>
                        
                        {/* Glint Effect */}
                        <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:left-[100%] transition-all duration-1000"></div>
                    </div>
                    
                    <div className="flex flex-col leading-none">
                        <div className="flex items-baseline">
                            <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase mb-0.5">ELITE</span>
                        </div>
                        <span className="text-xl font-light tracking-[0.1em] text-white">
                            DEV<span className="font-black text-white">TYPE</span>
                        </span>
                    </div>
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium text-text-muted hover:text-white transition-colors">
                        Practice
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-text-muted hover:text-white transition-colors">
                        About
                    </Link>
                    <button 
                        onClick={openLeaderboard}
                        className="text-sm font-medium text-text-muted hover:text-white transition-colors flex items-center gap-1.5"
                    >
                        <TrophyIcon className="w-4 h-4" /> Leaderboard
                    </button>
                    {!authLoading && (
                        <div className="flex items-center gap-6 border-l border-white/10 pl-6 ml-2">
                            {user ? (
                                <>
                                    <Link href="/dashboard" className="text-sm font-medium text-text-muted hover:text-white transition-colors flex items-center gap-2">
                                        <LayoutDashboardIcon className="w-4 h-4" /> Dashboard
                                    </Link>
                                    <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                        <UserIcon className="w-3.5 h-3.5 text-secondary" />
                                        <span className="text-xs font-bold text-white uppercase tracking-wider">{user.username}</span>
                                    </div>
                                    <button onClick={handleLogout} className="text-text-muted hover:text-error transition-colors p-1">
                                        <LogOutIcon className="w-4 h-4" />
                                    </button>
                                </>
                            ) : (
                                <Link href="/login" className="premium-button py-1.5 px-5">
                                    Sign In
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
