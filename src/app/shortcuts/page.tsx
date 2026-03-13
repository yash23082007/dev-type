"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, CommandIcon, CheckCircle2Icon, XCircleIcon } from 'lucide-react'
import { gsap } from 'gsap'

type Shortcut = {
    name: string
    keys: string[]
    description: string
}

const SHORTCUTS: Shortcut[] = [
    { name: 'Toggle Comment', keys: ['Control', '/'], description: 'Comment or uncomment the current line' },
    { name: 'Command Palette', keys: ['Control', 'Shift', 'P'], description: 'Open the command palette' },
    { name: 'Duplicate Line Down', keys: ['Shift', 'Alt', 'ArrowDown'], description: 'Copy current line down' },
    { name: 'Select Next Occurrence', keys: ['Control', 'D'], description: 'Add next matching selection' },
    { name: 'Move Line Up', keys: ['Alt', 'ArrowUp'], description: 'Move the active line up' },
    { name: 'Format Document', keys: ['Shift', 'Alt', 'F'], description: 'Format the whole document' },
]

export default function ShortcutsPage() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set())
    const [status, setStatus] = useState<'idle' | 'success' | 'fail'>('idle')

    const currentShortcut = SHORTCUTS[currentIndex]

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            e.preventDefault()
            const key = e.key === ' ' ? 'Space' : e.key
            setActiveKeys(prev => new Set(prev).add(key))
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            e.preventDefault()
            const key = e.key === ' ' ? 'Space' : e.key
            
            // Check success
            const currentKeys = Array.from(activeKeys).map(k => k.toLowerCase())
            const targetKeys = currentShortcut.keys.map(k => k.toLowerCase())
            
            const isMatch = targetKeys.every(k => currentKeys.includes(k)) && currentKeys.length === targetKeys.length
            
            if (isMatch && status !== 'success') {
                setStatus('success')
                import('@/lib/sound').then(mod => mod.playSuccessSound())
                setTimeout(() => {
                    if (currentIndex < SHORTCUTS.length - 1) {
                        setCurrentIndex(c => c + 1)
                    } else {
                        setCurrentIndex(0) // loop
                    }
                    setStatus('idle')
                    setActiveKeys(new Set())
                }, 1000)
            } else {
                if (currentKeys.length >= targetKeys.length && !isMatch) {
                    setStatus('fail')
                    import('@/lib/sound').then(mod => mod.playErrorSound())
                    setTimeout(() => setStatus('idle'), 500)
                }
            }

            setActiveKeys(prev => {
                const next = new Set(prev)
                next.delete(key)
                return next
            })
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [activeKeys, currentShortcut, currentIndex, status])


    return (
        <main className="min-h-screen pb-12 px-4 relative flex flex-col items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,255,157,0.05),rgba(255,255,255,0))]"></div>
            <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.02]"></div>

            <Link href="/dashboard" className="absolute top-8 left-8 flex items-center gap-2 text-neutral hover:text-white transition-colors">
                <ArrowLeftIcon className="w-5 h-5" />
                <span className="text-sm font-bold tracking-widest uppercase">Dashboard</span>
            </Link>

            <div className="glass-panel p-10 max-w-xl w-full text-center border border-white/10 relative overflow-hidden">
                {status === 'success' && <div className="absolute inset-0 bg-primary/10 -z-10"></div>}
                {status === 'fail' && <div className="absolute inset-0 bg-error/10 -z-10"></div>}

                <CommandIcon className="w-12 h-12 text-primary mx-auto mb-6" />
                <h1 className="text-3xl font-black text-white tracking-widest uppercase mb-2">Shortcut Master</h1>
                <p className="text-neutral mb-8 font-mono">{currentShortcut.description}</p>

                <div className="flex justify-center items-center gap-4 mb-12">
                    {currentShortcut.keys.map((key, i) => (
                        <React.Fragment key={key}>
                            <div className={`px-4 py-3 rounded-xl border-2 font-black tracking-widest uppercase font-mono transition-all ${
                                Array.from(activeKeys).map(k=>k.toLowerCase()).includes(key.toLowerCase()) 
                                    ? 'bg-primary text-background border-primary scale-110 shadow-[0_0_20px_rgba(0,255,157,0.4)]' 
                                    : 'bg-surface text-white border-white/20'
                            }`}>
                                {key}
                            </div>
                            {i < currentShortcut.keys.length - 1 && <span className="text-neutral font-black text-xl">+</span>}
                        </React.Fragment>
                    ))}
                </div>

                <div className="flex items-center justify-center h-8">
                    {status === 'success' && <span className="flex items-center gap-2 text-primary font-bold"><CheckCircle2Icon className="w-5 h-5"/> Perfect!</span>}
                    {status === 'fail' && <span className="flex items-center gap-2 text-error font-bold"><XCircleIcon className="w-5 h-5"/> Incorrect</span>}
                    {status === 'idle' && <span className="text-neutral/50 font-mono text-sm">Press the keys shown above</span>}
                </div>
            </div>
            
            <p className="mt-8 text-neutral/40 font-mono text-sm">
                Progress: {currentIndex + 1} / {SHORTCUTS.length}
            </p>
        </main>
    )
}
