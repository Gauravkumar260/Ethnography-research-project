'use client';

import React from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import Link from 'next/link';
import { communities as communityData } from '@/lib/communityData';
import { Button } from "@/components/ui/button";

export default function HomePage() {

  const communities = Object.values(communityData).map((community) => ({
    id: community.id,
    name: community.name,
    identity: community.subtitle,
    description: community.description,
    image: community.heroImage,
  }));

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85svh] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/assets/hero-image.png"
            alt="Hero Background"
            width={1270}
            height={10}
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/70"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-primary-foreground mb-6 text-5xl font-bold">
            Unheard India

            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-xl font-medium">
              Documenting the diverse cultural heritage of India's marginalized communities.
            </p>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default" size="lg">
              <Link href="/communities">Explore Communities</Link>
            </Button>
            {/* ✅ CORRECTED LINK 1: Hero Button */}
            <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary gap-2">
              <Link href="/documentaries">
                <Play className="w-4 h-4" />
                Watch Documentaries
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why This Exists */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-primary mb-6 text-3xl font-bold">
            Because not every history is written in books
          </h2>
          <p className="text-primary/80 mb-8 max-w-2xl mx-auto leading-relaxed text-lg">
            Some live in people. We built this platform to preserve, present, and honour the lived experiences of communities whose narratives rarely reach mainstream spaces.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 text-secondary">
                <span className="text-2xl">🏛️</span>
              </div>
              <p className="text-sm text-primary font-medium">Culture</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 text-secondary">
                <span className="text-2xl">✋</span>
              </div>
              <p className="text-sm text-primary font-medium">Craft</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 text-secondary">
                <span className="text-2xl">🪪</span>
              </div>
              <p className="text-sm text-primary font-medium">Identity</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 text-secondary">
                <span className="text-2xl">💪</span>
              </div>
              <p className="text-sm text-primary font-medium">Survival</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Community Spotlight */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src={communities[0].image}
                alt={communities[0].name}
                width={600}
                height={500}
                className="w-full h-[500px] object-cover rounded shadow-lg"
              />
            </div>
            <div className="text-primary-foreground">
              <p className="text-sm uppercase tracking-wider text-secondary mb-2 font-bold">Featured Community</p>
              <h2 className="mb-4 text-4xl font-bold">
                {communities[0].name} — {communities[0].identity}
              </h2>
              <p className="mb-8 text-primary-foreground/80 leading-relaxed text-lg">
                {communities[0].description}
              </p>
              <Button asChild variant="secondary" size="lg">
                <Link href={`/communities/${communities[0].id}`}>
                  View Their Story
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Communities Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-primary mb-4 text-3xl font-bold">
              Explore Communities
            </h2>
            <p className="text-primary/70 text-lg">
              Step Into Their Reality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communities.map((community, index) => (
              <Link
                key={community.id}
                href={`/communities/${community.id}`}
                className="group cursor-pointer bg-card overflow-hidden hover:shadow-xl transition-all duration-300 rounded border border-primary/5 block animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={community.image}
                    alt={community.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-primary-foreground">
                    <h3 className="mb-1 text-xl font-bold">
                      {community.name}
                    </h3>
                    <p className="text-sm opacity-90">{community.identity}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-primary/70 mb-4">{community.description}</p>
                  <span className="text-sm text-secondary group-hover:underline font-semibold">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Documentary Showcase */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-primary-foreground text-2xl font-bold">
              Watch Their Stories
            </h2>
            {/* ✅ CORRECTED LINK 2: Section Header */}
            <Button asChild variant="link" className="text-secondary hover:underline text-sm font-semibold p-0 h-auto">
              <Link href="/documentaries">
                View All →
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {communities.slice(0, 3).map((community) => (
              // ✅ CORRECTED LINK 3: Grid Items
              <Link
                key={community.id}
                href="/documentaries"
                className="group cursor-pointer block"
              >
                <div className="relative h-48 overflow-hidden mb-3 rounded border border-primary-foreground/10">
                  <Image
                    src={community.image}
                    alt={community.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                      <Play className="w-8 h-8 text-primary-foreground" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <h4 className="text-primary-foreground mb-1 font-semibold">{community.name}</h4>
                <p className="text-sm text-primary-foreground/60">{community.identity}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-primary mb-6 text-3xl font-bold">
            We are not preserving stories
          </h2>
          <p className="text-primary/80 mb-8 text-lg">
            We are preserving dignity.
          </p>
          <Button asChild variant="default" size="lg">
            <Link href="/communities">
              Start Exploring
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}