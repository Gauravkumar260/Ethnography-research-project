"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Calendar, MapPin, ChevronLeft, Mic, Globe, Award, Download, Loader2, AlertCircle } from 'lucide-react';
import api from '@/lib/api';

export default function ConferencesPage() {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/research/public');
        // Filter for conference or presentation types
        // Note: Ensure your submission form allows 'conference' as a type, or map 'publication' here if needed.
        const confData = data.filter((item: any) => item.type === 'conference' || item.type === 'presentation');
        setConferences(confData);
      } catch (error) {
        console.error("Error fetching conferences:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <section className="py-20 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
        <div className="max-w-5xl mx-auto">
          <Link href="/research" className="flex items-center gap-2 text-[#E3E1DB] hover:text-[#99302A] transition-colors mb-8 w-fit">
            <ChevronLeft className="w-5 h-5" /> Back to Research
          </Link>
          <h1 className="mb-4 text-4xl font-bold font-serif">Conference Presentations</h1>
          <p className="text-[#E3E1DB]/80 max-w-3xl text-lg font-light">
            International symposiums, academic conferences, and research presentations sharing our ethnographic findings.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-[#E3E1DB]/30 border-b border-[#1a1a1a]/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white rounded shadow-sm border border-[#1a1a1a]/5">
              <div className="text-3xl text-[#99302A] mb-2 font-bold font-serif">3</div>
              <p className="text-xs uppercase tracking-wider text-[#1a1a1a]/60">Keynote Speeches</p>
            </div>
            <div className="p-6 bg-white rounded shadow-sm border border-[#1a1a1a]/5">
              <div className="text-3xl text-[#99302A] mb-2 font-bold font-serif">12</div>
              <p className="text-xs uppercase tracking-wider text-[#1a1a1a]/60">Guest Lectures</p>
            </div>
            <div className="p-6 bg-white rounded shadow-sm border border-[#1a1a1a]/5">
              <div className="text-3xl text-[#99302A] mb-2 font-bold font-serif">20+</div>
              <p className="text-xs uppercase tracking-wider text-[#1a1a1a]/60">Universities Reached</p>
            </div>
            <div className="p-6 bg-white rounded shadow-sm border border-[#1a1a1a]/5">
              <div className="text-3xl text-[#99302A] mb-2 font-bold font-serif">5</div>
              <p className="text-xs uppercase tracking-wider text-[#1a1a1a]/60">Best Paper Awards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Presentations List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-[#99302A]" /></div>
          ) : conferences.length === 0 ? (
            <div className="text-center py-20 text-gray-500 flex flex-col items-center bg-white border border-dashed border-gray-200 rounded-lg">
               <AlertCircle className="w-10 h-10 mb-2 opacity-20"/> No presentations found.
            </div>
          ) : (
            conferences.map((conf: any) => (
              <div key={conf._id} className="bg-white p-8 border border-[#1a1a1a]/10 hover:shadow-lg transition-all duration-300 rounded-sm group">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#99302A]/10 flex items-center justify-center flex-shrink-0 text-[#99302A] mt-1">
                    <Mic className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-xs px-2.5 py-1 bg-[#99302A]/10 text-[#99302A] rounded-full font-semibold uppercase tracking-wide">
                        Presentation
                      </span>
                      <div className="flex items-center gap-1 text-xs text-[#1a1a1a]/60">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(conf.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#1a1a1a]/60">
                        <MapPin className="w-3 h-3" />
                        <span>{conf.program || 'International'}</span>
                      </div>
                    </div>

                    <h3 className="text-[#1a1a1a] mb-2 text-xl font-bold font-serif group-hover:text-[#99302A] transition-colors">
                      {conf.title}
                    </h3>
                    <p className="text-sm text-[#1a1a1a]/70 font-medium mb-3">
                      Topic: {conf.community} Community
                    </p>
                    <p className="text-sm text-[#1a1a1a]/70 leading-relaxed mb-4">
                      {conf.abstract}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#1a1a1a]/5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#1a1a1a]/80">
                        <Users className="w-3 h-3" />
                        Presenter: {conf.studentName}
                      </div>
                      <a href={`http://localhost:5000/${conf.fileUrl}`} target="_blank" rel="noreferrer" className="text-sm text-[#99302A] font-medium hover:underline flex items-center gap-1">
                        <Download className="w-4 h-4" /> Download Abstract
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}