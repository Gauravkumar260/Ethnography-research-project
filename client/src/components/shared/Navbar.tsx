"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const assets = {
  LOGO: {
    ditlogo: "/assets/DIT-LOGO.svg",
    SODDITLOGO: "/assets/SOD DIT LOGO.svg",
  }
}

export function Navbar() {
  const t = useTranslations('Navigation');
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  // Updated to match Header.jpg exactly
  const navLinks = [
    { name: t('home'), path: "/" },
    { name: t('communities'), path: "/communities" },
    { name: "Documentaries", path: "/documentaries" },
    // { name: t('research'), path: "/research" },
    { name: t('about'), path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled
        ? "shadow-md bg-background/95 backdrop-blur-sm border-b border-border"
        : "bg-transparent border-b border-transparent"
    )}>
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
                "text-sm font-medium transition-colors hover:text-secondary uppercase tracking-wide",
                isActive(link.path) ? "text-secondary font-semibold" : "text-primary/70"
              )}
            >
              {link.name}
            </Link>
          ))}

          {/* CTA Button */}

        </div>

        {/* Mobile Nav — Sheet Drawer */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2 rounded-md text-primary hover:bg-muted transition-colors"
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-background pt-12">
            <nav className="flex flex-col gap-6 mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "block text-lg font-medium py-2 transition-colors hover:text-secondary",
                    isActive(link.path) ? "text-secondary font-semibold" : "text-primary/70"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Link href="/student-submission">
                    Submit Research
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
