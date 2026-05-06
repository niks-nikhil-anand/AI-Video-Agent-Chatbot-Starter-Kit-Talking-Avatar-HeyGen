import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jbMono = JetBrains_Mono({
  variable: "--font-jb-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devkit-market AI Agent | Next-Gen Video Chatbot",
  description: "Real-time AI video agent powered by Devkit-market. Talk to a lifelike digital human that reasons over your documents.",
  keywords: ["Devkit-market", "AI Avatar", "Video Chatbot", "Gemini AI", "Vectorless RAG"],
  openGraph: {
    title: "Devkit-market AI Agent | Next-Gen Video Chatbot",
    description: "Experience the future of conversational AI with Devkit-market, your lifelike talking avatar agent.",
    url: "https://devkitmarket.com",
    siteName: "Devkit-market AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devkit-market AI Agent",
    description: "Real-time AI video agent powered by Devkit-market and Google Gemini.",
    creator: "@devkitmarket",
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
      suppressHydrationWarning
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
