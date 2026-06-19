"use client"

import React, { useEffect, useState } from 'react'
import { TrophyIcon, Loader2Icon } from 'lucide-react'

interface TestResult {
    id: string
    wpm: number
    accuracy: number
    language: string
    difficulty: string
    createdAt: string
    user: {
        username: string
    }
}

export default function LeaderboardPage() {
    const [leaderboard, setLeaderboard] = useState<TestResult[]>([])
    const [loading, setLoading] = useState(true)
    const [tab, setTab] = useState<'all-time' | 'daily' | 'leetcode'>('all-time')

    useEffect(() => {
        let isMounted = true

        const fetchLeaderboard = async () => {
            setLoading(true)
            try {
                const typeParam = tab !== 'all-time' ? `?type=${tab}` : ''
                const res = await fetch(`/api/scores${typeParam}`)
                const data = await res.json()
                if (isMounted) {
                    setLeaderboard(Array.isArray(data) ? data : [])
                    setLoading(false)
                }
            } catch (err) {
                console.error("Failed to fetch leaderboard", err)
                if (isMounted) {
                    setLeaderboard([])
                    setLoading(false)
                }
            }
        }

        fetchLeaderboard()

        return () => {
            isMounted = false
        }
    }, [tab])

    const medals = ['🥇', '🥈', '🥉']

    return (
        <main className="min-h-screen bg-background text-white pt-12 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-3">
                        <TrophyIcon className="w-10 h-10 text-yellow-400" />
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-none">Leaderboard</h1>
                    </div>
                    <div className="flex bg-surface border border-white/5 p-1 rounded-lg self-start sm:self-auto">
                        {(['all-time', 'daily', 'leetcode'] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`px-4 py-2 text-xs font-black rounded-md tracking-wider transition-all uppercase cursor-pointer ${
                                    tab === t ? 'bg-white text-black' : 'text-neutral hover:text-white'
                                }`}
                            >
                                {t === 'all-time' ? 'All Time' : t === 'daily' ? 'Today' : 'LeetCode'}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2Icon className="w-10 h-10 text-primary animate-spin" />
                    </div>
                ) : (
                    <div>
                        {leaderboard.length === 0 ? (
                            <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-surface/20">
                                <TrophyIcon className="w-16 h-16 text-neutral/20 mx-auto mb-4" />
                                <p className="text-neutral/50 font-mono text-sm">No scores recorded yet. Be the first to secure a rank!</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {leaderboard.map((entry, index) => (
                                    <div key={entry.id} className={`flex items-center justify-between p-5 rounded-xl border transition-all ${
                                        index < 3 
                                            ? 'bg-surface border-primary/20 hover:border-primary/40 shadow-[0_0_15px_rgba(0,255,157,0.03)]' 
                                            : 'bg-surface/50 border-white/5 hover:border-white/10'
                                    }`}>
                                        <div className="flex items-center gap-6">
                                            <span className="text-2xl font-black w-12 text-center select-none">
                                                {index < 3 ? medals[index] : <span className="text-neutral font-mono text-base">#{index + 1}</span>}
                                            </span>
                                            <div>
                                                <span className="text-white font-extrabold tracking-wider text-base transition-colors">{entry.user?.username || 'Anonymous'}</span>
                                                <div className="flex gap-2.5 mt-1">
                                                    <span className="text-[10px] font-mono text-white/50 bg-background px-2 py-0.5 rounded capitalize border border-white/5">{entry.language}</span>
                                                    <span className="text-[10px] font-mono text-white/50 bg-background px-2 py-0.5 rounded capitalize border border-white/5">{entry.difficulty}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-8 items-center">
                                            <div className="flex flex-col items-end">
                                                <span className="text-[9px] uppercase tracking-widest text-secondary font-bold font-mono">WPM</span>
                                                <span className={`text-2xl font-black ${index < 3 ? 'text-primary neon-text-primary' : 'text-white font-mono'}`}>{entry.wpm}</span>
                                            </div>
                                            <div className="flex flex-col items-end w-16">
                                                <span className="text-[9px] uppercase tracking-widest text-secondary font-bold font-mono">ACC</span>
                                                <span className="text-xl font-bold text-white font-mono">{entry.accuracy}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    )
}
