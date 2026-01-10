"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle, XCircle, LogOut, 
  BookOpen, FileText, Database, Clock, Loader2, Upload
} from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api'; 

type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'revision';

interface Submission {
  _id: string;
  type: 'thesis' | 'publication' | 'dataset' | 'patent';
  title: string;
  studentName: string;
  studentId: string;
  program: string;
  mentor: string;
  createdAt: string;
  community: string;
  status: SubmissionStatus;
  abstract: string;
  fileUrl: string;
  ethicsApproved: boolean;
  rejectionReason?: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  // --- 1. FETCH REAL DATA ---
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data } = await api.get('/research/admin');
        // Ensure we handle the response structure { success: true, data: [...] } OR direct array
        const list = Array.isArray(data) ? data : (data.data || []);
        setSubmissions(list);
      } catch (error) {
        console.error("Failed to load submissions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  // --- 2. HANDLE ACTIONS ---
  const handleAction = async (action: 'approved' | 'rejected', id: string) => {
    try {
      // Optimistic Update
      setSubmissions(prev => prev.map(item => 
        item._id === id ? { ...item, status: action } : item
      ));

      await api.patch(`/research/${id}/status`, { 
        status: action === 'approved' ? 'Approved' : 'Rejected', // Match backend casing if needed
        comments: action === 'rejected' ? 'Does not meet formatting guidelines.' : ''
      });

    } catch (error) {
      alert("Failed to update status");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push('/login');
  };

  // Filter Data
  const filteredSubmissions = submissions.filter(s => s.status?.toLowerCase() === activeTab);

  // Calculate Stats
  const stats = {
    pending: submissions.filter(s => s.status?.toLowerCase() === 'pending').length,
    approved: submissions.filter(s => s.status?.toLowerCase() === 'approved').length,
    rejected: submissions.filter(s => s.status?.toLowerCase() === 'rejected').length,
    total: submissions.length,
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9]"><Loader2 className="w-10 h-10 animate-spin text-[#99302A]" /></div>;

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Admin Header */}
      <section className="bg-[#1a1a1a] text-[#E3E1DB] py-5 px-6 shadow-md border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-serif font-bold tracking-wide">Faculty Administration Panel</h1>
            <p className="text-xs text-[#E3E1DB]/60 mt-0.5">Review and manage research submissions</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/upload" className="flex items-center gap-2 px-4 py-2 bg-[#E3E1DB]/10 hover:bg-[#E3E1DB]/20 text-[#E3E1DB] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors">
                <Upload className="w-3 h-3" /> Upload Doc
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-[#99302A] hover:bg-[#7a2621] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors">
              <LogOut className="w-3 h-3" /> Logout
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Dashboard */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-yellow-500 flex justify-between items-start">
                <div><h3 className="text-3xl font-bold text-[#1a1a1a] mb-1 font-serif">{stats.pending}</h3><p className="text-sm text-[#1a1a1a]/60 font-medium">Pending Review</p></div>
                <Clock className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-green-500 flex justify-between items-start">
                <div><h3 className="text-3xl font-bold text-[#1a1a1a] mb-1 font-serif">{stats.approved}</h3><p className="text-sm text-[#1a1a1a]/60 font-medium">Approved</p></div>
                <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-red-500 flex justify-between items-start">
                <div><h3 className="text-3xl font-bold text-[#1a1a1a] mb-1 font-serif">{stats.rejected}</h3><p className="text-sm text-[#1a1a1a]/60 font-medium">Rejected</p></div>
                <XCircle className="w-6 h-6 text-red-500" />
            </div>
            <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-[#99302A] flex justify-between items-start">
                <div><h3 className="text-3xl font-bold text-[#1a1a1a] mb-1 font-serif">{stats.total}</h3><p className="text-sm text-[#1a1a1a]/60 font-medium">Total Submissions</p></div>
                <Database className="w-6 h-6 text-[#99302A]" />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-6 mb-6">
        <div className="max-w-7xl mx-auto flex gap-2 border-b border-[#1a1a1a]/10 pb-1">
          {['pending', 'approved', 'rejected'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 text-sm font-medium transition-all rounded-sm capitalize ${
                activeTab === tab 
                  ? tab === 'pending' ? 'bg-yellow-500 text-white' : tab === 'approved' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  : 'bg-[#1a1a1a]/5 text-[#1a1a1a]/60 hover:bg-[#1a1a1a]/10'
              }`}
            >
              {tab} ({stats[tab as keyof typeof stats]})
            </button>
          ))}
        </div>
      </section>

      {/* Submissions List */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto space-y-6">
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-20 bg-white rounded border-2 border-dashed border-[#1a1a1a]/10">
              <p className="text-[#1a1a1a]/50 italic font-serif">No {activeTab} submissions found.</p>
            </div>
          ) : (
            filteredSubmissions.map((submission) => (
              <div key={submission._id} className="bg-white p-8 rounded-sm shadow-sm border border-[#1a1a1a]/5 hover:shadow-md transition-shadow relative">
                <div className="flex items-start gap-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${submission.type === 'dataset' ? 'bg-red-50 text-[#99302A]' : 'bg-[#FAFAF9] text-[#99302A]'}`}>
                    {submission.type === 'thesis' && <BookOpen className="w-6 h-6" />}
                    {submission.type === 'publication' && <FileText className="w-6 h-6" />}
                    {submission.type === 'dataset' && <Database className="w-6 h-6" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[10px] uppercase font-bold px-2 py-1 bg-[#1a1a1a]/5 rounded-sm">{submission.type}</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-1 bg-[#1a1a1a]/5 text-[#1a1a1a]/70 rounded-sm">{submission.community}</span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-[#1a1a1a] mb-2 leading-tight">{submission.title}</h3>
                    <p className="text-sm text-[#1a1a1a]/70 mb-4">By <span className="font-bold">{submission.studentName}</span> ({submission.studentId}) • {submission.program}</p>

                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#1a1a1a]/5">
                      <a href={`https://unheard-india-api.onrender.com/${submission.fileUrl?.replace(/\\/g, "/")}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a]/5 hover:bg-[#1a1a1a]/10 text-[#1a1a1a] text-xs font-bold uppercase rounded-sm transition-colors">
                        Download File
                      </a>

                      {activeTab === 'pending' && (
                        <div className="flex gap-2 ml-auto">
                          <button onClick={() => handleAction('approved', submission._id)} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold uppercase rounded-sm transition-colors">
                            <CheckCircle className="w-3 h-3" /> Approve
                          </button>
                          <button onClick={() => handleAction('rejected', submission._id)} className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold uppercase rounded-sm transition-colors">
                            <XCircle className="w-3 h-3" /> Reject
                          </button>
                        </div>
                      )}
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