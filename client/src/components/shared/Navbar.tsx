"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const assets = {
  LOGO: {
    ditlogo: "/assets/DIT-LOGO.svg",
    SODDITLOGO: "/assets/SOD DIT LOGO.svg",
  }
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  // Updated to match Header.jpg exactly
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Communities", path: "/communities" },
    { name: "Documentaries", path: "/documentaries" },
    { name: "Research", path: "/research" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#1a1a1a]/5 bg-[#FAFAF9]/95 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">

       <div className="flex items-center gap-4">
       {/* Logo 1: DIT University */}
       <div className="h-10 md:h-12 lg:h-16 w-auto transition-all duration-300">
       <a href="https://www.dituniversity.edu.in" target="_blank" rel="noopener noreferrer">
       <img
        src={assets.LOGO.ditlogo}
        alt="DIT Logo"
        className="h-full w-auto object-contain"
        />
       </a>
       </div>

       {/* Logo 2: SOD Alumni */}
       <div className="h-10 md:h-12 lg:h-16 w-auto transition-all duration-300">
       <a href="https://www.dituniversity.edu.in/school/school-of-design/our-alumni" target="_blank" rel="noopener noreferrer">
       <img
        src={assets.LOGO.SODDITLOGO}
        alt="SOD DIT Logo"
        className="h-full w-auto object-contain"
       />
       </a>
       </div>
       </div>

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