"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Download, ExternalLink, Calendar, User, ChevronLeft, GraduationCap, Loader2, AlertCircle } from 'lucide-react';
import api from '@/lib/api';

export default function ThesisPage() {
  const [theses, setTheses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/research/public');
        setTheses(data.filter((item: any) => item.type === 'thesis'));
      } catch (error) {
        console.error("Error fetching theses:", error);
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
          <h1 className="mb-4 text-4xl font-bold font-serif">Thesis & Dissertations</h1>
          <p className="text-[#E3E1DB]/80 max-w-3xl text-lg font-light">
            Comprehensive academic research exploring cultural anthropology and lived experiences.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-[#99302A]" /></div>
          ) : theses.length === 0 ? (
            <div className="text-center py-20 text-gray-500 flex flex-col items-center bg-white border border-dashed border-gray-200 rounded-lg p-10">
               <AlertCircle className="w-10 h-10 mb-2 opacity-20"/> 
               <p>No theses found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {theses.map((thesis: any) => (
                <div key={thesis._id} className="bg-white p-8 border border-[#1a1a1a]/10 hover:shadow-lg transition-all duration-300 rounded-sm group">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4 flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#99302A]/10 flex items-center justify-center text-[#99302A]">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-[#99302A] uppercase tracking-wider">
                          {thesis.type}
                        </span>
                      </div>
                      <div className="text-sm text-[#1a1a1a]/70 space-y-2">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          <span className="font-medium">{thesis.program}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(thesis.createdAt).getFullYear()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>Mentor: {thesis.mentor}</span>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-3/4 border-l border-[#1a1a1a]/10 md:pl-8 pt-6 md:pt-0 border-t md:border-t-0 mt-2 md:mt-0">
                      <h3 className="text-[#1a1a1a] mb-2 text-xl font-bold font-serif group-hover:text-[#99302A] transition-colors">
                        {thesis.title}
                      </h3>
                      <p className="text-sm text-[#1a1a1a]/60 mb-4 font-medium">
                        By {thesis.studentName} ({thesis.studentId})
                      </p>
                      <div className="bg-[#FAFAF9] p-4 rounded-sm border-l-2 border-[#99302A] mb-4">
                        <p className="text-sm text-[#1a1a1a]/70 leading-relaxed italic">
                          "{thesis.abstract}"
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <a href={`http://localhost:5000/${thesis.fileUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#99302A] font-bold hover:underline">
                          <Download className="w-4 h-4" /> Download PDF
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