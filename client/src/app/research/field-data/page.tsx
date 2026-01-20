"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Database, 
  Download, 
  ChevronLeft, 
  Loader2, 
  AlertCircle, 
  FileAudio, 
  Image as ImageIcon, 
  FileText, 
  FileSpreadsheet 
} from 'lucide-react';
import api from '@/lib/api';

const API_BASE_URL = "https://unheard-india-api.onrender.com";

type FilterType = 'all' | 'interview' | 'photo' | 'survey' | 'field_note' | 'document' | 'dataset';

export default function FieldDataPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [allData, setAllData] = useState([]); 
  const [loading, setLoading] = useState(true);

  // ==========================================
  // 1. FETCH DATA
  // ==========================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await api.get('/research/public');
        // Fix: Use response.data to get the array
        setAllData(response.data || []);
      } catch (error) {
        console.error("Error loading field data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ==========================================
  // 2. FILTER LOGIC
  // ==========================================
  const filteredData = allData.filter((item: any) => {
    const itemType = item.type?.toLowerCase();
    
    // A. Security Check
    const validFieldTypes = ['dataset', 'interview', 'photo', 'survey', 'field_note', 'document', 'field data'];
    if (!validFieldTypes.includes(itemType)) return false;

    // B. Tab Filter
    if (activeFilter === 'all') return true;
    return itemType === activeFilter;
  });

  // ==========================================
  // 3. UI HELPERS
  // ==========================================
  const getTypeIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'interview': return <FileAudio className="w-6 h-6" />;
      case 'photo': return <ImageIcon className="w-6 h-6" />;
      case 'survey': return <FileSpreadsheet className="w-6 h-6" />;
      case 'field_note': return <FileText className="w-6 h-6" />;
      default: return <Database className="w-6 h-6" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'interview': return 'Interview';
      case 'photo': return 'Photo Gallery';
      case 'survey': return 'Survey Data';
      case 'field_note': return 'Field Notes';
      default: return 'Dataset';
    }
  };

  const filters: { id: FilterType; label: string; icon: any }[] = [
    { id: 'all', label: 'All Data', icon: Database },
    { id: 'interview', label: 'Interviews', icon: FileAudio },
    { id: 'photo', label: 'Photos', icon: ImageIcon },
    { id: 'survey', label: 'Surveys', icon: FileSpreadsheet },
    { id: 'field_note', label: 'Notes', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <section className="py-20 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
        <div className="max-w-5xl mx-auto">
          <Link href="/research" className="flex items-center gap-2 text-[#E3E1DB] hover:text-[#99302A] transition-colors mb-8 w-fit">
            <ChevronLeft className="w-5 h-5" /> Back to Research Hub
          </Link>
          <h1 className="mb-4 text-4xl font-bold font-serif">Field Data Repository</h1>
          <p className="text-[#E3E1DB]/80 max-w-3xl text-lg font-light">
            Access primary research data, field documentation, and raw datasets.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-0 z-30 bg-[#FAFAF9]/95 backdrop-blur-sm border-b border-[#1a1a1a]/10 px-4 py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full transition-all ${
                activeFilter === filter.id
                  ? 'bg-[#99302A] text-white shadow-md'
                  : 'bg-white border border-[#1a1a1a]/10 text-[#1a1a1a]/70 hover:border-[#99302A] hover:text-[#99302A]'
              }`}
            >
              <filter.icon className="w-4 h-4" />
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Data List */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-[#99302A]" />
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-20 text-gray-500 flex flex-col items-center bg-white border border-dashed border-gray-200 rounded-lg p-10">
               <AlertCircle className="w-10 h-10 mb-2 opacity-20"/> 
               <p>No {activeFilter === 'all' ? 'data' : activeFilter.replace('_', ' ') + 's'} found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-sm text-[#1a1a1a]/50 font-medium uppercase tracking-wider mb-4">
                Showing {filteredData.length} Results
              </p>
              
              {filteredData.map((data: any) => (
                <div key={data._id} className="bg-white p-8 border border-[#1a1a1a]/10 hover:shadow-lg transition-all duration-300 rounded-sm">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 text-[#99302A]">
                      {getTypeIcon(data.type)}
                    </div>
                    
                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap gap-2 mb-3">
                          <span className="bg-[#99302A]/10 text-[#99302A] text-[10px] uppercase font-bold px-2 py-1 rounded-sm tracking-wide">
                            {getTypeLabel(data.type)}
                          </span>
                          <span className="bg-gray-100 text-gray-600 text-[10px] uppercase font-bold px-2 py-1 rounded-sm">
                            {data.community}
                          </span>
                      </div>

                      <h3 className="text-[#1a1a1a] mb-2 text-xl font-bold font-serif leading-tight">
                        {data.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-[#1a1a1a]/60 mb-4 items-center">
                        <span className="font-medium text-[#1a1a1a]">Researcher: {data.studentName}</span>
                        <span>•</span>
                        {data.batch && <span>Batch: {data.batch} • </span>}
                        <span>{new Date(data.createdAt).toLocaleDateString()}</span>
                      </div>

                      <p className="text-sm text-[#1a1a1a]/70 leading-relaxed mb-6 border-l-2 border-[#99302A]/20 pl-4 italic">
                        {data.abstract}
                      </p>

                      <div className="flex gap-4">
                        {data.fileUrl && (
                            <a 
                              href={`${API_BASE_URL}/${data.fileUrl.replace(/\\/g, "/")}`}
                              target="_blank" 
                              rel="noreferrer" 
                              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#99302A] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#7a2621] transition-colors shadow-sm"
                            >
                              <Download className="w-4 h-4" /> Download File
                            </a>
                        )}
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