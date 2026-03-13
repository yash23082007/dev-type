import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const language = searchParams.get('language') || 'javascript'
        const difficulty = searchParams.get('difficulty') || 'intermediate'
        
        if (difficulty === 'algorithm') {
            const algoSnippets = [
                {
                    id: "algo-twosum",
                    content: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}",
                    language: "javascript",
                    difficulty: "algorithm",
                    category: "leetcode"
                },
                {
                    id: "algo-binarysearch",
                    content: "function search(nums, target) {\n  let left = 0;\n  let right = nums.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}",
                    language: "javascript",
                    difficulty: "algorithm",
                    category: "leetcode"
                }
            ]
            const randomIndex = Math.floor(Math.random() * algoSnippets.length)
            return NextResponse.json(algoSnippets[randomIndex], { status: 200 })
        }

        const snippets = await prisma.snippet.findMany({
            where: {
                language,
                difficulty,
            }
        })
        
        let snippet = null
        if (snippets.length > 0) {
            // Pick a random snippet from the matched ones
            const randomIndex = Math.floor(Math.random() * snippets.length)
            snippet = snippets[randomIndex]
        } else {
             // Fallback if none found for criteria
            const anySnippet = await prisma.snippet.findFirst()
            snippet = anySnippet
        }

        if (!snippet) {
             return NextResponse.json({ 
                 id: "fallback-id",
                 content: "function calculateWPM(chars, timeTaken) { return (chars / 5) / (timeTaken / 60); }",
                 language: "javascript",
                 difficulty: "beginner",
                 category: "coding" 
             }, { status: 200 })
        }

        return NextResponse.json(snippet, { status: 200 })

    } catch (error) {
        console.error('Error fetching snippet:', error)
        return NextResponse.json({ error: 'Failed to fetch snippet' }, { status: 500 })
    }
}
