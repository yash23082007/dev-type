"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useTypingStore } from '../store/typingStore'
import { gsap } from 'gsap'

export function TypingArena() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [tabPressed, setTabPressed] = useState(false)

    const snippet = useTypingStore(state => state.snippet)
    const inputCharIndex = useTypingStore(state => state.inputCharIndex)
    const errors = useTypingStore(state => state.errors)
    const status = useTypingStore(state => state.status)
    const handleKeydown = useTypingStore(state => state.handleKeydown)
    const resetTest = useTypingStore(state => state.resetTest)
    const fetchSnippet = useTypingStore(state => state.fetchSnippet)
    const getProgress = useTypingStore(state => state.getProgress)

    const progress = getProgress()

    useEffect(() => {
        if (status === 'idle') {
            fetchSnippet()
        }
    }, [status, fetchSnippet])

    useEffect(() => {
        const handleGlobalKeydown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey || e.altKey) return

            // Tab+Enter restart
            if (e.key === 'Tab') {
                e.preventDefault()
                setTabPressed(true)
                setTimeout(() => setTabPressed(false), 1500)
                return
            }

            if (e.key === 'Enter') {
                e.preventDefault()
                if (tabPressed) {
                    setTabPressed(false)
                    resetTest()
                }
                return
            }

            handleKeydown(e.key)

            // Error shake animation
            const currentState = useTypingStore.getState()
            if (e.key.length === 1) {
                const prevIndex = currentState.inputCharIndex - 1
                if (prevIndex >= 0 && currentState.errors.includes(prevIndex)) {
                    if (containerRef.current) {
                        gsap.fromTo(containerRef.current,
                            { x: -4 },
                            {
                                x: 4, duration: 0.05, yoyo: true, repeat: 3, ease: 'power1.inOut',
                                onComplete: () => {
                                    gsap.set(containerRef.current, { x: 0 })
                                }
                            }
                        )
                    }
                }
            }
        }

        if (status === 'running' || status === 'idle') {
            window.addEventListener('keydown', handleGlobalKeydown)
        }

        return () => {
            window.removeEventListener('keydown', handleGlobalKeydown)
        }
    }, [status, handleKeydown, tabPressed, resetTest])

    // Intro Animation
    useEffect(() => {
        if (containerRef.current) {
            gsap.from(containerRef.current, {
                duration: 1,
                y: 40,
                opacity: 0,
                scale: 0.98,
                ease: "back.out(1.5)"
            })
        }
    }, [])

    if (!snippet) {
        return (
            <div className="glass-panel p-8 md:p-12 animate-shimmer">
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="h-6 bg-white/5 rounded" style={{ width: `${(i * 13 % 60) + 30}px` }}></div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="relative">
            {/* Progress bar */}
            {status === 'running' && (
                <div className="absolute -top-1 left-0 right-0 h-1 bg-surface rounded-full overflow-hidden">
                    <div
                        className="progress-bar h-full rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            )}

            <div
                ref={containerRef}
                className="glass-panel p-8 md:p-12 font-mono text-lg md:text-2xl tracking-wide leading-relaxed shadow-2xl relative outline-none"
                tabIndex={0}
            >
                {/* Tab indicator */}
                {tabPressed && (
                    <div className="absolute top-3 right-4 text-xs font-mono text-primary animate-pulse">
                        press Enter to restart
                    </div>
                )}

                <div className="flex flex-wrap relative">
                    {snippet.split('').map((char, index) => {
                        let colorClass = "text-[var(--color-text-neutral)]"

                        if (index < inputCharIndex) {
                            if (errors.includes(index)) {
                                colorClass = "text-red-500 bg-red-500/20 neon-text-error rounded-sm border-b-2 border-red-500"
                            } else {
                                colorClass = "text-white neon-text-primary"
                            }
                        }

                        const isCurrentChar = index === inputCharIndex

                        return (
                            <span key={index} className="relative">
                                {isCurrentChar && status !== 'finished' && (
                                    <span className="absolute left-0 bottom-0 w-full h-[3px] bg-primary animate-pulse-fast rounded-sm block" style={{ boxShadow: '0 0 8px rgba(0,255,157,0.6)' }}></span>
                                )}
                                <span className={`transition-colors duration-100 ease-out select-none ${colorClass}`}>
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            </span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
