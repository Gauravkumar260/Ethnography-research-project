"use client";

import React from 'react';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <section className="py-20 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold font-serif tracking-wide">
            {t('title')}
          </h1>
          <p className="text-[#E3E1DB]/80 text-lg leading-relaxed max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 bg-[#FAFAF9]">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* Introduction */}
          <div>
            <p className="text-xl text-[#1a1a1a] leading-relaxed mb-8 font-medium">
              {t('introText')}
            </p>

            {/* Programs List */}
            <div className="bg-white p-6 md:p-8 rounded-sm border border-[#1a1a1a]/10 shadow-sm">
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#99302A] mt-2.5 flex-shrink-0"></div>
                  <div className="text-[#1a1a1a]/80 text-lg">
                    <strong className="text-[#1a1a1a] block mb-1 font-serif text-xl">B.Des in User Experience (UX) (4-year undergraduate program)</strong>
                    Focused on human-centered digital and research-driven design.
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#99302A] mt-2.5 flex-shrink-0"></div>
                  <div className="text-[#1a1a1a]/80 text-lg">
                    <strong className="text-[#1a1a1a] block mb-1 font-serif text-xl">B.Des in Visual Graphics & Animation (VGA) (4-year undergraduate program)</strong>
                    Exploring visual storytelling, branding, and motion.
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#99302A] mt-2.5 flex-shrink-0"></div>
                  <div className="text-[#1a1a1a]/80 text-lg">
                    <strong className="text-[#1a1a1a] block mb-1 font-serif text-xl">B.Des in Interior Design (ID) (4-year undergraduate program)</strong>
                    Shaping functional and experiential spaces.
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#99302A] mt-2.5 flex-shrink-0"></div>
                  <div className="text-[#1a1a1a]/80 text-lg">
                    <strong className="text-[#1a1a1a] block mb-1 font-serif text-xl">B.Des in Product Design (PD) (4-year undergraduate program)</strong>
                    Focusing on innovative product development, materials, manufacturing processes, sustainability, and user-centered physical design solutions.
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#99302A] mt-2.5 flex-shrink-0"></div>
                  <div className="text-[#1a1a1a]/80 text-lg">
                    <strong className="text-[#1a1a1a] block mb-1 font-serif text-xl">M.Des in User Experience (UX) (2-year postgraduate program)</strong>
                    Advancing strategic and research-led design practices.
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#99302A] mt-2.5 flex-shrink-0"></div>
                  <div className="text-[#1a1a1a]/80 text-lg">
                    <strong className="text-[#1a1a1a] block mb-1 font-serif text-xl">Ph.D. in Design</strong>
                    (as per DIT University prescribed duration according to Academic Ordinance) – a doctoral research program contributing to academic and industry-oriented research in design.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Philosophy Quote */}
          <div className="bg-[#E3E1DB]/30 p-8 md:p-12 border-l-4 border-[#99302A]">
            <p className="text-[#1a1a1a] text-2xl font-serif italic leading-relaxed">
              &quot;{t('quote')}&quot;
            </p>
          </div>

          {/* Ethnographic Research */}
          <div>
            <h2 className="text-[#1a1a1a] mb-6 text-3xl font-bold font-serif">
              {t('ethnoTitle')}
            </h2>
            <div className="space-y-4 text-[#1a1a1a]/80 leading-relaxed text-lg">
              <p>{t('ethnoP1')}</p>
              <p>{t('ethnoP2')}</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-[#99302A]/5 p-8 text-sm text-[#1a1a1a]/70 leading-relaxed border border-[#99302A]/10 rounded-sm">
            <h3 className="text-[#99302A] mb-4 text-lg font-bold font-serif uppercase tracking-widest">
              {t('disclaimerTitle')}
            </h3>
            <div className="space-y-3">
              <p>{t('disclaimerP1')}</p>
              <p>{t('disclaimerP2')}</p>
              <p>{t('disclaimerP3')}</p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer Branding */}
      <section className="py-12 px-4 bg-[#1a1a1a] text-[#E3E1DB] border-t border-[#E3E1DB]/10">
        <div className="max-w-4xl mx-auto text-center opacity-60 text-sm font-light tracking-wide">
          {t('footerBrand')}
        </div>
      </section>
    </div>
  );
}
