"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useTypingStore } from '../store/typingStore'
import { gsap } from 'gsap'
import { RotateCcwIcon, ArrowRightIcon, KeyboardIcon } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { ReplayModal } from './ReplayArena'

export function PostTestModal() {
    const modalRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false)
    const [showReplay, setShowReplay] = useState(false)

    const status = useTypingStore(state => state.status)
    const language = useTypingStore(state => state.language)
    const wpm = useTypingStore(state => state.getWPM())
    const rawWpm = useTypingStore(state => state.getRawWPM())
    const consistency = useTypingStore(state => state.getConsistency())
    const accuracy = useTypingStore(state => state.getAccuracy())
    const inputCharIndex = useTypingStore(state => state.inputCharIndex)
    const errors = useTypingStore(state => state.errors)
    const snippet = useTypingStore(state => state.snippet)
    const keystrokes = useTypingStore(state => state.keystrokes)
    const wpmTimeline = useTypingStore(state => state.wpmTimeline)
    const timeLimit = useTypingStore(state => state.timeLimit)
    const timeRemaining = useTypingStore(state => state.timeRemaining)
    const resetTest = useTypingStore(state => state.resetTest)
    const newPersonalBest = useTypingStore(state => state.newPersonalBest)

    const timeTaken = timeLimit - timeRemaining
    const cpm = timeTaken > 0 ? Math.round((inputCharIndex / timeTaken) * 60) : inputCharIndex

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (status === 'finished' && modalRef.current) {
            gsap.fromTo(modalRef.current,
                { y: 100, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.2)" }
            )
        }
    }, [status])

    if (status !== 'finished') return null

    // Performance rating
    let rating = 'Keep Practicing'
    let ratingColor = 'text-neutral'
    if (wpm >= 100) { rating = 'Legendary'; ratingColor = 'text-yellow-400 neon-text-primary' }
    else if (wpm >= 70) { rating = 'Excellent'; ratingColor = 'text-primary neon-text-primary' }
    else if (wpm >= 50) { rating = 'Great'; ratingColor = 'text-green-400' }
    else if (wpm >= 30) { rating = 'Good'; ratingColor = 'text-white' }

    // Typing Coach Logic
    const coachSuggestions: string[] = []
    if (accuracy < 90) {
        coachSuggestions.push("Focus on accuracy before speed.")
    }
    const mistypedChars = errors.map(i => snippet[i])
    const brackets = mistypedChars.filter(c => ['(', ')', '{', '}', '[', ']'].includes(c)).length
    if (brackets >= 2) {
        coachSuggestions.push("Practice typing brackets and parentheses.")
    }
    const semicolons = mistypedChars.filter(c => c === ';').length
    if (semicolons >= 2) {
        coachSuggestions.push("Watch out for those trailing semicolons.")
    }
    const operators = mistypedChars.filter(c => ['=', '+', '-', '*', '/', '<', '>'].includes(c)).length
    if (operators >= 2) {
        coachSuggestions.push("Slow down near operators.")
    }
    if (coachSuggestions.length === 0 && wpm > 40) {
        coachSuggestions.push("Form looks solid! Keep pushing your speed.")
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
            <div
                ref={modalRef}
                className="glass-panel p-8 md:p-10 max-w-xl w-full flex flex-col items-center border border-primary/20 shadow-[0_0_50px_rgba(0,255,157,0.1)] my-8"
            >
                <KeyboardIcon className="w-10 h-10 text-primary mb-4 opacity-50" />
                <h2 className="text-3xl font-black text-white mb-2 neon-text-primary tracking-wider uppercase">Test Complete</h2>
                {newPersonalBest && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold tracking-widest px-4 py-1.5 rounded-lg mb-4 animate-pulse flex items-center gap-1.5 uppercase font-mono">
                        🏆 New Personal Best!
                    </div>
                )}
                <p className={`text-lg font-bold mb-8 ${ratingColor}`}>{rating}</p>

                {/* 6-box Stats Grid */}
                <div className="grid grid-cols-3 gap-4 w-full mb-8">
                    <div className="flex flex-col items-center justify-center p-3 bg-surface rounded-xl border border-white/5">
                        <span className="text-secondary text-[9px] font-bold tracking-widest uppercase mb-1">WPM</span>
                        <span className="text-2xl font-black text-white neon-text-primary">{wpm}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 bg-surface rounded-xl border border-white/5">
                        <span className="text-secondary text-[9px] font-bold tracking-widest uppercase mb-1">Accuracy</span>
                        <span className="text-2xl font-black text-white">{accuracy}%</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 bg-surface rounded-xl border border-white/5">
                        <span className="text-secondary text-[9px] font-bold tracking-widest uppercase mb-1">Mistakes</span>
                        <span className={`text-2xl font-black ${errors.length > 0 ? 'text-error' : 'text-primary'}`}>{errors.length}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 bg-surface rounded-xl border border-white/5">
                        <span className="text-secondary text-[9px] font-bold tracking-widest uppercase mb-1">Raw WPM</span>
                        <span className="text-2xl font-black text-white">{rawWpm}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 bg-surface rounded-xl border border-white/5">
                        <span className="text-secondary text-[9px] font-bold tracking-widest uppercase mb-1">Consistency</span>
                        <span className="text-2xl font-black text-white">{consistency}%</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 bg-surface rounded-xl border border-white/5">
                        <span className="text-secondary text-[9px] font-bold tracking-widest uppercase mb-1">CPM</span>
                        <span className="text-2xl font-black text-neutral">{cpm}</span>
                    </div>
                </div>

                {/* Over-Time Graph */}
                {mounted && wpmTimeline && wpmTimeline.length > 0 && (
                    <div className="w-full bg-surface border border-white/5 rounded-xl p-4 mb-8">
                        <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2 opacity-80">
                            <span>📈</span> Performance Over Time
                        </h3>
                        <div className="w-full h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={wpmTimeline} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1c1c1c" />
                                    <XAxis dataKey="second" stroke="#555" fontSize={10} tickLine={false} />
                                    <YAxis stroke="#555" fontSize={10} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#222', borderRadius: '8px' }}
                                        labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                                        itemStyle={{ fontSize: '11px' }}
                                    />
                                    <Line type="monotone" dataKey="wpm" name="WPM" stroke="#00ff9d" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                                    <Line type="monotone" dataKey="raw" name="Raw WPM" stroke="#ff4444" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Typing Coach Feedback */}
                {coachSuggestions.length > 0 && (
                    <div className="w-full bg-surface-light/50 border border-primary/20 rounded-xl p-5 mb-8">
                        <h3 className="text-primary text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
                            <span>🤖</span> Typing Coach
                        </h3>
                        <ul className="list-disc list-inside text-sm text-neutral space-y-1.5 font-mono">
                            {coachSuggestions.map((suggestion, idx) => (
                                <li key={idx} className="leading-relaxed">{suggestion}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Replay Timeline */}
                {keystrokes && keystrokes.length > 0 && (
                    <div className="w-full bg-surface-light border border-white/5 rounded-xl p-4 mb-8">
                        <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2 opacity-80">
                            <span>⏱️</span> Keystroke Timeline
                        </h3>
                        <div className="relative h-2 bg-background rounded-full overflow-hidden w-full group border border-white/5">
                            <div className="absolute inset-0 bg-primary/20"></div>
                            {keystrokes.map((k, i) => {
                                if (!k.isError && k.key !== 'Backspace') return null;
                                const lastStroke = keystrokes[keystrokes.length - 1]
                                const totalTime = lastStroke && lastStroke.time > 0 ? lastStroke.time : 1;
                                const leftProc = Math.min(100, Math.max(0, (k.time / totalTime) * 100));
                                
                                return (
                                    <div 
                                        key={i} 
                                        className={`absolute top-0 bottom-0 w-1 ${k.key === 'Backspace' ? 'bg-yellow-500' : 'bg-error'} z-10 opacity-80 hover:opacity-100 transition-opacity cursor-crosshair hover:w-2`}
                                        style={{ left: `${leftProc}%` }}
                                        title={`${k.key === 'Backspace' ? 'Correction' : 'Error'} at ${(k.time/1000).toFixed(1)}s`}
                                    />
                                )
                            })}
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] text-neutral font-mono">
                            <span>0s (Start)</span>
                            <span className="flex items-center gap-2">
                                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-error rounded-full"></span> Error</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-yellow-500 rounded-full"></span> Backspace</span>
                            </span>
                            <span>{keystrokes[keystrokes.length - 1] ? (keystrokes[keystrokes.length - 1].time / 1000).toFixed(1) : 0}s (Finish)</span>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => setShowReplay(true)}
                    className="w-full py-3.5 rounded-lg bg-surface hover:bg-surface-light text-white font-bold tracking-widest border border-white/10 transition-all hover:border-primary/50 flex items-center justify-center gap-2 text-sm mb-4"
                >
                    <KeyboardIcon className="w-4 h-4 text-primary" />
                    WATCH REPLAY
                </button>

                <div className="flex w-full gap-3">
                    <button
                        onClick={resetTest}
                        className="flex-1 py-3.5 rounded-lg bg-surface hover:bg-surface-light text-white font-bold tracking-widest border border-white/10 transition-all hover:border-primary/50 flex items-center justify-center gap-2 text-sm"
                    >
                        <RotateCcwIcon className="w-4 h-4" />
                        TRY AGAIN
                    </button>
                    <button
                        onClick={resetTest}
                        className="flex-1 py-3.5 rounded-lg bg-primary hover:bg-primary/90 text-background font-black tracking-widest transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,255,157,0.3)] flex items-center justify-center gap-2 text-sm"
                    >
                        NEXT
                        <ArrowRightIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Replay Modal */}
            {showReplay && (
                <ReplayModal 
                    onClose={() => setShowReplay(false)} 
                    snippet={snippet} 
                    keystrokes={keystrokes} 
                    language={language}
                />
            )}
        </div>
    )
}
