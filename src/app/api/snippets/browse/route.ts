import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const language = searchParams.get('language') || 'all'
        const difficulty = searchParams.get('difficulty') || 'all'
        const category = searchParams.get('category') || 'all'
        const search = searchParams.get('search') || ''
        const sort = searchParams.get('sort') || 'newest'

        const whereClause: Record<string, unknown> = {}
        if (language !== 'all') {
            whereClause.language = language.toLowerCase()
        }
        if (difficulty !== 'all') {
            whereClause.difficulty = difficulty.toLowerCase()
        }
        if (category !== 'all') {
            whereClause.category = category.toLowerCase()
        }
        if (search) {
            whereClause.content = {
                contains: search,
                mode: 'insensitive'
            }
        }

        let orderBy: Record<string, 'asc' | 'desc'> = { id: 'desc' }
        if (sort === 'votes') {
            orderBy = { votes: 'desc' }
        } else if (sort === 'used') {
            orderBy = { timesUsed: 'desc' }
        }

        const snippets = await prisma.snippet.findMany({
            where: whereClause,
            orderBy,
            take: 40
        })

        return NextResponse.json(snippets, { status: 200 })
    } catch (error) {
        console.error("Browse snippets API error:", error)
        return NextResponse.json({ error: 'Failed to browse snippets' }, { status: 500 })
    }
}
