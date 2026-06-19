export interface CuratedSnippet {
  content: string
  language: string
  difficulty: string
  category: string
  quality: string
}

export const curatedSnippets: CuratedSnippet[] = [
  // JAVASCRIPT - Beginner
  {
    content: "const greet = (name) => {\n  return `Hello, ${name}!`;\n};",
    language: "javascript",
    difficulty: "beginner",
    category: "coding",
    quality: "curated"
  },
  {
    content: "const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(num => num * 2);",
    language: "javascript",
    difficulty: "beginner",
    category: "coding",
    quality: "curated"
  },
  {
    content: "const user = {\n  id: 101,\n  name: 'Alice',\n  role: 'Developer'\n};",
    language: "javascript",
    difficulty: "beginner",
    category: "coding",
    quality: "curated"
  },

  // JAVASCRIPT - Intermediate
  {
    content: "function debounce(func, wait) {\n  let timeout;\n  return function(...args) {\n    clearTimeout(timeout);\n    timeout = setTimeout(() => func.apply(this, args), wait);\n  };\n}",
    language: "javascript",
    difficulty: "intermediate",
    category: "coding",
    quality: "curated"
  },
  {
    content: "const fetchUserData = async (userId) => {\n  try {\n    const response = await fetch(`/api/users/${userId}`);\n    return await response.json();\n  } catch (error) {\n    console.error('Failed to load user', error);\n  }\n};",
    language: "javascript",
    difficulty: "intermediate",
    category: "coding",
    quality: "curated"
  },
  {
    content: "const uniqueItems = [...new Set(rawData.map(item => item.category))];",
    language: "javascript",
    difficulty: "intermediate",
    category: "coding",
    quality: "curated"
  },

  // JAVASCRIPT - Advanced
  {
    content: "class QueryBuilder {\n  constructor(table) {\n    this.table = table;\n    this.conditions = [];\n  }\n  where(field, operator, value) {\n    this.conditions.push(`${field} ${operator} '${value}'`);\n    return this;\n  }\n  build() {\n    return `SELECT * FROM ${this.table} WHERE ${this.conditions.join(' AND ')}`;\n  }\n}",
    language: "javascript",
    difficulty: "advanced",
    category: "coding",
    quality: "curated"
  },
  {
    content: "const pipeline = (...fns) => (x) => fns.reduce((v, f) => f(v), x);\nconst multiplyByTwo = x => x * 2;\nconst addThree = x => x + 3;\nconst transform = pipeline(multiplyByTwo, addThree);",
    language: "javascript",
    difficulty: "advanced",
    category: "coding",
    quality: "curated"
  },

  // PYTHON - Beginner
  {
    content: "def get_username(user_dict):\n    return user_dict.get('username', 'Guest')",
    language: "python",
    difficulty: "beginner",
    category: "coding",
    quality: "curated"
  },
  {
    content: "numbers = [1, 2, 3, 4, 5]\nsquares = [x ** 2 for x in numbers if x % 2 == 0]",
    language: "python",
    difficulty: "beginner",
    category: "coding",
    quality: "curated"
  },

  // PYTHON - Intermediate
  {
    content: "def parse_config(file_path):\n    try:\n        with open(file_path, 'r') as file:\n            return json.load(file)\n    except FileNotFoundError:\n        return {}",
    language: "python",
    difficulty: "intermediate",
    category: "coding",
    quality: "curated"
  },
  {
    content: "class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n\n    @property\n    def area(self):\n        return 3.14159 * (self.radius ** 2)",
    language: "python",
    difficulty: "intermediate",
    category: "coding",
    quality: "curated"
  },

  // PYTHON - Advanced
  {
    content: "import functools\n\ndef memoize(func):\n    cache = {}\n    @functools.wraps(func)\n    def wrapper(*args):\n        if args not in cache:\n            cache[args] = func(*args)\n        return cache[args]\n    return wrapper",
    language: "python",
    difficulty: "advanced",
    category: "coding",
    quality: "curated"
  },
  {
    content: "class DatabaseConnection:\n    def __enter__(self):\n        self.connect()\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        self.close()",
    language: "python",
    difficulty: "advanced",
    category: "coding",
    quality: "curated"
  },

  // HTML - Beginner
  {
    content: "<div className=\"flex items-center gap-2\">\n  <label htmlFor=\"email\">Email:</label>\n  <input type=\"email\" id=\"email\" placeholder=\"your@email.com\" />\n</div>",
    language: "html",
    difficulty: "beginner",
    category: "coding",
    quality: "curated"
  },
  {
    content: "<nav className=\"navbar\">\n  <ul>\n    <li><a href=\"/\">Home</a></li>\n    <li><a href=\"/dashboard\">Dashboard</a></li>\n  </ul>\n</nav>",
    language: "html",
    difficulty: "beginner",
    category: "coding",
    quality: "curated"
  },

  // HTML - Intermediate
  {
    content: "<form onSubmit={handleSubmit} className=\"card\">\n  <h3>Account Sign In</h3>\n  <input type=\"text\" placeholder=\"Username\" required />\n  <input type=\"password\" placeholder=\"Password\" required />\n  <button type=\"submit\">Login</button>\n</form>",
    language: "html",
    difficulty: "intermediate",
    category: "coding",
    quality: "curated"
  },
  {
    content: "<figure>\n  <img src=\"/assets/hero.webp\" alt=\"Cyberpunk Interface\" />\n  <figcaption>System Status Dashboard v1.0.4</figcaption>\n</figure>",
    language: "html",
    difficulty: "intermediate",
    category: "coding",
    quality: "curated"
  },

  // HTML - Advanced
  {
    content: "<dialog id=\"confirm-modal\" className=\"modal\">\n  <form method=\"dialog\">\n    <h2>Confirm Deletion</h2>\n    <p>This action is permanent.</p>\n    <button value=\"cancel\">Cancel</button>\n    <button value=\"confirm\" className=\"btn-danger\">Delete</button>\n  </form>\n</dialog>",
    language: "html",
    difficulty: "advanced",
    category: "coding",
    quality: "curated"
  },

  // C++ - Beginner
  {
    content: "#include <iostream>\n\nint main() {\n    std::cout << \"System ready.\" << std::endl;\n    return 0;\n}",
    language: "cpp",
    difficulty: "beginner",
    category: "coding",
    quality: "curated"
  },
  {
    content: "int sum(int a, int b) {\n    return a + b;\n}",
    language: "cpp",
    difficulty: "beginner",
    category: "coding",
    quality: "curated"
  },

  // C++ - Intermediate
  {
    content: "#include <vector>\n#include <numeric>\n\ndouble getAverage(const std::vector<int>& grades) {\n    if (grades.empty()) return 0.0;\n    double sum = std::accumulate(grades.begin(), grades.end(), 0.0);\n    return sum / grades.size();\n}",
    language: "cpp",
    difficulty: "intermediate",
    category: "coding",
    quality: "curated"
  },
  {
    content: "#include <string>\n\nclass SmartDevice {\nprivate:\n    std::string deviceId;\n    bool isOnline;\npublic:\n    SmartDevice(std::string id) : deviceId(id), isOnline(false) {}\n    void toggleState() { isOnline = !isOnline; }\n};",
    language: "cpp",
    difficulty: "intermediate",
    category: "coding",
    quality: "curated"
  },

  // C++ - Advanced
  {
    content: "#include <memory>\n\ntemplate <typename T>\nclass UniquePointer {\nprivate:\n    T* ptr;\npublic:\n    explicit UniquePointer(T* p = nullptr) : ptr(p) {}\n    ~UniquePointer() { delete ptr; }\n    T& operator*() const { return *ptr; }\n    T* operator->() const { return ptr; }\n};",
    language: "cpp",
    difficulty: "advanced",
    category: "coding",
    quality: "curated"
  }
];
