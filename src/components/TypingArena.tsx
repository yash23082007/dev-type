"use client"

import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useTypingStore } from '../store/typingStore'
import { getCharTokenClasses } from '../lib/syntaxHighlight'
import { gsap } from 'gsap'

export function TypingArena() {
    const containerRef = useRef<HTMLDivElement>(null)
    const activeSpanRef = useRef<HTMLSpanElement>(null)
    const [tabPressed, setTabPressed] = useState(false)

    const snippet = useTypingStore(state => state.snippet)
    const language = useTypingStore(state => state.language)
    const mode = useTypingStore(state => state.mode)
    const inputCharIndex = useTypingStore(state => state.inputCharIndex)
    const errors = useTypingStore(state => state.errors)
    const status = useTypingStore(state => state.status)
    const handleKeydown = useTypingStore(state => state.handleKeydown)
    const resetTest = useTypingStore(state => state.resetTest)
    const fetchSnippet = useTypingStore(state => state.fetchSnippet)
    const getProgress = useTypingStore(state => state.getProgress)

    const progress = getProgress()

    const charClasses = useMemo(() => {
        return getCharTokenClasses(snippet, language)
    }, [snippet, language])

    const totalLines = useMemo(() => {
        return snippet.split('\n').length
    }, [snippet])

    const currentLineNumber = useMemo(() => {
        const textBeforeCursor = snippet.slice(0, inputCharIndex)
        return textBeforeCursor.split('\n').length
    }, [snippet, inputCharIndex])

    // Center scroll active line
    useEffect(() => {
        if (activeSpanRef.current && containerRef.current) {
            const spanEl = activeSpanRef.current
            const containerEl = containerRef.current
            const spanTop = spanEl.offsetTop
            const containerHeight = containerEl.clientHeight
            const scrollTop = spanTop - containerHeight / 2 + spanEl.clientHeight / 2
            
            containerEl.scrollTo({
                top: Math.max(0, scrollTop),
                behavior: 'smooth'
            })
        }
    }, [inputCharIndex])

    useEffect(() => {
        if (status === 'idle' && !snippet) {
            fetchSnippet()
        }
    }, [status, fetchSnippet, snippet])

    useEffect(() => {
        const handleGlobalKeydown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey || e.altKey) return

            // Prevent default for typing keys to avoid scrolling/navigation
            if (e.key === ' ' || e.key === 'Backspace' || (e.key.length === 1 && e.key !== 'Enter')) {
                const target = e.target as HTMLElement;
                if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                }
            }

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
                <div className="absolute -top-1 left-0 right-0 h-0.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className="bg-white h-full transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            )}

            <div
                ref={containerRef}
                className="glass-panel p-8 md:p-14 font-mono text-lg md:text-2xl tracking-normal leading-relaxed shadow-2xl relative outline-none border-white/[0.03] max-h-[360px] overflow-y-auto custom-scrollbar scroll-smooth"
                tabIndex={0}
            >
                {/* Line progress indicator */}
                {mode === 'file' && (
                    <div className="absolute top-4 left-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                        Line {currentLineNumber} / {totalLines}
                    </div>
                )}

                {/* Tab indicator */}
                {tabPressed && (
                    <div className="absolute top-4 right-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 animate-pulse">
                        press Enter to restart
                    </div>
                )}

                <div className="flex flex-wrap relative">
                    {snippet.split('').map((char, index) => {
                        let colorClass = "text-white/20"

                        if (index < inputCharIndex) {
                            if (errors.includes(index)) {
                                colorClass = "text-red-500 bg-red-500/10 rounded-sm"
                            } else {
                                colorClass = "text-white"
                            }
                        } else {
                            const tokenClass = charClasses[index]
                            if (tokenClass) {
                                colorClass = `${tokenClass} opacity-35`
                            }
                        }

                        const isCurrentChar = index === inputCharIndex

                        // Handle newlines as full-width breaks so code wraps beautifully
                        if (char === '\n') {
                            return (
                                <div 
                                    key={index} 
                                    ref={isCurrentChar ? activeSpanRef : null}
                                    className="w-full h-0 basis-full flex items-center relative"
                                >
                                    {isCurrentChar && status !== 'finished' && (
                                        <span className="absolute left-0 bottom-[-2px] w-2 h-4 bg-white animate-pulse rounded-sm block"></span>
                                    )}
                                </div>
                            )
                        }

                        return (
                            <span 
                                key={index} 
                                ref={isCurrentChar ? activeSpanRef : null}
                                className="relative"
                            >
                                {isCurrentChar && status !== 'finished' && (
                                    <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-white animate-pulse rounded-sm block"></span>
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

