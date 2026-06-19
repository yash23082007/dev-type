import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

// POST a new test result
export async function POST(request: Request) {
    try {
        const authUser = await getAuthUser()
        const body = await request.json()
        const { 
            snippetId, language, difficulty, wpm, rawWpm, consistency, 
            wpmTimeline, charTimings, cpm, accuracy, timeTaken, duration, mistakes,
            isCustom, failed, strictMode, mode
        } = body

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

        // Anti-cheat / validation
        let flagged = false
        const parsedWpm = parseFloat(wpm)
        const parsedAccuracy = parseFloat(accuracy)
        
        if (parsedWpm > 220 || (parsedAccuracy === 100 && parsedWpm > 150)) {
            flagged = true
        }

        if (duration && timeTaken) {
            const timeTakenNum = parseInt(timeTaken)
            if (timeTakenNum < 2 && parsedWpm > 100) {
                flagged = true
            }
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
                rawWpm: rawWpm !== undefined ? parseFloat(rawWpm) : null,
                consistency: consistency !== undefined ? parseFloat(consistency) : null,
                wpmTimeline: wpmTimeline || null,
                charTimings: charTimings || null,
                isCustom: isCustom || false,
                failed: failed || false,
                strictMode: strictMode || 'normal',
                mode: mode || 'normal',
                date: new Date().toISOString().split('T')[0],
                flagged
            }
        })

        // Check for personal best
        let isNewPersonalBest = false
        if (authUser && duration && !failed && !isCustom && !flagged) {
            const parsedDuration = parseInt(duration)

            const existingPB = await prisma.personalBest.findUnique({
                where: {
                    userId_language_difficulty_duration: {
                        userId: authUser.userId,
                        language,
                        difficulty: difficulty || 'intermediate',
                        duration: parsedDuration,
                    }
                }
            })

            if (!existingPB) {
                await prisma.personalBest.create({
                    data: {
                        userId: authUser.userId,
                        language,
                        difficulty: difficulty || 'intermediate',
                        duration: parsedDuration,
                        wpm: parsedWpm,
                        accuracy: parsedAccuracy,
                        consistency: consistency !== undefined ? parseFloat(consistency) : 0,
                        rawWpm: rawWpm !== undefined ? parseFloat(rawWpm) : 0,
                    }
                })
                isNewPersonalBest = true
            } else if (parsedWpm > existingPB.wpm || (parsedWpm === existingPB.wpm && parsedAccuracy > existingPB.accuracy)) {
                await prisma.personalBest.update({
                    where: {
                        userId_language_difficulty_duration: {
                            userId: authUser.userId,
                            language,
                            difficulty: difficulty || 'intermediate',
                            duration: parsedDuration,
                        }
                    },
                    data: {
                        wpm: parsedWpm,
                        accuracy: parsedAccuracy,
                        consistency: consistency !== undefined ? parseFloat(consistency) : 0,
                        rawWpm: rawWpm !== undefined ? parseFloat(rawWpm) : 0,
                        achievedAt: new Date()
                    }
                })
                isNewPersonalBest = true
            }
        }

        // Update User stats
        const user = await prisma.user.findUnique({ where: { id: userId } })
        if (user) {
            const newTotalTests = user.totalTests + 1
            const newHighestWpm = Math.max(user.highestWpm, wpm)
            const newAvgWpm = ((user.avgWpm * user.totalTests) + wpm) / newTotalTests
            const newAvgAccuracy = ((user.avgAccuracy * user.totalTests) + accuracy) / newTotalTests

            let newStreak = user.streak
            let newStreakFreeze = user.streakFreeze || 0

            if (user.lastTestDate) {
                const lastDate = new Date(user.lastTestDate)
                const today = new Date()
                
                const msInDay = 86400000
                const diffTime = today.setHours(0,0,0,0) - lastDate.setHours(0,0,0,0)
                const isConsecutive = diffTime === msInDay
                const isSameDay = diffTime === 0

                if (isConsecutive) {
                    newStreak += 1
                    if (newStreak % 7 === 0) {
                        newStreakFreeze = Math.min(1, newStreakFreeze + 1)
                    }
                } else if (!isSameDay) {
                    // diffTime > msInDay (gap of 2 or more days)
                    if (newStreakFreeze > 0) {
                        newStreakFreeze -= 1
                        newStreak += 1
                        if (newStreak % 7 === 0) {
                            newStreakFreeze = Math.min(1, newStreakFreeze + 1)
                        }
                    } else {
                        newStreak = 1
                    }
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
                    streak: newStreak,
                    streakFreeze: newStreakFreeze
                }
            })
        }

        return NextResponse.json({ ...result, isNewPersonalBest }, { status: 201 })
    } catch (error) {
        console.error('Error saving score:', error)
        return NextResponse.json({ error: 'Failed to save score' }, { status: 500 })
    }
}

// GET leaderboard
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type') // daily, leetcode, or all-time
        
        const whereClause: Record<string, unknown> = {
            failed: false,
            isCustom: false,
            flagged: false
        }

        if (type === 'daily') {
            const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
            whereClause.createdAt = { gte: oneDayAgo }
        } else if (type === 'leetcode') {
            whereClause.difficulty = 'algorithm'
        }

        const leaderboard = await prisma.testResult.findMany({
            where: whereClause,
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
