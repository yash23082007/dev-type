"use client"

import React, { useEffect, useState } from 'react'
import { TrophyIcon, Loader2Icon, XIcon } from 'lucide-react'

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

interface LeaderboardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LeaderboardModal({ isOpen, onClose }: LeaderboardModalProps) {
    const [leaderboard, setLeaderboard] = useState<TestResult[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (isOpen) {
            setLoading(true)
            fetch('/api/scores')
                .then(res => res.json())
                .then(data => {
                    setLeaderboard(Array.isArray(data) ? data : [])
                    setLoading(false)
                })
                .catch(err => {
                    console.error("Failed to fetch leaderboard", err)
                    setLeaderboard([])
                    setLoading(false)
                })
        }
    }, [isOpen])

    if (!isOpen) return null

    const medals = ['🥇', '🥈', '🥉']

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <div className="glass-panel p-8 max-w-2xl w-full flex flex-col border border-primary/20 shadow-[0_0_50px_rgba(0,255,157,0.1)] relative max-h-[80vh] overflow-hidden">
                
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral hover:text-white hover:bg-surface transition-all"
                >
                    <XIcon className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <TrophyIcon className="w-7 h-7 text-yellow-400" />
                    <h2 className="text-2xl font-black text-white tracking-wider uppercase">Leaderboard</h2>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <Loader2Icon className="w-8 h-8 text-primary animate-spin" />
                    </div>
                ) : (
                    <div className="overflow-y-auto pr-2 custom-scrollbar">
                        {leaderboard.length === 0 ? (
                            <div className="text-center py-12">
                                <TrophyIcon className="w-12 h-12 text-neutral/20 mx-auto mb-4" />
                                <p className="text-neutral/50 font-mono text-sm">No scores recorded yet. Be the first!</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {leaderboard.map((entry, index) => (
                                    <div key={entry.id} className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                                        index < 3 
                                            ? 'bg-surface border-primary/20 hover:border-primary/40' 
                                            : 'bg-surface/50 border-white/5 hover:border-white/10'
                                    }`}>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xl font-black w-10 text-center">
                                                {index < 3 ? medals[index] : <span className="text-neutral">#{index + 1}</span>}
                                            </span>
                                            <div>
                                                <span className="text-white font-bold tracking-wider text-sm">{entry.user?.username || 'Anonymous'}</span>
                                                <div className="flex gap-2 mt-0.5">
                                                    <span className="text-[10px] font-mono text-neutral bg-background px-1.5 py-0.5 rounded capitalize">{entry.language}</span>
                                                    <span className="text-[10px] font-mono text-neutral bg-background px-1.5 py-0.5 rounded capitalize">{entry.difficulty}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-6 items-center">
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">WPM</span>
                                                <span className={`text-xl font-black ${index < 3 ? 'text-primary neon-text-primary' : 'text-white'}`}>{entry.wpm}</span>
                                            </div>
                                            <div className="flex flex-col items-end w-14">
                                                <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">ACC</span>
                                                <span className="text-lg font-bold text-white">{entry.accuracy}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
