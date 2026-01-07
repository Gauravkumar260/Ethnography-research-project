"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronLeft, Clock, Home, Heart, Loader2 } from 'lucide-react';
import api from '@/lib/api';

export default function InfographicPage() {
  const params = useParams();
  const slug = params.id as string; // Capture slug from URL
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Dynamic Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/communities/${slug}`);
        // ✅ Extract the actual data object
        setData(response.data.data); 
      } catch (error) {
        console.error("Failed to load infographic data", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchData();
  }, [slug]);

  const getUrl = (path?: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5000/${path}`;
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#E3E1DB]"><Loader2 className="w-10 h-10 animate-spin text-[#99302A]" /></div>;
  if (!data) return <div className="h-screen flex items-center justify-center">Data not found</div>;

  return (
    <div className="min-h-screen bg-[#E3E1DB]">
      
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <img 
          src={getUrl(data.heroImage)} 
          alt={data.name}
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <Link
            // ✅ Use slug to go back
            href={`/communities/${slug}`}
            className="flex items-center gap-2 text-[#E3E1DB] hover:text-[#99302A] transition-colors mb-6 w-fit"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Detailed View
          </Link>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl mb-3 text-[#E3E1DB] font-bold font-serif">
              Data Visualization: {data.name}
            </h1>
            <p className="text-lg text-[#99302A] mb-4">{data.subtitle}</p>
          </div>
        </div>
      </section>

      {/* SECTION 1: TIMELINE */}
      {data.timeline && data.timeline.length > 0 && (
        <section className="py-20 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Clock className="w-8 h-8 text-[#99302A]" />
              <h2 className="text-[#E3E1DB] text-3xl font-bold font-serif">History & Origin Timeline</h2>
            </div>
            
            <div className="relative">
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#99302A]"></div>
              
              <div className="space-y-12">
                {data.timeline.map((item: any, index: number) => (
                  <div 
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } flex-col md:gap-8 pl-8 md:pl-0`}
                  >
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="bg-[#99302A]/20 p-6 border border-[#99302A] rounded-lg hover:bg-[#99302A]/30 transition-colors">
                        <div className="text-2xl text-[#99302A] mb-2 font-bold font-serif">{item.year}</div>
                        <h4 className="text-[#E3E1DB] mb-2 font-semibold text-lg">{item.event}</h4>
                        <p className="text-sm text-[#E3E1DB]/70 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-[#99302A] rounded-full border-4 border-[#1a1a1a] z-10"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: LIFESTYLE STATS */}
      {data.lifestyle && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Home className="w-8 h-8 text-[#99302A]" />
              <h2 className="text-[#1a1a1a] text-3xl font-bold font-serif">Settlement Patterns</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {/* Distribution Bars */}
              {data.lifestyle.settlement && (
                <div>
                  <h3 className="text-[#1a1a1a] mb-6 font-semibold uppercase tracking-wider text-sm">Distribution</h3>
                  <div className="space-y-6">
                    {data.lifestyle.settlement.map((item: any, index: number) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[#1a1a1a] flex items-center gap-2 font-medium">
                            <span className="text-2xl">{item.icon}</span>
                            {item.label}
                          </span>
                          <span className="text-sm text-[#99302A] font-bold">{item.value}%</span>
                        </div>
                        <div className="h-3 bg-[#E3E1DB] overflow-hidden rounded-full">
                          <div 
                            className="h-full bg-[#99302A] rounded-full"
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Migration Logic Data */}
              {data.lifestyle.migration && (
                <div className="bg-[#99302A]/5 p-8 border-l-4 border-[#99302A] rounded-r-lg">
                  <h3 className="text-[#1a1a1a] mb-6 font-semibold uppercase tracking-wider text-sm">Migration Logic</h3>
                  <div className="space-y-6">
                    {Object.entries(data.lifestyle.migration).map(([key, val]: [string, any]) => (
                       <div key={key}>
                         <div className="text-xs text-[#1a1a1a]/50 uppercase font-bold tracking-widest mb-1">{key}</div>
                         <div className="text-lg text-[#1a1a1a] font-medium font-serif">{val}</div>
                       </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: ASPIRATIONS */}
      {data.aspirations && data.aspirations.length > 0 && (
        <section className="py-20 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Heart className="w-8 h-8 text-[#99302A]" />
              <h2 className="text-[#E3E1DB] text-3xl font-bold font-serif">Community Aspirations</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.aspirations.map((aspiration: any, index: number) => (
                <div key={index} className="bg-[#99302A]/10 p-8 border border-[#99302A]/30 text-center rounded-sm hover:bg-[#99302A]/20 transition-all group">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{aspiration.icon}</div>
                  <h4 className="text-[#E3E1DB] mb-3 font-semibold text-xl">{aspiration.goal}</h4>
                  <div className="text-4xl font-bold text-[#99302A] mb-2">{aspiration.interest}%</div>
                  <p className="text-xs text-[#E3E1DB]/50 uppercase tracking-widest">Priority Level</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}