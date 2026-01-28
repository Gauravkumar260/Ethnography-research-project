import type { Metadata } from "next";
import { Inter, Crimson_Text } from "next/font/google"; // Academic fonts
import "@/styles/globals.css"; // Ensure this path matches your folder structure
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/sonner"; 
import ErrorBoundary from "@/components/ErrorBoundary"; // ✅ Integrated

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

// 2. Metadata
export const metadata: Metadata = {
  title: "Ethnographic Stories Platform",
  description: "A digital archive for marginalized narratives and academic research.",
};

// 3. Root Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${crimson.variable} font-sans antialiased bg-[#FAFAF9]`}>
        
        {/* Navigation stays visible even if page errors occur */}
        <Navbar />
        
        <main className="min-h-screen">
          {/* ✅ Safety Layer: Only the page content is wrapped */}
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>

        <Footer />
        
        {/* Toast Notifications */}
        <Toaster />
        
      </body>
    </html>
  );
}