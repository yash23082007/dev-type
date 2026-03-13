import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy_key'
})

export async function POST(request: Request) {
    try {
        const { language, difficulty, topic } = await request.json()

        if (!language || !difficulty || !topic) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
        }

        if (!process.env.OPENAI_API_KEY) {
             return NextResponse.json({ 
                content: `// Please set OPENAI_API_KEY in .env to use AI features.\n// Mock generated snippet for ${language} (${topic} - ${difficulty})\nfunction example() {\n  console.log("Hello AI");\n}`,
                id: `ai-mock-${Date.now()}`
             })
        }

        const prompt = `Generate a raw ${language} code snippet. 
        Topic: ${topic}. 
        Difficulty: ${difficulty}. 
        Length: 5 to 12 lines.
        Only output the raw code. Do not include markdown code blocks (\`\`\`). Do not include any explanations.`

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 150,
            temperature: 0.7,
        })

        const content = response.choices[0].message.content?.trim() || ''

        // Mock saving to DB. We return it so the frontend can put it in the store.
        const mockSnippetData = {
            id: `ai-gen-${Date.now()}`,
            content: content.replace(/^```[\s\S]*?\n/, '').replace(/```$/, ''), // extra safety
        }

        return NextResponse.json(mockSnippetData)

    } catch (error) {
        console.error("AI Generation Error", error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
