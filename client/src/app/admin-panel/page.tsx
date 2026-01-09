"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle, XCircle, Download, LogOut, 
  Users, BookOpen, FileText, Database, Clock, Loader2 
} from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api'; // <--- Import your API helper

// --- Types (Matched to your Backend Model) ---
type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'revision';

interface Submission {
  _id: string; // MongoDB uses _id
  type: 'thesis' | 'publication' | 'dataset' | 'patent';
  title: string;
  studentName: string; // Backend sends studentName
  studentId: string;
  program: string;
  mentor: string;
  createdAt: string; // Backend sends createdAt
  community: string;
  status: SubmissionStatus;
  abstract: string;
  fileUrl: string; // Backend sends fileUrl
  ethicsApproved: boolean;
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedDate?: string;
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
        setSubmissions(data);
      } catch (error) {
        toast.error("Failed to load submissions. Is the server running?");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  // --- 2. HANDLE ACTIONS (Approve/Reject) ---
  const handleAction = async (action: 'approved' | 'rejected' | 'revision', id: string) => {
    try {
      // Optimistic Update (Update UI instantly)
      setSubmissions(prev => prev.map(item => 
        item._id === id ? { ...item, status: action } : item
      ));

      // Send to Backend
      // Note: We are sending a generic "Faculty Admin" name for now. 
      // In a real app, this would come from the logged-in user's session.
      await api.patch(`/research/${id}/status`, { 
        status: action,
        comments: action === 'rejected' ? 'Does not meet formatting guidelines.' : '', 
        reviewerName: 'Faculty Admin'
      });

      toast.success(`Submission marked as ${action}`);
    } catch (error) {
      toast.error("Failed to update status");
      // Revert if failed (optional)
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    router.push('/login');
  };

  // Filter Data based on Active Tab
  const filteredSubmissions = submissions.filter(s => s.status === activeTab);

  // Calculate Real Stats
  const stats = {
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected' || s.status === 'revision').length,
    total: submissions.length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#Eae9e5]">
        <Loader2 className="w-10 h-10 animate-spin text-[#99302A]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#Eae9e5]">
      {/* Admin Header */}
      <section className="bg-[#1a1a1a] text-[#E3E1DB] py-5 px-6 shadow-md border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-serif font-bold tracking-wide">Faculty Administration Panel</h1>
            <p className="text-xs text-[#E3E1DB]/60 mt-0.5">Review and manage research submissions</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-[#99302A] hover:bg-[#7a2621] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
          >
            <LogOut className="w-3 h-3" />
            Logout
          </button>
        </div>
      </section>

      {/* Statistics Dashboard */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Pending */}
            <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-yellow-500 relative">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-bold text-[#1a1a1a] mb-1 font-serif">{stats.pending}</h3>
                  <p className="text-sm text-[#1a1a1a]/60 font-medium">Pending Review</p>
                </div>
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
            </div>

            {/* Approved */}
            <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-green-500 relative">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-bold text-[#1a1a1a] mb-1 font-serif">{stats.approved}</h3>
                  <p className="text-sm text-[#1a1a1a]/60 font-medium">Approved</p>
                </div>
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>

            {/* Rejected */}
            <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-red-500 relative">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-bold text-[#1a1a1a] mb-1 font-serif">{stats.rejected}</h3>
                  <p className="text-sm text-[#1a1a1a]/60 font-medium">Rejected</p>
                </div>
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
            </div>

            {/* Total */}
            <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-[#99302A] relative">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-bold text-[#1a1a1a] mb-1 font-serif">{stats.total}</h3>
                  <p className="text-sm text-[#1a1a1a]/60 font-medium">Total Submissions</p>
                </div>
                <Database className="w-6 h-6 text-[#99302A]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-6 mb-6">
        <div className="max-w-7xl mx-auto flex gap-2 border-b border-[#1a1a1a]/10 pb-1">
          {['pending', 'approved', 'rejected'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
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
              <div 
                key={submission._id}
                className="bg-white p-8 rounded-sm shadow-sm border border-[#1a1a1a]/5 hover:shadow-md transition-shadow relative"
              >
                <div className="flex items-start gap-6">
                  {/* Icon Circle */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    submission.type === 'dataset' ? 'bg-red-50 text-[#99302A]' : 'bg-[#FAFAF9] text-[#99302A]'
                  }`}>
                    {submission.type === 'thesis' && <BookOpen className="w-6 h-6" />}
                    {submission.type === 'publication' && <FileText className="w-6 h-6" />}
                    {submission.type === 'dataset' && <Database className="w-6 h-6" />}
                  </div>

                  <div className="flex-1">
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-sm ${
                        submission.type === 'thesis' ? 'bg-red-50 text-[#99302A]' : 
                        submission.type === 'publication' ? 'bg-orange-50 text-orange-700' :
                        'bg-blue-50 text-blue-700'
                      }`}>
                        {submission.type}
                      </span>
                      <span className="text-[10px] uppercase font-bold px-2 py-1 bg-[#1a1a1a]/5 text-[#1a1a1a]/70 rounded-sm">
                        {submission.community}
                      </span>
                      {submission.ethicsApproved ? (
                        <span className="text-[10px] uppercase font-bold px-2 py-1 bg-green-100 text-green-700 rounded-sm flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Ethics Approved
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase font-bold px-2 py-1 bg-red-100 text-red-700 rounded-sm flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Ethics Pending
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-serif font-bold text-[#1a1a1a] mb-4 leading-tight">
                      {submission.title}
                    </h3>

                    {/* Info Grid */}
                    <div className="grid md:grid-cols-2 gap-y-2 gap-x-8 text-sm text-[#1a1a1a]/70 mb-4 font-light">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#1a1a1a]/40" />
                        <span className="font-medium text-[#1a1a1a]">{submission.studentName}</span> 
                        <span className="text-xs opacity-60">({submission.studentId})</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#1a1a1a]">Program:</span> {submission.program}
                      </div>
                      <div>
                        <span className="font-semibold text-[#1a1a1a]">Mentor:</span> {submission.mentor}
                      </div>
                      <div>
                        <span className="font-semibold text-[#1a1a1a]">Submitted:</span> {new Date(submission.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Abstract */}
                    <div className="bg-[#FAFAF9] p-4 rounded-sm border-l-2 border-[#1a1a1a]/10 mb-6">
                      <p className="text-sm text-[#1a1a1a]/80 leading-relaxed">
                        <span className="font-bold text-[#1a1a1a]">Abstract: </span>
                        {submission.abstract}
                      </p>
                    </div>

                    {/* DYNAMIC STATUS BANNERS */}
                    {submission.status === 'approved' && (
                      <div className="bg-green-50 p-3 rounded-sm border border-green-100 text-xs text-green-800 mb-6 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Reviewed and approved</span>
                      </div>
                    )}
                    {submission.status === 'rejected' && (
                      <div className="bg-red-50 p-3 rounded-sm border border-red-100 text-xs text-red-800 mb-6">
                        <div className="flex items-center gap-2 mb-1 font-bold">
                          <XCircle className="w-4 h-4" /> Rejected
                        </div>
                        <div className="pl-6 opacity-80">
                          Reason: {submission.rejectionReason || 'Does not meet criteria'}
                        </div>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between pt-6 border-t border-[#1a1a1a]/5 gap-4">
                      <div className="flex gap-3">
                        <a 
                          href={`http://localhost:5000/${submission.fileUrl}`} 
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a]/5 hover:bg-[#1a1a1a]/10 text-[#1a1a1a] text-xs font-bold uppercase rounded-sm transition-colors"
                        >
                          <Download className="w-3 h-3" /> Download Files
                        </a>
                      </div>

                      {submission.status === 'pending' && (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleAction('approved', submission._id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold uppercase rounded-sm transition-colors"
                          >
                            <CheckCircle className="w-3 h-3" /> Approve
                          </button>
                          
                          <button 
                            onClick={() => handleAction('rejected', submission._id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold uppercase rounded-sm transition-colors"
                          >
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

      {/* Review Guidelines Footer */}
      <section className="bg-[#FAFAF9] py-16 px-6 border-t border-[#1a1a1a]/5 mt-auto">
         <div className="max-w-6xl mx-auto">
          <h2 className="text-center font-serif font-bold text-[#1a1a1a] mb-10">Review Guidelines</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-sm border border-[#1a1a1a]/5">
              <h4 className="font-serif font-bold text-[#1a1a1a] mb-4 text-sm">Quality Criteria</h4>
              <ul className="text-xs text-[#1a1a1a]/70 space-y-2 list-disc pl-4 leading-relaxed">
                <li>Methodological rigor and clarity</li>
                <li>Completeness of documentation</li>
                <li>Clear research questions and objectives</li>
                <li>Proper citations and academic formatting</li>
              </ul>
            </div>
            <div className="bg-white p-6 shadow-sm border border-[#1a1a1a]/5">
              <h4 className="font-serif font-bold text-[#1a1a1a] mb-4 text-sm">Ethics Requirements</h4>
              <ul className="text-xs text-[#1a1a1a]/70 space-y-2 list-disc pl-4 leading-relaxed">
                <li>IRB/Ethics committee approval</li>
                <li>Informed consent forms for all participants</li>
                <li>Community permissions documented</li>
                <li>Data anonymization protocols followed</li>
              </ul>
            </div>
            <div className="bg-white p-6 shadow-sm border border-[#1a1a1a]/5">
              <h4 className="font-serif font-bold text-[#1a1a1a] mb-4 text-sm">Technical Standards</h4>
              <ul className="text-xs text-[#1a1a1a]/70 space-y-2 list-disc pl-4 leading-relaxed">
                <li>Metadata completeness (Title, Abstract, Tags)</li>
                <li>File format compliance (PDF, MP3, MP4)</li>
                <li>Proper categorization of research type</li>
                <li>Appropriate keyword tagging for searchability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}