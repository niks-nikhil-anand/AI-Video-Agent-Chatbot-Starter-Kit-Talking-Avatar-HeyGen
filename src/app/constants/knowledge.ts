/**
 * DevKit Market Knowledge Base
 * 
 * This file contains the hierarchical JSON tree index for devkitmarket.com.
 * It is used by the vectorless RAG system to provide context to the AI agent.
 */

export const DEVKIT_KNOWLEDGE = {
  "id": "root",
  "title": "DevKit Market Knowledge Base",
  "summary": "Complete Q&A knowledge tree for devkitmarket.com — a marketplace for production-ready starter kits, developer tools, and Claude AI skills built by Nikhil Anand.",
  "source": "https://www.devkitmarket.com/",
  "version": "1.0",
  "total_questions": 50,
  "children": [
    {
      "id": "general",
      "title": "General — About DevKit Market",
      "summary": "What DevKit Market is, who built it, what it offers, and how it works.",
      "children": [
        {
          "id": "general-q1",
          "question": "What is DevKit Market?",
          "answer": "DevKit Market is a marketplace for production-ready starter kits and developer tools. It offers pre-built Next.js, React, and SaaS boilerplates with auth, billing, dashboards, and more already wired in — so developers can skip weeks of repetitive setup and start shipping features immediately."
        },
        {
          "id": "general-q2",
          "question": "Who built DevKit Market?",
          "answer": "DevKit Market was built by Nikhil Anand, a Full Stack Developer with 2+ years of experience based in Bengaluru, India. He currently works as Software Developer L1 at Alucor and has earned ₹5,00,000+ through freelance work. He built the platform solo using Next.js and Claude."
        },
        {
          "id": "general-q3",
          "question": "What tech stack is DevKit Market itself built with?",
          "answer": "The DevKit Market platform is built with Next.js 15, Shadcn/ui, Prisma ORM, and Stripe for payments. It also uses Tailwind CSS for styling and Claude AI for the built-in DevKit Assistant."
        },
        {
          "id": "general-q4",
          "question": "How many starter kits are available on DevKit Market?",
          "answer": "DevKit Market currently offers 24 production-ready starter kits, with 8 of them completely free. The kits span categories like SaaS templates, Next.js boilerplates, React components, and admin dashboards."
        },
        {
          "id": "general-q5",
          "question": "Is DevKit Market free to use?",
          "answer": "Browsing DevKit Market is free. There are 8 completely free starter kits you can download without paying. Premium kits range from $19 to $79 and are one-time purchases with lifetime access and free updates."
        },
        {
          "id": "general-q6",
          "question": "What is the DevKit Assistant?",
          "answer": "The DevKit Assistant is an AI-powered chatbot on the site, powered by Claude. It knows every starter kit in the store — features, tech stack, price, and ideal use case. You can describe what you're building and it will recommend the right kit instantly. It gives developer-focused answers with no fluff or upselling."
        },
        {
          "id": "general-q7",
          "question": "How does purchasing work on DevKit Market?",
          "answer": "The process is simple: pick a kit, pay once with Stripe, and get lifetime access to the ZIP file plus all future updates at no extra cost. There are no subscriptions or lock-ins."
        },
        {
          "id": "general-q8",
          "question": "How do I get started after buying a kit?",
          "answer": "After purchasing, you download the ZIP file, copy your .env variables, run npm install, and follow the included 5-minute setup guide. Every kit comes with a complete setup guide, environment variable reference, and deployment instructions for Vercel, Railway, and Render."
        }
      ]
    },
    {
      "id": "products",
      "title": "Products — Starter Kits",
      "summary": "Details about each starter kit including features, pricing, and tech stack.",
      "children": [
        {
          "id": "products-q9",
          "question": "What is the SaaS Starter Pro kit?",
          "answer": "SaaS Starter Pro is the best-selling kit on DevKit Market, priced at $79. It provides a complete SaaS foundation with authentication, Stripe billing, team management, an admin dashboard, and role-based access control (RBAC). It's built with Next.js, Stripe, and Prisma. Designed to let you launch a SaaS product in days, not weeks."
        },
        {
          "id": "products-q10",
          "question": "What is the Next.js Blog Kit?",
          "answer": "The Next.js Blog Kit is a free starter kit for building a blog. It's an MDX-powered blog with full SEO optimization, dark mode, RSS feed, reading time estimates, and syntax highlighting. Built with Next.js, MDX, and Tailwind CSS. You can deploy it to Vercel in one click."
        },
        {
          "id": "products-q11",
          "question": "What is the Auth Boilerplate kit?",
          "answer": "The Auth Boilerplate is a $39 kit that includes magic link login, OAuth (Google and GitHub), two-factor authentication (2FA), password reset, and role-based access control. It's built with Clerk and Next.js and is described as fully production-hardened."
        },
        {
          "id": "products-q12",
          "question": "What is the Landing Page Kit?",
          "answer": "The Landing Page Kit is a $29 kit built with React and Tailwind CSS. It includes a conversion-optimized landing page with hero section, pricing tables, testimonials, FAQ section, waitlist form, and analytics integration all built in."
        },
        {
          "id": "products-q13",
          "question": "What is the Admin Dashboard kit?",
          "answer": "The Admin Dashboard is a $49 kit built with React, shadcn/ui, and Recharts. It includes data tables, interactive charts, user management, a notifications system, and a settings panel."
        },
        {
          "id": "products-q14",
          "question": "What is the Waitlist App kit?",
          "answer": "The Waitlist App is a free kit for building a viral referral waitlist. It includes position tracking, email confirmation, social sharing, and a live Supabase backend. Built with Next.js, Supabase, and Resend. You can go from zero to launched in about an hour."
        },
        {
          "id": "products-q15",
          "question": "Which starter kits are free?",
          "answer": "DevKit Market offers 8 free starter kits. The ones prominently listed on the site include the Next.js Blog Kit and the Waitlist App. Additional free kits can be found by using the 'Free only' filter on the products page."
        },
        {
          "id": "products-q16",
          "question": "What is the most expensive kit?",
          "answer": "The most expensive kit currently listed is the SaaS Starter Pro at $79. It's also the best seller on the platform."
        },
        {
          "id": "products-q17",
          "question": "Do the kits include deployment instructions?",
          "answer": "Yes. Every kit comes with a complete setup guide, environment variable reference, and deployment instructions for Vercel, Railway, and Render."
        },
        {
          "id": "products-q18",
          "question": "What categories of kits are available?",
          "answer": "DevKit Market organizes kits into four main categories: SaaS Templates (8 kits, from $39), Next.js Boilerplates (7 kits, 3 free), React Components (5 kits, from $19), and Admin Dashboards (4 kits, from $49)."
        }
      ]
    },
    {
      "id": "tools",
      "title": "Developer Tools",
      "summary": "Free web-based developer utilities offered on DevKit Market for scaffolding, configuration, and code generation.",
      "children": [
        {
          "id": "tools-q19",
          "question": "What free developer tools does DevKit Market offer?",
          "answer": "DevKit Market offers 16 free web-based developer tools. These include the Shadcn/UI Component Previewer, Next.js Project Structure Generator, .env File Generator, Prisma Schema Generator, Stripe Webhook Event Explorer, Next.js API Route Generator, Tailwind CSS Color Palette Generator, and JSON Formatter & Validator. No signup is required to use them."
        },
        {
          "id": "tools-q20",
          "question": "What is the Shadcn/UI Component Previewer?",
          "answer": "It's a live preview tool for shadcn/ui components with instant copy-paste code. You can browse rendered components and grab code snippets directly. It's the most popular tool with 22k monthly users."
        },
        {
          "id": "tools-q21",
          "question": "What is the Next.js Project Structure Generator?",
          "answer": "This tool lets you select your stack and instantly generates a production-ready Next.js folder architecture. You can copy the entire scaffold in one click. It has around 12k monthly users."
        },
        {
          "id": "tools-q22",
          "question": "What is the .env File Generator?",
          "answer": "The .env File Generator lets you pick your tech stack and generates a complete, commented .env boilerplate file. It helps you never forget an environment variable. It has around 11k monthly users."
        },
        {
          "id": "tools-q23",
          "question": "What is the JSON Formatter tool?",
          "answer": "The JSON Formatter & Validator lets you format, beautify, minify, and validate JSON data instantly. It finds syntax errors in your JSON. It has around 15k monthly users."
        },
        {
          "id": "tools-q24",
          "question": "What is the Tailwind CSS Color Palette Generator?",
          "answer": "This tool lets you enter a brand color and generates a complete Tailwind-compatible shade scale with ready-to-use config snippets."
        },
        {
          "id": "tools-q25",
          "question": "Are any tools still in development?",
          "answer": "Yes. As of the current listing, the Prisma Schema Generator, Stripe Webhook Event Explorer, and Next.js API Route Generator are marked as 'Available Soon' and haven't launched yet."
        },
        {
          "id": "tools-q26",
          "question": "Do I need to sign up to use the tools?",
          "answer": "No. All developer tools on DevKit Market are free and require no signup to use."
        }
      ]
    },
    {
      "id": "pricing-licensing",
      "title": "Pricing, Licensing & Refunds",
      "summary": "How pricing works, what the license covers, and the refund policy.",
      "children": [
        {
          "id": "pricing-q27",
          "question": "How much do the starter kits cost?",
          "answer": "Prices range from free to $79. The Landing Page Kit is $29, the Auth Boilerplate is $39, the Admin Dashboard is $49, and the SaaS Starter Pro is $79. There are also 8 completely free kits available."
        },
        {
          "id": "pricing-q28",
          "question": "Is there a subscription model?",
          "answer": "No. DevKit Market uses a buy-once model. You pay once with Stripe, get lifetime access to the kit, and receive all future updates at no extra cost. No subscription, no lock-in."
        },
        {
          "id": "pricing-q29",
          "question": "Can I use the kits for commercial projects?",
          "answer": "Yes. Every DevKit comes with a commercial license that allows you to build and sell multiple projects, whether for yourself or for clients. The only restriction is that you cannot resell the DevKit itself as a template."
        },
        {
          "id": "pricing-q30",
          "question": "What is the refund policy?",
          "answer": "Due to the digital nature of the products, DevKit Market generally does not offer refunds. However, if a kit doesn't meet the core features promised in its description, you can reach out and the team will make it right."
        },
        {
          "id": "pricing-q31",
          "question": "Do I get future updates for free?",
          "answer": "Yes. When you buy a kit, you get lifetime access to the ZIP file and all future updates at no extra cost."
        }
      ]
    },
    {
      "id": "support",
      "title": "Support & Contact",
      "summary": "How to get help, support channels, and contact information.",
      "children": [
        {
          "id": "support-q32",
          "question": "What support is included with a purchase?",
          "answer": "Every purchase includes access to a private Discord channel and direct email support for 6 months. The team helps with setup, bugs, and general architectural questions related to the kit."
        },
        {
          "id": "support-q33",
          "question": "How can I contact DevKit Market?",
          "answer": "You can reach Nikhil Anand (the creator) via email at niks.anand.developer@gmail.com. There's also a contact page at devkitmarket.com/contact, and you can connect on LinkedIn at linkedin.com/in/nikhilanand86 or GitHub at github.com/niks-nikhil-anand."
        },
        {
          "id": "support-q34",
          "question": "Is there documentation for the kits?",
          "answer": "Yes. Every kit comes with a complete setup guide, environment variable reference, and deployment instructions. There is also a Documentation link in the site footer."
        },
        {
          "id": "support-q35",
          "question": "How long does email support last?",
          "answer": "Direct email support and Discord access are included for 6 months from the date of purchase."
        }
      ]
    },
    {
      "id": "tech-stack",
      "title": "Tech Stack & Architecture",
      "summary": "Details about the technologies used across the starter kits and the platform itself.",
      "children": [
        {
          "id": "tech-q36",
          "question": "What tech stack do the kits use?",
          "answer": "The kits primarily use the modern web stack: Next.js (App Router), TypeScript, Tailwind CSS, and Prisma or Drizzle for database ORM. The platform prioritizes performance, accessibility, and developer experience."
        },
        {
          "id": "tech-q37",
          "question": "What payment provider do the kits integrate with?",
          "answer": "The paid kits, especially SaaS Starter Pro, integrate with Stripe for billing and payment processing."
        },
        {
          "id": "tech-q38",
          "question": "What authentication solutions are used?",
          "answer": "The Auth Boilerplate uses Clerk for authentication, supporting magic link, OAuth (Google and GitHub), 2FA, password reset, and RBAC. Other kits like Swasthify use Firebase Auth with cookie-based and passwordless email link login."
        },
        {
          "id": "tech-q39",
          "question": "What database is used in the kits?",
          "answer": "The kits support both PostgreSQL (via Prisma ORM) and Supabase (for the Waitlist App). Nikhil also has experience with MongoDB across his freelance projects."
        },
        {
          "id": "tech-q40",
          "question": "What UI component library do the kits use?",
          "answer": "The kits primarily use shadcn/ui for UI components, along with Tailwind CSS for styling. The Admin Dashboard also uses Recharts for interactive charts."
        }
      ]
    },
    {
      "id": "custom-work",
      "title": "Custom Work & Hiring",
      "summary": "Information about hiring Nikhil Anand for custom development, tools, or projects.",
      "children": [
        {
          "id": "custom-q41",
          "question": "Can I hire DevKit Market for custom work?",
          "answer": "Yes. Nikhil Anand offers custom development services for startups, including custom software, internal tools, and AI integrations. You can reach out via the 'Hire me' page at devkitmarket.com/hire-me or email niks.anand.developer@gmail.com."
        },
        {
          "id": "custom-q42",
          "question": "What kind of custom projects has Nikhil built?",
          "answer": "Nikhil has built several production projects including Swasthify (a healthcare platform with role-based dashboards, Razorpay, Firebase Auth, and AWS S3), KannonAI (an AI legal assistant using Gemini), Flying Alpha (a real estate booking platform), Legal257 (a financial loan application site), CleanVeda (an e-commerce site), and two NGO donation platforms."
        },
        {
          "id": "custom-q43",
          "question": "Can I get a custom developer tool built?",
          "answer": "Yes. The tools section has a call-to-action for custom tool development. Nikhil builds specialized tools like calculators, ROI dashboards, and internal generators that can serve thousands of users."
        }
      ]
    },
    {
      "id": "claude-skills",
      "title": "Claude Skills",
      "summary": "Information about the Claude AI skills offered on DevKit Market.",
      "children": [
        {
          "id": "claude-q44",
          "question": "What are Claude Skills on DevKit Market?",
          "answer": "DevKit Market has a dedicated Claude Skills section at devkitmarket.com/claude-skills. These are specialized AI skill configurations designed for use with Claude AI to assist with development workflows."
        },
        {
          "id": "claude-q45",
          "question": "Where can I find the Claude Skills page?",
          "answer": "You can find the Claude Skills page in the main navigation at devkitmarket.com/claude-skills."
        }
      ]
    },
    {
      "id": "blog",
      "title": "Blog & Content",
      "summary": "Information about DevKit Market's blog articles and developer guides.",
      "children": [
        {
          "id": "blog-q46",
          "question": "Does DevKit Market have a blog?",
          "answer": "Yes. DevKit Market has a blog at devkitmarket.com/blog with deep dives into tech and workflows behind high-performing startups. Articles cover topics like developer productivity with boilerplates, choosing tech stacks for SaaS, and modern UI/UX trends for developer tools."
        },
        {
          "id": "blog-q47",
          "question": "What blog articles are currently available?",
          "answer": "Recent articles include: 'Why Boilerplates are the Secret to 10x Developer Productivity' (April 10, 2026), 'Choosing the Right Tech Stack for Your Next SaaS: Why Next.js Wins' (April 8, 2026), and 'Modern UI/UX Trends for Developer Tools in 2026' (April 5, 2026)."
        }
      ]
    },
    {
      "id": "about-creator",
      "title": "About the Creator",
      "summary": "Background, experience, and achievements of Nikhil Anand, the solo developer behind DevKit Market.",
      "children": [
        {
          "id": "about-q48",
          "question": "What is Nikhil Anand's professional background?",
          "answer": "Nikhil Anand is a Full Stack Developer with 2+ years of experience. He currently works as Software Developer L1 at Alucor in Bengaluru, where he builds RESTful APIs with FastAPI, works with Kafka, PostgreSQL, Angular, and Docker, and configures CI/CD pipelines on AWS. Previously, he interned as a Front-End Developer at Umbrella Room Ventures in New Delhi working on the Luxorides project with Next.js and React."
        },
        {
          "id": "about-q49",
          "question": "What are Nikhil's key achievements?",
          "answer": "Nikhil has earned ₹5,00,000+ through freelance work, served 10,000+ active users across all projects, made 10,000+ GitHub contributions, and regularly publishes technical blogs on Hashnode and LinkedIn. He is entirely self-taught — starting with WordPress and progressing independently to full-stack development."
        },
        {
          "id": "about-q50",
          "question": "What AI and ML technologies does Nikhil work with?",
          "answer": "Nikhil works with LangChain, Gemini API, OpenAI API, RAG pipelines, vector embeddings, BullMQ, and Valkey. His KannonAI project uses vectorless semantic search with Gemini for an Indian legal assistant."
        }
      ]
    }
  ]
}
