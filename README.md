<div align="center">

# ⌨️ DevType

### _Where Developers Sharpen Their Keystrokes_

<br/>

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

<br/>

**DevType isn't just another typing test.**<br/>
It's a developer-first experience — built by a coder, for coders.<br/>
Practice typing _actual_ code, not random paragraphs about sunsets.

<br/>

```
 ██████╗ ███████╗██╗   ██╗████████╗██╗   ██╗██████╗ ███████╗
 ██╔══██╗██╔════╝██║   ██║╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝
 ██║  ██║█████╗  ██║   ██║   ██║    ╚████╔╝ ██████╔╝█████╗
 ██║  ██║██╔══╝  ╚██╗ ██╔╝   ██║     ╚██╔╝  ██╔═══╝ ██╔══╝
 ██████╔╝███████╗ ╚████╔╝    ██║      ██║   ██║     ███████╗
 ╚═════╝ ╚══════╝  ╚═══╝     ╚═╝      ╚═╝   ╚═╝     ╚══════╝
```

</div>

---

## 💡 The Story Behind It

Ever tried warming up before a coding session? Most typing tests throw random English at you — _"The quick brown fox jumps..."_ — and that's fine, but it doesn't prepare your fingers for the characters that actually matter: `{}`, `=>`, `//`, `</>`.

DevType was born out of that frustration. I wanted something that feels like a real IDE warm-up — not a grade-school typing class. So I built one.

---

## ✨ Features at a Glance

| Feature | Description |
|:--------|:------------|
| 🖥️ **Code-First Typing** | Practice with **JavaScript**, **Python**, **HTML**, **C++**, and **English** — real syntax, real logic |
| 📊 **Live Metrics HUD** | Watch your **WPM**, **accuracy**, and **errors** update in real-time as you type |
| ⏱️ **Flexible Timers** | Choose between **15s**, **30s**, **60s**, or **120s** sessions to match your mood |
| 🎯 **3 Difficulty Levels** | From gentle `console.log()` to async class architectures — pick your poison |
| 🔐 **Secure Auth System** | JWT tokens in httpOnly cookies + bcrypt hashing — your data stays yours |
| 📈 **Personal Dashboard** | WPM trends, language breakdowns, test history — track your growth over time |
| 🏆 **Global Leaderboard** | See how you stack up against other developers worldwide |
| 🎨 **Cyberpunk UI** | Dark theme with neon accents, glass panels, GSAP animations, and glow effects |
| ⌨️ **Smart Shortcuts** | Start typing to begin • `Tab + Enter` to instantly restart |
| 🔄 **600+ Snippets** | Procedurally generated content means you rarely see the same snippet twice |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                           │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────┐    │
│  │  React   │  │  Zustand  │  │   GSAP + Tailwind  │    │
│  │  19 + TS │  │  Stores   │  │   Animations + UI  │    │
│  └────┬─────┘  └─────┬────┘  └────────┬───────────┘    │
│       │              │               │                  │
│       └──────────────┼───────────────┘                  │
│                      │                                  │
├──────────────────────┼──────────────────────────────────┤
│                  NEXT.JS 16                             │
│              App Router + Middleware                     │
│                      │                                  │
├──────────────────────┼──────────────────────────────────┤
│                   API LAYER                             │
│  ┌────────┐  ┌──────────┐  ┌───────────┐  ┌────────┐  │
│  │  Auth   │  │ Snippets │  │  Scores   │  │ Dashbd │  │
│  │ Routes  │  │  Route   │  │  Route    │  │ Route  │  │
│  └────┬───┘  └────┬─────┘  └─────┬─────┘  └───┬────┘  │
│       └───────────┼──────────────┼─────────────┘       │
│                   │              │                      │
├───────────────────┼──────────────┼──────────────────────┤
│                 DATABASE                                │
│        ┌──────────┴──────────────┴──────────┐          │
│        │    MongoDB + Prisma ORM            │          │
│        │  ┌──────┐ ┌────────┐ ┌──────────┐ │          │
│        │  │ User │ │Snippet │ │TestResult│ │          │
│        │  └──────┘ └────────┘ └──────────┘ │          │
│        └────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack Deep Dive

<table>
<tr>
<td width="50%">

### 🎨 Frontend
| Tech | Purpose |
|:-----|:--------|
| ⚡ Next.js 16 | App Router, SSR, API routes |
| ⚛️ React 19 | UI components, hooks |
| 🟦 TypeScript | Type safety everywhere |
| 🎨 Tailwind CSS 4 | Utility-first styling |
| 🟢 GSAP | Shake effects, entrance animations |
| 🎞️ Framer Motion | Smooth transitions |
| 🐻 Zustand | Lightweight state management |
| 🎯 Lucide React | Beautiful icon system |

</td>
<td width="50%">

### ⚙️ Backend
| Tech | Purpose |
|:-----|:--------|
| 🍃 MongoDB | NoSQL document database |
| 💎 Prisma ORM | Type-safe database queries |
| 🔑 Jose (JWT) | Token creation & verification |
| 🔒 Bcrypt.js | Password hashing (12 rounds) |
| 🍪 httpOnly Cookies | Secure session management |
| 🛡️ Middleware | Route protection & redirects |

</td>
</tr>
</table>

---

## 📂 Project Structure

```
devtype/
├── 📁 prisma/
│   ├── 📄 schema.prisma        # Data models (User, Snippet, TestResult)
│   └── 🌱 seed.ts              # Generates 600+ unique code snippets
├── 📁 src/
│   ├── 🛡️ middleware.ts         # JWT verification, route protection
│   ├── 📁 app/
│   │   ├── 🎨 globals.css       # Cyberpunk theme, neon utilities, glow effects
│   │   ├── 📐 layout.tsx        # Root layout (Geist font, dark mode)
│   │   ├── 🏠 page.tsx          # Home — typing arena + settings + nav
│   │   ├── 📁 login/            # 🔐 Login page
│   │   ├── 📁 signup/           # 📝 Registration page
│   │   ├── 📁 dashboard/        # 📊 Personal stats & analytics
│   │   └── 📁 api/
│   │       ├── 📁 auth/         # 🔑 login, signup, logout, me
│   │       ├── 📁 snippets/     # 📜 Random snippet fetcher
│   │       ├── 📁 scores/       # 🏆 Submit results + leaderboard
│   │       └── 📁 dashboard/    # 📈 Aggregated user analytics
│   ├── 📁 components/
│   │   ├── ⌨️ TypingArena.tsx    # Core typing interface
│   │   ├── 📊 MetricsHUD.tsx    # Live WPM / accuracy / timer
│   │   ├── 🎉 PostTestModal.tsx # Results & performance rating
│   │   └── 🏆 LeaderboardModal.tsx
│   ├── 📁 lib/
│   │   ├── 🔐 auth.ts           # JWT + bcrypt helpers
│   │   ├── 💾 prisma.ts         # Singleton Prisma client
│   │   └── 🔧 utils.ts          # cn() tailwind merge utility
│   └── 📁 store/
│       ├── 👤 authStore.ts      # Auth state (login, signup, logout)
│       └── ⌨️ typingStore.ts    # Test lifecycle, keystrokes, metrics
└── 📄 package.json
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have:

- **Node.js** `v18+` — [Download here](https://nodejs.org/)
- **MongoDB** connection string — [Get a free cluster](https://www.mongodb.com/atlas)

### ⚡ Quick Setup

```bash
# 1️⃣  Clone the repo
git clone https://github.com/yash23082007/dev-type.git
cd dev-type

# 2️⃣  Install dependencies
npm install

# 3️⃣  Set up your environment
#     Create a .env file in the root:
```

```env
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/devtype-db?retryWrites=true&w=majority"
JWT_SECRET="your-super-secret-key-change-this-in-production"
```

```bash
# 4️⃣  Generate Prisma client
npx prisma generate

# 5️⃣  Seed the database with 600+ snippets
npx ts-node prisma/seed.ts

# 6️⃣  Launch the dev server
npm run dev
```

Then open **[http://localhost:3000](http://localhost:3000)** and start typing! 🎉

---

## 🎮 How It Works

```
  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
  │  1. CHOOSE  │────▶│  2. TYPE    │────▶│  3. REVIEW  │
  │             │     │             │     │             │
  │ 🌐 Language │     │ ⌨️ Real-time │     │ 📊 WPM      │
  │ 📶 Difficulty│     │ 🔴 Error    │     │ 🎯 Accuracy  │
  │ ⏱️ Timer    │     │    feedback │     │ 🏆 Ranking   │
  └─────────────┘     └─────────────┘     └─────────────┘
```

1. **Pick your settings** — language, difficulty, and time limit
2. **Start typing** — just press any key. Correct chars glow green, errors flash red with a screen shake
3. **See your results** — WPM, accuracy, CPM, and a performance rating. Scores auto-save for logged-in users

---

## 🔌 API Reference

| Method | Endpoint | Auth | Description |
|:------:|:---------|:----:|:------------|
| `POST` | `/api/auth/signup` | 🔓 | Create a new account |
| `POST` | `/api/auth/login` | 🔓 | Sign in with email & password |
| `POST` | `/api/auth/logout` | 🔓 | Clear session cookie |
| `GET` | `/api/auth/me` | 🔓 | Get current user profile |
| `GET` | `/api/snippets` | 🔓 | Fetch random snippet `(?language=&difficulty=)` |
| `POST` | `/api/scores` | 🔓 | Submit a test result |
| `GET` | `/api/scores` | 🔓 | Get leaderboard (top 20) |
| `GET` | `/api/dashboard` | 🔒 | User stats, trends & history |

> 🔓 = Public &nbsp;&nbsp; 🔒 = Requires authentication

---

## 🗃️ Data Models

```prisma
model User {
  id             String        @id @default(auto()) @map("_id") @db.ObjectId
  username       String        @unique
  email          String        @unique
  password       String                    // bcrypt hashed
  level          Int           @default(1)
  totalTests     Int           @default(0)
  avgWpm         Float         @default(0)
  highestWpm     Float         @default(0)
  avgAccuracy    Float         @default(0)
  streak         Int           @default(0)
  testResults    TestResult[]
}

model Snippet {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  content     String                        // The code to type
  language    String                        // js, python, html, cpp, english
  difficulty  String                        // beginner, intermediate, advanced
  category    String                        // coding or text_typing
}

model TestResult {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  userId       String   @db.ObjectId
  user         User     @relation(fields: [userId], references: [id])
  wpm          Int
  cpm          Int
  accuracy     Float
  timeTaken    Int                          // seconds
  mistakes     Json                         // error positions
}
```

---

## 🎨 UI Showcase

<table>
<tr>
<td align="center" width="50%">

### 🏠 Typing Arena
_Char-by-char rendering with live cursor_<br/>
_Green glow on correct • Red shake on error_<br/>
_Progress bar fills as you type_

</td>
<td align="center" width="50%">

### 📊 Dashboard
_WPM trend chart with color-coded bars_<br/>
_Language breakdown with test counts_<br/>
_Full test history table_

</td>
</tr>
<tr>
<td align="center">

### 🎉 Post-Test Modal
_Performance rating system:_<br/>
🥉 Good → 🥈 Great → 🥇 Excellent → 👑 Legendary

</td>
<td align="center">

### 🏆 Leaderboard
_Top 20 global scores_<br/>
_Medal system: 🥇🥈🥉_<br/>
_Language + difficulty badges_

</td>
</tr>
</table>

---

## 🧠 Design Decisions

- **Why Zustand over Redux?** — Minimal boilerplate. Two small stores handle everything without provider hell
- **Why GSAP over CSS animations?** — The screen-shake on typing errors needs programmatic control that CSS `@keyframes` can't easily provide
- **Why JWT in cookies?** — httpOnly cookies prevent XSS token theft. The middleware layer handles verification without client-side token management
- **Why procedural snippet generation?** — 5 languages × 3 difficulties × randomized vocabulary = 600+ unique snippets without manually writing each one

---

## 🤝 Contributing

Contributions are always welcome! Here's how you can help:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. 📤 **Push** to the branch (`git push origin feature/amazing-feature`)
5. 🔃 **Open** a Pull Request

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

### 🖤 Built with caffeine and mass frustration at generic typing tests

**If DevType helped you type faster, consider giving it a ⭐**

<br/>

_"The fastest way to type code... is to practice typing code."_

<br/>

[🌐 Live Demo](https://dev-type.vercel.app) · [🐛 Report Bug](https://github.com/yash23082007/dev-type/issues) · [💡 Request Feature](https://github.com/yash23082007/dev-type/issues)

</div>
