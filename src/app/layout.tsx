import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const jbMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevKit AI Avatar Agent | Next-Gen Video Chatbot",
  description: "Real-time AI video agent powered by LiveAvatar, Google Gemini, and Vectorless RAG. Talk to a lifelike digital human that reasons over your documents.",
  keywords: ["AI Avatar", "Video Chatbot", "LiveAvatar", "Gemini AI", "Vectorless RAG", "DevKit Market"],
  openGraph: {
    title: "DevKit AI Avatar Agent | Next-Gen Video Chatbot",
    description: "Experience the future of conversational AI with our lifelike talking avatar agent.",
    url: "https://devkitmarket.com",
    siteName: "DevKit Market",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevKit AI Avatar Agent",
    description: "Real-time AI video agent powered by LiveAvatar and Google Gemini.",
    creator: "@nikhilanand",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${jbMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
