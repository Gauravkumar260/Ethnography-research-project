"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronLeft, Clock, Home, Heart, Loader2, ArrowUpRight } from 'lucide-react';
import api from '@/lib/api';

export default function InfographicPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  
  const [data, setData] = useState<any>(null);
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
    const baseUrl = process.env.NEXT_PUBLIC_API_URL 
      ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') 
      : 'http://localhost:5000';
    return `${baseUrl}/${path.replace(/\\/g, "/")}`;
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#E3E1DB]"><Loader2 className="w-10 h-10 animate-spin text-[#99302A]" /></div>;
  if (!data) return <div className="h-screen flex items-center justify-center bg-[#E3E1DB]">Data not found</div>;

  // ✅ FIX: Backend sends stats in 'statistics', NOT 'lifestyle'
  const stats = data.statistics || {}; 

  return (
    <div className="min-h-screen bg-[#E3E1DB]">
      
      {/* HEADER */}
      <section className="relative h-[50vh] overflow-hidden">
        <img 
          src={getUrl(data.heroImage)} 
          alt={data.name}
          className="w-full h-full object-cover grayscale brightness-50"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <Link
            href={`/communities/${data.slug}`}
            className="flex items-center gap-2 text-[#E3E1DB] hover:text-[#99302A] transition-colors mb-6 w-fit bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Story
          </Link>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl mb-3 text-[#E3E1DB] font-bold font-serif">
              Data Visualization: {data.name}
            </h1>
            <p className="text-xl text-[#99302A] font-medium">{data.subtitle}</p>
          </div>
        </div>
      </section>

      {/* 1. TIMELINE */}
      
      {data.timeline && data.timeline.length > 0 && (
        <section className="py-20 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-16 border-b border-[#E3E1DB]/10 pb-6">
              <Clock className="w-8 h-8 text-[#99302A]" />
              <h2 className="text-3xl font-bold font-serif">Historical Timeline</h2>
            </div>
            
            <div className="relative border-l-2 border-[#99302A]/30 ml-4 md:ml-0 md:pl-0 space-y-12">
              {data.timeline.map((item: any, index: number) => (
                <div key={index} className="relative pl-8 md:pl-0">
                  {/* Dot */}
                  <div className="absolute left-[-5px] md:left-0 top-0 w-3 h-3 bg-[#99302A] rounded-full ring-4 ring-[#1a1a1a]"></div>
                  
                  <div className="md:grid md:grid-cols-12 md:gap-8">
                    <div className="md:col-span-2 text-[#99302A] font-bold text-xl md:text-right font-serif">{item.year}</div>
                    <div className="md:col-span-10">
                      <h4 className="text-xl font-bold mb-2 text-white">{item.event}</h4>
                      <p className="text-[#E3E1DB]/60 leading-relaxed max-w-2xl">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. STATS (Settlement & Migration) */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Home className="w-8 h-8 text-[#99302A]" />
            <h2 className="text-[#1a1a1a] text-3xl font-bold font-serif">Livelihood & Settlement</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Charts */}
            {stats.settlement && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a]/50 mb-8">Settlement Distribution</h3>
                <div className="space-y-8">
                  {stats.settlement.map((item: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2 items-end">
                        <span className="flex items-center gap-3 text-lg font-medium text-[#1a1a1a]">
                           <span className="text-2xl bg-[#E3E1DB]/30 w-10 h-10 flex items-center justify-center rounded-lg">{item.icon}</span> 
                           {item.label}
                        </span>
                        <span className="text-2xl font-bold text-[#99302A]">{item.value}%</span>
                      </div>
                      <div className="h-2 w-full bg-[#E3E1DB] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#99302A] rounded-full transition-all duration-1000"
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Value Cards */}
            {stats.migration && (
              <div className="bg-[#FAFAF9] p-8 border border-[#1a1a1a]/5 rounded-xl">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a]/50 mb-8">Migration Logic</h3>
                 <div className="grid gap-6">
                    {Object.entries(stats.migration).map(([key, val]: [string, any]) => (
                        <div key={key} className="border-b border-[#1a1a1a]/10 pb-4 last:border-0">
                            <div className="text-xs font-bold text-[#99302A] uppercase mb-1">{key}</div>
                            <div className="text-xl font-serif text-[#1a1a1a]">{val}</div>
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
        <section className="py-20 px-4 bg-[#E3E1DB]">
          <div className="max-w-6xl mx-auto">
             <div className="flex items-center gap-4 mb-12">
                <Heart className="w-8 h-8 text-[#99302A]" />
                <h2 className="text-[#1a1a1a] text-3xl font-bold font-serif">Community Aspirations</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
                {data.aspirations.map((asp: any, i: number) => (
                    <div key={i} className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-[#99302A] hover:-translate-y-1 transition-transform duration-300">
                        <div className="text-4xl mb-4">{asp.icon}</div>
                        <h4 className="text-xl font-bold text-[#1a1a1a] mb-2">{asp.goal}</h4>
                        <div className="flex items-center gap-2 text-[#1a1a1a]/60 text-sm font-medium">
                            <span>Priority Level</span>
                            <div className="flex-1 h-px bg-[#1a1a1a]/10"></div>
                            <span className="text-[#99302A] font-bold">{asp.interest}%</span>
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