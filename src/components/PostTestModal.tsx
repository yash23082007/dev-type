"use client"

import React, { useEffect, useRef } from 'react'
import { useTypingStore } from '../store/typingStore'
import { gsap } from 'gsap'
import { RotateCcwIcon, ArrowRightIcon, KeyboardIcon } from 'lucide-react'

export function PostTestModal() {
    const modalRef = useRef<HTMLDivElement>(null)

    const status = useTypingStore(state => state.status)
    const wpm = useTypingStore(state => state.getWPM())
    const accuracy = useTypingStore(state => state.getAccuracy())
    const inputCharIndex = useTypingStore(state => state.inputCharIndex)
    const errors = useTypingStore(state => state.errors)
    const timeLimit = useTypingStore(state => state.timeLimit)
    const timeRemaining = useTypingStore(state => state.timeRemaining)
    const resetTest = useTypingStore(state => state.resetTest)

    const timeTaken = timeLimit - timeRemaining
    const cpm = timeTaken > 0 ? Math.round((inputCharIndex / timeTaken) * 60) : inputCharIndex

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <div
                ref={modalRef}
                className="glass-panel p-10 max-w-lg w-full flex flex-col items-center border border-primary/20 shadow-[0_0_50px_rgba(0,255,157,0.1)]"
            >
                <KeyboardIcon className="w-10 h-10 text-primary mb-4 opacity-50" />
                <h2 className="text-3xl font-black text-white mb-2 neon-text-primary tracking-wider uppercase">Test Complete</h2>
                <p className={`text-lg font-bold mb-8 ${ratingColor}`}>{rating}</p>

                <div className="grid grid-cols-2 gap-4 w-full mb-8">
                    <div className="flex flex-col items-center justify-center p-5 bg-surface rounded-xl border border-white/5">
                        <span className="text-secondary text-[10px] font-bold tracking-widest uppercase mb-1">WPM</span>
                        <span className="text-5xl font-black text-white neon-text-primary">{wpm}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-5 bg-surface rounded-xl border border-white/5">
                        <span className="text-secondary text-[10px] font-bold tracking-widest uppercase mb-1">Accuracy</span>
                        <span className="text-5xl font-black text-white">{accuracy}%</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-surface rounded-xl border border-white/5">
                        <span className="text-secondary text-[10px] font-bold tracking-widest uppercase mb-1">CPM</span>
                        <span className="text-3xl font-black text-neutral">{cpm}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-surface rounded-xl border border-white/5">
                        <span className="text-secondary text-[10px] font-bold tracking-widest uppercase mb-1">Mistakes</span>
                        <span className={`text-3xl font-black ${errors.length > 0 ? 'text-error' : 'text-primary'}`}>{errors.length}</span>
                    </div>
                </div>

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
        </div>
    )
}
