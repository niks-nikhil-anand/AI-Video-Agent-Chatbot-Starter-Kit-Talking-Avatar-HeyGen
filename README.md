# 🤖 AI Video Agent Chatbot — Talking Avatar Starter Kit

An AI-powered video chatbot with a lifelike talking avatar, voice interaction, and vectorless document intelligence. Users can have real-time face-to-face conversations with an AI avatar that reasons over your documents — no vector database required.

---

## 📖 About The Project

This starter kit lets you build an **interactive AI video agent** — a digital human avatar that can see, listen, speak, and reason in real time. Instead of a typical text chatbot, users get a face-to-face conversational experience powered by three core technologies:

- **LiveAvatar (by HeyGen)** renders a hyper-realistic talking avatar with natural lip-sync, facial expressions, and body language via real-time WebRTC streaming.
- **Google Gemini** serves as the reasoning backbone, handling natural language understanding, multi-turn dialogue, and intelligent response generation.
- **PageIndex** provides vectorless, reasoning-based RAG (Retrieval-Augmented Generation) — the avatar can answer questions about your documents without any vector database, embeddings, or chunking infrastructure.

The result is an AI agent that feels like a video call with a knowledgeable human expert.

---

## 🏗️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) | Full-stack React framework with server-side rendering and API routes |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Type-safe development across the entire codebase |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS for responsive, modern UI |
| **Avatar** | [LiveAvatar](https://www.liveavatar.com/) | Real-time AI avatar streaming with lip-sync, expressions, and gestures |
| **LLM / Reasoning** | [Google Gemini](https://ai.google.dev/) | Multi-modal AI model for conversation, reasoning, and context understanding |
| **Document RAG** | [PageIndex](https://pageindex.ai/) | Vectorless, reasoning-based retrieval — no vector DB, no embeddings, no chunking |
| **Runtime** | [React 19](https://react.dev/) | UI component library |
| **Linting** | [ESLint 9](https://eslint.org/) | Code quality and consistency |

---

## ✨ Key Features

- **Real-Time Talking Avatar** — A lifelike digital human that speaks, gestures, and responds naturally via LiveAvatar's WebRTC streaming.
- **Voice Interaction** — Speak to the avatar and receive spoken responses, creating a natural conversational flow.
- **Gemini-Powered Reasoning** — Google Gemini handles complex questions, multi-turn context, and intelligent dialogue management.
- **Vectorless Document Intelligence** — Upload documents and ask questions. PageIndex builds a hierarchical tree index and uses LLM reasoning to find answers — no Pinecone, no Chroma, no embeddings pipeline.
- **Traceable Retrieval** — Every document answer is explainable. You can see exactly which section the AI navigated to and why.
- **TypeScript End-to-End** — Full type safety from API routes to UI components.
- **Responsive Design** — Tailwind CSS ensures the interface works across desktop and mobile.

---

## 📁 Project Structure

```
├── public/                    # Static assets (images, icons, fonts)
├── src/
│   └── app/                   # Next.js App Router
│       ├── api/               # API routes (LiveAvatar token, Gemini, PageIndex)
│       │   ├── liveavatar/    # LiveAvatar session & token management
│       │   ├── chat/          # Gemini conversation endpoint
│       │   └── retrieve/      # PageIndex document retrieval endpoint
│       ├── components/        # React UI components
│       │   ├── Avatar.tsx     # LiveAvatar video stream component
│       │   ├── ChatPanel.tsx  # Chat interface with message history
│       │   └── VoiceInput.tsx # Microphone input handler
│       ├── lib/               # Utility functions and API clients
│       │   ├── liveavatar.ts  # LiveAvatar API integration
│       │   ├── gemini.ts      # Gemini API client
│       │   └── pageindex.ts   # PageIndex retrieval client
│       ├── layout.tsx         # Root layout with global styles
│       ├── page.tsx           # Main application page
│       └── globals.css        # Global styles and Tailwind directives
├── .gitignore
├── AGENTS.md                  # Agent configuration guide
├── CLAUDE.md                  # Claude integration notes
├── eslint.config.mjs          # ESLint configuration
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies and scripts
├── postcss.config.mjs         # PostCSS + Tailwind setup
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.18+ (recommended: 20 LTS)
- **npm**, **yarn**, **pnpm**, or **bun**
- API keys for the following services:
  - [LiveAvatar API Key](https://app.liveavatar.com/) — Sign up at liveavatar.com (uses HeyGen credentials)
  - [Google Gemini API Key](https://ai.google.dev/) — Get from Google AI Studio
  - [PageIndex API Key](https://pageindex.ai/) — Sign up at pageindex.ai

### Step 1 — Clone the Repository

```bash
git clone https://github.com/niks-nikhil-anand/AI-Video-Agent-Chatbot-Starter-Kit-Talking-Avatar-HeyGen.git
cd AI-Video-Agent-Chatbot-Starter-Kit-Talking-Avatar-HeyGen
```

### Step 2 — Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Step 3 — Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# ── LiveAvatar (HeyGen) ──────────────────────────
LIVEAVATAR_API_KEY=your_liveavatar_api_key
LIVEAVATAR_AVATAR_ID=your_chosen_avatar_id

# ── Google Gemini ─────────────────────────────────
GEMINI_API_KEY=your_gemini_api_key

# ── PageIndex (Vectorless RAG) ────────────────────
PAGEINDEX_API_KEY=your_pageindex_api_key

# ── App Configuration ────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4 — Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 5 — Build for Production

```bash
npm run build
npm start
```

---

## 🔧 Implementation Plan

This section explains how each piece of the system connects and the recommended order for building out the project.

### Phase 1 — Project Scaffolding

Set up the Next.js 16 project with TypeScript and Tailwind CSS 4. The App Router structure under `src/app/` provides file-based routing, and API routes live under `src/app/api/`. Tailwind is configured via `postcss.config.mjs` with the `@tailwindcss/postcss` plugin.

### Phase 2 — LiveAvatar Integration

LiveAvatar provides two integration modes: **FULL** and **LITE**.

In **FULL mode**, LiveAvatar manages the entire conversation pipeline — ASR (speech recognition), LLM, TTS (text-to-speech), and avatar rendering. You configure the avatar, voice, and system prompt, and LiveAvatar handles the rest.

In **LITE mode**, you control the LLM and audio yourself, and LiveAvatar only handles avatar rendering. This is the recommended mode for this project since we use Gemini as the reasoning engine.

The integration flow:

1. Your Next.js API route (`/api/liveavatar/token`) requests a session token from `https://api.liveavatar.com/v1/sessions/token` using your API key.
2. The frontend establishes a WebRTC connection using the session token.
3. The avatar video stream renders in the `Avatar` component.
4. User speech is captured, sent to your backend, processed by Gemini, and the response text is sent back to LiveAvatar for the avatar to speak.

### Phase 3 — Gemini Reasoning Engine

Google Gemini handles all the "thinking" behind the avatar's responses. The implementation involves:

1. Create a server-side API route (`/api/chat`) that receives the user's message and conversation history.
2. Send the message to Gemini with a system prompt defining the avatar's personality, knowledge boundaries, and response style.
3. When documents are involved, first retrieve relevant context from PageIndex (Phase 4) and include it in the Gemini prompt.
4. Return the generated response to the frontend, which forwards it to LiveAvatar for the avatar to speak aloud.

Gemini's multi-modal capabilities also allow future extensions like image understanding or screen sharing analysis.

### Phase 4 — PageIndex Vectorless RAG

PageIndex replaces the traditional vector database pipeline entirely. Instead of chunking documents and computing embeddings, PageIndex:

1. **Indexes the document** — Converts PDFs/HTML into a hierarchical tree structure (like an intelligent table of contents). Each node has a summary describing what that section contains.
2. **Reasons over the tree** — When a user asks a question, the LLM reads the tree structure and decides which branch to explore, then navigates deeper until it reaches the relevant content.
3. **Retrieves with traceability** — The retrieved pages/sections are passed as context to Gemini, and you can trace exactly which part of the document was used.

Integration steps:

1. Upload documents to PageIndex via their API or MCP integration.
2. Create a retrieval API route (`/api/retrieve`) that sends user queries to PageIndex.
3. PageIndex returns the relevant document sections.
4. Inject the retrieved context into the Gemini prompt before generating a response.

This architecture eliminates the need for Pinecone, Chroma, Weaviate, or any vector database, and avoids issues like embedding quality degradation, chunk boundary problems, and semantic similarity mismatches.

### Phase 5 — Frontend Assembly

Wire everything together in the main `page.tsx`:

1. The `Avatar` component displays the LiveAvatar video stream.
2. The `VoiceInput` component captures microphone input and converts it to text (or streams audio directly).
3. The `ChatPanel` component shows the conversation history as a text sidebar.
4. User input flows: **Microphone → Speech-to-Text → Gemini (with PageIndex context) → Response Text → LiveAvatar TTS + Avatar Animation**.

### Phase 6 — Polish and Deploy

- Add loading states and error boundaries.
- Implement session management (avatar sessions have a time limit).
- Add document upload UI for PageIndex.
- Deploy on Vercel (zero-config for Next.js) or any Node.js hosting platform.

---

## 🔑 API Key Setup Guide

| Service | Where to Get It | Pricing |
|---|---|---|
| **LiveAvatar** | [app.liveavatar.com](https://app.liveavatar.com/) | Starter plan: $19 for 150 credits (1 credit ≈ 30s–1min streaming) |
| **Google Gemini** | [ai.google.dev](https://ai.google.dev/) | Free tier available; pay-as-you-go for production |
| **PageIndex** | [pageindex.ai](https://pageindex.ai/) | Free tier available; API and MCP access included |

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create an optimized production build |
| `npm start` | Run the production server |
| `npm run lint` | Run ESLint for code quality checks |

---

## 🛣️ Roadmap

- [ ] LiveAvatar LITE mode integration with custom LLM pipeline
- [ ] Gemini multi-turn conversation with memory
- [ ] PageIndex document upload and management UI
- [ ] Voice-to-voice pipeline (skip text intermediary)
- [ ] Multi-avatar support (switch between different digital humans)
- [ ] Conversation analytics dashboard
- [ ] Mobile-optimized avatar view
- [ ] Multi-language support

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source. See the repository for license details.

---

## 🔗 Useful Links

| Resource | URL |
|---|---|
| LiveAvatar Docs | [docs.liveavatar.com](https://docs.liveavatar.com/) |
| LiveAvatar App | [app.liveavatar.com](https://app.liveavatar.com/) |
| Google Gemini Docs | [ai.google.dev/docs](https://ai.google.dev/docs) |
| PageIndex Docs | [docs.pageindex.ai](https://docs.pageindex.ai/) |
| PageIndex GitHub | [github.com/VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) |
| Next.js Docs | [nextjs.org/docs](https://nextjs.org/docs) |
| Tailwind CSS Docs | [tailwindcss.com/docs](https://tailwindcss.com/docs) |

---

> Built with ❤️ using Next.js, TypeScript, Tailwind CSS, LiveAvatar, Google Gemini, and PageIndex.