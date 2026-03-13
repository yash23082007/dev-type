"use client"

import React, { useState } from 'react'
import { FileCodeIcon, CheckIcon } from 'lucide-react'
import { useTypingStore } from '../store/typingStore'

export function CustomPaster() {
    const [code, setCode] = useState('')
    const language = useTypingStore(s => s.language)
    const setCustomSnippet = useTypingStore(s => s.setCustomSnippet)

    const handleApply = () => {
        if (!code.trim()) return
        setCustomSnippet(code, language)
        setCode('')
    }

    return (
        <div className="glass-panel p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
                <FileCodeIcon className="w-4 h-4 text-neutral" />
                <h3 className="text-sm font-bold tracking-widest uppercase text-white">Custom Code Mode</h3>
            </div>
            
             <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste code here to practice it..."
                className="w-full h-24 bg-surface border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-white placeholder:text-neutral/50 outline-none focus:border-primary/50 resize-none custom-scrollbar mb-2"
            />
            
            <button 
                onClick={handleApply}
                disabled={!code.trim()}
                className="w-full bg-surface border border-white/10 hover:border-white/30 text-white rounded-lg px-4 py-2 text-sm font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
                <CheckIcon className="w-4 h-4" />
                Practice Code
            </button>
        </div>
    )
}
