# AI Avatar ChatBot — by DevKit

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16+-black?logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0+-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?logo=google)](https://aistudio.google.com)
[![LiveAvatar](https://img.shields.io/badge/LiveAvatar-SDK-FF6B35)](https://app.liveavatar.com)

A production-ready AI video chatbot that competitors charge $200+ for. Yours for free. Built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, **Google Gemini**, and the **HeyGen LiveAvatar SDK** — giving your users a real-time, lip-synced talking avatar experience right in the browser.

**[Live Demo](https://devkitmarket.com/products/ai-avatar-chatbot)** · **[Get it on DevKit Market](https://devkitmarket.com)**

---

## 🚀 The Pitch

"Ship a $200-value AI avatar chatbot at zero cost."

This isn't a stripped-down demo. Every component — the live streaming avatar, voice input, chat panel, session controls, dark mode, and vectorless document intelligence — is fully included. No locked features, no gating. Drop in your API keys and you're live in minutes.

## ✨ Features

- 🎭 **Real-Time Talking Avatar**: A lifelike digital human that speaks, gestures, and responds naturally via the HeyGen LiveAvatar WebRTC stream.
- 🤖 **Gemini AI Brain**: Google Gemini powers the conversation with a fully customizable system prompt, multi-turn memory, and intelligent response generation.
- 🎙️ **Voice Input**: Hands-free voice-to-text so users can speak directly to the avatar — no typing required.
- 💬 **Chat Panel**: Full message history with smooth auto-scroll, user and avatar message bubbles, and a text input fallback.
- 🧠 **Vectorless Document Intelligence**: Upload documents and ask questions. A self-built JSON tree index lets Gemini reason over your docs with zero vector database, zero embeddings, zero third-party RAG service.
- 🌓 **Dark Mode**: Seamless light/dark toggle with system preference detection via `next-themes`.
- 📱 **Mobile Responsive**: Clean layout that works on any screen size.
- ⚡ **Session Management**: Start, stop, and reconnect avatar sessions with a single click.
- 🔌 **API Routes Included**: Clean Next.js API routes for chat, avatar sessions, and knowledge retrieval — ready to extend.
- 🛠️ **Centralized Knowledge**: Customize your AI's personality and domain knowledge by editing **one file** (`constants/knowledge.ts`).

## 🛠️ Tech Stack

- **Framework**: [Next.js 16+](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **AI Model**: [Google Gemini](https://ai.google.dev)
- **Avatar SDK**: [HeyGen LiveAvatar Web SDK](https://app.liveavatar.com)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Language**: [TypeScript](https://www.typescriptlang.org)

## 🚦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/niks-nikhil-anand/AI-Video-Agent-Chatbot-Starter-Kit-Talking-Avatar-HeyGen.git
cd AI-Video-Agent-Chatbot-Starter-Kit-Talking-Avatar-HeyGen
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and fill in your keys:

```bash
cp .env.example .env.local
```

Open `.env.local` and add your credentials:

```env
# Get from https://app.liveavatar.com
LIVEAVATAR_API_KEY=your_liveavatar_api_key_here

# Get from https://aistudio.google.com
GEMINI_API_KEY=your_gemini_api_key_here

# Your avatar ID from the LiveAvatar dashboard (leave blank for sandbox mode)
LIVEAVATAR_AVATAR_ID=

# Your knowledge base context ID (leave blank for sandbox mode)
LIVEAVATAR_CONTEXT_ID=
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start talking with your avatar.

## 🎨 Customization

### AI Knowledge & Personality

The fastest way to customize the chatbot is to edit the central knowledge file:

```
src/app/constants/knowledge.ts
```

This is where you define what your avatar knows — your product, your brand voice, your FAQs. Change this file and the AI's entire personality shifts accordingly. No touching API routes required.

### Avatar

Log in to [app.liveavatar.com](https://app.liveavatar.com), pick or create an avatar, and paste its ID into `LIVEAVATAR_AVATAR_ID`. Leave it blank to run in **sandbox mode** (free, default avatar) for testing.

### Styling

All styling uses Tailwind CSS v4. Global styles and CSS variables live in `src/app/globals.css`. Components are in `src/app/components/`.

## 🧠 How the Vectorless RAG Works

Instead of any vector database, this kit uses a **JSON Tree Index** — a self-built, PageIndex-style approach where documents are parsed into a hierarchical JSON tree (like an intelligent table of contents) and Gemini navigates the tree to retrieve answers.

**Why this over vector search:**
- No Pinecone, Chroma, Weaviate, or Qdrant to manage
- No embedding model costs
- No chunk boundary problems — the tree follows the document's natural structure
- Every retrieval step is explainable — trace exactly which section the AI chose and why
- The JSON tree is a plain file — human-readable and editable

**Flow:** User query → Gemini reads tree (titles + summaries only) → selects relevant node IDs → system fetches full content → Gemini generates a grounded answer.

## 🔌 API Routes

| Route | Method | Description |
|---|---|---|
| `/api/chat` | `POST` | Sends a user message to Gemini and returns the AI reply |
| `/api/liveavatar` | `POST` | Creates or manages a LiveAvatar streaming session |
| `/api/retrieve` | `GET` | Retrieves context from the JSON tree knowledge index |

All routes are in `src/app/api/` and are ready to extend.

## 📂 Project Structure

```text
├── src/
│   └── app/
│       ├── api/
│       │   ├── chat/             # Gemini AI chat route
│       │   ├── liveavatar/       # Avatar session management
│       │   └── retrieve/         # Tree-based knowledge retrieval
│       ├── components/
│       │   ├── AvatarPanel.tsx   # Streaming video avatar
│       │   ├── ChatPanel.tsx     # Full chat UI
│       │   ├── ChatInput.tsx     # Text input
│       │   ├── VoiceInput.tsx    # Mic / voice-to-text
│       │   ├── MessageList.tsx   # Message history
│       │   ├── SessionControls.tsx # Start / stop avatar session
│       │   ├── Header.tsx        # Top navigation
│       │   └── ThemeToggle.tsx   # Light / dark switch
│       ├── constants/
│       │   └── knowledge.ts      # AI knowledge base (edit this!)
│       ├── lib/
│       │   ├── gemini.ts         # Gemini client setup
│       │   ├── liveavatar.ts     # LiveAvatar SDK helpers
│       │   └── pageindex.ts      # JSON tree index utilities
│       ├── globals.css           # Global styles & CSS variables
│       ├── layout.tsx            # Root layout
│       └── page.tsx              # Home page
├── public/                       # Static assets
├── .env.example                  # Environment variable template
└── next.config.ts                # Next.js configuration
```

## 🔑 API Key Setup

| Service | Where to Get | Pricing |
|---|---|---|
| **LiveAvatar** | [app.liveavatar.com](https://app.liveavatar.com) | Starter: $19 for 150 credits (~30–60s per credit) |
| **Google Gemini** | [ai.google.dev](https://ai.google.dev) | Free tier available; pay-as-you-go for production |

> The vectorless JSON tree index is fully self-hosted — no extra API key or third-party service needed.

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Create an optimized production build |
| `npm start` | Run the production server |
| `npm run lint` | Run ESLint for code quality |

## 🚢 Deployment

The easiest deployment is [Vercel](https://vercel.com/new):

1. Push your repo to GitHub.
2. Import the project into Vercel.
3. Add your environment variables in the Vercel dashboard.
4. Deploy — your AI avatar chatbot is live.

## 📄 License

This project is licensed under the [MIT License](LICENSE). Use it freely for personal and commercial projects.

---

**Built by [DevKit Market](https://devkitmarket.com)** — High-quality kits for developers who ship.
