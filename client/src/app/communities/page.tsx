"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Loader2 } from 'lucide-react';
import api from '@/lib/api';

interface CommunityCard {
  _id: string;
  name: string;
  slug: string;
  subtitle?: string;
  location?: string;
  heroImage?: string;
  description?: string;
}

export default function CommunitiesPage() {
  const [communitiesList, setCommunitiesList] = useState<CommunityCard[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Communities
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const { data: responseData } = await api.get('/communities'); 
        setCommunitiesList(responseData.data || []); 
      } catch (error) {
        console.error("Failed to load communities", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommunities();
  }, []);

  // 2. Helper for Image URLs (Secured & Dynamic)
  // Fixes "Hardcoded Secrets" issue from Code Review
  const getImageUrl = (path?: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path; // External (Unsplash)
    
    // Use the environment variable, or fallback gracefully
    const baseUrl = process.env.NEXT_PUBLIC_API_URL 
      ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') // Remove '/api' suffix
      : 'http://localhost:5000';
      
    return `${baseUrl}/${path}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#FAFAF9]">
        <Loader2 className="w-10 h-10 animate-spin text-[#99302A]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold font-serif">Communities We Document</h1>
          <p className="text-[#E3E1DB]/80 text-lg">Lives, crafts, and cultures that shape India's diverse heritage</p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {communitiesList.length === 0 ? (
            <div className="text-center text-gray-500">No communities found.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {communitiesList.map((community) => (
                <Link 
                  href={`/communities/${community.slug}`}
                  key={community._id}
                  className="group cursor-pointer bg-white overflow-hidden hover:shadow-2xl transition-all duration-300 border border-[#1a1a1a]/10 block"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={getImageUrl(community.heroImage)}
                      alt={community.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h2 className="mb-2 text-2xl font-bold font-serif">{community.name}</h2>
                      <p className="text-sm opacity-90 mb-3">{community.subtitle}</p>
                      <div className="flex items-start gap-2 text-xs opacity-80">
                        <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>{community.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-[#1a1a1a]/70 mb-5 leading-relaxed line-clamp-3">
                      {community.description}
                    </p>
                    <span className="text-sm text-[#99302A] group-hover:underline flex items-center gap-1 font-semibold">
                      View Story <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}