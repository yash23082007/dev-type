import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const language = searchParams.get('language') || 'javascript'
        const difficulty = searchParams.get('difficulty') || 'intermediate'
        const category = searchParams.get('category')
        
        let snippets = []

        if (category) {
            snippets = await prisma.snippet.findMany({
                where: {
                    language,
                    category
                }
            })
        } else {
            // 1. Try to fetch curated snippets matching the criteria
            snippets = await prisma.snippet.findMany({
                where: {
                    language,
                    difficulty,
                    quality: 'curated'
                }
            })
            
            // 2. If no curated found, try to fetch generated snippets
            if (snippets.length === 0) {
                snippets = await prisma.snippet.findMany({
                    where: {
                        language,
                        difficulty,
                        quality: 'generated'
                    }
                })
            }

            // 3. If still no snippets found (e.g. for algorithm mode in diacritic/markdown cases), fallback to any matching language
            if (snippets.length === 0) {
                snippets = await prisma.snippet.findMany({
                    where: {
                        language
                    }
                })
            }
        }
        
        let snippet = null
        if (snippets.length > 0) {
            // Pick a random snippet from the matched ones
            const randomIndex = Math.floor(Math.random() * snippets.length)
            snippet = snippets[randomIndex]
        }

        if (!snippet) {
             return NextResponse.json({ 
                 id: "fallback-id",
                 content: "function calculateWPM(chars, timeTaken) { return (chars / 5) / (timeTaken / 60); }",
                 language: "javascript",
                 difficulty: "beginner",
                 category: "coding",
                 quality: "curated",
                 description: "Default fallback javascript snippet."
             }, { status: 200 })
        }

        return NextResponse.json(snippet, { status: 200 })

    } catch (error) {
        console.error('Error fetching snippet:', error)
        return NextResponse.json({ error: 'Failed to fetch snippet' }, { status: 500 })
    }
}
