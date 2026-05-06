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
  title: "Rubenius AI Agent | Next-Gen Video Chatbot",
  description: "Real-time AI video agent powered by Rubenius. Talk to a lifelike digital human that reasons over your documents.",
  keywords: ["Rubenius", "AI Avatar", "Video Chatbot", "Gemini AI", "Vectorless RAG"],
  openGraph: {
    title: "Rubenius AI Agent | Next-Gen Video Chatbot",
    description: "Experience the future of conversational AI with Rubenius, your lifelike talking avatar agent.",
    url: "https://rubenius.ai",
    siteName: "Rubenius AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rubenius AI Agent",
    description: "Real-time AI video agent powered by Rubenius and Google Gemini.",
    creator: "@rubenius",
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
