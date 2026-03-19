"use client"

import React from 'react'
import Editor from '@monaco-editor/react'
import { useTypingStore } from '../store/typingStore'

export function MonacoEditorTyping() {
    const snippet = useTypingStore(state => state.snippet)
    const language = useTypingStore(state => state.language)
    const inputCharIndex = useTypingStore(state => state.inputCharIndex)
    
    return (
        <div className="glass-panel p-6 h-[400px] overflow-hidden rounded-lg border border-white/[0.04] bg-[#050505]">
             <Editor
                height="100%"
                defaultLanguage={language}
                language={language}
                theme="vs-dark"
                value={snippet.slice(0, inputCharIndex) + '█\n\n' + snippet}
                options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 15,
                    lineNumbers: 'on',
                    wordWrap: 'on',
                    cursorBlinking: 'smooth',
                    guides: { indentation: true },
                    scrollBeyondLastLine: false,
                    padding: { top: 20, bottom: 20 },
                }}
            />
        </div>
    )
}
