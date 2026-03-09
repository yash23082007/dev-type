import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const language = searchParams.get('language') || 'javascript'
        const difficulty = searchParams.get('difficulty') || 'intermediate'
        
        const snippets = await prisma.snippet.findMany({
            where: {
                language,
                difficulty,
            }
        })
        
        let snippet = null
        if (snippets.length > 0) {
            // Pick a random snippet from the matched ones
            const randomIndex = Math.floor(Math.random() * snippets.length)
            snippet = snippets[randomIndex]
        } else {
             // Fallback if none found for criteria
            const anySnippet = await prisma.snippet.findFirst()
            snippet = anySnippet
        }

        if (!snippet) {
             return NextResponse.json({ 
                 id: "fallback-id",
                 content: "function calculateWPM(chars, timeTaken) { return (chars / 5) / (timeTaken / 60); }",
                 language: "javascript",
                 difficulty: "beginner",
                 category: "coding" 
             }, { status: 200 })
        }

        return NextResponse.json(snippet, { status: 200 })

    } catch (error) {
        console.error('Error fetching snippet:', error)
        return NextResponse.json({ error: 'Failed to fetch snippet' }, { status: 500 })
    }
}
