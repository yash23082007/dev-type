"use client"

import React, { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TerminalIcon, MailIcon, LockIcon, Loader2Icon } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useAuthStore(s => s.login)
  const error = useAuthStore(s => s.error)
  const loading = useAuthStore(s => s.loading)
  const clearError = useAuthStore(s => s.clearError)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login(email, password)
    if (success) {
      router.push('/')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,255,157,0.08),rgba(255,255,255,0))]"></div>
      
      {/* Decorative grid */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.03]"></div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <TerminalIcon className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-black tracking-widest uppercase text-white">
            Dev<span className="text-primary">Type</span>
          </h1>
        </div>

        <div className="glass-panel p-8 border border-white/10">
          <h2 className="text-2xl font-black text-white mb-2 tracking-wider">Welcome back</h2>
          <p className="text-neutral text-sm mb-8">Sign in to track your progress</p>

          {error && (
            <div className="bg-error/10 border border-error/30 rounded-lg px-4 py-3 mb-6 text-error text-sm font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative">
              <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError() }}
                className="w-full bg-surface border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-neutral/50 font-mono text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                required
              />
            </div>

            <div className="relative">
              <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearError() }}
                className="w-full bg-surface border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-neutral/50 font-mono text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg bg-primary hover:bg-primary/90 text-background font-black tracking-widest uppercase transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,255,157,0.3)] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-neutral text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary hover:text-primary/80 font-bold transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
