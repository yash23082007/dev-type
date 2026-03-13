import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

// POST a new test result
export async function POST(request: Request) {
    try {
        const authUser = await getAuthUser()
        const body = await request.json()
        const { snippetId, language, difficulty, wpm, cpm, accuracy, timeTaken, mistakes } = body

        if (!snippetId || !language) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        let userId: string

        if (authUser) {
            userId = authUser.userId
        } else {
            // Create or find a guest user for unauthenticated tests
            const guestUsername = 'guest_' + Math.floor(Math.random() * 100000)
            const guestUser = await prisma.user.create({
                data: {
                    username: guestUsername,
                    email: `${guestUsername}@devtype.local`,
                    password: 'guest',
                    totalTests: 0,
                    avgWpm: 0,
                    highestWpm: 0,
                    streak: 0,
                }
            })
            userId = guestUser.id
        }

        // Create the TestResult
        const result = await prisma.testResult.create({
            data: {
                userId,
                snippetId,
                language,
                difficulty: difficulty || 'intermediate',
                wpm,
                cpm,
                accuracy,
                timeTaken,
                mistakes: mistakes || {},
            }
        })

        // Update User stats
        const user = await prisma.user.findUnique({ where: { id: userId } })
        if (user) {
            const newTotalTests = user.totalTests + 1
            const newHighestWpm = Math.max(user.highestWpm, wpm)
            const newAvgWpm = ((user.avgWpm * user.totalTests) + wpm) / newTotalTests
            const newAvgAccuracy = ((user.avgAccuracy * user.totalTests) + accuracy) / newTotalTests

            let newStreak = user.streak
            if (user.lastTestDate) {
                const lastDate = new Date(user.lastTestDate)
                const today = new Date()
                
                // Compare just the dates
                const isConsecutive = (today.setHours(0,0,0,0) - lastDate.setHours(0,0,0,0)) === 86400000
                const isSameDay = (today.setHours(0,0,0,0) === lastDate.setHours(0,0,0,0))

                if (isConsecutive) {
                    newStreak += 1
                } else if (!isSameDay) {
                    newStreak = 1
                }
            } else {
                newStreak = 1
            }

            await prisma.user.update({
                where: { id: userId },
                data: {
                    totalTests: newTotalTests,
                    highestWpm: newHighestWpm,
                    avgWpm: newAvgWpm,
                    avgAccuracy: newAvgAccuracy,
                    lastTestDate: new Date(),
                    streak: newStreak
                }
            })
        }

        return NextResponse.json(result, { status: 201 })
    } catch (error) {
        console.error('Error saving score:', error)
        return NextResponse.json({ error: 'Failed to save score' }, { status: 500 })
    }
}

// GET leaderboard
export async function GET() {
    try {
        const leaderboard = await prisma.testResult.findMany({
            take: 20,
            orderBy: {
                wpm: 'desc'
            },
            include: {
                user: {
                    select: {
                        username: true,
                        avatarUrl: true
                    }
                }
            }
        })

        return NextResponse.json(leaderboard, { status: 200 })
    } catch (error) {
        console.error('Error fetching leaderboard:', error)
        return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 })
    }
}
