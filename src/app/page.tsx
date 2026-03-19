"use client"

import { TypingArena } from "@/components/TypingArena"
import { MetricsHUD } from "@/components/MetricsHUD"
import { PostTestModal } from "@/components/PostTestModal"
import { TerminalIcon, Code2Icon, TrophyIcon, Settings2Icon, LayoutDashboardIcon, LogInIcon, LogOutIcon, UserIcon, TimerIcon } from "lucide-react"
import { useTypingStore } from "@/store/typingStore"
import { useAuthStore } from "@/store/authStore"
import { LeaderboardModal } from "@/components/LeaderboardModal"
import { MonacoEditorTyping } from "@/components/MonacoEditorTyping"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MonitorIcon, PaletteIcon, Volume2Icon, VolumeXIcon } from "lucide-react"

import { AboutSection } from "@/components/AboutSection"

const TIME_OPTIONS = [15, 30, 60, 120]

export default function Home() {
  const setLanguage = useTypingStore(state => state.setLanguage)
  const setDifficulty = useTypingStore(state => state.setDifficulty)
  const setTimeLimit = useTypingStore(state => state.setTimeLimit)
  const language = useTypingStore(state => state.language)
  const difficulty = useTypingStore(state => state.difficulty)
  const timeLimit = useTypingStore(state => state.timeLimit)
  const theme = useTypingStore(state => state.theme)
  const vsCodeMode = useTypingStore(state => state.vsCodeMode)
  const soundEnabled = useTypingStore(state => state.soundEnabled)
  const setTheme = useTypingStore(state => state.setTheme)
  const setVsCodeMode = useTypingStore(state => state.setVsCodeMode)
  const setSoundEnabled = useTypingStore(state => state.setSoundEnabled)

  const fetchSnippet = useTypingStore(state => state.fetchSnippet)
  const status = useTypingStore(state => state.status)
  const isLeaderboardOpen = useTypingStore(state => state.isLeaderboardOpen)
  const setIsLeaderboardOpen = useTypingStore(state => state.setIsLeaderboardOpen)

  const fetchUser = useAuthStore(state => state.fetchUser)
  const router = useRouter()

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value)
    if (status === 'idle') fetchSnippet()
  }

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value)
    if (status === 'idle') fetchSnippet()
  }

  const handleTimeLimitChange = (time: number) => {
    if (status === 'running') return
    setTimeLimit(time)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 flex flex-col items-center justify-center overflow-hidden border-b border-white/[0.04]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,white/5,transparent)] -z-10"></div>
        
        <div className="w-full max-w-5xl space-y-12">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary/60">Professional Grade</span>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                  REFINE YOUR <span className="text-text-muted">SYNTAX.</span>
                </h1>
            </div>

            <div className="w-full">
                <MetricsHUD />
                <div className="w-full">
                    {vsCodeMode ? <MonacoEditorTyping /> : <TypingArena />}
                </div>
            </div>

            <div className="flex flex-col items-center space-y-8">
                <p className="text-white/20 font-mono text-xs tracking-[0.2em] uppercase">
                    start typing to begin <span className="text-white/40 mx-3">•</span> <kbd className="bg-white/5 px-2 py-1 rounded text-white/50 border border-white/10 mx-1">tab</kbd> + <kbd className="bg-white/5 px-2 py-1 rounded text-white/50 border border-white/10 mx-1">enter</kbd> to restart
                </p>

                {/* Settings Grid */}
                <div className="flex flex-wrap gap-4 items-center justify-center bg-[#0a0a0a] p-2 rounded-xl border border-white/[0.04]">
                    {/* Language */}
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                        <Settings2Icon className="w-3.5 h-3.5 text-secondary" />
                        <select 
                            value={language} 
                            onChange={handleLanguageChange}
                            className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer uppercase tracking-wider"
                            disabled={status === 'running'}
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="html">HTML</option>
                            <option value="cpp">C++</option>
                            <option value="english">English</option>
                        </select>
                    </div>

                    {/* Difficulty */}
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                        <select 
                            value={difficulty} 
                            onChange={handleDifficultyChange}
                            className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer uppercase tracking-wider"
                            disabled={status === 'running'}
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="algorithm">LeetCode</option>
                        </select>
                    </div>

                    {/* Time Limit */}
                    <div className="flex items-center gap-1 bg-white/5 rounded-lg border border-white/5 p-1">
                        <TimerIcon className="w-3.5 h-3.5 text-secondary ml-2 mr-1" />
                        {TIME_OPTIONS.map(t => (
                        <button
                            key={t}
                            onClick={() => handleTimeLimitChange(t)}
                            disabled={status === 'running'}
                            className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all uppercase tracking-widest ${
                            timeLimit === t
                                ? 'bg-white text-black'
                                : 'text-white/40 hover:text-white'
                            } disabled:opacity-50`}
                        >
                            {t}s
                        </button>
                        ))}
                    </div>

                    {/* Theme */}
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                        <PaletteIcon className="w-3.5 h-3.5 text-secondary" />
                        <select 
                            value={theme} 
                            onChange={(e) => setTheme(e.target.value)}
                            className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer uppercase tracking-wider"
                        >
                            <option value="dracula">Dracula</option>
                            <option value="nord">Nord</option>
                            <option value="monokai">Monokai</option>
                            <option value="onedark">One Dark</option>
                            <option value="githubdark">GitHub</option>
                        </select>
                    </div>

                    {/* Mode Toggles */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setVsCodeMode(!vsCodeMode)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-xs font-bold uppercase tracking-wider ${vsCodeMode ? 'bg-white text-black border-white' : 'bg-white/5 text-white/40 border-white/5 hover:border-white/10'}`}
                        >
                            <MonitorIcon className="w-3.5 h-3.5" />
                            VS Code
                        </button>

                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className={`p-2.5 rounded-lg border transition-all ${soundEnabled ? 'bg-white text-black border-white' : 'bg-white/5 text-white/40 border-white/5 hover:border-white/10'}`}
                        >
                            {soundEnabled ? <Volume2Icon className="w-3.5 h-3.5" /> : <VolumeXIcon className="w-3.5 h-3.5" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Modals */}
      <PostTestModal />
      <LeaderboardModal isOpen={isLeaderboardOpen} onClose={() => setIsLeaderboardOpen(false)} />
    </main>
  )
}
