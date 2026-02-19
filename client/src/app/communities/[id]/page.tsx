'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { MapPin, ChevronLeft, BarChart3, Loader2 } from 'lucide-react';
import api from '@/lib/api';
// Assuming you have this component, otherwise I can provide it
import MediaGallery from '@/components/features/MediaGallery';

// 1. Strict Types
interface Section {
  title: string;
  content: string;
}

interface Community {
  _id: string;
  name: string;
  slug: string;
  subtitle?: string;
  location?: string;
  heroImage: string;
  intro?: string;
  sections?: {
    history?: Section;
    lifestyle?: Section;
    craft?: Section;
    culture?: Section;
  };
  insights?: string[];
  futureDirection?: string;
  galleryImages?: string[];
}

export default function CommunityDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);

  // 2. Fetch Data
  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        if (!slug) return;
        const { data: responseData } = await api.get(`/communities/${slug}`);
        setCommunity(responseData.data); 
      } catch (error) {
        console.error("Failed to fetch community data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommunity();
  }, [slug]);

  // 3. Helper: Dynamic Image URL
  const getUrl = (path?: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/assets')) return path; // ✅ Serve local assets from Next.js public folder
    const baseUrl = process.env.NEXT_PUBLIC_API_URL 
      ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') 
      : 'http://localhost:5000';
    return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path.replace(/\\/g, "/")}`;
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FAFAF9]">
        <Loader2 className="w-10 h-10 animate-spin text-[#99302A]" />
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF9]">
        <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2 font-serif">Community Not Found</h2>
        <Link href="/communities" className="text-[#99302A] hover:underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Return to directory
        </Link>
      </div>
    );
  }

  // Narrative Flow Order
  const sectionKeys: (keyof NonNullable<Community['sections']>)[] = ['history', 'lifestyle', 'craft', 'culture'];

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      
      {/* HERO SECTION */}
      <section className="relative h-[85vh] flex items-end overflow-hidden group">
        {/* Next.js Optimized Background Image */}
        <div className="absolute inset-0">
            <Image 
                src={getUrl(community.heroImage)}
                alt={community.name}
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            <Link 
              href="/communities"
              className="flex items-center gap-2 text-[#E3E1DB]/80 hover:text-white transition-colors mb-8 w-fit backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full text-sm border border-white/10"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Communities
            </Link>
            
            <div className="animate-fade-in-up">
                <h1 className="text-[#E3E1DB] mb-2 text-5xl md:text-8xl font-bold font-serif leading-tight">
                {community.name}
                </h1>
                <p className="text-[#E3E1DB]/90 text-xl md:text-3xl mb-8 font-light max-w-3xl font-serif italic">
                    {community.subtitle}
                </p>
                
                <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2 text-[#E3E1DB]">
                        <MapPin className="w-5 h-5 text-[#99302A]" />
                        <span className="text-lg font-medium tracking-wide">{community.location}</span>
                    </div>
                    
                    {/* Link to Infographic Page */}
                    <Link 
                        href={`/communities/${community.slug}/infographic`}
                        className="flex items-center gap-2 bg-[#99302A] hover:bg-[#7a2621] text-white px-8 py-3 rounded-sm text-sm font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        <BarChart3 className="w-4 h-4" />
                        View Data Insights
                    </Link>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 px-4 bg-white border-b border-[#1a1a1a]/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#1a1a1a]/80 text-xl md:text-3xl leading-relaxed font-serif font-light">
            "{community.intro}"
          </p>
        </div>
      </section>

      {/* ETHNOGRAPHIC SECTIONS */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-24">
            {community.sections && sectionKeys.map((key, index) => {
              const section = community.sections?.[key];
              if (!section) return null;

              return (
                <div key={key} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-start`}>
                  <div className="flex-1">
                    <span className="text-[#99302A] font-bold tracking-widest uppercase text-xs mb-3 block">
                        PART 0{index + 1}
                    </span>
                    <h3 className="text-[#1a1a1a] mb-6 text-4xl font-bold font-serif capitalize">
                      {section.title}
                    </h3>
                    <div className="w-20 h-1 bg-[#99302A] mb-8"></div>
                    <p className="text-[#1a1a1a]/70 leading-relaxed text-lg whitespace-pre-wrap font-light">
                      {section.content}
                    </p>
                  </div>
                  
                  {/* Decorative Letter */}
                  <div className="hidden md:flex flex-1 justify-center items-center opacity-5 select-none pointer-events-none">
                    <div className="text-[12rem] font-serif font-bold text-[#1a1a1a]">
                        {key[0].toUpperCase()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALLERY (Safe Render) */}
      {community.galleryImages && community.galleryImages.length > 0 && (
          <section className="py-24 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
            <div className="max-w-7xl mx-auto">
                <h2 className="mb-12 text-3xl font-serif text-center">Visual Documentation</h2>
                <MediaGallery images={community.galleryImages.map(img => getUrl(img))} />
            </div>
          </section>
      )}

      {/* FUTURE DIRECTION */}
      {community.futureDirection && (
        <section className="py-32 px-4 bg-[#FAFAF9]">
          <div className="max-w-3xl mx-auto text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#99302A]/10 text-9xl font-serif">”</div>
            <h2 className="text-[#1a1a1a] mb-8 text-xs font-bold uppercase tracking-widest text-[#99302A]">
              Future Direction
            </h2>
            <p className="text-[#1a1a1a]/80 leading-relaxed text-2xl md:text-3xl font-serif italic relative z-10">
              {community.futureDirection}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}