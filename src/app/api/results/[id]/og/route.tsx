import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params
        const id = params.id

        const result = await prisma.testResult.findUnique({
            where: { id }
        })

        if (!result) {
            return new Response('Not Found', { status: 404 })
        }

        const wpm = result.wpm
        const accuracy = result.accuracy
        const consistency = result.consistency ?? 100
        const language = result.language
        const difficulty = result.difficulty
        const mode = result.mode || 'normal'

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#050505',
                        backgroundImage: 'radial-gradient(circle at top, #0f0f0f, #050505)',
                        fontFamily: 'monospace',
                        color: '#ffffff',
                        padding: '40px',
                    }}
                >
                    {/* DevType Header */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
                        <span style={{ fontSize: '28px', fontWeight: 'bold', letterSpacing: '4px', color: '#00ff9d' }}>DEVTYPE</span>
                        <span style={{ fontSize: '20px', marginLeft: '10px', color: '#666666' }}>// RESULT</span>
                    </div>

                    {/* Stats Boxes */}
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '180px', height: '120px', backgroundColor: '#0f0f0f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                            <span style={{ fontSize: '12px', color: '#888888', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>WPM</span>
                            <span style={{ fontSize: '40px', fontWeight: 'black', color: '#00ff9d' }}>{wpm}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '180px', height: '120px', backgroundColor: '#0f0f0f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                            <span style={{ fontSize: '12px', color: '#888888', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Accuracy</span>
                            <span style={{ fontSize: '40px', fontWeight: 'black', color: '#ffffff' }}>{accuracy}%</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '180px', height: '120px', backgroundColor: '#0f0f0f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                            <span style={{ fontSize: '12px', color: '#888888', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Consistency</span>
                            <span style={{ fontSize: '40px', fontWeight: 'black', color: '#ffffff' }}>{consistency}%</span>
                        </div>
                    </div>

                    {/* Metadata Footer */}
                    <div style={{ display: 'flex', gap: '30px', fontSize: '14px', color: '#666666' }}>
                        <div>Language: <span style={{ color: '#ffffff', marginLeft: '5px' }}>{language.toUpperCase()}</span></div>
                        <div>Difficulty: <span style={{ color: '#ffffff', marginLeft: '5px' }}>{difficulty.toUpperCase()}</span></div>
                        <div>Mode: <span style={{ color: '#ffffff', marginLeft: '5px' }}>{mode.toUpperCase()}</span></div>
                    </div>
                </div>
            ),
            {
                width: 800,
                height: 400,
            }
        )
    } catch (e) {
        console.error('OG generation failed:', e)
        return new Response('Failed to generate image', { status: 500 })
    }
}
