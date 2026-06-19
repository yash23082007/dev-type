"use client"

import React, { useMemo } from 'react'

interface KeyboardHeatmapProps {
    errors: number[]
    snippet: string
    keystrokes?: { key: string; time: number; isError: boolean }[]
}

const KEYBOARD_ROWS = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
]

const SPECIAL_DISPLAY: Record<string, string> = {
    '`': '`', '-': '-', '=': '=', '[': '[', ']': ']', '\\': '\\',
    ';': ';', "'": "'", ',': ',', '.': '.', '/': '/',
}

const SYMBOL_KEYS = new Set(['{', '}', '[', ']', '(', ')', '<', '>', ';', ':', '=', "'", '"', '`', '\\', '/', '.', ',', '-', '+', '*', '&', '|', '!', '?', '@', '#', '$', '%', '^', '~'])

export function KeyboardHeatmap({ errors, snippet, keystrokes }: KeyboardHeatmapProps) {
    // Count errors per character
    const errorMap = useMemo(() => {
        const map: Record<string, number> = {}
        errors.forEach(index => {
            const expectedChar = snippet[index]?.toLowerCase()
            if (expectedChar) {
                map[expectedChar] = (map[expectedChar] || 0) + 1
            }
        })
        return map
    }, [errors, snippet])

    // Calculate timing per key from keystrokes
    const timingMap = useMemo(() => {
        if (!keystrokes || keystrokes.length < 2) return {}
        const timings: Record<string, number[]> = {}
        
        for (let i = 1; i < keystrokes.length; i++) {
            const key = keystrokes[i].key.toLowerCase()
            if (key.length === 1) {
                const delta = keystrokes[i].time - keystrokes[i - 1].time
                if (delta > 0 && delta < 3000) { // ignore outliers
                    if (!timings[key]) timings[key] = []
                    timings[key].push(delta)
                }
            }
        }

        const avgTimings: Record<string, number> = {}
        Object.entries(timings).forEach(([char, list]) => {
            avgTimings[char] = Math.round(list.reduce((a, b) => a + b, 0) / list.length)
        })
        return avgTimings
    }, [keystrokes])

    const maxErrors = Math.max(...Object.values(errorMap), 1)

    const getKeyColor = (key: string) => {
        const lowerKey = key.toLowerCase()
        const errorCount = errorMap[lowerKey] || 0
        
        if (errorCount === 0) {
            // No errors — green tint for typed keys, neutral for untyped
            const wasTyped = keystrokes?.some(k => k.key.toLowerCase() === lowerKey)
            if (wasTyped) {
                return {
                    bg: 'rgba(0, 255, 157, 0.12)',
                    border: 'rgba(0, 255, 157, 0.25)',
                    text: 'rgba(0, 255, 157, 0.8)',
                }
            }
            return {
                bg: 'rgba(255, 255, 255, 0.03)',
                border: 'rgba(255, 255, 255, 0.08)',
                text: 'rgba(255, 255, 255, 0.25)',
            }
        }
        
        // Error gradient: yellow → orange → red
        const intensity = Math.min(errorCount / maxErrors, 1)
        if (intensity < 0.33) {
            return {
                bg: `rgba(250, 204, 21, ${0.1 + intensity * 0.3})`,
                border: `rgba(250, 204, 21, ${0.2 + intensity * 0.3})`,
                text: 'rgba(250, 204, 21, 0.9)',
            }
        } else if (intensity < 0.66) {
            return {
                bg: `rgba(251, 146, 60, ${0.15 + intensity * 0.3})`,
                border: `rgba(251, 146, 60, ${0.25 + intensity * 0.3})`,
                text: 'rgba(251, 146, 60, 0.9)',
            }
        } else {
            return {
                bg: `rgba(239, 68, 68, ${0.15 + intensity * 0.35})`,
                border: `rgba(239, 68, 68, ${0.3 + intensity * 0.3})`,
                text: 'rgba(239, 68, 68, 0.95)',
                shadow: `0 0 ${8 + intensity * 12}px rgba(239, 68, 68, ${intensity * 0.3})`,
            }
        }
    }

    const totalErrors = Object.values(errorMap).reduce((a, b) => a + b, 0)
    
    // Find top 3 worst keys
    const worstKeys = Object.entries(errorMap)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)

    return (
        <div className="w-full">
            <div className="flex flex-col items-center gap-1.5 mb-4">
                {KEYBOARD_ROWS.map((row, rowIndex) => (
                    <div 
                        key={rowIndex} 
                        className="flex gap-1"
                        style={{ paddingLeft: `${rowIndex * 10}px` }}
                    >
                        {row.map(key => {
                            const colors = getKeyColor(key)
                            const errorCount = errorMap[key.toLowerCase()] || 0
                            const timing = timingMap[key.toLowerCase()]
                            const isSymbol = SYMBOL_KEYS.has(key)
                            
                            return (
                                <div 
                                    key={key} 
                                    className={`relative flex flex-col items-center justify-center rounded-md font-mono transition-all select-none group ${
                                        isSymbol ? 'w-8 h-8' : 'w-7 h-7'
                                    }`}
                                    style={{
                                        backgroundColor: colors.bg,
                                        borderWidth: '1px',
                                        borderStyle: 'solid',
                                        borderColor: colors.border,
                                        color: colors.text,
                                        boxShadow: (colors as any).shadow || 'none',
                                    }}
                                    title={`${key.toUpperCase()}${errorCount > 0 ? ` — ${errorCount} error${errorCount > 1 ? 's' : ''}` : ''}${timing ? ` — ${timing}ms avg` : ''}`}
                                >
                                    <span className="text-[9px] font-bold uppercase leading-none">
                                        {SPECIAL_DISPLAY[key] || key}
                                    </span>
                                    {errorCount > 0 && (
                                        <span className="text-[6px] font-black leading-none mt-0.5 opacity-70">
                                            {errorCount}
                                        </span>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                ))}
                
                {/* Space bar */}
                <div className="flex gap-1" style={{ paddingLeft: '30px' }}>
                    <div 
                        className="h-7 rounded-md font-mono flex items-center justify-center select-none"
                        style={{
                            width: '180px',
                            ...(() => {
                                const colors = getKeyColor(' ')
                                return {
                                    backgroundColor: colors.bg,
                                    borderWidth: '1px',
                                    borderStyle: 'solid' as const,
                                    borderColor: colors.border,
                                    color: colors.text,
                                }
                            })(),
                        }}
                    >
                        <span className="text-[8px] font-bold uppercase tracking-widest opacity-40">space</span>
                    </div>
                </div>
            </div>

            {/* Legend & worst keys */}
            <div className="flex items-center justify-between mt-3">
                <div className="flex gap-3 text-[8px] font-mono text-white/40">
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-sm bg-[rgba(0,255,157,0.12)] border border-[rgba(0,255,157,0.25)]"></span>
                        Clean
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-sm bg-[rgba(250,204,21,0.2)] border border-[rgba(250,204,21,0.3)]"></span>
                        Some errors
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-sm bg-[rgba(239,68,68,0.3)] border border-[rgba(239,68,68,0.4)]"></span>
                        Many errors
                    </span>
                </div>
                
                {worstKeys.length > 0 && (
                    <div className="flex items-center gap-2 text-[9px] font-mono">
                        <span className="text-white/30">Weak keys:</span>
                        {worstKeys.map(([key, count]) => (
                            <span key={key} className="px-1.5 py-0.5 bg-error/15 text-error/80 rounded border border-error/20 font-bold">
                                {key === ' ' ? '␣' : key.toUpperCase()} ({count})
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
