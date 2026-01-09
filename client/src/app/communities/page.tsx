"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Loader2, AlertCircle } from 'lucide-react';
import api from '@/lib/api';

// Shape of the data for the card
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
  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // 1. FETCH COMMUNITIES
  // ==========================================
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setLoading(true);
        // Backend returns: { success: true, count: 5, data: [...] }
        const { data: responseData } = await api.get('/communities'); 
        
        // Safety check to ensure we set an array
        setCommunitiesList(responseData.data || []); 
      } catch (err) {
        console.error("Failed to load communities", err);
        setError("Unable to load community data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  // ==========================================
  // 2. IMAGE HELPER
  // ==========================================
  const getImageUrl = (path?: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path; // External Link (Unsplash)
    
    // Local File: Append backend URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL 
      ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') 
      : 'http://localhost:5000';
      
    return `${baseUrl}/${path.replace(/\\/g, "/")}`;
  };

  // ==========================================
  // 3. RENDER STATES
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#FAFAF9]">
        <Loader2 className="w-10 h-10 animate-spin text-[#99302A]" />
      </div>
    );
  }

  if (error) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#FAFAF9] text-center px-4">
            <AlertCircle className="w-12 h-12 text-[#99302A] mb-4 opacity-50" />
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">Connection Error</h2>
            <p className="text-[#1a1a1a]/60 max-w-md">{error}</p>
        </div>
    )
  }

  // ==========================================
  // 4. MAIN UI
  // ==========================================
  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      
      {/* HEADER SECTION */}
      <section className="py-20 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-4 text-4xl md:text-5xl font-bold font-serif">
            Communities We Document
          </h1>
          <p className="text-[#E3E1DB]/80 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Lives, crafts, and cultures that shape India's diverse heritage
          </p>
        </div>
      </section>

      {/* GRID SECTION */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {communitiesList.length === 0 ? (
            <div className="text-center text-gray-500 py-20 bg-white border border-dashed rounded-lg">
                No communities found in the database.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {communitiesList.map((community) => (
                <Link 
                  href={`/communities/${community.slug}`} // Links to dynamic detail page
                  key={community._id}
                  className="group cursor-pointer bg-white rounded-sm overflow-hidden hover:shadow-2xl transition-all duration-500 border border-[#1a1a1a]/5 flex flex-col h-full"
                >
                  
                  {/* IMAGE CARD */}
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={getImageUrl(community.heroImage)}
                      alt={community.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    
                    {/* Text Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h2 className="mb-1 text-2xl font-bold font-serif tracking-wide">
                        {community.name}
                      </h2>
                      <p className="text-sm text-white/90 mb-3 font-medium uppercase tracking-wider text-[11px]">
                        {community.subtitle}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs text-white/70 border-t border-white/20 pt-3 mt-3">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{community.location || 'India'}</span>
                      </div>
                    </div>
                  </div>

                  {/* CONTENT BODY */}
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-[#1a1a1a]/70 mb-6 leading-relaxed line-clamp-3 font-light">
                      {community.description}
                    </p>
                    
                    <div className="mt-auto">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#99302A] group-hover:underline flex items-center gap-2">
                            Explore Profile <span className="text-lg leading-none">→</span>
                        </span>
                    </div>
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