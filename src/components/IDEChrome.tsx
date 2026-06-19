"use client"

import React from 'react'
import { useTypingStore } from '@/store/typingStore'

const LANG_FILE_MAP: Record<string, { file: string; icon: string }> = {
    javascript: { file: 'snippet.js', icon: '⟨⟩' },
    python: { file: 'solution.py', icon: '🐍' },
    html: { file: 'index.html', icon: '🌐' },
    cpp: { file: 'main.cpp', icon: '⚙️' },
    english: { file: 'README.md', icon: '📝' },
}

const LANG_COLORS: Record<string, string> = {
    javascript: '#F7DF1E',
    python: '#3776AB',
    html: '#E34F26',
    cpp: '#00599C',
    english: '#00FF9D',
}

interface IDEChromeProps {
    children: React.ReactNode
}

export function IDEChrome({ children }: IDEChromeProps) {
    const language = useTypingStore(state => state.language)
    const snippet = useTypingStore(state => state.snippet)
    const inputCharIndex = useTypingStore(state => state.inputCharIndex)
    
    const langInfo = LANG_FILE_MAP[language] || LANG_FILE_MAP['javascript']
    const langColor = LANG_COLORS[language] || '#00FF9D'
    
    const lineCount = snippet ? snippet.split('\n').length : 0
    const currentLine = snippet ? snippet.slice(0, inputCharIndex).split('\n').length : 1

    return (
        <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#0a0a0a] shadow-2xl shadow-black/50">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#111111] border-b border-white/[0.04]">
                {/* Traffic light dots */}
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d4a123]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]"></div>
                    </div>
                </div>
                
                {/* File tab */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.04] rounded-md border border-white/[0.06]">
                        <span className="text-[10px]">{langInfo.icon}</span>
                        <span className="text-xs font-mono font-medium text-white/70">{langInfo.file}</span>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: langColor }}></div>
                    </div>
                </div>

                {/* Right side info */}
                <div className="flex items-center gap-3">
                    <span className="text-[9px] font-mono text-white/25 uppercase tracking-wider">
                        Ln {currentLine} / {lineCount}
                    </span>
                    <span className="text-[9px] font-mono text-white/25 uppercase tracking-wider">
                        UTF-8
                    </span>
                </div>
            </div>

            {/* Editor body with gutter */}
            <div className="flex relative">
                {/* Line numbers gutter */}
                <div className="flex-shrink-0 py-8 pl-3 pr-1 select-none bg-[#090909] border-r border-white/[0.03]">
                    {snippet && snippet.split('\n').map((_, i) => (
                        <div 
                            key={i} 
                            className={`text-[11px] font-mono text-right pr-2 leading-relaxed w-8 transition-colors duration-150 ${
                                i + 1 === currentLine 
                                    ? 'text-white/50' 
                                    : 'text-white/15'
                            }`}
                            style={{ lineHeight: 'inherit' }}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>

                {/* Main content area */}
                <div className="flex-1 min-w-0">
                    {children}
                </div>

                {/* Minimap (decorative) */}
                <div className="hidden md:block w-[40px] flex-shrink-0 py-4 px-1.5 bg-[#090909] border-l border-white/[0.03] relative overflow-hidden">
                    {snippet && snippet.split('\n').slice(0, 30).map((line, i) => (
                        <div 
                            key={i}
                            className="h-[3px] mb-[1px] rounded-[0.5px] transition-opacity"
                            style={{ 
                                width: `${Math.min(100, (line.length / 60) * 100)}%`,
                                backgroundColor: i + 1 === currentLine ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.06)',
                            }}
                        />
                    ))}
                    {/* Current position indicator */}
                    <div 
                        className="absolute left-0 right-0 h-3 bg-white/[0.04] border border-white/[0.06] rounded-sm transition-all duration-300"
                        style={{ 
                            top: `${Math.max(16, (currentLine / Math.max(lineCount, 1)) * 100)}%`,
                        }}
                    />
                </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-1.5 bg-[#111111] border-t border-white/[0.04]">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse"></div>
                        <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider">DevType</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-[9px] font-mono text-white/25 capitalize">{language}</span>
                    <span className="text-[9px] font-mono text-white/25">Spaces: 2</span>
                </div>
            </div>
        </div>
    )
}
