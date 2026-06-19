import { create } from 'zustand'
import { generateSymbolDrill } from '../lib/symbolGenerator'

export type TestStatus = 'idle' | 'running' | 'finished'

export interface Keystroke {
    key: string
    time: number
    isError: boolean
}

function getCharTimings(keystrokes: Keystroke[]): Record<string, number> {
    const timings: Record<string, number[]> = {}
    let lastTime = 0
    keystrokes.forEach(k => {
        const delta = k.time - lastTime
        lastTime = k.time
        if (k.key.length === 1) {
            if (!timings[k.key]) timings[k.key] = []
            timings[k.key].push(delta)
        }
    })
    const avgTimings: Record<string, number> = {}
    Object.entries(timings).forEach(([char, list]) => {
        const sum = list.reduce((a, b) => a + b, 0)
        avgTimings[char] = Math.round(sum / list.length)
    })
    return avgTimings
}

interface TypingState {
    // Test Configuration
    language: string
    difficulty: string
    timeLimit: number // seconds
    mode: 'normal' | 'symbol-drill' | 'file' | 'custom'
    strictMode: 'normal' | 'expert' | 'master'
    paceCaretWpm: number | null
    minWpm: number | null
    minAccuracy: number | null
    snippetDescription: string | null
    failed: boolean

    setLanguage: (lang: string) => void
    setDifficulty: (diff: string) => void
    setTimeLimit: (limit: number) => void
    setMode: (mode: 'normal' | 'symbol-drill' | 'file' | 'custom') => void
    setStrictMode: (strictMode: 'normal' | 'expert' | 'master') => void
    setPaceCaretWpm: (wpm: number | null) => void
    setMinWpm: (wpm: number | null) => void
    setMinAccuracy: (acc: number | null) => void

    // Phase 1: Editor & Experience
    theme: string
    vsCodeMode: boolean
    soundEnabled: boolean
    soundVolume: number // 0-100
    soundType: 'mechanical' | 'typewriter' | 'beep' | 'standard'
    isLeaderboardOpen: boolean
    setTheme: (theme: string) => void
    setVsCodeMode: (enabled: boolean) => void
    setSoundEnabled: (enabled: boolean) => void
    setSoundVolume: (volume: number) => void
    setSoundType: (type: 'mechanical' | 'typewriter' | 'beep' | 'standard') => void
    setIsLeaderboardOpen: (open: boolean) => void

    // Active Test State
    status: TestStatus
    snippet: string
    snippetId: string | null
    inputCharIndex: number
    errors: number[]
    startTime: number | null
    timeRemaining: number
    keystrokes: Keystroke[]
    wpmTimeline: { second: number; wpm: number; raw: number }[]
    _totalKeysAtLastSecond: number
    newPersonalBest: boolean

    // Actions
    fetchSnippet: () => Promise<void>
    setCustomSnippet: (content: string, lang: string) => void
    startTest: () => void
    endTest: () => void
    resetTest: () => void
    handleKeydown: (key: string) => void
    tickTime: () => void

    // Computed metrics
    getWPM: () => number
    getRawWPM: () => number
    getConsistency: () => number
    getAccuracy: () => number
    getProgress: () => number
}

export const useTypingStore = create<TypingState>((set, get) => ({
    language: 'javascript',
    difficulty: 'intermediate',
    timeLimit: 30,
    mode: 'normal',
    strictMode: 'normal',
    paceCaretWpm: null,
    minWpm: null,
    minAccuracy: null,
    snippetDescription: null,
    failed: false,

    theme: 'dracula',
    vsCodeMode: false,
    soundEnabled: true,
    soundVolume: 50,
    soundType: 'standard',

    status: 'idle',
    snippet: '',
    snippetId: null,
    inputCharIndex: 0,
    errors: [],
    startTime: null,
    timeRemaining: 30,
    keystrokes: [],
    wpmTimeline: [],
    _totalKeysAtLastSecond: 0,
    newPersonalBest: false,
    isLeaderboardOpen: false,

    setLanguage: (lang) => set({ language: lang }),
    setDifficulty: (diff) => set({ difficulty: diff }),
    setTimeLimit: (limit) => set({ timeLimit: limit, timeRemaining: limit }),
    setMode: (mode) => set({ mode }),
    setStrictMode: (strictMode) => set({ strictMode }),
    setPaceCaretWpm: (wpm) => set({ paceCaretWpm: wpm }),
    setMinWpm: (wpm) => set({ minWpm: wpm }),
    setMinAccuracy: (acc) => set({ minAccuracy: acc }),
    setTheme: (theme) => set({ theme }),
    setVsCodeMode: (vsCodeMode) => set({ vsCodeMode }),
    setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
    setSoundVolume: (soundVolume) => set({ soundVolume }),
    setSoundType: (soundType) => set({ soundType }),
    setIsLeaderboardOpen: (isLeaderboardOpen) => set({ isLeaderboardOpen }),

    fetchSnippet: async () => {
        const { language, difficulty, mode } = get()
        set({ failed: false })

        if (mode === 'symbol-drill') {
            const content = generateSymbolDrill(language)
            set({
                snippet: content,
                snippetId: null,
                snippetDescription: "Practice typing key developer symbols and formatting sequences."
            })
            return
        }

        try {
            const categoryParam = mode === 'file' ? '&category=file' : ''
            const res = await fetch(`/api/snippets?language=${language}&difficulty=${difficulty}${categoryParam}`)
            if (res.ok) {
                const data = await res.json()
                set({ 
                    snippet: data.content, 
                    snippetId: data.id === 'fallback-id' ? null : data.id,
                    snippetDescription: data.description || null
                })
            }
        } catch (error) {
            console.error("Failed to fetch snippet", error)
            set({
                snippet: "const calculateSpeed = (chars, sec) => (chars / 5) / (sec / 60);",
                snippetId: null,
                snippetDescription: "Default fallback javascript snippet."
            })
        }
    },

    setCustomSnippet: (content, lang) => {
        set({
            snippet: content,
            language: lang,
            snippetId: null,
            mode: 'custom',
            status: 'idle',
            inputCharIndex: 0,
            errors: [],
            startTime: null,
            timeRemaining: get().timeLimit,
            keystrokes: [],
            wpmTimeline: [],
            _totalKeysAtLastSecond: 0,
            newPersonalBest: false,
            failed: false,
            snippetDescription: "Custom code snippet pasted by user."
        })
    },

    startTest: () => set({
        status: 'running',
        inputCharIndex: 0,
        errors: [],
        startTime: Date.now(),
        timeRemaining: get().timeLimit,
        keystrokes: [],
        wpmTimeline: [],
        _totalKeysAtLastSecond: 0,
        newPersonalBest: false,
        failed: false
    }),

    endTest: () => {
        const state = get()
        if (state.status === 'finished') return

        // Capture any final fractional second timeline stats if elapsed > 0
        const elapsed = state.timeLimit - state.timeRemaining
        if (elapsed > 0) {
            const lastEntry = state.wpmTimeline[state.wpmTimeline.length - 1]
            if (!lastEntry || lastEntry.second < elapsed) {
                const currentTotalKeys = state.keystrokes.length
                const previousTotalKeys = state._totalKeysAtLastSecond
                const keysInThisSecond = Math.max(0, currentTotalKeys - previousTotalKeys)
                const currentRawWpm = keysInThisSecond * 12
                const currentWpm = state.getWPM()

                state.wpmTimeline.push({
                    second: elapsed,
                    wpm: currentWpm,
                    raw: currentRawWpm
                })
            }
        }

        set({ status: 'finished' })

        if (state.soundEnabled) {
            import('@/lib/sound').then(mod => {
                if (state.failed) {
                    mod.playErrorSound(state.soundVolume)
                } else {
                    mod.playSuccessSound(state.soundVolume)
                }
            })
        }

        // Submit score (skip if custom / symbol drill and doesn't have snippetId)
        if (state.getWPM() > 0) {
            const scoreBody = {
                snippetId: state.snippetId || "custom_snippet_test",
                language: state.language,
                difficulty: state.difficulty,
                wpm: state.getWPM(),
                rawWpm: state.getRawWPM(),
                consistency: state.getConsistency(),
                wpmTimeline: state.wpmTimeline,
                charTimings: getCharTimings(state.keystrokes),
                cpm: state.inputCharIndex,
                accuracy: state.getAccuracy(),
                timeTaken: state.timeLimit - state.timeRemaining,
                duration: state.timeLimit,
                mistakes: state.errors,
                isCustom: state.mode === 'custom' || !state.snippetId,
                failed: state.failed,
                strictMode: state.strictMode,
                mode: state.mode
            }

            fetch('/api/scores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(scoreBody)
            }).then(async (res) => {
                if (res.ok) {
                    const data = await res.json()
                    if (data.isNewPersonalBest) {
                        set({ newPersonalBest: true })
                    }
                }
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
            keystrokes: [],
            wpmTimeline: [],
            _totalKeysAtLastSecond: 0,
            newPersonalBest: false,
            failed: false,
            snippet: '',
            snippetId: null
        }))
        get().fetchSnippet()
    },

    tickTime: () => {
        const { status, timeRemaining, timeLimit, keystrokes, wpmTimeline, minWpm, minAccuracy } = get()
        if (status === 'running' && timeRemaining > 0) {
            const nextTimeRemaining = timeRemaining - 1
            set({ timeRemaining: nextTimeRemaining })

            const elapsed = timeLimit - nextTimeRemaining
            const currentTotalKeys = keystrokes.length
            const previousTotalKeys = get()._totalKeysAtLastSecond || 0
            const keysInThisSecond = Math.max(0, currentTotalKeys - previousTotalKeys)
            
            const currentRawWpm = keysInThisSecond * 12
            const currentWpm = get().getWPM()

            set({
                wpmTimeline: [
                    ...wpmTimeline,
                    { second: elapsed, wpm: currentWpm, raw: currentRawWpm }
                ],
                _totalKeysAtLastSecond: currentTotalKeys
            })

            // Fail threshold check after 3 seconds grace period
            if (elapsed >= 3) {
                const liveAcc = get().getAccuracy()
                if ((minWpm !== null && currentWpm < minWpm) || (minAccuracy !== null && liveAcc < minAccuracy)) {
                    set({ failed: true })
                    get().endTest()
                    return
                }
            }

            if (nextTimeRemaining <= 0) {
                get().endTest()
            }
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
        }

        // Re-read the current status after potential state change
        const currentStatus = get().status
        if (currentStatus !== 'running') return

        const currentIndex = get().inputCharIndex
        const currentErrors = get().errors
        const offset = state.startTime ? Date.now() - state.startTime : 0

        // Allow backspace (disabled in Master mode)
        if (key === 'Backspace') {
            if (state.strictMode === 'master') return // backspacing disabled in master mode
            set(state => ({
                inputCharIndex: Math.max(0, currentIndex - 1),
                errors: currentErrors.filter((errIdx) => errIdx !== currentIndex - 1),
                keystrokes: [...state.keystrokes, { key: 'Backspace', time: offset, isError: false }]
            }))
            return
        }

        // Ignore modifiers and extra keys
        if (key.length > 1) return

        const expectedChar = snippet[currentIndex]

        // Master Mode Fail check: if typo is made, fail instantly
        if (state.strictMode === 'master' && key !== expectedChar) {
            if (state.soundEnabled) {
                import('@/lib/sound').then(mod => mod.playErrorSound(state.soundVolume, state.soundType))
            }
            set(state => ({
                inputCharIndex: currentIndex + 1,
                errors: [...currentErrors, currentIndex],
                keystrokes: [...state.keystrokes, { key, time: offset, isError: true }],
                failed: true
            }))
            // End test on next tick asynchronously to ensure state settles
            setTimeout(() => get().endTest(), 0)
            return
        }

        // Expert Mode Space check: if space is submitted on a word with errors, fail test
        if (state.strictMode === 'expert' && key === ' ') {
            let wordStart = 0
            for (let i = currentIndex - 1; i >= 0; i--) {
                if (snippet[i] === ' ' || snippet[i] === '\n') {
                    wordStart = i + 1
                    break
                }
            }
            const wordHasError = currentErrors.some(errIdx => errIdx >= wordStart && errIdx < currentIndex)
            if (wordHasError) {
                if (state.soundEnabled) {
                    import('@/lib/sound').then(mod => mod.playErrorSound(state.soundVolume, state.soundType))
                }
                set(state => ({
                    keystrokes: [...state.keystrokes, { key: ' ', time: offset, isError: true }],
                    failed: true
                }))
                setTimeout(() => get().endTest(), 0)
                return
            }
        }

        if (key === expectedChar) {
            if (state.soundEnabled) {
                import('@/lib/sound').then(mod => mod.playKeySound(state.soundVolume, state.soundType))
            }
            set(state => ({ 
                inputCharIndex: currentIndex + 1,
                keystrokes: [...state.keystrokes, { key, time: offset, isError: false }]
            }))
        } else {
            if (state.soundEnabled) {
                import('@/lib/sound').then(mod => mod.playErrorSound(state.soundVolume, state.soundType))
            }
            set(state => ({
                inputCharIndex: currentIndex + 1,
                errors: [...currentErrors, currentIndex],
                keystrokes: [...state.keystrokes, { key, time: offset, isError: true }]
            }))
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

    getRawWPM: () => {
        const { startTime, keystrokes } = get()
        if (!startTime) return 0

        const minutes = (Date.now() - startTime) / 60000
        if (minutes === 0) return 0

        const rawWpm = (keystrokes.length / 5) / minutes
        return Math.max(0, Math.round(rawWpm))
    },

    getConsistency: () => {
        const { wpmTimeline } = get()
        if (wpmTimeline.length === 0) return 100

        const rawValues = wpmTimeline.map(t => t.raw)
        const mean = rawValues.reduce((a, b) => a + b, 0) / rawValues.length
        if (mean === 0) return 0

        const variance = rawValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / rawValues.length
        const stddev = Math.sqrt(variance)
        return Math.max(0, Math.min(100, Math.round((1 - stddev / mean) * 100 * 10) / 10))
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
