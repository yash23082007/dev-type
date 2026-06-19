"use client"

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { useTypingStore } from '../store/typingStore'
import { getCharTokenClasses } from '../lib/syntaxHighlight'
import { gsap } from 'gsap'

export function TypingArena() {
    const containerRef = useRef<HTMLDivElement>(null)
    const caretRef = useRef<HTMLDivElement>(null)
    const activeSpanRef = useRef<HTMLSpanElement>(null)
    const [tabPressed, setTabPressed] = useState(false)
    const [isFocused, setIsFocused] = useState(true)

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
    const paceCaretWpm = useTypingStore(state => state.paceCaretWpm)
    const startTime = useTypingStore(state => state.startTime)

    const [paceIndex, setPaceIndex] = useState<number | null>(null)

    useEffect(() => {
        if (status !== 'running' || !startTime || paceCaretWpm === null) {
            return
        }

        const interval = setInterval(() => {
            const elapsedSeconds = (Date.now() - startTime) / 1000
            const index = Math.floor((elapsedSeconds / 60) * (paceCaretWpm * 5))
            setPaceIndex(index)
        }, 100)

        return () => clearInterval(interval)
    }, [status, startTime, paceCaretWpm])

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

    // Smooth caret positioning
    useEffect(() => {
        if (activeSpanRef.current && caretRef.current) {
            const span = activeSpanRef.current
            const caret = caretRef.current
            const rect = span.getBoundingClientRect()
            const containerRect = containerRef.current?.getBoundingClientRect()
            
            if (containerRect) {
                const left = rect.left - containerRect.left
                const top = rect.top - containerRect.top
                
                caret.style.transform = `translate(${left}px, ${top}px)`
                caret.style.height = `${rect.height}px`
            }
        }
    }, [inputCharIndex, snippet])

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

    // Focus/blur detection
    useEffect(() => {
        const handleFocus = () => setIsFocused(true)
        const handleBlur = () => {
            if (status === 'running') setIsFocused(false)
        }
        
        window.addEventListener('focus', handleFocus)
        window.addEventListener('blur', handleBlur)
        
        return () => {
            window.removeEventListener('focus', handleFocus)
            window.removeEventListener('blur', handleBlur)
        }
    }, [status])

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

            // Re-focus on keypress if unfocused
            if (!isFocused) {
                setIsFocused(true)
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
    }, [status, handleKeydown, tabPressed, resetTest, isFocused])

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
            <div className="p-8 md:p-12 animate-shimmer">
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
                <div className="absolute -top-1 left-0 right-0 h-0.5 bg-white/5 rounded-full overflow-hidden z-10">
                    <div
                        className="bg-white h-full transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            )}

            {/* Out-of-focus overlay */}
            {!isFocused && status === 'running' && (
                <div 
                    className="absolute inset-0 z-20 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-lg cursor-pointer"
                    onClick={() => setIsFocused(true)}
                >
                    <div className="text-center">
                        <p className="text-white/60 font-mono text-sm mb-1">Click to resume</p>
                        <p className="text-white/30 font-mono text-xs">or press any key</p>
                    </div>
                </div>
            )}

            <div
                ref={containerRef}
                className="p-8 md:p-10 font-mono text-lg md:text-xl tracking-normal leading-[1.8] relative outline-none max-h-[360px] overflow-y-auto custom-scrollbar scroll-smooth bg-transparent"
                tabIndex={0}
                onClick={() => setIsFocused(true)}
            >
                {/* Smooth animated caret */}
                {status !== 'finished' && (
                    <div 
                        ref={caretRef}
                        className="absolute w-[2px] bg-white rounded-full z-10 pointer-events-none transition-transform duration-75 ease-out"
                        style={{ 
                            boxShadow: '0 0 8px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.1)',
                        }}
                    >
                        <div className="w-full h-full bg-white rounded-full animate-caret-blink"></div>
                    </div>
                )}

                {/* Tab indicator */}
                {tabPressed && (
                    <div className="absolute top-4 right-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 animate-pulse z-20">
                        press Enter to restart
                    </div>
                )}

                <div className="flex flex-wrap relative">
                    {snippet.split('').map((char, index) => {
                        let colorClass = "text-white/20"
                        let extraClass = ""

                        if (index < inputCharIndex) {
                            if (errors.includes(index)) {
                                // Error: keep token color hint + red indicator
                                const tokenClass = charClasses[index]
                                colorClass = "text-red-400"
                                extraClass = "bg-red-500/15 rounded-sm underline decoration-red-500/60 decoration-2 underline-offset-2"
                            } else {
                                // Correctly typed: show FULL syntax color (the key differentiator)
                                const tokenClass = charClasses[index]
                                if (tokenClass) {
                                    colorClass = `${tokenClass} opacity-100`
                                } else {
                                    colorClass = "text-white"
                                }
                            }
                        } else {
                            // Untyped: show syntax color at low opacity
                            const tokenClass = charClasses[index]
                            if (tokenClass) {
                                colorClass = `${tokenClass} opacity-30`
                            }
                        }

                        const isCurrentChar = index === inputCharIndex
                        const isPaceChar = index === paceIndex

                        // Handle newlines as full-width breaks
                        if (char === '\n') {
                            return (
                                <div 
                                    key={index} 
                                    ref={isCurrentChar ? activeSpanRef : null}
                                    className="w-full h-0 basis-full flex items-center relative"
                                >
                                    {isPaceChar && status === 'running' && (
                                        <span className="absolute left-0 bottom-[-2px] w-2 h-4 bg-secondary opacity-40 animate-pulse rounded-sm block pointer-events-none"></span>
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
                                {isPaceChar && status === 'running' && (
                                    <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-secondary opacity-40 animate-pulse rounded-sm block pointer-events-none"></span>
                                )}
                                <span className={`select-none transition-colors duration-75 ease-out ${colorClass} ${extraClass}`}>
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
