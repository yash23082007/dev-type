"use client"

import React, { useEffect, useRef } from 'react'
import { useTypingStore } from '../store/typingStore'
import { gsap } from 'gsap'

export function MetricsHUD() {
    const containerRef = useRef<HTMLDivElement>(null)

    const wpm = useTypingStore(state => state.getWPM())
    const accuracy = useTypingStore(state => state.getAccuracy())
    const timeRemaining = useTypingStore(state => state.timeRemaining)
    const status = useTypingStore(state => state.status)
    const tickTime = useTypingStore(state => state.tickTime)
    const errors = useTypingStore(state => state.errors)

    useEffect(() => {
        let timerId: NodeJS.Timeout
        if (status === 'running') {
            timerId = setInterval(() => {
                tickTime()
            }, 1000)
        }
        return () => clearInterval(timerId)
    }, [status, tickTime])

    useEffect(() => {
        if (containerRef.current) {
            gsap.from(containerRef.current.children, {
                duration: 0.8,
                y: -30,
                opacity: 0,
                stagger: 0.15,
                ease: "power3.out"
            })
        }
    }, [])

    const isRunning = status === 'running'

    return (
        <div ref={containerRef} className="flex flex-row gap-6 mb-8 justify-between items-end w-full max-w-4xl mx-auto">
            <div className="flex gap-6 md:gap-8">
                <div className="flex flex-col">
                    <span className="text-secondary text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1">WPM</span>
                    <span className={`text-4xl md:text-5xl font-black ${isRunning ? 'neon-text-primary text-white' : 'text-neutral/30'}`}>
                        {isRunning ? wpm : '--'}
                    </span>
                </div>

                <div className="flex flex-col">
                    <span className="text-secondary text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1">ACC</span>
                    <span className={`text-4xl md:text-5xl font-black ${isRunning ? 'text-white' : 'text-neutral/30'}`}>
                        {isRunning ? `${accuracy}%` : '--%'}
                    </span>
                </div>

                <div className="flex flex-col">
                    <span className="text-secondary text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1">Errors</span>
                    <span className={`text-4xl md:text-5xl font-black ${errors.length > 0 ? 'text-error neon-text-error' : isRunning ? 'text-white' : 'text-neutral/30'}`}>
                        {isRunning ? errors.length : '--'}
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-end">
                <span className="text-secondary text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1">Time</span>
                <span className={`text-3xl md:text-4xl font-black tabular-nums ${
                    isRunning && timeRemaining <= 10 
                        ? 'text-error neon-text-error animate-pulse' 
                        : isRunning 
                            ? 'text-neutral' 
                            : 'text-neutral/30'
                }`}>
                    {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                </span>
            </div>
        </div>
    )
}
