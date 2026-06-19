import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET(request: Request) {
    try {
        const authUser = await getAuthUser()
        if (!authUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const format = searchParams.get('format') || 'json'

        const results = await prisma.testResult.findMany({
            where: { userId: authUser.userId },
            orderBy: { createdAt: 'desc' }
        })

        if (format === 'csv') {
            const headers = ['date', 'language', 'difficulty', 'duration', 'wpm', 'rawWpm', 'accuracy', 'consistency', 'mode', 'failed', 'strictMode']
            const rows = results.map(r => [
                r.date || new Date(r.createdAt).toISOString().split('T')[0],
                r.language,
                r.difficulty,
                r.duration,
                r.wpm,
                r.rawWpm || '',
                r.accuracy,
                r.consistency || '',
                r.mode || 'normal',
                r.failed ? 'true' : 'false',
                r.strictMode || 'normal'
            ])

            const csvContent = [
                headers.join(','),
                ...rows.map(row => row.map(val => {
                    const str = String(val)
                    if (str.includes(',') || str.includes('\n') || str.includes('"')) {
                        return `"${str.replace(/"/g, '""')}"`
                    }
                    return str
                }).join(','))
            ].join('\n')

            return new Response(csvContent, {
                headers: {
                    'Content-Type': 'text/csv',
                    'Content-Disposition': 'attachment; filename="devtype_stats.csv"'
                }
            })
        }

        // Return JSON
        return new Response(JSON.stringify(results, null, 2), {
            headers: {
                'Content-Type': 'application/json',
                'Content-Disposition': 'attachment; filename="devtype_stats.json"'
            }
        })
    } catch (error) {
        console.error("Export data failed:", error)
        return NextResponse.json({ error: 'Failed to export data' }, { status: 500 })
    }
}
