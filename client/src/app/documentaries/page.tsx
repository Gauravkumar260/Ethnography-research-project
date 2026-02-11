'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Loader2, AlertCircle, ChevronLeft, X } from 'lucide-react';
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
  studentName?: string;
  createdAt?: string;
  status?: string;
}

export default function DocumentaryPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [documentaries, setDocumentaries] = useState<Documentary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // --- STATIC DATA (Requested) ---
  const STATIC_DOCS: Documentary[] = [
    {
      _id: 'static-1',
      title: 'Gadia Lohar: Forged in Fire',
      description: 'Iron artisans carrying 500 years of heritage amidst instability and strength',
      duration: '6:46',
      category: ['craft', 'nomadic'],
      thumbnailUrl: '/assets/Gadia Lohar.svg',
      videoUrl: 'https://www.youtube.com/watch?v=IH-UsMlAiLM',
      studentName: 'Admin',
      createdAt: new Date().toISOString(),
      status: 'approved'
    },
    {
      _id: 'static-2',
      title: 'Bhoksa: Between Tradition and Tomorrow',
      description: 'A tribal community navigating modern challenges while preserving ancestral wisdom',
      duration: '9:04',
      category: ['tribal', 'heritage'],
      thumbnailUrl: '/assets/Bhoksa.svg',
      videoUrl: 'https://www.youtube.com/watch?v=xf-sbEJ5Czg',
      studentName: 'Admin',
      createdAt: new Date().toISOString(),
      status: 'approved'
    },
    {
      _id: 'static-3',
      title: 'Jaunsar: Where Culture Breathes',
      description: 'Himalayan communities with unique polyandrous traditions and rich folklore',
      duration: '6:40',
      category: ['heritage', 'tribal'],
      thumbnailUrl: '/assets/Jaunsar.svg',
      videoUrl: 'https://www.youtube.com/watch?v=Iflb7xwh_Yo',
      studentName: 'Admin',
      createdAt: new Date().toISOString(),
      status: 'approved'
    },
    {
      _id: 'static-4',
      title: 'Banjara: Lives That Speak',
      description: 'Nomadic traders whose vibrant culture moves with their journeys',
      duration: '30 min',
      category: ['nomadic', 'craft', 'heritage'],
      thumbnailUrl: '/assets/Banjara.svg',
      videoUrl: '', // No link provided
      studentName: 'Admin',
      createdAt: new Date().toISOString(),
      status: 'approved'
    },
    {
      _id: 'static-5',
      title: 'Van Gujjar: Beyond Survival',
      description: 'Forest dwellers balancing conservation challenges with traditional livelihoods',
      duration: '6:18',
      category: ['nomadic', 'heritage'],
      thumbnailUrl: '/assets/Van Gujjar.svg',
      videoUrl: 'https://www.youtube.com/watch?v=EOCZ_zXqh5U',
      studentName: 'Admin',
      createdAt: new Date().toISOString(),
      status: 'approved'
    }
  ];

  // --- 1. FETCH DATA ---
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const { data } = await api.get('/docs');
        setDocumentaries([...STATIC_DOCS, ...(data || [])]);
      } catch (error) {
        console.error("Failed to load documentaries", error);
        setDocumentaries(STATIC_DOCS);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  // Helper: Handle local vs remote images
  const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');

  const getFileUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('/')) return path;
    return `${API_BASE_URL}/${path.replace(/\\/g, "/")}`;
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` : null;
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

  const isYouTube = selectedVideo && (selectedVideo.includes('youtube.com') || selectedVideo.includes('youtu.be'));
  const youTubeUrl = isYouTube ? getYouTubeEmbedUrl(selectedVideo!) : null;

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
                className={`px-5 py-2 text-sm transition-all rounded-full border ${activeFilter === filter.id
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
                    onClick={() => setSelectedVideo(doc.videoUrl)}
                  >
                    {/* Thumbnail Container */}
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      <Image
                        src={getFileUrl(doc.thumbnailUrl)}
                        alt={doc.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

      {/* VIDEO MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10 aspect-video">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-[#99302A] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {isYouTube && youTubeUrl ? (
              <iframe
                src={youTubeUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            ) : (
              <video
                src={getFileUrl(selectedVideo)}
                controls
                autoPlay
                className="w-full h-full outline-none"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
