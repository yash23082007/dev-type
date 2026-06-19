"use client"

import { useState, useEffect } from "react"
import { TypingArena } from "@/components/TypingArena"
import { MetricsHUD } from "@/components/MetricsHUD"
import { PostTestModal } from "@/components/PostTestModal"
import { IDEChrome } from "@/components/IDEChrome"
import { Settings2Icon, TimerIcon, MonitorIcon, PaletteIcon, Volume2Icon, VolumeXIcon } from "lucide-react"
import { useTypingStore } from "@/store/typingStore"
import { useAuthStore } from "@/store/authStore"
import { LeaderboardModal } from "@/components/LeaderboardModal"
import { MonacoEditorTyping } from "@/components/MonacoEditorTyping"
import Link from "next/link"

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

  const mode = useTypingStore(state => state.mode)
  const setMode = useTypingStore(state => state.setMode)
  const strictMode = useTypingStore(state => state.strictMode)
  const setStrictMode = useTypingStore(state => state.setStrictMode)
  const paceCaretWpm = useTypingStore(state => state.paceCaretWpm)
  const setPaceCaretWpm = useTypingStore(state => state.setPaceCaretWpm)
  const soundType = useTypingStore(state => state.soundType)
  const setSoundType = useTypingStore(state => state.setSoundType)
  const soundVolume = useTypingStore(state => state.soundVolume)
  const setSoundVolume = useTypingStore(state => state.setSoundVolume)
  const minWpm = useTypingStore(state => state.minWpm)
  const setMinWpm = useTypingStore(state => state.setMinWpm)
  const minAccuracy = useTypingStore(state => state.minAccuracy)
  const setMinAccuracy = useTypingStore(state => state.setMinAccuracy)

  const fetchSnippet = useTypingStore(state => state.fetchSnippet)
  const status = useTypingStore(state => state.status)
  const snippetDescription = useTypingStore(state => state.snippetDescription)
  const isLeaderboardOpen = useTypingStore(state => state.isLeaderboardOpen)
  const setIsLeaderboardOpen = useTypingStore(state => state.setIsLeaderboardOpen)

  const fetchUser = useAuthStore(state => state.fetchUser)

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
    <main className="w-full bg-background overflow-visible">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 flex flex-col items-center justify-center border-b border-white/[0.04]">
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
                {difficulty === 'algorithm' && snippetDescription && (
                    <div className="glass-panel p-5 mb-5 border border-primary/10 bg-[#070707] rounded-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary shadow-[0_0_10px_rgba(255,255,255,0.2)]"></div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-primary/80 font-mono">LeetCode Challenge</span>
                        </div>
                        <p className="text-sm font-mono text-white/80 leading-relaxed">
                            {snippetDescription}
                        </p>
                    </div>
                )}
                <div className="w-full">
                    {vsCodeMode ? (
                        <MonacoEditorTyping />
                    ) : (
                        <IDEChrome>
                            <TypingArena />
                        </IDEChrome>
                    )}
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
                            <option value="catppuccin">Catppuccin</option>
                            <option value="gruvbox">Gruvbox</option>
                            <option value="tokyonight">Tokyo Night</option>
                            <option value="solarized">Solarized</option>
                        </select>
                    </div>
                    {/* Mode Selector */}
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">Mode</span>
                        <select 
                            value={mode} 
                            onChange={(e) => {
                                setMode(e.target.value as 'normal' | 'symbol-drill' | 'file' | 'custom')
                                if (status === 'idle') fetchSnippet()
                            }}
                            className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer uppercase tracking-wider"
                            disabled={status === 'running'}
                        >
                            <option value="normal">Normal</option>
                            <option value="symbol-drill">Symbol Drill</option>
                            <option value="file">Real File</option>
                        </select>
                    </div>

                    {/* Strictness Selector */}
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">Strict</span>
                        <select 
                            value={strictMode} 
                            onChange={(e) => setStrictMode(e.target.value as 'normal' | 'expert' | 'master')}
                            className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer uppercase tracking-wider"
                            disabled={status === 'running'}
                        >
                            <option value="normal">Normal</option>
                            <option value="expert">Expert</option>
                            <option value="master">Master</option>
                        </select>
                    </div>

                    {/* Pace Caret */}
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">Pace</span>
                        <select
                            value={paceCaretWpm === null ? "off" : "on"}
                            onChange={(e) => {
                                if (e.target.value === "off") {
                                    setPaceCaretWpm(null)
                                } else {
                                    setPaceCaretWpm(80)
                                }
                            }}
                            className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer uppercase tracking-wider"
                            disabled={status === 'running'}
                        >
                            <option value="off">Off</option>
                            <option value="on">On</option>
                        </select>
                        {paceCaretWpm !== null && (
                            <input 
                                type="number"
                                min="10"
                                max="300"
                                value={paceCaretWpm}
                                onChange={(e) => {
                                    const v = parseInt(e.target.value)
                                    setPaceCaretWpm(isNaN(v) ? 0 : v)
                                }}
                                className="w-12 bg-white/10 text-xs font-bold text-white outline-none px-1 py-0.5 rounded text-center"
                                disabled={status === 'running'}
                            />
                        )}
                    </div>

                    {/* Min WPM Failure Threshold */}
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">Min WPM</span>
                        <input 
                            type="number"
                            placeholder="Off"
                            value={minWpm === null ? "" : minWpm}
                            onChange={(e) => {
                                const val = e.target.value === "" ? null : parseInt(e.target.value)
                                setMinWpm(val)
                            }}
                            className="w-10 bg-transparent text-xs font-bold text-white outline-none text-center placeholder-white/20"
                            disabled={status === 'running'}
                        />
                    </div>
                    
                    {/* Min Accuracy Failure Threshold */}
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">Min Acc</span>
                        <input 
                            type="number"
                            placeholder="Off"
                            value={minAccuracy === null ? "" : minAccuracy}
                            onChange={(e) => {
                                const val = e.target.value === "" ? null : parseInt(e.target.value)
                                setMinAccuracy(val)
                            }}
                            className="w-10 bg-transparent text-xs font-bold text-white outline-none text-center placeholder-white/20"
                            disabled={status === 'running'}
                        />
                        {minAccuracy !== null && <span className="text-[10px] text-white/60">%</span>}
                    </div>

                    {/* Mode Toggles */}
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setVsCodeMode(!vsCodeMode)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-xs font-bold uppercase tracking-wider ${vsCodeMode ? 'bg-white text-black border-white' : 'bg-white/5 text-white/40 border-white/5 hover:border-white/10'}`}
                        >
                            <MonitorIcon className="w-3.5 h-3.5" />
                            Monaco
                        </button>

                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className={`p-2.5 rounded-lg border transition-all ${soundEnabled ? 'bg-white text-black border-white' : 'bg-white/5 text-white/40 border-white/5 hover:border-white/10'}`}
                        >
                            {soundEnabled ? <Volume2Icon className="w-3.5 h-3.5" /> : <VolumeXIcon className="w-3.5 h-3.5" />}
                        </button>

                        {soundEnabled && (
                            <>
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">Click</span>
                                    <select 
                                        value={soundType} 
                                        onChange={(e) => setSoundType(e.target.value as 'mechanical' | 'typewriter' | 'beep' | 'standard')}
                                        className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer uppercase tracking-wider font-mono"
                                    >
                                        <option value="standard">Standard</option>
                                        <option value="mechanical">Mechanical</option>
                                        <option value="typewriter">Typewriter</option>
                                        <option value="beep">Beep</option>
                                    </select>
                                </div>
                                
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">Vol</span>
                                    <input 
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={soundVolume}
                                        onChange={(e) => setSoundVolume(parseInt(e.target.value))}
                                        className="w-16 h-1 bg-white/15 rounded-lg appearance-none cursor-pointer accent-white"
                                    />
                                    <span className="text-[10px] font-mono text-white/60 w-6">{soundVolume}%</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </section>


      {/* Modals */}
      <PostTestModal />
      <LeaderboardModal isOpen={isLeaderboardOpen} onClose={() => setIsLeaderboardOpen(false)} />
    </main>
  )
}
