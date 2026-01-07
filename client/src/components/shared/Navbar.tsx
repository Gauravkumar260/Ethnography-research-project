"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  // Updated to match Header.jpg exactly
  const navLinks = [
    { name: "Communities", path: "/communities" },
    { name: "Documentaries", path: "/documentaries" },
    { name: "Research", path: "/research" },
    { name: "About", path: "/about" },   // Added
    { name: "Contact", path: "/contact" }, // Added
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#1a1a1a]/5 bg-[#FAFAF9]/95 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo Section - Updated to match 'The Unheard India' text style */}
        <Link href="/" className="flex items-center gap-3">
          {/* Optional: You can keep the 'U' logo or remove it to match the text-only look of the image */}
          
          <span className="font-serif text-2xl font-bold tracking-tight text-[#99302A]">
            The Unheard India
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#99302A] uppercase tracking-wide",
                isActive(link.path) ? "text-[#99302A] font-semibold" : "text-[#1a1a1a]/70"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {/* CTA Button */}
          
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[#1a1a1a]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAFAF9] border-b border-[#1a1a1a]/10 p-4 space-y-4 shadow-lg absolute w-full left-0">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "block text-sm font-medium py-2",
                isActive(link.path) ? "text-[#99302A]" : "text-[#1a1a1a]/70"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link href="/student-submission" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-[#99302A] text-white hover:bg-[#99302A]/90">
                Submit Research
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}