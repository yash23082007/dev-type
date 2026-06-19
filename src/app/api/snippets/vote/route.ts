import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function POST(request: Request) {
    try {
        const authUser = await getAuthUser()
        if (!authUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { snippetId, direction } = body

        if (!snippetId || (direction !== 1 && direction !== -1)) {
            return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 })
        }

        const snippet = await prisma.snippet.findUnique({
            where: { id: snippetId }
        })

        if (!snippet) {
            return NextResponse.json({ error: 'Snippet not found' }, { status: 404 })
        }

        const votedUserIds = snippet.votedUserIds || []
        const hasVoted = votedUserIds.includes(authUser.userId)

        if (hasVoted) {
            return NextResponse.json({ error: 'You have already voted on this snippet' }, { status: 400 })
        }

        const updatedSnippet = await prisma.snippet.update({
            where: { id: snippetId },
            data: {
                votes: {
                    increment: direction
                },
                votedUserIds: {
                    push: authUser.userId
                }
            }
        })

        return NextResponse.json(updatedSnippet, { status: 200 })
    } catch (error) {
        console.error("Snippet voting API error:", error)
        return NextResponse.json({ error: 'Failed to record vote' }, { status: 500 })
    }
}
