"use client";

import React from 'react';
import { Mail, Users, Building, GraduationCap, Video } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('Contact');

  return (
    <div className="min-h-screen bg-[#E3E1DB]">

      {/* Header */}
      <section className="py-20 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold font-serif">
            {t('title')}
          </h1>
          <p className="text-[#E3E1DB]/80 text-lg font-light">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Introduction Text */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-[#1a1a1a]/80 leading-relaxed text-lg">
              {t('introText')}
            </p>
          </div>

          {/* Cards Grid - 2x2 */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">

            {/* Card 1: NGOs */}
            <div className="bg-white p-8 border-l-4 border-[#99302A] shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-[#99302A]/10 flex items-center justify-center flex-shrink-0 text-[#99302A]">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[#1a1a1a] mb-2 text-xl font-bold font-serif">{t('ngosTitle')}</h3>
                  <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">{t('ngosDesc')}</p>
                </div>
              </div>
            </div>

            {/* Card 2: Academic */}
            <div className="bg-white p-8 border-l-4 border-[#99302A] shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-[#99302A]/10 flex items-center justify-center flex-shrink-0 text-[#99302A]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[#1a1a1a] mb-2 text-xl font-bold font-serif">{t('academicTitle')}</h3>
                  <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">{t('academicDesc')}</p>
                </div>
              </div>
            </div>

            {/* Card 3: Government */}
            <div className="bg-white p-8 border-l-4 border-[#99302A] shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-[#99302A]/10 flex items-center justify-center flex-shrink-0 text-[#99302A]">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[#1a1a1a] mb-2 text-xl font-bold font-serif">{t('governmentTitle')}</h3>
                  <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">{t('governmentDesc')}</p>
                </div>
              </div>
            </div>

            {/* Card 4: Media */}
            <div className="bg-white p-8 border-l-4 border-[#99302A] shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-[#99302A]/10 flex items-center justify-center flex-shrink-0 text-[#99302A]">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[#1a1a1a] mb-2 text-xl font-bold font-serif">{t('mediaTitle')}</h3>
                  <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">{t('mediaDesc')}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Get In Touch Section */}
          <div className="text-center mb-20">
            <h2 className="text-[#1a1a1a] mb-6 text-2xl font-bold font-serif">{t('getInTouch')}</h2>
            <p className="text-[#1a1a1a]/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('getInTouchDesc')}
            </p>
            <div className="inline-flex items-center gap-3 bg-white px-8 py-4 shadow-sm border border-[#1a1a1a]/10 hover:border-[#99302A]/50 transition-all ">
              <Mail className="w-5 h-5 text-[#99302A]" />
              <a href="mailto:patodesign@dituniversity.edu.in" className="text-[#1a1a1a] font-medium hover:text-[#99302A] transition-colors">
                patodesign@dituniversity.edu.in
              </a>
            </div>
            <p className="text-xs text-[#1a1a1a]/50 mt-4 italic">
              {t('emailNote')}
            </p>
          </div>

          {/* Collaboration Principles */}
          <div className="bg-white p-10 shadow-sm border-l-4 border-[#99302A]">
            <h3 className="text-[#1a1a1a] mb-6 text-xl font-bold font-serif">{t('principlesTitle')}</h3>
            <ul className="space-y-4 text-sm text-[#1a1a1a]/80">
              {[t('principle1'), t('principle2'), t('principle3'), t('principle4'), t('principle5')].map((principle, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="w-2 h-2 bg-[#99302A] mt-2 flex-shrink-0 rotate-45"></div>
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}