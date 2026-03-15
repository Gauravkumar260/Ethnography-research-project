"use client";

import { ShieldCheck, EyeOff, Scale, ScrollText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from 'next-intl';

export default function EthicsPage() {
  const t = useTranslations('Ethics');

  const guidelines = [
    {
      icon: ShieldCheck,
      title: t('consentTitle'),
      desc: t('consentDesc')
    },
    {
      icon: EyeOff,
      title: t('anonymTitle'),
      desc: t('anonymDesc')
    },
    {
      icon: Scale,
      title: t('benefitTitle'),
      desc: t('benefitDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#99302A] text-white border-none">{t('badge')}</Badge>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a] mb-6">{t('title')}</h1>
          <p className="text-[#1a1a1a]/60 text-lg leading-relaxed max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Core Principles Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {guidelines.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-[#E3E1DB] shadow-sm">
                <item.icon className="w-8 h-8 text-[#99302A] mb-4" />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Detailed Text Block */}
          <div className="bg-white p-8 md:p-12 rounded-2xl border border-[#E3E1DB] shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <ScrollText className="w-6 h-6 text-[#99302A]" />
              <h2 className="text-2xl font-serif font-bold">{t('governanceTitle')}</h2>
            </div>

            <div className="prose prose-slate max-w-none text-[#1a1a1a]/80 space-y-4">
              <p>
                {t('governanceIntro')}
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Visual Ethics:</strong> {t('visualEthics')}</li>
                <li><strong>Data Sovereignty:</strong> {t('dataSovereignty')}</li>
                <li><strong>Safe Storage:</strong> {t('safeStorage')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}