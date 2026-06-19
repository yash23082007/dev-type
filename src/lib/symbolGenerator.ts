const drills: Record<string, string[]> = {
    javascript: [
        "const fn = async () => { return data?.items?.map(x => `${x.id}`) ?? [] }",
        "const { x, y } = coord || { x: 0, y: 0 }; const arr = [...items, { id: 1 }];",
        "const result = await fetch(url) && (await res.json() || {});",
        "import { useState, useEffect } from 'react'; const [data, setData] = useState(null);",
        "const pipeline = (...fns) => (x) => fns.reduce((v, f) => f(v), x);",
        "const handler = (e) => { e.preventDefault(); console.log(e?.target?.value); };",
        "const config = { headers: { 'Authorization': `Bearer ${token}` } };",
        "const merged = { ...defaultConfig, ...options, debug: true };"
    ],
    python: [
        "items: list[str] = [x.name for x in users if x.is_active]",
        "data = {**kwargs, \"status\": \"ok\", \"items\": []}",
        "async def main() -> None: await asyncio.gather(*[tasks])",
        "self.__value = value if value is not None else []",
        "def __init__(self, items: list = None) -> None: self.items = items or []",
        "class Node(Generic[T]): next: Optional['Node'] = None",
        "res = [x for x in range(10) if x % 2 == 0 or x % 3 == 0]",
        "logger.info(f\"User {user.id} logged in at {timestamp}\")"
    ],
    cpp: [
        "std::vector<std::pair<int, int>> dp(n, {0, 0});",
        "auto ptr = std::make_unique<int[]>(size);",
        "for (const auto& [key, val] : map) { std::cout << key << \" => \" << val << std::endl; }",
        "template <typename T> class Stack { private: std::vector<T> elems; };",
        "int* ptr = &val; double result = (b * b) - (4 * a * c);",
        "std::cout << \"[Error]: \" << err_msg << \"\\n\";",
        "auto lambda = [](int x, int y) -> bool { return x < y; };",
        "if (ptr != nullptr && *ptr > 0) { dp.push_back({*ptr, 0}); }"
    ],
    html: [
        "<div className=\"flex items-center\" style={{ width: \"100%\" }}>",
        "<ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>",
        "<input type=\"checkbox\" checked={isChecked} onChange={handleToggle} />",
        "<form onSubmit={onSubmit}><button type=\"submit\">Confirm</button></form>",
        "<dialog id=\"modal\" className=\"modal\"><form method=\"dialog\"><h2>Dialog</h2></form></dialog>",
        "<span className={`badge badge-${status === 'active' ? 'primary' : 'secondary'}`}></span>",
        "<a href={`/user/${id}`} className=\"hover:underline\">Profile</a>",
        "<img src={src || '/placeholder.png'} alt=\"dynamic image\" />"
    ],
    english: [
        "!:;? @#$% ^&*() _+ {}|: \"<>? []\\;',./ ~`=-",
        "The symbols { [ ( ) ] } are extremely common in programming, as well as =>, ?., && and ||.",
        "const char* str = \"hello\"; int arr[5] = {1, 2, 3, 4, 5};",
        "a += b; c -= d; e *= f; g /= h; i %= j; k == l; m != n;",
        "if (a && b || !c) { return d ? e : f; }"
    ]
}

export function generateSymbolDrill(language: string): string {
    const lang = language.toLowerCase()
    const list = drills[lang] || drills['english']
    
    // Pick 2-3 random templates from the list and join them with a space
    const count = 3
    const selected: string[] = []
    
    for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * list.length)
        selected.push(list[idx])
    }
    
    return selected.join(" ")
}
