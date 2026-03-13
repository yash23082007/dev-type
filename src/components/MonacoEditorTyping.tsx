"use client"

import React, { useEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import { useTypingStore } from '../store/typingStore'

export function MonacoEditorTyping() {
    const snippet = useTypingStore(state => state.snippet)
    const language = useTypingStore(state => state.language)
    const theme = useTypingStore(state => state.theme)
    const handleKeydown = useTypingStore(state => state.handleKeydown)
    const inputCharIndex = useTypingStore(state => state.inputCharIndex)
    
    // Map our custom themes to Monaco themes
    const getMonacoTheme = () => {
        if (theme === 'dracula') return 'vs-dark' // Can be customized later with addTheme
        if (theme === 'githubdark') return 'vs-dark'
        return 'vs-dark'
    }

    // We keep track of user input matching the snippet.
    // In actual VS Code mode, we can either read-only and highlight,
    // or capture global keystrokes exactly like standard mode.
    // Let's use it as a read-only display that highlights text,
    // and rely on the same global key listener in `page.tsx` or `TypingArena`.

    return (
        <div className="glass-panel p-4 h-[400px] overflow-hidden rounded-xl border border-white/10">
             <Editor
                height="100%"
                defaultLanguage={language}
                language={language}
                theme={getMonacoTheme()}
                value={snippet.slice(0, inputCharIndex) + '█\n\n' + snippet}
                options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 16,
                    lineNumbers: 'on',
                    wordWrap: 'on',
                    cursorBlinking: 'smooth',
                    guides: { indentation: true },
                    scrollBeyondLastLine: false,
                }}
            />
        </div>
    )
}
