import type { Metadata } from "next";
import { EB_Garamond, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google"; 
import "@/styles/globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ErrorBoundary";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond"
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-sans"
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "Ethnographic Stories Platform",
  description: "A digital archive for marginalized narratives and academic research.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${ebGaramond.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} font-sans antialiased bg-background text-foreground`}>
        <Navbar />

        <main className="min-h-screen">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>

        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
