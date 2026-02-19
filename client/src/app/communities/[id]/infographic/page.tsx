'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ChevronLeft, Clock, Home, Heart, Loader2, TrendingUp } from 'lucide-react';
import api from '@/lib/api';

// 1. Strict Types for Data Visualization
interface TimelineItem {
  year: string;
  event: string;
  description: string;
}

interface StatItem {
  icon: string;
  label: string;
  value: number;
}

interface MigrationData {
  [key: string]: string | number;
}

interface Aspiration {
  icon: string;
  goal: string;
  interest: number;
}

interface InfographicData {
  _id: string;
  name: string;
  slug: string;
  subtitle: string;
  heroImage: string;
  timeline?: TimelineItem[];
  statistics?: {
    settlement?: StatItem[];
    migration?: MigrationData;
  };
  aspirations?: Aspiration[];
}

export default function InfographicPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  
  const [data, setData] = useState<InfographicData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!slug) return;
        const response = await api.get(`/communities/${slug}`);
        setData(response.data.data); 
      } catch (error) {
        console.error("Failed to load infographic data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const getUrl = (path?: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/assets')) return path; // ✅ Serve local assets from Next.js public folder
    const baseUrl = process.env.NEXT_PUBLIC_API_URL 
      ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') 
      : 'http://localhost:5000';
    return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path.replace(/\\/g, "/")}`;
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#E3E1DB]"><Loader2 className="w-10 h-10 animate-spin text-[#99302A]" /></div>;
  if (!data) return <div className="h-screen flex items-center justify-center bg-[#E3E1DB]">Data not found</div>;

  const stats = data.statistics || {}; 

  return (
    <div className="min-h-screen bg-[#E3E1DB]">
      
      {/* COMPACT HEADER */}
      <section className="relative h-[40vh] overflow-hidden">
        <Image 
          src={getUrl(data.heroImage)} 
          alt={data.name}
          fill
          className="object-cover grayscale brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <Link
            href={`/communities/${data.slug}`}
            className="flex items-center gap-2 text-[#E3E1DB] hover:text-[#99302A] transition-colors mb-6 w-fit bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Narrative
          </Link>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl mb-3 text-[#E3E1DB] font-bold font-serif">
              Data Visualization
            </h1>
            <p className="text-xl text-[#99302A] font-medium tracking-wide uppercase">{data.name}</p>
          </div>
        </div>
      </section>

      {/* 1. TIMELINE */}
      {data.timeline && data.timeline.length > 0 && (
        <section className="py-24 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-16 border-b border-[#E3E1DB]/10 pb-6">
              <Clock className="w-8 h-8 text-[#99302A]" />
              <h2 className="text-3xl font-bold font-serif">Historical Timeline</h2>
            </div>
            
            <div className="relative ml-4 md:ml-0 md:pl-0 space-y-16">
              {/* Continuous Vertical Line */}
              <div className="absolute left-[5px] md:left-2 top-2 bottom-0 w-0.5 bg-[#99302A]/30"></div>

              {data.timeline.map((item, index) => (
                <div key={index} className="relative pl-10 md:pl-12 group">
                  {/* Dot */}
                  <div className="absolute left-0 md:left-[3px] top-1.5 w-3 h-3 bg-[#99302A] rounded-full ring-4 ring-[#1a1a1a] group-hover:scale-125 transition-transform"></div>
                  
                  <div className="md:grid md:grid-cols-12 md:gap-12">
                    <div className="md:col-span-2 text-[#99302A] font-bold text-2xl font-serif leading-none mb-2 md:mb-0">{item.year}</div>
                    <div className="md:col-span-10">
                      <h4 className="text-xl font-bold mb-3 text-white">{item.event}</h4>
                      <p className="text-[#E3E1DB]/60 leading-relaxed text-lg font-light border-l-2 border-white/10 pl-4">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. STATS (Settlement & Migration) */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <Home className="w-8 h-8 text-[#99302A]" />
            <h2 className="text-[#1a1a1a] text-3xl font-bold font-serif">Livelihood & Settlement</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-20">
            {/* Settlement Charts */}
            {stats.settlement && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/50 mb-10 border-b pb-2">Settlement Pattern</h3>
                <div className="space-y-10">
                  {stats.settlement.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-3 items-end">
                        <span className="flex items-center gap-4 text-lg font-medium text-[#1a1a1a]">
                           <span className="text-2xl bg-[#FAFAF9] border border-gray-200 w-12 h-12 flex items-center justify-center rounded-lg shadow-sm">{item.icon}</span> 
                           {item.label}
                        </span>
                        <span className="text-2xl font-bold text-[#99302A] font-serif">{item.value}%</span>
                      </div>
                      <div className="h-3 w-full bg-[#E3E1DB]/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#99302A] rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Migration Cards */}
            {stats.migration && (
              <div className="bg-[#FAFAF9] p-10 border border-[#1a1a1a]/5 rounded-xl shadow-sm">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/50 mb-8 border-b pb-2">Migration Logic</h3>
                 <div className="grid gap-8">
                    {Object.entries(stats.migration).map(([key, val]) => (
                        <div key={key} className="flex justify-between items-center group">
                            <div className="text-xs font-bold text-[#99302A] uppercase tracking-wider">{key}</div>
                            <div className="text-xl font-serif text-[#1a1a1a] border-b border-dashed border-gray-300 pb-1">{val}</div>
                        </div>
                    ))}
                 </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. ASPIRATIONS */}
      {data.aspirations && data.aspirations.length > 0 && (
        <section className="py-24 px-4 bg-[#E3E1DB]">
          <div className="max-w-6xl mx-auto">
             <div className="flex items-center gap-4 mb-12">
                <TrendingUp className="w-8 h-8 text-[#99302A]" />
                <h2 className="text-[#1a1a1a] text-3xl font-bold font-serif">Community Aspirations</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                {data.aspirations.map((asp, i) => (
                    <div key={i} className="bg-white p-8 rounded-lg shadow-md border-t-4 border-[#99302A] hover:-translate-y-2 transition-transform duration-300">
                        <div className="text-5xl mb-6 opacity-80">{asp.icon}</div>
                        <h4 className="text-xl font-bold text-[#1a1a1a] mb-3">{asp.goal}</h4>
                        
                        {/* Custom Priority Meter */}
                        <div className="mt-6">
                            <div className="flex justify-between text-xs font-bold uppercase text-[#1a1a1a]/40 mb-2">
                                <span>Priority</span>
                                <span>{asp.interest}%</span>
                            </div>
                            <div className="flex gap-1 h-2">
                                {[...Array(10)].map((_, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`flex-1 rounded-full ${idx < (asp.interest / 10) ? 'bg-[#99302A]' : 'bg-[#E3E1DB]'}`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}