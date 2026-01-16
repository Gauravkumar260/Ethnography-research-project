'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // ✅ Imported Next.js Image
import { Search, Filter, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { useCommunities } from '@/hooks/useCommunities';

export default function CommunitiesPage() {
  // State Management (Abstracted to Hook)
  const { communities, loading, error, refetch } = useCommunities();

  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');

  // Helper: Get Image URL
  const getImageUrl = (path?: string) => {
    if (!path) return '/placeholder.jpg';
    if (path.startsWith('http')) return path; 
    
    const baseUrl = process.env.NEXT_PUBLIC_API_URL 
      ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') 
      : 'http://localhost:5000';
    return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path.replace(/\\/g, "/")}`;
  };

  // Filter Logic
  const filteredCommunities = useMemo(() => {
    return communities.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = regionFilter === 'All' || c.region === regionFilter;
      return matchesSearch && matchesRegion;
    });
  }, [communities, searchTerm, regionFilter]);

  const regions = useMemo(() => {
    const unique = new Set(communities.map(c => c.region).filter(Boolean));
    return ['All', ...Array.from(unique)];
  }, [communities]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#FAFAF9]">
        <Loader2 className="w-10 h-10 animate-spin text-[#99302A]" />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#FAFAF9] text-center px-4">
        <AlertCircle className="w-12 h-12 text-[#99302A] mb-4 opacity-50" />
        <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">Connection Error</h2>
        <p className="text-[#1a1a1a]/60 max-w-md">{error}</p>
        <button 
          onClick={() => refetch()}
          className="mt-6 px-6 py-2 bg-[#99302A] text-white rounded hover:bg-[#99302A]/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      
      {/* Hero Header */}
      <section className="pt-32 pb-12 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-4 text-4xl md:text-5xl font-bold font-serif">
            Communities We Document
          </h1>
          <p className="text-[#E3E1DB]/80 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Lives, crafts, and cultures that shape India's diverse heritage.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-8">
        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-lg border border-[#E3E1DB] flex flex-col md:flex-row gap-4 relative z-10">
          
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by community name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#99302A]/20 focus:border-[#99302A] transition-all"
            />
          </div>

          <div className="relative md:w-64">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#99302A]/20 focus:border-[#99302A] appearance-none bg-white cursor-pointer transition-all"
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region === 'All' ? 'All Regions' : region}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
          </div>
        </div>
      </div>

      {/* Grid Display */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredCommunities.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCommunities.map((community, index) => (
                <Link
                  key={community._id}
                  href={`/communities/${community.slug}`}
                  className="group cursor-pointer bg-white rounded-sm overflow-hidden hover:shadow-2xl transition-all duration-500 border border-[#1a1a1a]/5 flex flex-col h-full"
                >
                  {/* Image Container */}
                  <div className="relative h-72 w-full overflow-hidden bg-gray-100">
                    {/* ✅ Next.js Optimized Image */}
                    <Image
                      src={getImageUrl(community.heroImage)}
                      alt={community.name}
                      fill // Fills the relative parent container
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 4} // Load first 4 images immediately
                    />
                    
                    {/* Gradient & Text Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity z-10"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-20">
                      <h2 className="mb-1 text-2xl font-bold font-serif tracking-wide">
                        {community.name}
                      </h2>
                      {community.subtitle && (
                         <p className="text-sm text-white/90 mb-3 font-medium uppercase tracking-wider text-[11px]">
                           {community.subtitle}
                         </p>
                      )}
                      
                      <div className="flex items-center gap-2 text-xs text-white/70 border-t border-white/20 pt-3 mt-3">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{community.location || community.region}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
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
          ) : (
            // No Results State
            <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-lg">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">No communities found</h3>
              <p className="text-[#1a1a1a]/60">
                We couldn't find any matches for "{searchTerm}" in {regionFilter === 'All' ? 'any region' : regionFilter}.
              </p>
              <button 
                onClick={() => { setSearchTerm(''); setRegionFilter('All'); }}
                className="mt-4 text-[#99302A] font-semibold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}