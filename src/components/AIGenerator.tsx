"use client"

import React, { useState } from 'react'
import { SparklesIcon, Wand2Icon, Code2Icon, Loader2Icon } from 'lucide-react'
import { useTypingStore } from '../store/typingStore'

export function AIGenerator() {
    const [topic, setTopic] = useState('React Hooks')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const language = useTypingStore(s => s.language)
    const difficulty = useTypingStore(s => s.difficulty)
    const setCustomSnippet = useTypingStore(s => s.setCustomSnippet)

    const handleGenerate = async () => {
        if (!topic.trim()) return
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/snippets/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ language, difficulty, topic })
            })
            
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Generation failed')
            
            setCustomSnippet(data.content, language)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="glass-panel p-4 border border-secondary/20 hover:border-secondary/40 transition-colors">
            <div className="flex items-center gap-2 mb-3">
                <SparklesIcon className="w-4 h-4 text-secondary" />
                <h3 className="text-sm font-bold tracking-widest uppercase text-white">AI Generate Snippet</h3>
            </div>
            
            <div className="flex items-center gap-2 relative">
                <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Binary Search Tree"
                    maxLength={50}
                    className="flex-1 bg-surface border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-white placeholder:text-neutral/50 outline-none focus:border-secondary/50"
                />
                <button 
                    onClick={handleGenerate}
                    disabled={loading || !topic.trim()}
                    className="bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/30 rounded-lg px-4 py-2 text-sm font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                    {loading ? <Loader2Icon className="w-4 h-4 animate-spin" /> : <Wand2Icon className="w-4 h-4" />}
                    Generate
                </button>
            </div>
            
            {error && <p className="text-error text-xs mt-2 font-mono">{error}</p>}
        </div>
    )
}
