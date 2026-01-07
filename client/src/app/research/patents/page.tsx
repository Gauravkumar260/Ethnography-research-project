"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Award, Download, ChevronLeft, Lightbulb, FileCheck, Calendar, Loader2, AlertCircle } from 'lucide-react';
import api from '@/lib/api';

export default function PatentsPage() {
  const [patents, setPatents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/research/public');
        setPatents(data.filter((item: any) => item.type === 'patent'));
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <section className="py-20 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
        <div className="max-w-5xl mx-auto">
          <Link href="/research" className="flex items-center gap-2 text-[#E3E1DB] hover:text-[#99302A] transition-colors mb-8 w-fit">
            <ChevronLeft className="w-5 h-5" /> Back to Research
          </Link>
          <h1 className="mb-4 text-4xl font-bold font-serif">Patents & Innovations</h1>
          <p className="text-[#E3E1DB]/80 max-w-3xl text-lg font-light">
            Technological innovations supporting ethical ethnographic research and documentation.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-[#99302A]" /></div>
          ) : patents.length === 0 ? (
            <div className="text-center py-20 text-gray-500 flex flex-col items-center bg-white border border-dashed border-gray-200 rounded-lg p-10">
               <AlertCircle className="w-10 h-10 mb-2 opacity-20"/> 
               <p>No patents found.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {patents.map((patent: any) => (
                <div key={patent._id} className="bg-white p-8 border border-[#1a1a1a]/10 hover:shadow-xl transition-all duration-300 rounded-sm">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-14 h-14 rounded-full bg-[#99302A] flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Lightbulb className="w-7 h-7 text-[#E3E1DB]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide bg-blue-100 text-blue-700">Published</span>
                        <span className="text-xs text-[#1a1a1a]/60 font-mono bg-[#E3E1DB] px-2 py-1 rounded">{patent._id.substring(0, 8).toUpperCase()}</span>
                      </div>
                      <h3 className="text-[#1a1a1a] mb-3 text-xl font-bold font-serif leading-tight">{patent.title}</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-[#1a1a1a]/70 mb-4 bg-[#FAFAF9] p-4 rounded border border-[#1a1a1a]/5">
                        <div>
                          <span className="block text-xs uppercase text-[#1a1a1a]/40 font-bold mb-1">Inventor</span>
                          <span className="font-medium text-[#1a1a1a]">{patent.studentName}</span>
                        </div>
                        <div>
                          <span className="block text-xs uppercase text-[#1a1a1a]/40 font-bold mb-1">Filing Date</span>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(patent.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-[#1a1a1a]/70 leading-relaxed mb-6"><span className="font-bold text-[#1a1a1a]">Abstract: </span>{patent.abstract}</p>
                      <div className="flex items-center gap-4">
                        <a href={`http://localhost:5000/${patent.fileUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#99302A] font-bold hover:underline">
                          <FileCheck className="w-4 h-4" /> View Full Documentation
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}