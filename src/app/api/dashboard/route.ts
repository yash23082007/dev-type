import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's test results with recent history
    const testResults = await prisma.testResult.findMany({
      where: { userId: authUser.userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    // Compute stats
    const totalTests = testResults.length
    const avgWpm = totalTests > 0
      ? Math.round(testResults.reduce((sum, r) => sum + r.wpm, 0) / totalTests)
      : 0
    const avgAccuracy = totalTests > 0
      ? Math.round(testResults.reduce((sum, r) => sum + r.accuracy, 0) / totalTests * 10) / 10
      : 0
    const bestWpm = totalTests > 0
      ? Math.max(...testResults.map(r => r.wpm))
      : 0

    // Language breakdown
    const languageMap: Record<string, { count: number; avgWpm: number; totalWpm: number }> = {}
    testResults.forEach(r => {
      if (!languageMap[r.language]) {
        languageMap[r.language] = { count: 0, avgWpm: 0, totalWpm: 0 }
      }
      languageMap[r.language].count++
      languageMap[r.language].totalWpm += r.wpm
    })
    const languageBreakdown = Object.entries(languageMap).map(([lang, data]) => ({
      language: lang,
      count: data.count,
      avgWpm: Math.round(data.totalWpm / data.count),
    }))

    // WPM trend (last 20 tests, oldest first)
    const wpmTrend = testResults.slice(0, 20).reverse().map(r => ({
      wpm: r.wpm,
      accuracy: r.accuracy,
      language: r.language,
      date: r.createdAt,
    }))

    // Recent tests (last 10)
    const recentTests = testResults.slice(0, 10).map(r => ({
      id: r.id,
      wpm: r.wpm,
      cpm: r.cpm,
      accuracy: r.accuracy,
      language: r.language,
      difficulty: r.difficulty,
      timeTaken: r.timeTaken,
      date: r.createdAt,
    }))

    // Difficulty breakdown
    const difficultyMap: Record<string, { count: number; avgWpm: number; totalWpm: number }> = {}
    testResults.forEach(r => {
      const diff = r.difficulty || 'intermediate'
      if (!difficultyMap[diff]) {
        difficultyMap[diff] = { count: 0, avgWpm: 0, totalWpm: 0 }
      }
      difficultyMap[diff].count++
      difficultyMap[diff].totalWpm += r.wpm
    })
    const difficultyBreakdown = Object.entries(difficultyMap).map(([diff, data]) => ({
      difficulty: diff,
      count: data.count,
      avgWpm: Math.round(data.totalWpm / data.count),
    }))

    return NextResponse.json({
      stats: {
        totalTests,
        avgWpm,
        avgAccuracy,
        bestWpm,
      },
      languageBreakdown,
      difficultyBreakdown,
      wpmTrend,
      recentTests,
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 })
  }
}
