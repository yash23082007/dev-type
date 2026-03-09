import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper to get random item
const sample = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

// --- ENGLISH ---
const subjects = ["The quick brown fox", "A lazy developer", "An eager student", "The agile consultant", "Our dedicated team", "Every programmer", "A curious cat", "The silent guardian"]
const verbs = ["jumps over", "debugs", "refactors", "deploys", "analyzes", "optimizes", "compiles", "reviews"]
const objects = ["the lazy dog.", "legacy code.", "a complex algorithm.", "production servers.", "the database schema.", "an ancient system.", "a sleeping hound.", "the entire application."]
const adjectives = ["beautiful", "efficient", "terrible", "elegant", "robust", "flawed", "perfect", "chaotic"]
const nouns = ["interface", "module", "system", "architecture", "component", "function", "API", "framework"]

function generateEnglish(difficulty: string): string {
    if (difficulty === "beginner") {
        return `${sample(subjects)} ${sample(verbs)} ${sample(objects)}`
    } else if (difficulty === "intermediate") {
        return `${sample(subjects)} ${sample(verbs)} ${sample(objects)} The ${sample(adjectives)} ${sample(nouns)} relies on it heavily.`
    } else {
        return `While ${sample(subjects).toLowerCase()} ${sample(verbs)} ${sample(objects)}, we must ensure the ${sample(adjectives)} ${sample(nouns)} remains stable and performant under load.`
    }
}

// --- JAVASCRIPT ---
const jsVars = ["data", "result", "user", "config", "items", "payload", "response", "element"]
const jsFuncs = ["calculate", "process", "fetch", "update", "render", "validate", "transform", "initialize"]

function generateJS(difficulty: string): string {
    const v = sample(jsVars)
    const f = sample(jsFuncs)
    if (difficulty === "beginner") {
        return `const ${v} = ${randomInt(10, 100)};\nconsole.log(${v});`
    } else if (difficulty === "intermediate") {
        return `function ${f}(${v}) {\n  if (!${v}) return null;\n  return ${v}.map(x => x * ${randomInt(2, 5)});\n}`
    } else {
        return `const ${f}Async = async (${v}Id) => {\n  try {\n    const res = await fetch(\`/api/${v}/\${${v}Id}\`);\n    const ${v} = await res.json();\n    return ${v};\n  } catch (err) {\n    console.error(err);\n  }\n};`
    }
}

// --- PYTHON ---
const pyVars = ["user_id", "data_list", "config_dict", "result_set", "item_count", "payload_str"]
const pyFuncs = ["calculate_metrics", "process_data", "fetch_records", "update_state", "validate_input"]

function generatePython(difficulty: string): string {
    const v = sample(pyVars)
    const f = sample(pyFuncs)
    if (difficulty === "beginner") {
        return `${v} = ${randomInt(1, 100)}\nprint(f"Value: {${v}}")`
    } else if (difficulty === "intermediate") {
        return `def ${f}(${v}):\n    if not ${v}:\n        return []\n    return [x * ${randomInt(2, 5)} for x in ${v}]`
    } else {
        return `class ${f.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}:\n    def __init__(self, ${v}):\n        self.${v} = ${v}\n        self.is_active = True\n\n    def deactivate(self):\n        self.is_active = False`
    }
}

// --- HTML ---
const tags = ["div", "span", "section", "article", "main", "header", "footer", "nav"]
const classes = ["container", "wrapper", "content", "card", "flex-row", "grid-cols", "text-center", "p-4"]

function generateHTML(difficulty: string): string {
    const t = sample(tags)
    const c = sample(classes)
    if (difficulty === "beginner") {
        return `<${t} class="${c}">\n  Hello World\n</${t}>`
    } else if (difficulty === "intermediate") {
        return `<${t} class="${c}">\n  <h1>Title</h1>\n  <p>Some description here.</p>\n  <button>Click Me</button>\n</${t}>`
    } else {
        return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Document</title>\n</head>\n<body>\n  <${t} id="app" class="${c}">\n    <!-- Content goes here -->\n  </${t}>\n</body>\n</html>`
    }
}

// --- CPP ---
const cppTypes = ["int", "float", "double", "std::string", "bool"]
const cppFuncs = ["calculateSum", "findMax", "processItems", "initializeSystem"]

function generateCPP(difficulty: string): string {
    const type = sample(cppTypes)
    const func = sample(cppFuncs)
    if (difficulty === "beginner") {
        return `#include <iostream>\n\nint main() {\n    std::cout << "Hello World!" << std::endl;\n    return 0;\n}`
    } else if (difficulty === "intermediate") {
        return `${type} ${func}(${type} a, ${type} b) {\n    if (a > b) {\n        return a;\n    }\n    return b;\n}`
    } else {
        return `#include <vector>\n#include <algorithm>\n\nvoid sortVector(std::vector<int>& vec) {\n    std::sort(vec.begin(), vec.end());\n    for(int i = 0; i < vec.size(); i++) {\n        vec[i] *= 2;\n    }\n}`
    }
}

const generators: Record<string, (diff: string) => string> = {
    english: generateEnglish,
    javascript: generateJS,
    python: generatePython,
    html: generateHTML,
    cpp: generateCPP
}

async function main() {
    console.log('Start seeding...')

    await prisma.snippet.deleteMany({})

    const languages = ["english", "javascript", "python", "html", "cpp"]
    const difficulties = ["beginner", "intermediate", "advanced"]
    
    let count = 0
    const snippets = new Set<string>()

    // Generate ~600 unique snippets
    while (snippets.size < 600) {
        const lang = sample(languages)
        const diff = sample(difficulties)
        const content = generators[lang](diff)
        
        // Ensure uniqueness
        const uniqueKey = `${lang}-${diff}-${content}`
        
        if (!snippets.has(uniqueKey)) {
            snippets.add(uniqueKey)
            await prisma.snippet.create({
                data: {
                    content,
                    language: lang,
                    difficulty: diff,
                    category: lang === "english" ? "text_typing" : "coding"
                }
            })
            count++
            if (count % 100 === 0) console.log(`Created ${count} snippets...`)
        }
    }

    console.log(`Seeding finished. Generated ${count} total snippets.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
