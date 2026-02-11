import type { Metadata } from "next";
import { Inter, Crimson_Text } from "next/font/google"; 
import "@/styles/globals.css"; 
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/sonner"; 
import ErrorBoundary from "@/components/ErrorBoundary";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

// 1. Configure Fonts
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

const crimson = Crimson_Text({ 
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: "--font-serif" 
});

export const metadata: Metadata = {
  title: "Ethnographic Stories Platform",
  description: "A digital archive for marginalized narratives and academic research.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = 'en';

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({locale});

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${crimson.variable} font-sans antialiased bg-[#FAFAF9]`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          
          <main className="min-h-screen">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </main>

          <Footer />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}