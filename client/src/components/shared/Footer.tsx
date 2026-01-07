"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-[#E3E1DB] py-20 border-t border-[#E3E1DB]/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 text-sm">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-white">
              Unheard India
            </h3>
            <p className="opacity-70 leading-relaxed max-w-xs">
              Preserving stories today, so history doesn't lose them tomorrow.
            </p>
          </div>

          {/* Explore Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-white">Explore</h4>
            <ul className="space-y-3 opacity-70">
              <li>
                <Link href="/communities" className="hover:text-white hover:underline transition-all">
                  Communities
                </Link>
              </li>
              <li>
                <Link href="/documentaries" className="hover:text-white hover:underline transition-all">
                  Documentaries
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-white hover:underline transition-all">
                  Research Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Research Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-white">Research</h4>
            <ul className="space-y-3 opacity-70">
              <li>
                <Link href="/research/thesis" className="hover:text-white hover:underline transition-all">
                  Thesis & Dissertations
                </Link>
              </li>
              <li>
                <Link href="/research/publications" className="hover:text-white hover:underline transition-all">
                  Publications
                </Link>
              </li>
              <li>
                {/* ✅ Fixed: Points to the correct nested route */}
                <Link href="/research/field-data" className="hover:text-white hover:underline transition-all">
                  Field Data Repository
                </Link>
              </li>
              <li>
                <Link href="/research/patents" className="hover:text-white hover:underline transition-all">
                  Patents & Innovations
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-white">Connect</h4>
            <ul className="space-y-3 opacity-70">
              <li>
                <Link href="/about" className="hover:text-white hover:underline transition-all">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:underline transition-all">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/student-submission" className="hover:text-white hover:underline transition-all">
                  Submit Research
                </Link>
              </li>
              <li>
                {/* ✅ Added: Important for your platform */}
                <Link href="/ethics-guidelines" className="hover:text-white hover:underline transition-all">
                  Ethics Guidelines
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white hover:underline transition-all">
                  Faculty Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-[#E3E1DB]/10 text-center text-xs opacity-40">
          © 2025 Unheard India — Living Ethnographies
        </div>
      </div>
    </footer>
  );
}