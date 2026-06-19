"use client"

import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  TerminalIcon, BarChart3Icon, TrophyIcon, TargetIcon,
  ZapIcon, ClockIcon, ArrowLeftIcon, LogOutIcon,
  CodeIcon, TypeIcon, Loader2Icon, Settings2Icon, FlameIcon, KeyboardIcon
} from 'lucide-react'
import { AIGenerator } from '@/components/AIGenerator'
import { CustomPaster } from '@/components/CustomPaster'

interface DashboardData {
  stats: {
    totalTests: number
    avgWpm: number
    avgAccuracy: number
    bestWpm: number
    streak: number
    streakFreeze: number
  }
  languageBreakdown: { language: string; count: number; avgWpm: number }[]
  difficultyBreakdown: { difficulty: string; count: number; avgWpm: number }[]
  wpmTrend: { wpm: number; accuracy: number; language: string; date: string }[]
  recentTests: {
    id: string; wpm: number; cpm: number; accuracy: number;
    language: string; difficulty: string; timeTaken: number; date: string
  }[]
  activityHeatmap: { date: string; count: number }[]
  weaknessHeatmap: Record<string, number>
  personalBests: {
    id: string; language: string; difficulty: string; duration: number;
    wpm: number; accuracy: number; consistency: number; rawWpm: number; achievedAt: string
  }[]
}

const LANG_COLORS: Record<string, string> = {
  javascript: '#F7DF1E',
  python: '#3776AB',
  html: '#E34F26',
  cpp: '#00599C',
  english: '#00FF9D',
}

export default function DashboardPage() {
  const user = useAuthStore(s => s.user)
  const fetchUser = useAuthStore(s => s.fetchUser)
  const logout = useAuthStore(s => s.logout)
  const authLoading = useAuthStore(s => s.loading)
  const router = useRouter()

  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  if (authLoading || loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2Icon className="w-8 h-8 text-primary animate-spin" />
      </main>
    )
  }

  const maxTrendWpm = data ? Math.max(...data.wpmTrend.map(t => t.wpm), 1) : 1

  return (
    <main className="min-h-screen pb-12 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,255,157,0.05),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.02]"></div>

      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-neutral hover:text-white transition-colors">
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="text-sm font-bold tracking-widest uppercase">Back</span>
          </Link>
          <div className="w-px h-6 bg-white/10"></div>
          <div className="flex items-center gap-3">
            <TerminalIcon className="w-6 h-6 text-primary" />
            <span className="text-lg font-black tracking-widest uppercase text-white">
              Dev<span className="text-primary">Type</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-white font-bold text-sm">{user?.username}</p>
            <p className="text-neutral text-xs">{user?.email}</p>
          </div>
          <button onClick={handleLogout} className="p-2 rounded-lg bg-surface border border-white/5 hover:border-error/30 text-neutral hover:text-error transition-all" title="Logout">
            <LogOutIcon className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* Welcome */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-wider">
              Welcome back, <span className="text-primary">{user?.username}</span>
            </h1>
            <p className="text-neutral mt-1 text-sm">Here&apos;s your typing performance overview</p>
          </div>
          <div className="flex gap-3">
            <a 
              href="/api/dashboard/export?format=csv" 
              className="bg-surface text-white border border-white/10 px-4 py-2 rounded-lg font-bold text-xs tracking-widest uppercase hover:bg-surface-light hover:border-white/30 transition-colors flex items-center gap-1.5"
            >
              Export CSV
            </a>
            <a 
              href="/api/dashboard/export?format=json" 
              className="bg-surface text-white border border-white/10 px-4 py-2 rounded-lg font-bold text-xs tracking-widest uppercase hover:bg-surface-light hover:border-white/30 transition-colors flex items-center gap-1.5"
            >
              Export JSON
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard icon={<FlameIcon className="w-5 h-5" />} label="Streak" value={`${data?.stats.streak ?? 0} Days (${data?.stats.streakFreeze ?? 0} Freezes)`} color="text-orange-400" />
          <StatCard icon={<ZapIcon className="w-5 h-5" />} label="Best WPM" value={data?.stats.bestWpm ?? 0} color="text-primary" />
          <StatCard icon={<BarChart3Icon className="w-5 h-5" />} label="Avg WPM" value={data?.stats.avgWpm ?? 0} color="text-white" />
          <StatCard icon={<TargetIcon className="w-5 h-5" />} label="Accuracy" value={`${data?.stats.avgAccuracy ?? 0}%`} color="text-secondary" />
          <StatCard icon={<TrophyIcon className="w-5 h-5" />} label="Total Tests" value={data?.stats.totalTests ?? 0} color="text-yellow-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* WPM Trend Chart */}
          <div className="lg:col-span-2 glass-panel p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3Icon className="w-5 h-5 text-primary" />
              WPM Trend
            </h3>
            {data && data.wpmTrend.length > 0 ? (
              <div className="flex items-end gap-1.5 h-48">
                {data.wpmTrend.map((t, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface px-2 py-1 rounded text-xs font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-white/10">
                      {t.wpm} WPM · {t.accuracy}%
                    </div>
                    <div
                      className="w-full rounded-t-sm transition-all hover:opacity-80"
                      style={{
                        height: `${(t.wpm / maxTrendWpm) * 100}%`,
                        backgroundColor: LANG_COLORS[t.language] || '#00FF9D',
                        minHeight: '4px',
                        opacity: 0.7 + (i / data.wpmTrend.length) * 0.3
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 text-neutral text-sm">
                Complete some tests to see your trend
              </div>
            )}
          </div>

          {/* Language Breakdown */}
          <div className="glass-panel p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CodeIcon className="w-5 h-5 text-secondary" />
              Languages
            </h3>
            {data && data.languageBreakdown.length > 0 ? (
              <div className="flex flex-col gap-3">
                {data.languageBreakdown.map(lang => (
                  <div key={lang.language} className="flex items-center justify-between p-3 bg-surface rounded-lg border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: LANG_COLORS[lang.language] || '#888' }}></div>
                      <span className="text-white text-sm font-bold capitalize">{lang.language}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-neutral text-xs">{lang.count} tests</span>
                      <span className="text-primary font-bold text-sm">{lang.avgWpm} WPM</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 text-neutral text-sm">
                No data yet
              </div>
            )}
          </div>
        </div>

        {/* Heatmaps Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Practice Activity Calendar */}
          <div className="lg:col-span-2 glass-panel p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3Icon className="w-5 h-5 text-primary" />
              Practice Activity (Last 150 Days)
            </h3>
            {data && data.activityHeatmap ? (
              <div>
                <div className="flex flex-wrap gap-1 p-2 bg-[#050505] rounded-xl border border-white/5 max-h-[160px] overflow-y-auto custom-scrollbar">
                  {Array.from({ length: 150 }).map((_, i) => {
                    const d = new Date()
                    d.setDate(d.getDate() - (149 - i))
                    const dateStr = d.toISOString().split('T')[0]
                    const match = data.activityHeatmap.find(h => h.date === dateStr)
                    const count = match ? match.count : 0
                    
                    let bgClass = "bg-white/5 border border-transparent"
                    if (count > 0) {
                      if (count <= 2) bgClass = "bg-[#00ff9d]/20 border border-[#00ff9d]/30 text-white"
                      else if (count <= 5) bgClass = "bg-[#00ff9d]/50 border border-[#00ff9d]/60 text-black shadow-[0_0_10px_rgba(0,255,157,0.3)]"
                      else bgClass = "bg-primary text-black shadow-[0_0_15px_rgba(0,255,157,0.6)]"
                    }

                    return (
                      <div 
                        key={dateStr}
                        className={`w-4 h-4 rounded-sm flex items-center justify-center text-[7px] font-bold select-none ${bgClass}`}
                        title={`${dateStr}: ${count} tests`}
                      >
                        {count > 0 ? count : ""}
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-between mt-3 text-[10px] text-neutral font-mono">
                  <span>150 Days Ago</span>
                  <div className="flex gap-2 items-center">
                    <span>Less</span>
                    <span className="w-3 h-3 bg-white/5 rounded-sm"></span>
                    <span className="w-3 h-3 bg-[#00ff9d]/20 rounded-sm"></span>
                    <span className="w-3 h-3 bg-[#00ff9d]/50 rounded-sm"></span>
                    <span className="w-3 h-3 bg-primary rounded-sm"></span>
                    <span>More</span>
                  </div>
                  <span>Today</span>
                </div>
              </div>
            ) : (
              <div className="text-neutral text-sm h-12 flex items-center justify-center">No activity recorded.</div>
            )}
          </div>

          {/* Character Latency Weakness Layout */}
          <div className="glass-panel p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <KeyboardIcon className="w-5 h-5 text-error" />
              Reaction Weakness (Latency)
            </h3>
            {data && data.weaknessHeatmap && Object.keys(data.weaknessHeatmap).length > 0 ? (
              <div className="flex flex-col items-center justify-center">
                {[
                  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
                  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
                  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
                ].map((row, rIdx) => (
                  <div key={rIdx} className="flex justify-center gap-1 mb-1" style={{ paddingLeft: rIdx === 1 ? '12px' : rIdx === 2 ? '24px' : '0px' }}>
                    {row.map(key => {
                      const delay = data.weaknessHeatmap[key]
                      let capColor = 'bg-white/5 border border-white/10 text-white/50'
                      if (delay !== undefined && delay > 0) {
                        if (delay < 150) capColor = 'bg-[#00ff9d]/20 border border-[#00ff9d]/40 text-[#00ff9d]'
                        else if (delay < 250) capColor = 'bg-[#e6db74]/20 border border-[#e6db74]/40 text-[#e6db74]'
                        else capColor = 'bg-[#ff4444]/20 border border-[#ff4444]/40 text-[#ff4444]'
                      }
                      return (
                        <div 
                          key={key} 
                          className={`w-6 h-6 flex flex-col items-center justify-center rounded font-mono font-bold text-[8px] uppercase transition-all select-none ${capColor}`}
                          title={delay ? `${delay}ms avg delay` : 'No timing'}
                        >
                          <span>{key}</span>
                        </div>
                      )
                    })}
                  </div>
                ))}
                <div className="flex gap-3 mt-3 text-[8px] text-neutral font-mono">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#00ff9d]/20 rounded-full"></span> Fast (&lt;150ms)</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#e6db74]/20 rounded-full"></span> Avg (150-250ms)</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#ff4444]/20 rounded-full"></span> Slow (&gt;250ms)</span>
                </div>
              </div>
            ) : (
              <div className="text-neutral text-sm h-24 flex items-center justify-center">No reaction timings recorded yet.</div>
            )}
          </div>
        </div>

        {/* Personal Bests Section */}
        <div className="glass-panel p-6 border border-white/10 mb-8">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrophyIcon className="w-5 h-5 text-yellow-400" />
            Personal Bests
          </h3>
          {data && data.personalBests && data.personalBests.length > 0 ? (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-neutral text-xs uppercase tracking-widest font-bold py-3 px-2">Language</th>
                    <th className="text-left text-neutral text-xs uppercase tracking-widest font-bold py-3 px-2">Difficulty</th>
                    <th className="text-center text-neutral text-xs uppercase tracking-widest font-bold py-3 px-2">Duration</th>
                    <th className="text-right text-neutral text-xs uppercase tracking-widest font-bold py-3 px-2">WPM</th>
                    <th className="text-right text-neutral text-xs uppercase tracking-widest font-bold py-3 px-2">Raw WPM</th>
                    <th className="text-right text-neutral text-xs uppercase tracking-widest font-bold py-3 px-2">Accuracy</th>
                    <th className="text-right text-neutral text-xs uppercase tracking-widest font-bold py-3 px-2">Consistency</th>
                    <th className="text-right text-neutral text-xs uppercase tracking-widest font-bold py-3 px-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.personalBests.map(pb => (
                    <tr key={pb.id} className="border-b border-white/5 hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: LANG_COLORS[pb.language] || '#888' }}></div>
                          <span className="text-white capitalize font-mono">{pb.language}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-neutral capitalize">{pb.difficulty}</td>
                      <td className="py-3 px-2 text-center text-white">{pb.duration}s</td>
                      <td className="py-3 px-2 text-right font-bold text-primary">{pb.wpm}</td>
                      <td className="py-3 px-2 text-right font-mono text-white">{pb.rawWpm}</td>
                      <td className="py-3 px-2 text-right font-mono text-white">{pb.accuracy}%</td>
                      <td className="py-3 px-2 text-right font-mono text-white">{pb.consistency}%</td>
                      <td className="py-3 px-2 text-right text-neutral text-xs">
                        {new Date(pb.achievedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-neutral text-sm">
              No personal bests achieved yet. Start typing to set some records!
            </div>
          )}
        </div>

        {/* Practice Modes */}
        <div className="mb-8">
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                <Settings2Icon className="w-5 h-5 text-secondary" />
                Advanced Practice Modes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AIGenerator />
                <CustomPaster />
            </div>
            <div className="mt-4 flex justify-end gap-3">
                <Link href="/shortcuts" className="bg-surface text-white border border-white/10 px-6 py-2 rounded-lg font-bold tracking-widest uppercase hover:bg-surface-light hover:border-white/30 transition-colors">
                    Shortcut Master ⌨️
                </Link>
                <Link href="/" className="bg-primary text-background px-6 py-2 rounded-lg font-bold tracking-widest uppercase hover:bg-primary/90 transition-colors">
                    Start Custom Test →
                </Link>
            </div>
        </div>

        {/* Recent Tests */}
        <div className="glass-panel p-6 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-primary" />
            Recent Tests
          </h3>
          {data && data.recentTests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-neutral text-xs uppercase tracking-widest font-bold py-3 px-2">Language</th>
                    <th className="text-left text-neutral text-xs uppercase tracking-widest font-bold py-3 px-2">Difficulty</th>
                    <th className="text-right text-neutral text-xs uppercase tracking-widest font-bold py-3 px-2">WPM</th>
                    <th className="text-right text-neutral text-xs uppercase tracking-widest font-bold py-3 px-2">CPM</th>
                    <th className="text-right text-neutral text-xs uppercase tracking-widest font-bold py-3 px-2">Accuracy</th>
                    <th className="text-right text-neutral text-xs uppercase tracking-widest font-bold py-3 px-2">Time</th>
                    <th className="text-right text-neutral text-xs uppercase tracking-widest font-bold py-3 px-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentTests.map(test => (
                    <tr key={test.id} className="border-b border-white/5 hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: LANG_COLORS[test.language] || '#888' }}></div>
                          <span className="text-white capitalize font-mono">{test.language}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-neutral capitalize">{test.difficulty}</td>
                      <td className="py-3 px-2 text-right font-bold text-primary">{test.wpm}</td>
                      <td className="py-3 px-2 text-right font-mono text-white">{test.cpm}</td>
                      <td className="py-3 px-2 text-right font-mono text-white">{test.accuracy}%</td>
                      <td className="py-3 px-2 text-right text-neutral">{test.timeTaken}s</td>
                      <td className="py-3 px-2 text-right text-neutral text-xs">
                        {new Date(test.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-neutral">
              <TypeIcon className="w-12 h-12 mb-4 opacity-30" />
              <p className="text-sm">No tests completed yet</p>
              <Link href="/" className="mt-4 text-primary text-sm font-bold hover:underline">Start typing →</Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
  return (
    <div className="glass-panel p-5 border border-white/10 hover:border-primary/20 transition-colors">
      <div className="flex items-center gap-2 mb-3 text-neutral">
        {icon}
        <span className="text-xs font-bold tracking-widest uppercase">{label}</span>
      </div>
      <span className={`text-3xl font-black ${color}`}>{value}</span>
    </div>
  )
}
