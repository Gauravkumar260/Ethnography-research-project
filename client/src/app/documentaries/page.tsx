'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Loader2, AlertCircle, ChevronLeft } from 'lucide-react';
import api from '@/lib/api'; 

type FilterType = 'all' | 'craft' | 'tribal' | 'nomadic' | 'heritage';

// Define the shape of data based on the Backend Model
interface Documentary {
  _id: string;
  title: string;
  description: string;
  duration: string;
  category: string[];
  thumbnailUrl: string;
  videoUrl: string;
}

export default function DocumentaryPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [documentaries, setDocumentaries] = useState<Documentary[]>([]);
  const [loading, setLoading] = useState(true);

  // --- 1. FETCH DATA ---
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        // Fetches from http://localhost:5000/api/docs
        const { data } = await api.get('/docs'); 
        setDocumentaries(data);
      } catch (error) {
        console.error("Failed to load documentaries", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  // Helper: Handle local vs remote images
  const getFileUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path; 
    return `http://localhost:5000/${path.replace(/\\/g, "/")}`;
  };

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All Stories' },
    { id: 'craft', label: 'Craft' },
    { id: 'tribal', label: 'Tribal' },
    { id: 'nomadic', label: 'Nomadic' },
    { id: 'heritage', label: 'Heritage' },
  ];

  const filteredDocs = activeFilter === 'all' 
    ? documentaries 
    : documentaries.filter(doc => doc.category.includes(activeFilter));

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      
      {/* HEADER */}
      <section className="py-20 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-[#E3E1DB] hover:text-[#99302A] transition-colors mb-8 w-fit">
            <ChevronLeft className="w-5 h-5" /> Back Home
          </Link>
          <h1 className="mb-4 text-4xl font-bold font-serif">
            Documentary Library
          </h1>
          <p className="text-[#E3E1DB]/80 text-lg font-light">
            Visual ethnography: Watch the stories that need to be told.
          </p>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-sm border-b border-[#1a1a1a]/10 py-4 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2 text-sm transition-all rounded-full border ${
                  activeFilter === filter.id
                    ? 'bg-[#99302A] text-[#E3E1DB] border-[#99302A] font-medium shadow-md'
                    : 'bg-white text-[#1a1a1a] border-[#1a1a1a]/10 hover:border-[#99302A] hover:text-[#99302A]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO GRID */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          
          {loading ? (
             <div className="flex flex-col items-center justify-center py-20">
               <Loader2 className="w-10 h-10 animate-spin text-[#99302A] mb-4" />
               <p className="text-[#1a1a1a]/50">Loading library...</p>
             </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDocs.map((doc) => (
                  <div 
                    key={doc._id}
                    className="group cursor-pointer bg-white overflow-hidden hover:shadow-xl transition-all duration-300 rounded-lg border border-[#1a1a1a]/5 flex flex-col h-full"
                    onClick={() => window.open(getFileUrl(doc.videoUrl), '_blank')}
                  >
                    {/* Thumbnail Container */}
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      <img 
                        src={getFileUrl(doc.thumbnailUrl)}
                        alt={doc.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-[#99302A]/90 backdrop-blur-sm flex items-center justify-center transform scale-90 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/20">
                          <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white px-3 py-1 text-xs font-medium rounded-full border border-white/10">
                        {doc.duration}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-[#1a1a1a] mb-3 text-xl font-serif font-bold leading-tight group-hover:text-[#99302A] transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-[#1a1a1a]/70 leading-relaxed mb-6 flex-grow font-light line-clamp-3">
                        {doc.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {doc.category.map((cat) => (
                          <span 
                            key={cat}
                            className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 bg-[#1a1a1a]/5 text-[#1a1a1a]/60 rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredDocs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-dashed border-[#1a1a1a]/20">
                   <AlertCircle className="w-10 h-10 text-[#1a1a1a]/20 mb-4" />
                   <p className="text-[#1a1a1a]/50 text-lg font-serif italic">No documentaries found.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}