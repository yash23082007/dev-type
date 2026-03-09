import { create } from 'zustand'

export type TestStatus = 'idle' | 'running' | 'finished'

interface TypingState {
    // Test Configuration
    language: string
    difficulty: string
    timeLimit: number // seconds
    setLanguage: (lang: string) => void
    setDifficulty: (diff: string) => void
    setTimeLimit: (limit: number) => void

    // Active Test State
    status: TestStatus
    snippet: string
    snippetId: string | null
    inputCharIndex: number
    errors: number[]
    startTime: number | null
    timeRemaining: number

    // Actions
    fetchSnippet: () => Promise<void>
    startTest: () => void
    endTest: () => void
    resetTest: () => void
    handleKeydown: (key: string) => void
    tickTime: () => void

    // Computed metrics
    getWPM: () => number
    getAccuracy: () => number
    getProgress: () => number
}

export const useTypingStore = create<TypingState>((set, get) => ({
    language: 'javascript',
    difficulty: 'intermediate',
    timeLimit: 30,

    status: 'idle',
    snippet: '',
    snippetId: null,
    inputCharIndex: 0,
    errors: [],
    startTime: null,
    timeRemaining: 30,

    setLanguage: (lang) => set({ language: lang }),
    setDifficulty: (diff) => set({ difficulty: diff }),
    setTimeLimit: (limit) => set({ timeLimit: limit, timeRemaining: limit }),

    fetchSnippet: async () => {
        const { language, difficulty } = get()
        try {
            const res = await fetch(`/api/snippets?language=${language}&difficulty=${difficulty}`)
            if (res.ok) {
                const data = await res.json()
                set({ snippet: data.content, snippetId: data.id })
            }
        } catch (error) {
            console.error("Failed to fetch snippet", error)
            // Fallback snippet
            set({
                snippet: "The quick brown fox jumps over the lazy dog.",
                snippetId: null
            })
        }
    },

    startTest: () => set({
        status: 'running',
        inputCharIndex: 0,
        errors: [],
        startTime: Date.now(),
        timeRemaining: get().timeLimit
    }),

    endTest: () => {
        const state = get()
        set({ status: 'finished' })

        // Submit score
        if (state.snippetId && state.getWPM() > 0) {
            fetch('/api/scores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    snippetId: state.snippetId,
                    language: state.language,
                    difficulty: state.difficulty,
                    wpm: state.getWPM(),
                    cpm: state.inputCharIndex,
                    accuracy: state.getAccuracy(),
                    timeTaken: state.timeLimit - state.timeRemaining,
                    mistakes: state.errors
                })
            }).catch(error => {
                console.error("Failed to submit score", error)
            })
        }
    },

    resetTest: () => {
        set((state) => ({
            status: 'idle',
            inputCharIndex: 0,
            errors: [],
            startTime: null,
            timeRemaining: state.timeLimit,
            snippet: '',
            snippetId: null,
        }))
        get().fetchSnippet()
    },

    tickTime: () => {
        const { status, timeRemaining } = get()
        if (status === 'running' && timeRemaining > 0) {
            set({ timeRemaining: timeRemaining - 1 })
        } else if (status === 'running' && timeRemaining <= 0) {
            get().endTest()
        }
    },

    handleKeydown: (key) => {
        const state = get()
        const { status, snippet, inputCharIndex, errors, startTest } = state

        // Start test on first keypress if idle
        if (status === 'idle') {
            startTest()
            // Process the key that started the test immediately
            // Re-read state after startTest since it was just set
        }

        // Re-read the current status after potential state change
        const currentStatus = get().status
        if (currentStatus !== 'running') return

        const currentIndex = get().inputCharIndex
        const currentErrors = get().errors

        // Allow backspace
        if (key === 'Backspace') {
            set({
                inputCharIndex: Math.max(0, currentIndex - 1),
                errors: currentErrors.filter((errIdx) => errIdx !== currentIndex - 1)
            })
            return
        }

        // Ignore modifiers and extra keys
        if (key.length > 1) return

        const expectedChar = snippet[currentIndex]

        if (key === expectedChar) {
            set({ inputCharIndex: currentIndex + 1 })
        } else {
            set({
                inputCharIndex: currentIndex + 1,
                errors: [...currentErrors, currentIndex]
            })
        }

        // End test if reached the end of the snippet
        if (get().inputCharIndex >= snippet.length) {
            get().endTest()
        }
    },

    getWPM: () => {
        const { startTime, inputCharIndex, errors } = get()
        if (!startTime) return 0

        const minutes = (Date.now() - startTime) / 60000
        if (minutes === 0) return 0

        const correctChars = inputCharIndex - errors.length
        const wpm = (correctChars / 5) / minutes
        return Math.max(0, Math.round(wpm))
    },

    getAccuracy: () => {
        const { inputCharIndex, errors } = get()
        if (inputCharIndex === 0) return 100

        const correctChars = inputCharIndex - errors.length
        const acc = (correctChars / inputCharIndex) * 100
        return Math.max(0, Math.round(acc * 10) / 10)
    },

    getProgress: () => {
        const { inputCharIndex, snippet } = get()
        if (!snippet || snippet.length === 0) return 0
        return Math.round((inputCharIndex / snippet.length) * 100)
    }
}))
