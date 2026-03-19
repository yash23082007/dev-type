"use client"

import React, { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ZapIcon, ClockIcon, ArrowRightIcon, ArrowLeftIcon, Share2Icon, BookmarkIcon } from 'lucide-react'

const POSTS = [
    { 
        id: 1,
        title: "Mastering the Neovim Workflow for High-Efficiency Development", 
        date: "March 20, 2026", 
        cat: "PERFORMANCE", 
        time: "15 MIN",
        excerpt: "We break down the exact configurations and muscle memory patterns used by top-tier engineers to maintain flow state throughout an 8-hour sprint.",
        content: `
            <p>Neovim is more than just a text editor; it's a productivity philosophy. For the elite developer, every millisecond spent reaching for a mouse is a millisecond lost from the flow state. Our latest research into high-efficiency workflows reveals that the most productive engineers share a few common traits in their Neovim setups.</p>
            
            <h3 class="text-2xl font-black text-white mt-8 mb-4">The Buffer-First Mentality</h3>
            <p>Instead of relying on tabs, power users leverage buffers and rapid fuzzy finding. By using tools like Telescope.nvim, you can jump between files with zero cognitive load. The goal is to make the tool disappear into your subconscious.</p>
            
            <h3 class="text-2xl font-black text-white mt-8 mb-4">LSP and Tree-sitter Optimization</h3>
            <p>Understanding the structure of your code is vital. Modern Neovim configurations utilize Tree-sitter for surgical syntax highlighting and LSP (Language Server Protocol) for intelligent code navigation. This allows you to treat your codebase like a living organism rather than a flat file.</p>
            
            <h3 class="text-2xl font-black text-white mt-8 mb-4">Conclusion</h3>
            <p>Transitioning to a terminal-centric workflow takes time, but the dividends in speed and precision are unparalleled. Start small, master one movement at a time, and soon your terminal will become an extension of your mind.</p>
        `
    },
    { 
        id: 2,
        title: "The Hidden Cost of Visual Distractions in IDEs", 
        date: "Mar 18, 2026", 
        cat: "PSYCHOLOGY", 
        time: "5 MIN",
        excerpt: "Why minimal UIs lead to 40% faster code execution in high-stakes environments.",
        content: `
            <p>Visual noise is the silent killer of concentration. Modern IDEs are cluttered with sidebars, status icons, and non-essential popups that constantly fight for your attention. In our benchmarks, developers using minimalist, keyboard-driven interfaces showed a 40% increase in deep work duration.</p>
            <h3 class="text-2xl font-black text-white mt-8 mb-4">Cognitive Load and Syntax</h3>
            <p>By stripping away everything but the code, you force your brain to focus on the logic. This is why DevType prioritizes a high-contrast, distraction-free environment. When the UI disappears, the logic thrives.</p>
        `
    },
    { 
        id: 3,
        title: "Static Typing in Python: A Production Case Study", 
        date: "Mar 15, 2026", 
        cat: "ENGINEERING", 
        time: "12 MIN",
        excerpt: "Leveraging MyPy and Pydantic to bring architectural stability to rapid prototyping.",
        content: `
            <p>Python's dynamic nature is a double-edged sword. While it allows for rapid iteration, it often leads to runtime surprises in production. Implementing static typing via MyPy and Pydantic transformed our deployment stability.</p>
            <h3 class="text-2xl font-black text-white mt-8 mb-4">The Pydantic Revolution</h3>
            <p>Data validation at the boundary is essential. Pydantic ensures that the data flowing through your system matches your expectations, catching bugs before they ever reach your core logic.</p>
        `
    },
]

export default function BlogPage() {
    const [viewingId, setViewingId] = useState<number | null>(null)
    const currentPost = POSTS.find(p => p.id === viewingId)

    if (viewingId && currentPost) {
        return (
            <main className="min-h-screen bg-background text-white">
                <Navbar />
                <div className="pt-32 pb-32 px-6 max-w-4xl mx-auto">
                    <button 
                        onClick={() => setViewingId(null)}
                        className="flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-12 font-bold tracking-widest text-xs uppercase"
                    >
                        <ArrowLeftIcon className="w-4 h-4" /> Back to Blog
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="px-3 py-1 bg-primary text-background text-[10px] font-bold tracking-widest rounded-full uppercase">{currentPost.cat}</span>
                        <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">{currentPost.date} • {currentPost.time} READ</span>
                    </div>

                    <h1 className="text-6xl font-black tracking-tighter mb-10 leading-tight">{currentPost.title}</h1>

                    <div className="flex items-center gap-6 mb-16 py-8 border-y border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-black text-sm">YV</div>
                            <div>
                                <p className="text-sm font-bold">YASH VIJAY</p>
                                <p className="text-[10px] text-text-muted tracking-widest uppercase">Elite Architect</p>
                            </div>
                        </div>
                        <div className="ml-auto flex gap-4">
                            <button className="p-2 text-text-muted hover:text-white transition-colors"><Share2Icon className="w-5 h-5" /></button>
                            <button className="p-2 text-text-muted hover:text-white transition-colors"><BookmarkIcon className="w-5 h-5" /></button>
                        </div>
                    </div>

                    <div 
                        className="prose prose-invert prose-lg max-w-none text-text-muted leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: currentPost.content }}
                    />
                    
                    <div className="mt-20 p-12 glass-panel border border-white/10 text-center">
                        <h3 className="text-2xl font-black mb-4 italic tracking-widest">READY TO APPLY THESE TACTICS?</h3>
                        <p className="text-text-muted mb-8 max-w-xl mx-auto">Test your muscle memory against the code snippets discussed in this article and join the top 1% of efficient engineers.</p>
                        <button className="premium-button py-4 px-10 text-sm font-black tracking-widest">START TRAINING NOW</button>
                    </div>
                </div>
                <Footer />
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-background text-white">
            <Navbar />
            <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
                <div className="mb-20">
                    <h1 className="text-8xl font-black tracking-tighter mb-8 italic uppercase leading-[0.8]">THE<br />DEV LOG.</h1>
                    <p className="text-text-muted text-2xl max-w-2xl font-medium leading-relaxed">Engineering insights for the 1%. Tactics, tools, and philosophy.</p>
                </div>

                {/* Featured Post */}
                {POSTS[0] && (
                    <div 
                        onClick={() => setViewingId(POSTS[0].id)}
                        className="glass-panel p-12 border border-white/10 mb-20 group cursor-pointer relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent -z-10 group-hover:w-full transition-all duration-700"></div>
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-3 py-1 bg-primary text-background text-[10px] font-bold tracking-widest rounded-full uppercase">Featured</span>
                                <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">{POSTS[0].date}</span>
                            </div>
                            <h2 className="text-5xl font-black text-white mb-6 tracking-tighter leading-tight">{POSTS[0].title}</h2>
                            <p className="text-text-muted text-lg mb-8 leading-relaxed">{POSTS[0].excerpt}</p>
                            <div className="flex items-center gap-2 text-primary group-hover:gap-4 transition-all font-bold tracking-widest text-sm uppercase">
                                READ ARTICLE <ArrowRightIcon className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {POSTS.slice(1).map((b, i) => (
                        <div 
                            key={i} 
                            onClick={() => setViewingId(b.id)}
                            className="glass-panel p-10 border border-white/5 hover:border-white/20 transition-all cursor-pointer group flex flex-col h-full"
                        >
                             <div className="flex items-center justify-between mb-6">
                                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">{b.cat}</span>
                                <div className="flex items-center gap-2 text-text-muted text-[10px] font-mono uppercase tracking-widest">
                                    <ClockIcon className="w-3 h-3" /> {b.time}
                                </div>
                             </div>
                             <h3 className="text-3xl font-black text-white tracking-tighter leading-tight mb-4 group-hover:text-primary transition-colors flex-grow">{b.title}</h3>
                             <p className="text-sm text-text-muted mb-8 leading-relaxed">{b.excerpt}</p>
                             <div className="flex items-center justify-between">
                                <span className="text-sm font-bold tracking-widest text-white/40 uppercase font-mono">{b.date}</span>
                                <div className="p-3 bg-white/5 rounded-full group-hover:bg-primary/20 transition-colors">
                                    <ZapIcon className="w-5 h-5 text-white opacity-40 group-hover:opacity-100" />
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    )
}
