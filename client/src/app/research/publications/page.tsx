"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Download, ExternalLink, ChevronLeft, Loader2, AlertCircle } from 'lucide-react';
import api from '@/lib/api';

export default function PublicationsPage() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/research/public');
        setPublications(data.filter((item: any) => item.type === 'publication'));
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
          <h1 className="mb-4 text-4xl font-bold font-serif">Publications</h1>
          <p className="text-[#E3E1DB]/80 max-w-3xl text-lg font-light">
            Peer-reviewed research articles and papers advancing scholarly understanding.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-[#99302A]" /></div>
          ) : publications.length === 0 ? (
            <div className="text-center py-20 text-gray-500 flex flex-col items-center bg-white border border-dashed border-gray-200 rounded-lg p-10">
               <AlertCircle className="w-10 h-10 mb-2 opacity-20"/> 
               <p>No publications found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {publications.map((pub: any) => (
                <div key={pub._id} className="bg-white p-8 border border-[#1a1a1a]/10 hover:shadow-lg transition-all duration-300 rounded-sm">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full bg-[#99302A]/10 flex items-center justify-center flex-shrink-0 text-[#99302A] mt-1">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#1a1a1a] mb-2 text-xl font-bold font-serif leading-tight">{pub.title}</h3>
                      <div className="text-sm text-[#1a1a1a]/60 mb-4 flex flex-wrap gap-x-4">
                        <span className="font-semibold text-[#1a1a1a]">By {pub.studentName}</span>
                        <span>•</span>
                        <span className="italic">{pub.program}</span>
                        <span>•</span>
                        <span>{new Date(pub.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-[#1a1a1a]/70 leading-relaxed mb-6 bg-[#FAFAF9] p-4 border-l-2 border-[#99302A]">
                        "{pub.abstract}"
                      </p>
                      <a href={`http://localhost:5000/${pub.fileUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#99302A] font-bold hover:underline">
                        <Download className="w-4 h-4" /> Download Full Paper
                      </a>
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