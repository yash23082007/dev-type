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

const curatedSnippets = [
  // JAVASCRIPT - Beginner
  {
    content: "const greet = (name) => {\n  return `Hello, ${name}!`;\n};",
    language: "javascript",
    difficulty: "beginner",
    category: "coding",
    description: "Simple arrow function greeting message."
  },
  {
    content: "const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(num => num * 2);",
    language: "javascript",
    difficulty: "beginner",
    category: "coding",
    description: "Mapping array of numbers to double values."
  },
  // JAVASCRIPT - Intermediate
  {
    content: "function debounce(func, wait) {\n  let timeout;\n  return function(...args) {\n    clearTimeout(timeout);\n    timeout = setTimeout(() => func.apply(this, args), wait);\n  };\n}",
    language: "javascript",
    difficulty: "intermediate",
    category: "coding",
    description: "Standard debounce utility to rate-limit events."
  },
  {
    content: "const fetchUserData = async (userId) => {\n  try {\n    const response = await fetch(`/api/users/${userId}`);\n    return await response.json();\n  } catch (error) {\n    console.error('Failed to load user', error);\n  }\n};",
    language: "javascript",
    difficulty: "intermediate",
    category: "coding",
    description: "Asynchronous API fetch with try/catch logic."
  },
  // JAVASCRIPT - Advanced
  {
    content: "class QueryBuilder {\n  constructor(table) {\n    this.table = table;\n    this.conditions = [];\n  }\n  where(field, operator, value) {\n    this.conditions.push(`${field} ${operator} '${value}'`);\n    return this;\n  }\n  build() {\n    return `SELECT * FROM ${this.table} WHERE ${this.conditions.join(' AND ')}`;\n  }\n}",
    language: "javascript",
    difficulty: "advanced",
    category: "coding",
    description: "Query builder design pattern implementing chaining."
  },
  // PYTHON - Beginner
  {
    content: "def get_username(user_dict):\n    return user_dict.get('username', 'Guest')",
    language: "python",
    difficulty: "beginner",
    category: "coding",
    description: "Retrieving key from dictionary with default fallback."
  },
  // PYTHON - Intermediate
  {
    content: "def parse_config(file_path):\n    try:\n        with open(file_path, 'r') as file:\n            return json.load(file)\n    except FileNotFoundError:\n        return {}",
    language: "python",
    difficulty: "intermediate",
    category: "coding",
    description: "Safe configuration parser using file IO."
  },
  // PYTHON - Advanced
  {
    content: "import functools\n\ndef memoize(func):\n    cache = {}\n    @functools.wraps(func)\n    def wrapper(*args):\n        if args not in cache:\n            cache[args] = func(*args)\n        return cache[args]\n    return wrapper",
    language: "python",
    difficulty: "advanced",
    category: "coding",
    description: "Functools wrapper decorator implementing caching."
  },
  // HTML - Beginner
  {
    content: "<div className=\"flex items-center gap-2\">\n  <label htmlFor=\"email\">Email:</label>\n  <input type=\"email\" id=\"email\" placeholder=\"your@email.com\" />\n</div>",
    language: "html",
    difficulty: "beginner",
    category: "coding",
    description: "Email form layout with labeling."
  },
  // HTML - Intermediate
  {
    content: "<form onSubmit={handleSubmit} className=\"card\">\n  <h3>Account Sign In</h3>\n  <input type=\"text\" placeholder=\"Username\" required />\n  <input type=\"password\" placeholder=\"Password\" required />\n  <button type=\"submit\">Login</button>\n</form>",
    language: "html",
    difficulty: "intermediate",
    category: "coding",
    description: "Standard secure sign-in component form."
  },
  // HTML - Advanced
  {
    content: "<dialog id=\"confirm-modal\" className=\"modal\">\n  <form method=\"dialog\">\n    <h2>Confirm Deletion</h2>\n    <p>This action is permanent.</p>\n    <button value=\"cancel\">Cancel</button>\n    <button value=\"confirm\" className=\"btn-danger\">Delete</button>\n  </form>\n</dialog>",
    language: "html",
    difficulty: "advanced",
    category: "coding",
    description: "HTML5 native dialog element for validation warnings."
  },
  // CPP - Beginner
  {
    content: "#include <iostream>\n\nint main() {\n    std::cout << \"System ready.\" << std::endl;\n    return 0;\n}",
    language: "cpp",
    difficulty: "beginner",
    category: "coding",
    description: "C++ CLI entry point template."
  },
  // CPP - Intermediate
  {
    content: "#include <vector>\n#include <numeric>\n\ndouble getAverage(const std::vector<int>& grades) {\n    if (grades.empty()) return 0.0;\n    double sum = std::accumulate(grades.begin(), grades.end(), 0.0);\n    return sum / grades.size();\n}",
    language: "cpp",
    difficulty: "intermediate",
    category: "coding",
    description: "Vector accumulation logic calculating averages."
  },
  // CPP - Advanced
  {
    content: "#include <memory>\n\ntemplate <typename T>\nclass UniquePointer {\nprivate:\n    T* ptr;\npublic:\n    explicit UniquePointer(T* p = nullptr) : ptr(p) {}\n    ~UniquePointer() { delete ptr; }\n    T& operator*() const { return *ptr; }\n    T* operator->() const { return ptr; }\n};",
    language: "cpp",
    difficulty: "advanced",
    category: "coding",
    description: "Resource management template implementing unique pointers."
  },
  
  // LEETCODE (ALGORITHM) MODE SNIPPETS
  {
    content: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}",
    language: "javascript",
    difficulty: "algorithm",
    category: "leetcode",
    description: "Two Sum: Find two numbers in an array that add up to a target."
  },
  {
    content: "function search(nums, target) {\n  let left = 0;\n  let right = nums.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}",
    language: "javascript",
    difficulty: "algorithm",
    category: "leetcode",
    description: "Binary Search: Find a target value in a sorted array in O(log n)."
  },
  {
    content: "def two_sum(nums, target):\n    num_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in num_map:\n            return [num_map[complement], i]\n        num_map[num] = i\n    return []",
    language: "python",
    difficulty: "algorithm",
    category: "leetcode",
    description: "Two Sum: Find two numbers in an array that add up to a target."
  },
  {
    content: "def binary_search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1",
    language: "python",
    difficulty: "algorithm",
    category: "leetcode",
    description: "Binary Search: Find a target value in a sorted array in O(log n)."
  },
  {
    content: "#include <vector>\n#include <unordered_map>\n\nstd::vector<int> twoSum(std::vector<int>& nums, int target) {\n    std::unordered_map<int, int> map;\n    for (int i = 0; i < nums.size(); i++) {\n        int complement = target - nums[i];\n        if (map.find(complement) != map.end()) {\n            return {map[complement], i};\n        }\n        map[nums[i]] = i;\n    }\n    return {};\n}",
    language: "cpp",
    difficulty: "algorithm",
    category: "leetcode",
    description: "Two Sum: Find two numbers in an array that add up to a target."
  },
  {
    content: "#include <vector>\n\nint binarySearch(const std::vector<int>& nums, int target) {\n    int left = 0;\n    int right = nums.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}",
    language: "cpp",
    difficulty: "algorithm",
    category: "leetcode",
    description: "Binary Search: Find a target value in a sorted array in O(log n)."
  },

  // REAL FILE MODE SNIPPETS
  {
    content: "import express from 'express';\n\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\napp.use(express.json());\n\napp.get('/health', (req, res) => {\n  res.status(200).json({ status: 'OK', uptime: process.uptime() });\n});\n\napp.listen(PORT, () => {\n  console.log(`Server starting on port ${PORT}`);\n});",
    language: "javascript",
    difficulty: "intermediate",
    category: "file",
    description: "Express JS server setup with health check route."
  },
  {
    content: "import { Router } from 'express';\nconst router = Router();\n\nlet items = [];\n\nrouter.get('/', (req, res) => {\n  res.json(items);\n});\n\nrouter.post('/', (req, res) => {\n  const item = { id: Date.now(), name: req.body.name };\n  items.push(item);\n  res.status(201).json(item);\n});\n\nexport default router;",
    language: "javascript",
    difficulty: "advanced",
    category: "file",
    description: "Express router implementing basic REST endpoints."
  },
  {
    content: "class BSTNode:\n    def __init__(self, key):\n        self.left = None\n        self.right = None\n        self.val = key\n\ndef insert(root, key):\n    if root is None:\n        return BSTNode(key)\n    else:\n        if root.val == key:\n            return root\n        elif root.val < key:\n            root.right = insert(root.right, key)\n        else:\n            root.left = insert(root.left, key)\n    return root",
    language: "python",
    difficulty: "intermediate",
    category: "file",
    description: "Binary Search Tree node insertion algorithm."
  },
  {
    content: "from flask import Flask, jsonify, request\napp = Flask(__name__)\n\n@app.route('/api/v1/resource', methods=['GET'])\ndef get_resource():\n    return jsonify({\"status\": \"success\", \"data\": []})\n\nif __name__ == '__main__':\n    app.run(debug=True)",
    language: "python",
    difficulty: "advanced",
    category: "file",
    description: "Flask microframework bootstrap app."
  },
  {
    content: "#include <iostream>\n#include <vector>\n#include <queue>\n\nclass Graph {\n    int V;\n    std::vector<std::vector<int>> adj;\npublic:\n    Graph(int V) : V(V), adj(V) {}\n    void addEdge(int v, int w) { adj[v].push_back(w); }\n    void BFS(int s) {\n        std::vector<bool> visited(V, false);\n        std::queue<int> queue;\n        visited[s] = true;\n        queue.push(s);\n        while(!queue.empty()) {\n            s = queue.front();\n            std::cout << s << \" \";\n            queue.pop();\n            for (auto adjEC : adj[s]) {\n                if (!visited[adjEC]) {\n                    visited[adjEC] = true;\n                    queue.push(adjEC);\n                }\n            }\n        }\n    }\n};",
    language: "cpp",
    difficulty: "advanced",
    category: "file",
    description: "Breadth-First Search (BFS) graph traversal implementation."
  },
  {
    content: "#include <string>\n#include <vector>\n#include <algorithm>\n\nstruct Item {\n    int id;\n    std::string name;\n};\n\nclass Inventory {\n    std::vector<Item> list;\npublic:\n    void addItem(Item item) { list.push_back(item); }\n    void removeItem(int id) {\n        list.erase(std::remove_if(list.begin(), list.end(), [id](const Item& i) {\n            return i.id == id;\n        }), list.end());\n    }\n};",
    language: "cpp",
    difficulty: "intermediate",
    category: "file",
    description: "Item Inventory management class."
  },
  {
    content: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Landing Page</title>\n</head>\n<body>\n  <header>\n    <h1>Welcome to DevType</h1>\n    <p>The developer typing platform.</p>\n  </header>\n</body>\n</html>",
    language: "html",
    difficulty: "intermediate",
    category: "file",
    description: "Basic HTML5 web landing page structure."
  }
]

async function main() {
    console.log('Start seeding...')

    await prisma.snippet.deleteMany({})

    // 1. Seed curated snippets first
    let count = 0
    const snippets = new Set<string>()

    for (const item of curatedSnippets) {
        const uniqueKey = `${item.language}-${item.difficulty}-${item.content}`
        if (!snippets.has(uniqueKey)) {
            snippets.add(uniqueKey)
            await prisma.snippet.create({
                data: {
                    content: item.content,
                    language: item.language,
                    difficulty: item.difficulty,
                    category: item.category,
                    quality: "curated",
                    description: item.description
                }
            })
            count++
        }
    }
    console.log(`Seeded ${count} curated snippets.`)

    const languages = ["english", "javascript", "python", "html", "cpp"]
    const difficulties = ["beginner", "intermediate", "advanced"]

    // 2. Generate remaining snippets up to 600 total
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
                    category: lang === "english" ? "text_typing" : "coding",
                    quality: "generated"
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
