'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { useCommunities } from '@/hooks/useCommunities';
import { useTranslations } from 'next-intl';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CommunitiesPage() {
  const t = useTranslations('Communities');
  const { communities, loading, error, refetch } = useCommunities();

  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');

  const getImageUrl = (path?: string) => {
    if (!path) return '/placeholder.jpg';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/assets')) return path;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL
      ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '')
      : 'http://localhost:5000';
    return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path.replace(/\\/g, "/")}`;
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-muted">
        <Loader2 className="w-10 h-10 animate-spin text-secondary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-muted text-center px-4">
        <AlertCircle className="w-12 h-12 text-secondary mb-4 opacity-50" />
        <h2 className="text-xl font-bold text-primary mb-2">{t('connectionError')}</h2>
        <p className="text-primary/60 max-w-md">{error}</p>
        <button
          onClick={() => refetch()}
          className="mt-6 px-6 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition-colors"
        >
          {t('tryAgain')}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">

      {/* Hero Header */}
      <section className="pt-32 pb-12 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-4 text-4xl md:text-5xl font-bold font-serif">
            {t('title')}
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl font-light max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-8">
        {/* Search & Filter Bar */}
        <div className="bg-card p-4 rounded-lg shadow-lg border border-primary-foreground flex flex-col md:flex-row gap-4 relative z-10">

          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
            <Input
              type="search"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12"
            />
          </div>

          <div className="relative md:w-64">
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-full pl-4 bg-card">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region === 'All' ? t('allRegions') : region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                  className="group cursor-pointer bg-card rounded-sm overflow-hidden hover:shadow-2xl transition-all duration-500 border border-primary/5 flex flex-col h-full animate-fade-in-up"
                  style={{ animationDelay: `${index * 80}ms`, animationFillMode: "forwards" }}
                >
                  {/* Image Container */}
                  <div className="relative h-72 w-full overflow-hidden bg-muted">
                    <Image
                      src={getImageUrl(community.heroImage)}
                      alt={community.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 4}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity z-10"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-20">
                      <h2 className="mb-1 text-2xl font-bold font-serif tracking-wide">
                        {community.name}
                      </h2>
                      {community.subtitle && (
                        <p className="text-sm text-primary-foreground/90 mb-3 font-medium uppercase tracking-wider text-[11px]">
                          {community.subtitle}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-xs text-primary-foreground/70 border-t border-primary-foreground/20 pt-3 mt-3">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{community.location || community.region}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-primary/70 mb-6 leading-relaxed line-clamp-3 font-light">
                      {community.description}
                    </p>
                    <div className="mt-auto">
                     <span className="text-xs font-bold uppercase tracking-widest text-[#99302A] hover:text-[#99302A]/80 group-hover:underline flex items-center gap-2 transition-colors">
                     {t('exploreProfile')} 
                     <span className="text-lg leading-none" aria-hidden="true">→</span>
                     </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card border border-dashed border-border rounded-lg">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-primary mb-2">{t('noResults')}</h3>
              <p className="text-primary/60">
                {t('noResultsDesc', { searchTerm, region: regionFilter === 'All' ? 'any region' : regionFilter })}
              </p>
              <button
                onClick={() => { setSearchTerm(''); setRegionFilter('All'); }}
                className="mt-4 text-secondary font-semibold hover:underline"
              >
                {t('clearFilters')}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}