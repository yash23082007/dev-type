import React, { useState, useEffect, useMemo } from 'react'
import { Play, Pause, X, RotateCcw } from 'lucide-react'
import { getCharTokenClasses } from '../lib/syntaxHighlight'

interface Keystroke {
    key: string
    time: number
    isError: boolean
}

interface ReplayModalProps {
    onClose: () => void
    snippet: string
    keystrokes: Keystroke[]
    language: string
}

interface PlaybackState {
    charIndex: number
    errors: number[]
    wpm: number
    accuracy: number
    time: number
}

export function ReplayModal({ onClose, snippet, keystrokes, language }: ReplayModalProps) {
    const [stateIndex, setStateIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [speed, setSpeed] = useState<number>(1) // 0.5, 1, 2

    const charClasses = useMemo(() => {
        return getCharTokenClasses(snippet, language)
    }, [snippet, language])

    // Precompute states at each keystroke
    const playbackStates = useMemo(() => {
        const states: PlaybackState[] = [
            { charIndex: 0, errors: [], wpm: 0, accuracy: 100, time: 0 }
        ]
        let curIndex = 0
        let curErrors: number[] = []

        keystrokes.forEach((k) => {
            if (k.key === 'Backspace') {
                curIndex = Math.max(0, curIndex - 1)
                curErrors = curErrors.filter(e => e !== curIndex)
            } else if (k.key.length === 1) {
                if (k.key !== snippet[curIndex]) {
                    curErrors.push(curIndex)
                }
                curIndex++
            }

            const elapsedMinutes = k.time / 60000
            const correctChars = curIndex - curErrors.length
            const wpm = elapsedMinutes > 0 ? Math.max(0, Math.round((correctChars / 5) / elapsedMinutes)) : 0
            const accuracy = curIndex > 0 ? Math.max(0, Math.round(((curIndex - curErrors.length) / curIndex) * 100 * 10) / 10) : 100

            states.push({
                charIndex: curIndex,
                errors: [...curErrors],
                wpm,
                accuracy,
                time: k.time
            })
        })
        return states
    }, [snippet, keystrokes])

    const currentState = playbackStates[stateIndex] || playbackStates[playbackStates.length - 1]

    // Playback loop
    useEffect(() => {
        if (!isPlaying) return
        if (stateIndex >= keystrokes.length) {
            setIsPlaying(false)
            return
        }

        const currentStroke = keystrokes[stateIndex]
        const nextStroke = keystrokes[stateIndex + 1]
        
        // Time diff in milliseconds
        const timeDiff = nextStroke ? (nextStroke.time - currentStroke.time) : 100
        const delay = Math.max(10, Math.min(2000, timeDiff)) // bound delay

        const timer = setTimeout(() => {
            setStateIndex(prev => prev + 1)
        }, delay / speed)

        return () => clearTimeout(timer)
    }, [isPlaying, stateIndex, speed, keystrokes])

    const restartReplay = () => {
        setStateIndex(0)
        setIsPlaying(true)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm overflow-hidden">
            <div className="glass-panel p-6 md:p-8 max-w-3xl w-full flex flex-col border border-primary/20 shadow-[0_0_50px_rgba(0,255,157,0.15)] relative max-h-[90vh]">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-black text-white tracking-wider uppercase">Keystroke Replay</h2>
                        <p className="text-xs text-neutral">Keystroke {stateIndex} of {keystrokes.length}</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-neutral hover:text-white hover:bg-surface transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Live Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col items-center justify-center py-3 bg-surface rounded-xl border border-white/5">
                        <span className="text-secondary text-[10px] font-bold tracking-widest uppercase mb-0.5">WPM</span>
                        <span className="text-2xl font-black text-white neon-text-primary">{currentState.wpm}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-3 bg-surface rounded-xl border border-white/5">
                        <span className="text-secondary text-[10px] font-bold tracking-widest uppercase mb-0.5">Accuracy</span>
                        <span className="text-2xl font-black text-white">{currentState.accuracy}%</span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-3 bg-surface rounded-xl border border-white/5">
                        <span className="text-secondary text-[10px] font-bold tracking-widest uppercase mb-0.5">Time</span>
                        <span className="text-2xl font-black text-neutral">{(currentState.time / 1000).toFixed(1)}s</span>
                    </div>
                </div>

                {/* Arena View */}
                <div className="flex-1 overflow-y-auto mb-6 bg-surface/50 border border-white/5 rounded-xl p-6 font-mono text-lg md:text-xl tracking-normal leading-relaxed relative min-h-[150px] custom-scrollbar">
                    <div className="flex flex-wrap relative">
                        {snippet.split('').map((char, index) => {
                            let colorClass = "text-white/20"

                            if (index < currentState.charIndex) {
                                if (currentState.errors.includes(index)) {
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

                            const isCurrentChar = index === currentState.charIndex

                            if (char === '\n') {
                                return (
                                    <div key={index} className="w-full h-0 basis-full flex items-center relative">
                                        {isCurrentChar && (
                                            <span className="absolute left-0 bottom-[-2px] w-2 h-4 bg-white animate-pulse rounded-sm block"></span>
                                        )}
                                    </div>
                                )
                            }

                            return (
                                <span key={index} className="relative">
                                    {isCurrentChar && (
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

                {/* Scrubber / Slider */}
                <div className="w-full mb-6">
                    <input 
                        type="range" 
                        min={0} 
                        max={keystrokes.length} 
                        value={stateIndex} 
                        onChange={e => setStateIndex(Number(e.target.value))} 
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary" 
                    />
                </div>

                {/* Controls */}
                <div className="flex justify-between items-center gap-4">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="p-3 bg-primary hover:bg-primary/90 text-background rounded-lg font-bold transition-all flex items-center justify-center"
                        >
                            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                        </button>
                        <button
                            onClick={restartReplay}
                            className="p-3 bg-surface border border-white/10 hover:border-white/20 text-white rounded-lg font-bold transition-all flex items-center justify-center"
                            title="Restart"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Speed Controls */}
                    <div className="flex bg-surface border border-white/5 p-1 rounded-lg">
                        {[0.5, 1, 2].map((s) => (
                            <button
                                key={s}
                                onClick={() => setSpeed(s)}
                                className={`px-3 py-1.5 text-xs font-black rounded-md tracking-wider transition-all uppercase ${
                                    speed === s ? 'bg-white text-black' : 'text-neutral hover:text-white'
                                }`}
                            >
                                {s}x
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

