"use client";

import Link from "next/link";
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-primary text-primary-foreground py-20 border-t border-primary-foreground/10">
      <div className="container mx-auto px-4">

        <div className="grid md:grid-cols-4 gap-12 text-sm">

          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <h3 className="font-serif text-xl font-bold text-primary-foreground">
                {t('brand')}
              </h3>
            </Link>
            <p className="opacity-70 leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
          </div>

          {/* Explore Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-primary-foreground">{t('explore')}</h4>
            <ul className="space-y-3 opacity-70">
              <li>
                <Link href="/communities" className="hover:text-primary-foreground hover:underline transition-all">
                  {t('communities')}
                </Link>
              </li>
              <li>
                <Link href="/documentaries" className="hover:text-primary-foreground hover:underline transition-all">
                  {t('documentaries')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-primary-foreground">{t('connect')}</h4>
            <ul className="space-y-3 opacity-70">
              <li>
                <Link href="/about" className="hover:text-primary-foreground hover:underline transition-all">
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-foreground hover:underline transition-all">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link href="/student-submission" className="hover:text-primary-foreground hover:underline transition-all">
                  {t('submitResearch')}
                </Link>
              </li>
              <li>
                <Link href="/ethics-guidelines" className="hover:text-primary-foreground hover:underline transition-all">
                  {t('ethicsGuidelines')}
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-primary-foreground hover:underline transition-all">
                  {t('facultyLogin')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 text-center text-xs opacity-40">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
