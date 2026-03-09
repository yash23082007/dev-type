import { create } from 'zustand'

interface AuthUser {
  id: string
  username: string
  email: string
  avatarUrl?: string
  level: number
  totalTests: number
  avgWpm: number
  highestWpm: number
  avgAccuracy: number
  streak: number
  lastTestDate?: string
  createdAt: string
}

interface AuthState {
  user: AuthUser | null
  loading: boolean
  error: string | null

  fetchUser: () => Promise<void>
  login: (email: string, password: string) => Promise<boolean>
  signup: (username: string, email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  fetchUser: async () => {
    try {
      set({ loading: true })
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      set({ user: data.user, loading: false })
    } catch {
      set({ user: null, loading: false })
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ error: null, loading: true })
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        set({ error: data.error, loading: false })
        return false
      }

      // Refetch full user data
      const meRes = await fetch('/api/auth/me')
      const meData = await meRes.json()
      set({ user: meData.user, loading: false })
      return true
    } catch {
      set({ error: 'Network error. Please try again.', loading: false })
      return false
    }
  },

  signup: async (username: string, email: string, password: string) => {
    try {
      set({ error: null, loading: true })
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        set({ error: data.error, loading: false })
        return false
      }

      // Refetch full user data
      const meRes = await fetch('/api/auth/me')
      const meData = await meRes.json()
      set({ user: meData.user, loading: false })
      return true
    } catch {
      set({ error: 'Network error. Please try again.', loading: false })
      return false
    }
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      set({ user: null })
    } catch {
      console.error('Logout failed')
    }
  },

  clearError: () => set({ error: null }),
}))
