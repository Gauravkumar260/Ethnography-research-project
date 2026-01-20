'use client';

import React from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';

export default function HomePage() {
  const communities = [
    {
      id: 'gadia-lohar',
      name: 'Gadia Lohar',
      identity: 'Forged in Fire',
      description: 'Iron artisans carrying 500 years of heritage amidst instability and strength',
      image: 'https://images.unsplash.com/photo-1748640773152-a5c24b000d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhcnRpc2FuJTIwYmxhY2tzbWl0aCUyMGZpcmV8ZW58MXx8fHwxNzY2MTUxMTk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'bhoksa',
      name: 'Bhoksa',
      identity: 'Between Tradition and Tomorrow',
      description: 'A community navigating modern challenges while preserving ancestral wisdom',
      image: 'https://images.unsplash.com/photo-1759738103333-1c836a32f848?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjBjb21tdW5pdHklMjBpbmRpYXxlbnwxfHx8fDE3NjYxNTExOTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'jaunsar',
      name: 'Jaunsar',
      identity: 'Where Culture Breathes',
      description: 'Himalayan communities with unique polyandrous traditions and rich folklore',
      image: 'https://images.unsplash.com/photo-1738482223848-008ac3110276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjB2aWxsYWdlJTIwY3VsdHVyZXxlbnwxfHx8fDE3NjYxNTEyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'banjara',
      name: 'Banjara',
      identity: 'Lives That Speak',
      description: 'Nomadic traders whose vibrant culture moves with their journeys',
      image: 'https://images.unsplash.com/photo-1759459295621-50110405a4bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub21hZGljJTIwcGVvcGxlJTIwaW5kaWF8ZW58MXx8fHwxNzY2MTUxMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'van-gujjar',
      name: 'Van Gujjar',
      identity: 'Beyond Survival',
      description: 'Forest dwellers balancing conservation challenges with traditional livelihoods',
      image: 'https://images.unsplash.com/photo-1745988583865-2249654d864c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB2aWxsYWdlJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzY2MTUxMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1650726583448-dda0065f2f11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGluZGlhbiUyMGNyYWZ0fGVufDF8fHx8MTc2NjA1MjI1MHww&ixlib=rb-4.1.0&q=80&w=1080')` 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-[#E3E1DB] mb-6 text-5xl font-bold">
            Stories That Live Beyond Silence
          </h1>
          <p className="text-[#E3E1DB]/90 mb-8 max-w-2xl mx-auto text-xl">
            A digital ethnography platform documenting lives, craft, culture, and resilience of India's overlooked communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/communities"
              className="px-8 py-3 bg-[#99302A] text-[#E3E1DB] hover:bg-[#99302A]/90 transition-all font-semibold rounded"
            >
              Explore Communities
            </Link>
            {/* ✅ CORRECTED LINK 1: Hero Button */}
            <Link 
              href="/documentaries"
              className="px-8 py-3 bg-transparent border-2 border-[#E3E1DB] text-[#E3E1DB] hover:bg-[#E3E1DB] hover:text-[#1a1a1a] transition-all flex items-center justify-center gap-2 rounded font-semibold"
            >
              <Play className="w-4 h-4" />
              Watch Documentaries
            </Link>
          </div>
        </div>
      </section>

      {/* Why This Exists */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[#1a1a1a] mb-6 text-3xl font-bold">
            Because not every history is written in books
          </h2>
          <p className="text-[#1a1a1a]/80 mb-8 max-w-2xl mx-auto leading-relaxed text-lg">
            Some live in people. We built this platform to preserve, present, and honour the lived experiences of communities whose narratives rarely reach mainstream spaces.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#99302A]/10 flex items-center justify-center mb-4 text-[#99302A]">
                <span className="text-2xl">🏛️</span>
              </div>
              <p className="text-sm text-[#1a1a1a] font-medium">Culture</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#99302A]/10 flex items-center justify-center mb-4 text-[#99302A]">
                <span className="text-2xl">✋</span>
              </div>
              <p className="text-sm text-[#1a1a1a] font-medium">Craft</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#99302A]/10 flex items-center justify-center mb-4 text-[#99302A]">
                <span className="text-2xl">🪪</span>
              </div>
              <p className="text-sm text-[#1a1a1a] font-medium">Identity</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#99302A]/10 flex items-center justify-center mb-4 text-[#99302A]">
                <span className="text-2xl">💪</span>
              </div>
              <p className="text-sm text-[#1a1a1a] font-medium">Survival</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Community Spotlight */}
      <section className="py-20 px-4 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={communities[0].image}
                alt={communities[0].name}
                className="w-full h-[500px] object-cover rounded shadow-lg"
              />
            </div>
            <div className="text-[#E3E1DB]">
              <p className="text-sm uppercase tracking-wider text-[#99302A] mb-2 font-bold">Featured Community</p>
              <h2 className="mb-4 text-4xl font-bold">
                {communities[0].name} — {communities[0].identity}
              </h2>
              <p className="mb-8 text-[#E3E1DB]/80 leading-relaxed text-lg">
                {communities[0].description}
              </p>
              <Link 
                href={`/communities/${communities[0].id}`}
                className="px-8 py-3 bg-[#99302A] text-[#E3E1DB] hover:bg-[#99302A]/90 transition-all rounded font-semibold inline-block"
              >
                View Their Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Communities Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#1a1a1a] mb-4 text-3xl font-bold">
              Explore Communities
            </h2>
            <p className="text-[#1a1a1a]/70 text-lg">
              Step Into Their Reality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communities.map((community) => (
              <Link 
                key={community.id}
                href={`/communities/${community.id}`}
                className="group cursor-pointer bg-white overflow-hidden hover:shadow-xl transition-all duration-300 rounded border border-[#1a1a1a]/5 block"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={community.image}
                    alt={community.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="mb-1 text-xl font-bold">
                      {community.name}
                    </h3>
                    <p className="text-sm opacity-90">{community.identity}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-[#1a1a1a]/70 mb-4">{community.description}</p>
                  <span className="text-sm text-[#99302A] group-hover:underline font-semibold">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Documentary Showcase */}
      <section className="py-20 px-4 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-[#E3E1DB] text-2xl font-bold">
              Watch Their Stories
            </h2>
            {/* ✅ CORRECTED LINK 2: Section Header */}
            <Link 
              href="/documentaries"
              className="text-[#99302A] hover:underline text-sm font-semibold"
            >
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {communities.slice(0, 3).map((community) => (
              // ✅ CORRECTED LINK 3: Grid Items
              <Link 
                key={community.id}
                href="/documentaries"
                className="group cursor-pointer block"
              >
                <div className="relative h-48 overflow-hidden mb-3 rounded border border-[#E3E1DB]/10">
                  <img 
                    src={community.image}
                    alt={community.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-[#99302A] flex items-center justify-center">
                      <Play className="w-8 h-8 text-[#E3E1DB]" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <h4 className="text-[#E3E1DB] mb-1 font-semibold">{community.name}</h4>
                <p className="text-sm text-[#E3E1DB]/60">{community.identity}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[#1a1a1a] mb-6 text-3xl font-bold">
            We are not preserving stories
          </h2>
          <p className="text-[#1a1a1a]/80 mb-8 text-lg">
            We are preserving dignity.
          </p>
          <Link 
            href="/communities"
            className="px-8 py-3 bg-[#99302A] text-[#E3E1DB] hover:bg-[#99302A]/90 transition-all rounded font-semibold inline-block"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
}