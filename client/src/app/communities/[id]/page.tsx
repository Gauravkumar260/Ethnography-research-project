"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MapPin, ChevronLeft, BarChart3, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import MediaGallery from '@/components/features/MediaGallery';

interface Community {
  _id: string;
  name: string;
  slug: string;
  subtitle?: string;
  location?: string;
  heroImage?: string;
  intro?: string;
  description?: string;
  // Flexible record for sections (History, Craft, etc.)
  sections?: Record<string, { title: string; content: string }>;
  insights?: string[];
  futureDirection?: string;
  galleryImages?: string[];
  documentaryVideoUrl?: string;
}

export default function CommunityDetailPage() {
  const params = useParams();
  // Ensure we capture the slug properly even if it's an array
  const slug = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);

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

  // ✅ Helper: Dynamic & Secure Image URL
  const getUrl = (path?: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path; // External link
    
    // Dynamically grab base URL from env
    const baseUrl = process.env.NEXT_PUBLIC_API_URL 
      ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') 
      : 'http://localhost:5000';
      
    return `${baseUrl}/${path}`;
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#99302A]" />
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">Community Not Found</h2>
          <Link href="/communities" className="text-[#99302A] hover:underline">
            Return to list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url('${getUrl(community.heroImage)}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
        </div>
        
        <div className="relative z-10 w-full px-4 pb-12">
          <div className="max-w-5xl mx-auto">
            <Link 
              href="/communities"
              className="flex items-center gap-2 text-[#E3E1DB] hover:text-[#99302A] transition-colors mb-8 w-fit group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Communities
            </Link>
            <h1 className="text-[#E3E1DB] mb-3 text-5xl font-bold font-serif">
              {community.name}
            </h1>
            <p className="text-[#E3E1DB]/90 text-2xl mb-4 font-light">{community.subtitle}</p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-[#E3E1DB]/80">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{community.location}</span>
              </div>
              <Link 
                href={`/communities/${slug}/infographic`}
                className="flex items-center gap-2 bg-[#E3E1DB]/10 hover:bg-[#E3E1DB]/20 border border-[#E3E1DB]/30 px-4 py-2 rounded-full text-sm text-[#E3E1DB] transition-all backdrop-blur-sm"
              >
                <BarChart3 className="w-4 h-4" />
                View Infographic Data
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4 bg-white border-b border-[#1a1a1a]/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#1a1a1a]/80 text-xl leading-relaxed font-serif">
            {community.intro}
          </p>
        </div>
      </section>

      {/* Media Gallery */}
      {/* Passed empty array fallback to prevent undefined prop errors */}
      <section className="py-10 px-4 bg-[#FAFAF9]">
        <div className="max-w-6xl mx-auto">
           <MediaGallery images={community.galleryImages || []} />
        </div>
      </section>

      {/* Ethnographic Study Sections */}
      <section className="py-16 px-4 bg-[#E3E1DB]/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#1a1a1a] mb-12 text-center text-3xl font-bold font-serif">
            Ethnographic Study
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {community.sections && Object.entries(community.sections).map(([key, section]) => (
              <div key={key} className="bg-white p-8 border-l-4 border-[#99302A] shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-[#1a1a1a] mb-4 text-xl font-bold font-serif capitalize">
                  {section.title}
                </h3>
                <p className="text-[#1a1a1a]/70 leading-relaxed text-base">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Key Insights */}
      {community.insights && community.insights.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-[#1a1a1a] mb-8 text-2xl font-bold font-serif">Key Insights</h2>
            <div className="space-y-4">
              {community.insights.map((insight, index) => (
                <div key={index} className="flex gap-4 items-start p-4 bg-[#FAFAF9] rounded-lg border border-[#1a1a1a]/5">
                  <div className="w-2 h-2 bg-[#99302A] mt-2.5 flex-shrink-0"></div>
                  <p className="text-[#1a1a1a]/80 leading-relaxed text-lg">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Future Direction */}
      {community.futureDirection && (
        <section className="py-20 px-4 bg-[#99302A]/5 border-t border-[#99302A]/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[#1a1a1a] mb-6 text-2xl font-bold font-serif">
              Future Direction
            </h2>
            <div className="relative">
              <span className="text-6xl text-[#99302A]/20 absolute -top-8 -left-4 font-serif">"</span>
              <p className="text-[#1a1a1a]/80 leading-relaxed text-xl italic font-serif px-8">
                {community.futureDirection}
              </p>
              <span className="text-6xl text-[#99302A]/20 absolute -bottom-12 -right-4 font-serif">"</span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}