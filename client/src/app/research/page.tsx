"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, FileText, Award, Users, Database, ArrowRight, Upload } from 'lucide-react';
import api from '@/lib/api';

export default function ResearchHubPage() {
  const [stats, setStats] = useState({
    thesis: 0,
    publications: 0,
    patents: 0,
    conferences: 0,
    datasets: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all research items
        const { data: research } = await api.get('/research/public');
        // Fetch all field data
        const { data: fieldData } = await api.get('/field-data');

        setStats({
          thesis: research.filter((i: any) => i.type === 'thesis').length,
          publications: research.filter((i: any) => i.type === 'publication').length,
          patents: research.filter((i: any) => i.type === 'patent').length,
          conferences: research.filter((i: any) => i.type === 'conference' || i.type === 'presentation').length,
          datasets: fieldData.length
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const researchAreas = [
    {
      id: 'thesis',
      title: 'Thesis & Dissertations',
      description: 'Comprehensive academic research exploring community ethnography, cultural preservation, and social anthropology',
      icon: BookOpen,
      count: `${loading ? '...' : stats.thesis} Works`,
      link: '/research/thesis',
      image: 'https://images.unsplash.com/photo-1766050589102-a81ce15cc844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
    {
      id: 'publications',
      title: 'Publications',
      description: 'Peer-reviewed journals, conference papers, and research articles on marginalized communities',
      icon: FileText,
      count: `${loading ? '...' : stats.publications} Articles`,
      link: '/research/publications',
      image: 'https://images.unsplash.com/photo-1623357247199-b5e97b20acb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
    {
      id: 'patents',
      title: 'Patents & Innovations',
      description: 'Documentation methodologies, digital preservation systems, and research tools',
      icon: Award,
      count: `${loading ? '...' : stats.patents} Patents`,
      link: '/research/patents',
      image: 'https://images.unsplash.com/photo-1633158108216-f10cd3202d8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
    {
      id: 'conferences',
      title: 'Conference Presentations',
      description: 'International symposiums, academic conferences, and research presentations',
      icon: Users,
      count: `${loading ? '...' : stats.conferences} Presentations`,
      link: '/research/conferences',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <section className="py-20 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold font-serif">
            Research & Academic Work
          </h1>
          <p className="text-[#E3E1DB]/80 max-w-3xl mx-auto text-lg font-light">
            A collection of scholarly work documenting, analyzing, and preserving the cultural heritage and lived experiences of marginalized communities through rigorous ethnographic research
          </p>
        </div>
      </section>

      {/* Research Areas Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {researchAreas.map((area) => {
              const IconComponent = area.icon;
              return (
                <Link 
                  key={area.id}
                  href={area.link}
                  className="group cursor-pointer bg-white overflow-hidden hover:shadow-2xl transition-all duration-300 border border-[#1a1a1a]/10 block rounded-sm"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-[#99302A] flex items-center justify-center shadow-lg">
                          <IconComponent className="w-5 h-5 text-[#E3E1DB]" />
                        </div>
                        <span className="text-xs text-[#E3E1DB]/90 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full uppercase tracking-wider">
                          {area.count}
                        </span>
                      </div>
                      <h2 className="text-[#E3E1DB] mb-1 text-2xl font-bold font-serif">
                        {area.title}
                      </h2>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <p className="text-sm text-[#1a1a1a]/70 leading-relaxed mb-6">
                      {area.description}
                    </p>
                    <span className="text-sm text-[#99302A] group-hover:underline flex items-center gap-2 font-semibold">
                      Explore Research
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Research Impact Statement */}
      <section className="py-20 px-4 bg-[#E3E1DB]/30 border-y border-[#1a1a1a]/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[#1a1a1a] mb-6 text-2xl font-bold font-serif">
            Research Impact
          </h2>
          <p className="text-[#1a1a1a]/80 leading-relaxed mb-12 text-lg font-serif italic">
            "Our research contributes to academic discourse on cultural anthropology, social justice, and heritage preservation while directly supporting community visibility, policy advocacy, and dignified representation."
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded shadow-sm">
              <div className="text-4xl text-[#99302A] mb-2 font-bold font-serif">50+</div>
              <p className="text-xs uppercase tracking-wider text-[#1a1a1a]/60">Research Citations</p>
            </div>
            <div className="text-center p-6 bg-white rounded shadow-sm">
              <div className="text-4xl text-[#99302A] mb-2 font-bold font-serif">12</div>
              <p className="text-xs uppercase tracking-wider text-[#1a1a1a]/60">International Conferences</p>
            </div>
            <div className="text-center p-6 bg-white rounded shadow-sm">
              <div className="text-4xl text-[#99302A] mb-2 font-bold font-serif">5</div>
              <p className="text-xs uppercase tracking-wider text-[#1a1a1a]/60">Communities Documented</p>
            </div>
          </div>
        </div>
      </section>

      {/* Field Data & Submission Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Field Data Card */}
            <Link 
              href="/research/field-data"
              className="group cursor-pointer bg-white p-10 border border-[#1a1a1a]/10 hover:border-[#99302A] hover:shadow-xl transition-all rounded-sm flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-14 h-14 rounded-full bg-[#99302A]/10 flex items-center justify-center mb-6 group-hover:bg-[#99302A] transition-colors">
                  <Database className="w-7 h-7 text-[#99302A] group-hover:text-[#E3E1DB]" />
                </div>
                <h3 className="text-[#1a1a1a] mb-3 text-2xl font-bold font-serif">
                  Field Data Repository
                </h3>
                <p className="text-sm text-[#1a1a1a]/70 leading-relaxed mb-6">
                  Access {loading ? '...' : stats.datasets} primary datasets, interviews, photographs, and field documentation. Open for academic use.
                </p>
              </div>
              <span className="text-sm text-[#99302A] group-hover:underline font-semibold flex items-center gap-2">
                Browse Datasets <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Submission Card */}
            <Link 
              href="/student-submission"
              className="group cursor-pointer bg-[#99302A] p-10 hover:bg-[#7a2621] transition-all rounded-sm flex flex-col justify-between h-full shadow-lg"
            >
              <div>
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-6">
                  <Upload className="w-7 h-7 text-white" />
                </div>
                <h3 className="mb-3 text-2xl font-bold font-serif text-white">
                  Submit Your Research
                </h3>
                <p className="text-sm text-white/90 leading-relaxed mb-6">
                  Share your thesis, publications, or field data with the academic community. Contribute to the growing body of knowledge.
                </p>
              </div>
              <span className="text-sm text-white group-hover:underline font-semibold flex items-center gap-2">
                Upload Work <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Faculty Access */}
      <section className="py-12 px-4 bg-[#1a1a1a] text-[#E3E1DB] border-t border-[#E3E1DB]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="mb-4 text-xl font-bold font-serif">Faculty & Administrators</h3>
          <p className="text-[#E3E1DB]/70 mb-8 text-sm">
            Review student submissions and manage the research repository
          </p>
          <Link 
            href="/login"
            className="px-8 py-3 bg-[#99302A] text-[#E3E1DB] hover:bg-[#E3E1DB] hover:text-[#99302A] transition-all text-sm rounded font-semibold inline-block"
          >
            Faculty Login
          </Link>
        </div>
      </section>
    </div>
  );
}