// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Crimson_Text } from "next/font/google"; // Using Crimson Text for that academic feel
import "../styles/globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/sonner"; // Your toast notification

// Configure fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const crimson = Crimson_Text({ 
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: "--font-serif" 
});

export const metadata: Metadata = {
  title: "Ethnographic Stories Platform",
  description: "A digital archive for marginalized narratives and academic research.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${crimson.variable} font-sans antialiased bg-[#FAFAF9]`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}