"use client"

import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  TerminalIcon, BarChart3Icon, TrophyIcon, TargetIcon,
  ZapIcon, ClockIcon, ArrowLeftIcon, LogOutIcon,
  CodeIcon, TypeIcon, Loader2Icon
} from 'lucide-react'

interface DashboardData {
  stats: {
    totalTests: number
    avgWpm: number
    avgAccuracy: number
    bestWpm: number
  }
  languageBreakdown: { language: string; count: number; avgWpm: number }[]
  difficultyBreakdown: { difficulty: string; count: number; avgWpm: number }[]
  wpmTrend: { wpm: number; accuracy: number; language: string; date: string }[]
  recentTests: {
    id: string; wpm: number; cpm: number; accuracy: number;
    language: string; difficulty: string; timeTaken: number; date: string
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
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white tracking-wider">
            Welcome back, <span className="text-primary">{user?.username}</span>
          </h1>
          <p className="text-neutral mt-1 text-sm">Here&apos;s your typing performance overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<ZapIcon className="w-5 h-5" />} label="Best WPM" value={data?.stats.bestWpm ?? 0} color="text-primary" />
          <StatCard icon={<BarChart3Icon className="w-5 h-5" />} label="Avg WPM" value={data?.stats.avgWpm ?? 0} color="text-white" />
          <StatCard icon={<TargetIcon className="w-5 h-5" />} label="Avg Accuracy" value={`${data?.stats.avgAccuracy ?? 0}%`} color="text-secondary" />
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
