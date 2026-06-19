"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useTypingStore } from '@/store/typingStore'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Code2Icon, SearchIcon, FilterIcon, ChevronRightIcon, XIcon, CopyIcon, CheckIcon, Loader2Icon, ThumbsUpIcon } from 'lucide-react'

interface Snippet {
    id: string
    content: string
    language: string
    difficulty: string
    category: string
    quality: string
    votes: number
    timesUsed: number
    description: string | null
}

const LANG_COLORS: Record<string, string> = {
    javascript: '#F7DF1E',
    python: '#3776AB',
    html: '#E34F26',
    cpp: '#00599C',
    english: '#00FF9D',
}

export default function SnippetsPage() {
    const router = useRouter()
    const [snippets, setSnippets] = useState<Snippet[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null)
    const [copied, setCopied] = useState(false)

    // Filter states
    const [search, setSearch] = useState('')
    const [selectedLanguage, setSelectedLanguage] = useState('all')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [sort, setSort] = useState('newest') // newest, votes, used

    useEffect(() => {
        let isMounted = true

        const fetchSnippets = async () => {
            setLoading(true)
            try {
                const query = `/api/snippets/browse?language=${selectedLanguage}&category=${selectedCategory}&search=${encodeURIComponent(search)}&sort=${sort}`
                const res = await fetch(query)
                const data = await res.json()
                if (isMounted) {
                    setSnippets(Array.isArray(data) ? data : [])
                    setLoading(false)
                }
            } catch (err) {
                console.error("Failed to load snippets", err)
                if (isMounted) setLoading(false)
            }
        }

        const debounce = setTimeout(fetchSnippets, 250)
        return () => {
            isMounted = false
            clearTimeout(debounce)
        }
    }, [selectedLanguage, selectedCategory, search, sort])

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handlePractice = (snippet: Snippet) => {
        // Increment snippet usage count (fire and forget)
        fetch(`/api/snippets/${snippet.id}/use`, { method: 'POST' }).catch(() => {})

        useTypingStore.setState({
            snippet: snippet.content,
            language: snippet.language,
            difficulty: snippet.difficulty,
            snippetId: snippet.id,
            status: 'idle',
            mode: snippet.category === 'file' ? 'file' : 'normal',
            startTime: null,
            inputCharIndex: 0,
            errors: [],
            keystrokes: [],
            wpmTimeline: [],
            failed: false
        })
        router.push('/')
    }

    const handleVote = async (snippetId: string, direction: 1 | -1) => {
        try {
            const res = await fetch('/api/snippets/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ snippetId, direction })
            })
            if (res.ok) {
                const updated = await res.json()
                setSnippets(prev => prev.map(s => s.id === snippetId ? { ...s, votes: updated.votes } : s))
                if (selectedSnippet && selectedSnippet.id === snippetId) {
                    setSelectedSnippet(prev => prev ? { ...prev, votes: updated.votes } : null)
                }
            } else {
                const err = await res.json()
                alert(err.error || 'Failed to submit vote')
            }
        } catch (e) {
            console.error('Failed to submit vote', e)
        }
    }

    return (
        <main className="min-h-screen bg-background text-white">
            <Navbar />
            <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <h1 className="text-7xl font-black tracking-tighter mb-6 leading-[0.9]">EXPLORE<br />SNIPPETS</h1>
                        <p className="text-text-muted text-xl max-w-2xl font-medium font-mono uppercase tracking-wider">Explore developer code blocks for technical practice.</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="relative group">
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
                            <input 
                                type="text" 
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search syntax..." 
                                className="bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-primary/50 w-64 transition-all"
                            />
                        </div>
                        
                        <div className="flex bg-surface border border-white/5 p-1 rounded-lg">
                            {['newest', 'votes', 'used'].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setSort(s)}
                                    className={`px-3 py-1.5 text-[10px] font-black rounded-md tracking-wider transition-all uppercase ${
                                        sort === s ? 'bg-white text-black' : 'text-neutral hover:text-white'
                                    }`}
                                >
                                    {s === 'newest' ? 'New' : s === 'votes' ? 'Popular' : 'Practiced'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Filter chip groups */}
                <div className="flex flex-col gap-4 mb-10">
                    <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-[10px] font-bold text-neutral uppercase tracking-widest mr-2 font-mono">Languages:</span>
                        {['ALL', 'JAVASCRIPT', 'PYTHON', 'HTML', 'CPP', 'ENGLISH'].map(lang => (
                            <button 
                                key={lang} 
                                onClick={() => setSelectedLanguage(lang.toLowerCase())}
                                className={`px-4 py-1.5 rounded-lg text-[9px] font-bold tracking-widest transition-all uppercase ${
                                    selectedLanguage === lang.toLowerCase() ? 'bg-primary text-background' : 'bg-white/5 text-text-muted hover:text-white'
                                }`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-[10px] font-bold text-neutral uppercase tracking-widest mr-2 font-mono">Categories:</span>
                        {['ALL', 'CODING', 'LEETCODE', 'FILE'].map(cat => (
                            <button 
                                key={cat} 
                                onClick={() => setSelectedCategory(cat.toLowerCase())}
                                className={`px-4 py-1.5 rounded-lg text-[9px] font-bold tracking-widest transition-all uppercase ${
                                    selectedCategory === cat.toLowerCase() ? 'bg-white text-black border-white' : 'bg-white/5 text-text-muted hover:text-white'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2Icon className="w-10 h-10 text-primary animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {snippets.length === 0 ? (
                            <div className="col-span-full text-center py-20 border border-dashed border-white/10 rounded-2xl bg-surface/20">
                                <Code2Icon className="w-12 h-12 text-neutral/20 mx-auto mb-4" />
                                <p className="text-neutral font-mono text-sm">No matching code snippets found.</p>
                            </div>
                        ) : (
                            snippets.map(s => (
                                <div 
                                    key={s.id} 
                                    onClick={() => setSelectedSnippet(s)}
                                    className="glass-panel p-8 border border-white/5 hover:border-white/20 transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between min-h-[220px]"
                                >
                                     <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ChevronRightIcon className="w-5 h-5 text-primary" />
                                     </div>
                                     
                                     <div>
                                         <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors">
                                                    <Code2Icon className="w-5 h-5 text-white" />
                                                </div>
                                                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">{s.language}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-neutral font-mono text-[9px] font-bold">
                                                <ThumbsUpIcon className="w-3.5 h-3.5" />
                                                <span>{s.votes}</span>
                                            </div>
                                         </div>
                                         
                                         <h3 className="text-xl font-black text-white mb-2 tracking-tight line-clamp-1 capitalize">{s.category} practice</h3>
                                         <p className="text-xs text-text-muted leading-relaxed mb-6 line-clamp-3 font-mono">
                                             {s.description || s.content.slice(0, 100) + '...'}
                                         </p>
                                     </div>
                                     
                                     <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">{s.content.split('\n').length} LINES</span>
                                        <span className={`text-[9px] font-mono font-bold tracking-widest uppercase text-primary`}>
                                            {s.difficulty}
                                        </span>
                                     </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Snippet Detail Modal */}
            {selectedSnippet && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/90 backdrop-blur-md">
                    <div className="glass-panel w-full max-w-4xl max-h-[85vh] flex flex-col border border-white/10 shadow-2xl relative overflow-hidden">
                        <button 
                            onClick={() => setSelectedSnippet(null)}
                            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
                        >
                            <XIcon className="w-6 h-6" />
                        </button>

                        <div className="p-10 flex flex-col overflow-y-auto custom-scrollbar">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold tracking-widest rounded-full uppercase font-mono">{selectedSnippet.language}</span>
                                <span className="px-3 py-1 bg-white/5 text-white/55 text-[10px] font-bold tracking-widest rounded-full uppercase font-mono">{selectedSnippet.category}</span>
                            </div>

                            <h2 className="text-3xl font-black tracking-tighter capitalize mb-4">{selectedSnippet.category} snippet</h2>
                            <p className="text-text-muted mb-8 text-base font-mono leading-relaxed">{selectedSnippet.description || "Production-grade code snippet designed to train accuracy, formatting, and character sequence speed."}</p>

                            <div className="relative group">
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button 
                                        onClick={() => copyToClipboard(selectedSnippet.content)}
                                        className="p-2 bg-black/60 hover:bg-black/90 rounded-md border border-white/10 transition-all flex items-center gap-2 text-xs font-mono"
                                    >
                                        {copied ? <CheckIcon className="w-4 h-4 text-primary" /> : <CopyIcon className="w-4 h-4 text-white/40" />}
                                        {copied ? 'COPIED' : 'COPY'}
                                    </button>
                                </div>
                                <pre className="bg-black/70 p-8 rounded-2xl border border-white/5 overflow-x-auto font-mono text-sm leading-relaxed text-blue-100/90 max-h-[280px] custom-scrollbar">
                                    <code>{selectedSnippet.content}</code>
                                </pre>
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row gap-6 sm:items-center justify-between border-t border-white/5 pt-6">
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => handleVote(selectedSnippet.id, 1)}
                                        className="p-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-md font-mono text-[10px] font-black flex items-center gap-1.5 uppercase transition-all"
                                    >
                                        ▲ Upvote ({selectedSnippet.votes})
                                    </button>
                                    <button 
                                        onClick={() => handleVote(selectedSnippet.id, -1)}
                                        className="p-2 bg-error/10 hover:bg-error/20 text-error border border-error/20 rounded-md font-mono text-[10px] font-black flex items-center gap-1.5 uppercase transition-all"
                                    >
                                        ▼ Downvote
                                    </button>
                                </div>
                                
                                <button 
                                    onClick={() => handlePractice(selectedSnippet)}
                                    className="premium-button py-3 px-8 text-xs font-bold tracking-widest uppercase hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                                >
                                    PRACTICE THIS SNIPPET
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </main>
    )
}
