"use client"

import { useEffect } from 'react'
import { useTypingStore } from '../store/typingStore'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = useTypingStore(state => state.theme)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return <>{children}</>
}
