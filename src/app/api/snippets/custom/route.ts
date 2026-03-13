import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_please_change_in_production'
)

export async function verifyAuth(token: string) {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
}

export async function POST(request: Request) {
    try {
        const token = request.headers.get('cookie')?.split('auth-token=')[1]?.split(';')[0];
        const payload = token ? await verifyAuth(token).catch(() => null) : null;
        
        if (!payload || !payload.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { content, language, title } = await request.json();

        if (!content || !language) {
            return NextResponse.json({ error: 'Missing content or language' }, { status: 400 });
        }

        const snippet = await prisma.customSnippet.create({
            data: {
                content,
                language,
                title: title || 'Untitled Snippet',
                userId: payload.id as string
            }
        });

        return NextResponse.json(snippet);
    } catch (error) {
        console.error("Failed to save custom snippet:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const token = request.headers.get('cookie')?.split('auth-token=')[1]?.split(';')[0];
        const payload = token ? await verifyAuth(token).catch(() => null) : null;
        
        if (!payload || !payload.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const snippets = await prisma.customSnippet.findMany({
            where: { userId: payload.id as string },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(snippets);
    } catch (error) {
        console.error("Failed to fetch custom snippets:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
