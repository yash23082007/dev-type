"use client"

import React, { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { useTypingStore } from '@/store/typingStore'
import { 
    SearchIcon, CodeIcon, GaugeIcon, TimerIcon, PaletteIcon, 
    NavigationIcon, SettingsIcon, Volume2Icon, VolumeXIcon,
    RotateCcwIcon, KeyboardIcon, MonitorIcon
} from 'lucide-react'

const LANGUAGES = [
    { value: 'javascript', label: 'JavaScript', icon: '⟨⟩' },
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'html', label: 'HTML', icon: '🌐' },
    { value: 'cpp', label: 'C++', icon: '⚙️' },
    { value: 'english', label: 'English', icon: '📝' },
]

const DIFFICULTIES = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'leetcode', label: 'LeetCode' },
]

const TIMERS = [
    { value: 15, label: '15 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '60 seconds' },
    { value: 120, label: '120 seconds' },
]

const THEMES = [
    { value: 'dracula', label: 'Dracula' },
    { value: 'nord', label: 'Nord' },
    { value: 'monokai', label: 'Monokai' },
    { value: 'onedark', label: 'One Dark' },
    { value: 'githubdark', label: 'GitHub Dark' },
    { value: 'catppuccin', label: 'Catppuccin Mocha' },
    { value: 'gruvbox', label: 'Gruvbox Dark' },
    { value: 'tokyonight', label: 'Tokyo Night' },
    { value: 'solarized', label: 'Solarized Dark' },
]

export function CommandPalette() {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    
    const status = useTypingStore(state => state.status)
    const setLanguage = useTypingStore(state => state.setLanguage)
    const setDifficulty = useTypingStore(state => state.setDifficulty)
    const setTimeLimit = useTypingStore(state => state.setTimeLimit)
    const setTheme = useTypingStore(state => state.setTheme)
    const resetTest = useTypingStore(state => state.resetTest)
    const soundEnabled = useTypingStore(state => state.soundEnabled)
    const setSoundEnabled = useTypingStore(state => state.setSoundEnabled)
    const vsCodeMode = useTypingStore(state => state.vsCodeMode)
    const setVsCodeMode = useTypingStore(state => state.setVsCodeMode)
    const language = useTypingStore(state => state.language)
    const difficulty = useTypingStore(state => state.difficulty)
    const theme = useTypingStore(state => state.theme)
    const timeLimit = useTypingStore(state => state.timeLimit)

    // Listen for Ctrl/Cmd+K, Ctrl/Cmd+Shift+P, and Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isPaletteKey = ((e.metaKey || e.ctrlKey) && e.key === 'k') || 
                                 ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'p' || e.key === 'P'))
            
            if (isPaletteKey) {
                e.preventDefault()
                setOpen(prev => !prev)
            }
            // Also open on Escape when not mid-test
            if (e.key === 'Escape' && status !== 'running') {
                e.preventDefault()
                setOpen(prev => !prev)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [status])

    const runCommand = (callback: () => void) => {
        callback()
        setOpen(false)
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 z-[200]">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setOpen(false)}
            />
            
            {/* Command dialog */}
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl">
                <Command 
                    className="bg-[#111111] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
                    loop
                >
                    {/* Search input */}
                    <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
                        <SearchIcon className="w-4 h-4 text-white/30 flex-shrink-0" />
                        <Command.Input 
                            placeholder="Type a command..."
                            className="w-full bg-transparent text-white text-sm outline-none placeholder:text-white/25 font-mono"
                            autoFocus
                        />
                        <kbd className="text-[9px] text-white/20 font-mono bg-white/5 px-1.5 py-0.5 rounded border border-white/10 flex-shrink-0">ESC</kbd>
                    </div>

                    {/* Command list */}
                    <Command.List className="max-h-[360px] overflow-y-auto p-2 custom-scrollbar">
                        <Command.Empty className="py-8 text-center text-white/30 text-sm font-mono">
                            No results found.
                        </Command.Empty>

                        {/* Language */}
                        <Command.Group heading={<span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/25 px-3 py-1.5">Language</span>}>
                            {LANGUAGES.map(lang => (
                                <Command.Item
                                    key={lang.value}
                                    value={`language ${lang.label}`}
                                    onSelect={() => runCommand(() => {
                                        setLanguage(lang.value)
                                        resetTest()
                                    })}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-sm font-medium ${
                                        language === lang.value 
                                            ? 'bg-white/10 text-white' 
                                            : 'text-white/60 hover:bg-white/5 hover:text-white data-[selected=true]:bg-white/5 data-[selected=true]:text-white'
                                    }`}
                                >
                                    <span className="text-xs">{lang.icon}</span>
                                    <span className="font-mono">{lang.label}</span>
                                    {language === lang.value && <span className="ml-auto text-[9px] text-primary font-bold tracking-widest">ACTIVE</span>}
                                </Command.Item>
                            ))}
                        </Command.Group>

                        {/* Difficulty */}
                        <Command.Group heading={<span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/25 px-3 py-1.5">Difficulty</span>}>
                            {DIFFICULTIES.map(diff => (
                                <Command.Item
                                    key={diff.value}
                                    value={`difficulty ${diff.label}`}
                                    onSelect={() => runCommand(() => {
                                        setDifficulty(diff.value)
                                        resetTest()
                                    })}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-sm font-medium ${
                                        difficulty === diff.value 
                                            ? 'bg-white/10 text-white' 
                                            : 'text-white/60 hover:bg-white/5 hover:text-white data-[selected=true]:bg-white/5 data-[selected=true]:text-white'
                                    }`}
                                >
                                    <GaugeIcon className="w-4 h-4 text-white/30" />
                                    <span className="font-mono">{diff.label}</span>
                                    {difficulty === diff.value && <span className="ml-auto text-[9px] text-primary font-bold tracking-widest">ACTIVE</span>}
                                </Command.Item>
                            ))}
                        </Command.Group>

                        {/* Timer */}
                        <Command.Group heading={<span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/25 px-3 py-1.5">Timer</span>}>
                            {TIMERS.map(t => (
                                <Command.Item
                                    key={t.value}
                                    value={`timer ${t.label}`}
                                    onSelect={() => runCommand(() => {
                                        setTimeLimit(t.value)
                                        resetTest()
                                    })}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-sm font-medium ${
                                        timeLimit === t.value 
                                            ? 'bg-white/10 text-white' 
                                            : 'text-white/60 hover:bg-white/5 hover:text-white data-[selected=true]:bg-white/5 data-[selected=true]:text-white'
                                    }`}
                                >
                                    <TimerIcon className="w-4 h-4 text-white/30" />
                                    <span className="font-mono">{t.label}</span>
                                    {timeLimit === t.value && <span className="ml-auto text-[9px] text-primary font-bold tracking-widest">ACTIVE</span>}
                                </Command.Item>
                            ))}
                        </Command.Group>

                        {/* Theme */}
                        <Command.Group heading={<span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/25 px-3 py-1.5">Theme</span>}>
                            {THEMES.map(t => (
                                <Command.Item
                                    key={t.value}
                                    value={`theme ${t.label}`}
                                    onSelect={() => runCommand(() => setTheme(t.value))}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-sm font-medium ${
                                        theme === t.value 
                                            ? 'bg-white/10 text-white' 
                                            : 'text-white/60 hover:bg-white/5 hover:text-white data-[selected=true]:bg-white/5 data-[selected=true]:text-white'
                                    }`}
                                >
                                    <PaletteIcon className="w-4 h-4 text-white/30" />
                                    <span className="font-mono">{t.label}</span>
                                    {theme === t.value && <span className="ml-auto text-[9px] text-primary font-bold tracking-widest">ACTIVE</span>}
                                </Command.Item>
                            ))}
                        </Command.Group>

                        {/* Navigation */}
                        <Command.Group heading={<span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/25 px-3 py-1.5">Navigate</span>}>
                            {[
                                { label: 'Practice', path: '/' },
                                { label: 'Dashboard', path: '/dashboard' },
                                { label: 'Leaderboard', path: '/leaderboard' },
                                { label: 'Explore Snippets', path: '/snippets' },
                                { label: 'Shortcut Master', path: '/shortcuts' },
                                { label: 'Blog', path: '/blog' },
                                { label: 'About', path: '/about' },
                            ].map(nav => (
                                <Command.Item
                                    key={nav.path}
                                    value={`go to ${nav.label}`}
                                    onSelect={() => runCommand(() => router.push(nav.path))}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-white/60 hover:bg-white/5 hover:text-white data-[selected=true]:bg-white/5 data-[selected=true]:text-white transition-colors text-sm font-medium"
                                >
                                    <NavigationIcon className="w-4 h-4 text-white/30" />
                                    <span className="font-mono">{nav.label}</span>
                                    <span className="ml-auto text-[9px] text-white/20 font-mono">{nav.path}</span>
                                </Command.Item>
                            ))}
                        </Command.Group>

                        {/* Actions */}
                        <Command.Group heading={<span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/25 px-3 py-1.5">Actions</span>}>
                            <Command.Item
                                value="restart test new snippet"
                                onSelect={() => runCommand(() => resetTest())}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-white/60 hover:bg-white/5 hover:text-white data-[selected=true]:bg-white/5 data-[selected=true]:text-white transition-colors text-sm font-medium"
                            >
                                <RotateCcwIcon className="w-4 h-4 text-white/30" />
                                <span className="font-mono">Restart Test</span>
                                <kbd className="ml-auto text-[9px] text-white/20 font-mono bg-white/5 px-1.5 py-0.5 rounded">Tab+Enter</kbd>
                            </Command.Item>

                            <Command.Item
                                value="toggle sound audio"
                                onSelect={() => runCommand(() => setSoundEnabled(!soundEnabled))}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-white/60 hover:bg-white/5 hover:text-white data-[selected=true]:bg-white/5 data-[selected=true]:text-white transition-colors text-sm font-medium"
                            >
                                {soundEnabled ? <Volume2Icon className="w-4 h-4 text-white/30" /> : <VolumeXIcon className="w-4 h-4 text-white/30" />}
                                <span className="font-mono">{soundEnabled ? 'Disable Sound' : 'Enable Sound'}</span>
                            </Command.Item>

                            <Command.Item
                                value="toggle monaco editor mode"
                                onSelect={() => runCommand(() => setVsCodeMode(!vsCodeMode))}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-white/60 hover:bg-white/5 hover:text-white data-[selected=true]:bg-white/5 data-[selected=true]:text-white transition-colors text-sm font-medium"
                            >
                                <MonitorIcon className="w-4 h-4 text-white/30" />
                                <span className="font-mono">{vsCodeMode ? 'Disable Monaco Mode' : 'Enable Monaco Mode'}</span>
                            </Command.Item>
                        </Command.Group>
                    </Command.List>

                    {/* Footer hint */}
                    <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/[0.06] bg-white/[0.02]">
                        <div className="flex items-center gap-4 text-[9px] text-white/20 font-mono">
                            <span className="flex items-center gap-1"><kbd className="bg-white/5 px-1 py-0.5 rounded border border-white/10">↑↓</kbd> navigate</span>
                            <span className="flex items-center gap-1"><kbd className="bg-white/5 px-1 py-0.5 rounded border border-white/10">↵</kbd> select</span>
                            <span className="flex items-center gap-1"><kbd className="bg-white/5 px-1 py-0.5 rounded border border-white/10">esc</kbd> close</span>
                        </div>
                        <span className="text-[9px] text-white/15 font-mono">⌘K</span>
                    </div>
                </Command>
            </div>
        </div>
    )
}
