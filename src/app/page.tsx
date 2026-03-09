"use client"

import { TypingArena } from "@/components/TypingArena"
import { MetricsHUD } from "@/components/MetricsHUD"
import { PostTestModal } from "@/components/PostTestModal"
import { TerminalIcon, Code2Icon, TrophyIcon, Settings2Icon, LayoutDashboardIcon, LogInIcon, LogOutIcon, UserIcon, TimerIcon } from "lucide-react"
import { useTypingStore } from "@/store/typingStore"
import { useAuthStore } from "@/store/authStore"
import { LeaderboardModal } from "@/components/LeaderboardModal"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const TIME_OPTIONS = [15, 30, 60, 120]

export default function Home() {
  const setLanguage = useTypingStore(state => state.setLanguage)
  const setDifficulty = useTypingStore(state => state.setDifficulty)
  const setTimeLimit = useTypingStore(state => state.setTimeLimit)
  const language = useTypingStore(state => state.language)
  const difficulty = useTypingStore(state => state.difficulty)
  const timeLimit = useTypingStore(state => state.timeLimit)
  const fetchSnippet = useTypingStore(state => state.fetchSnippet)
  const status = useTypingStore(state => state.status)

  const user = useAuthStore(state => state.user)
  const fetchUser = useAuthStore(state => state.fetchUser)
  const logout = useAuthStore(state => state.logout)
  const authLoading = useAuthStore(state => state.loading)

  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)
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

  const handleLogout = async () => {
    await logout()
    router.refresh()
  }

  return (
    <main className="min-h-screen flex flex-col items-center pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,255,157,0.05),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.02]"></div>

      {/* Header / Nav */}
      <header className="absolute top-0 left-0 w-full p-5 flex justify-between items-center z-10 glass-panel border-t-0 border-l-0 border-r-0 rounded-none border-b-white/5">
        <div className="flex items-center gap-3">
          <TerminalIcon className="w-7 h-7 text-primary" />
          <h1 className="text-lg font-black tracking-widest uppercase text-white">
            Dev<span className="text-primary">Type</span>
          </h1>
        </div>
        <nav className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-neutral hover:text-white transition-colors">
            <Code2Icon className="w-4 h-4" /> Practice
          </button>
          <button 
            onClick={() => setIsLeaderboardOpen(true)}
            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-neutral hover:text-white transition-colors"
          >
            <TrophyIcon className="w-4 h-4 text-secondary" /> Leaderboard
          </button>
          {!authLoading && (
            <>
              {user ? (
                <>
                  <Link href="/dashboard" className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-neutral hover:text-white transition-colors">
                    <LayoutDashboardIcon className="w-4 h-4 text-primary" /> Dashboard
                  </Link>
                  <div className="w-px h-5 bg-white/10"></div>
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <UserIcon className="w-3.5 h-3.5 text-primary" />
                    {user.username}
                  </span>
                  <button onClick={handleLogout} className="text-xs font-bold tracking-widest uppercase text-neutral hover:text-error transition-colors flex items-center gap-1.5">
                    <LogOutIcon className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-neutral hover:text-white transition-colors">
                    <LogInIcon className="w-4 h-4" /> Login
                  </Link>
                </>
              )}
            </>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-5xl flex flex-col justify-center items-center mt-12">
        <MetricsHUD />
        <div className="w-full">
          <TypingArena />
        </div>

        <p className="mt-8 text-neutral/50 font-mono text-sm tracking-widest text-center">
          start typing to begin <span className="text-primary mx-2">•</span> press <kbd className="bg-surface px-2 py-1 rounded text-white/70 mx-1 border border-white/10">tab</kbd> + <kbd className="bg-surface px-2 py-1 rounded text-white/70 mx-1 border border-white/10">enter</kbd> to restart
        </p>

        {/* Settings */}
        <div className="mt-8 flex flex-wrap gap-4 items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
          {/* Language */}
          <div className="flex items-center gap-2 bg-surface px-3 py-2 rounded-lg border border-white/5">
            <Settings2Icon className="w-4 h-4 text-neutral" />
            <select 
              value={language} 
              onChange={handleLanguageChange}
              className="bg-transparent text-sm font-mono text-white outline-none cursor-pointer"
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
          <div className="flex items-center gap-2 bg-surface px-3 py-2 rounded-lg border border-white/5">
            <select 
              value={difficulty} 
              onChange={handleDifficultyChange}
              className="bg-transparent text-sm font-mono text-white outline-none cursor-pointer"
              disabled={status === 'running'}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Time Limit */}
          <div className="flex items-center gap-1 bg-surface rounded-lg border border-white/5 p-1">
            <TimerIcon className="w-4 h-4 text-neutral ml-2" />
            {TIME_OPTIONS.map(t => (
              <button
                key={t}
                onClick={() => handleTimeLimitChange(t)}
                disabled={status === 'running'}
                className={`px-3 py-1.5 rounded-md text-sm font-mono font-bold transition-all ${
                  timeLimit === t
                    ? 'bg-primary text-background'
                    : 'text-neutral hover:text-white'
                } disabled:opacity-50`}
              >
                {t}s
              </button>
            ))}
          </div>
        </div>
      </div>

      <PostTestModal />
      <LeaderboardModal isOpen={isLeaderboardOpen} onClose={() => setIsLeaderboardOpen(false)} />

      {/* Footer */}
      <footer className="mt-auto pt-8 text-center text-neutral/30 text-xs font-mono tracking-wider">
        <span className="text-primary/40">DevType</span> — Sharpen your code typing skills
      </footer>
    </main>
  )
}
