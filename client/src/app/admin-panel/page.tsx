"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LogOut,
  Clock,
  CheckCircle,
  XCircle,
  Database,
  FileText,
  Download,
  Eye,
  BookOpen,
  File,
  AlertCircle,
  Loader2,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import api from '@/lib/api';

// --- Configuration ---
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';

// --- Types ---
type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'revision';

interface Submission {
  _id: string;
  type: string;
  community: string;
  title: string;
  studentName: string;
  studentId: string;
  mentor: string;
  program: string;
  batch: string;
  createdAt: string; // ISO Date
  fileUrl: string;
  ethicsFileUrl?: string;
  mediaFileUrl?: string;
  abstract: string;
  status: SubmissionStatus;
  rejectionReason?: string;
  reviewedDate?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [activeTab, setActiveTab] = useState<SubmissionStatus>('pending');
  const [refreshing, setRefreshing] = useState(false);

  const fetchSubmissions = async () => {
    try {
      setRefreshing(true);
      const { data: response } = await api.get('/research/admin');
      setSubmissions(response.data || []);
    } catch (error: any) {
      console.error("Error fetching submissions:", error);
      toast.error("Failed to load submissions.");
      if (error.response?.status === 401 || error.response?.status === 403) {
        router.push('/admin-panel/security/login');
      }
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin-panel/security/login');
    } else {
      setIsAuthorized(true);
      fetchSubmissions();
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin-panel/security/login');
  };

  const handleStatusUpdate = async (id: string, newStatus: SubmissionStatus, reason?: string) => {
    try {
      await api.patch(`/research/${id}/status`, {
        status: newStatus,
        comments: reason
      });
      
      toast.success(`Submission marked as ${newStatus}`);
      
      // Update local state to reflect change immediately
      setSubmissions(prev => prev.map(sub => 
        sub._id === id 
          ? { ...sub, status: newStatus, rejectionReason: reason, reviewedDate: new Date().toISOString() } 
          : sub
      ));
      
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  // --- Filter Data Based on Tab ---
  const filteredSubmissions = submissions.filter(s => s.status === activeTab);

  // --- Stats Calculation ---
  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const approvedCount = submissions.filter(s => s.status === 'approved').length;
  const rejectedCount = submissions.filter(s => s.status === 'rejected').length;
  const totalCount = submissions.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#Eae9e5] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#99302A]" />
      </div>
    );
  }

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-[#Eae9e5] font-sans text-[#1a1a1a]">
      {/* --- HEADER --- */}
      <header className="bg-[#1a1a1a] text-[#E3E1DB] py-4 px-8 flex justify-between items-center shadow-md">
        <div>
          <h1 className="text-lg font-serif tracking-wide">Faculty Administration Panel</h1>
          <p className="text-xs opacity-60">Review and manage research submissions</p>
        </div>
        <div className="flex items-center gap-4">
            <button 
                onClick={fetchSubmissions} 
                disabled={refreshing}
                className="p-2 text-[#E3E1DB]/70 hover:text-white transition-colors"
                title="Refresh Data"
            >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-[#99302A] text-[#E3E1DB] bg-[#99302A] hover:bg-[#7a2621] rounded-sm text-sm transition-colors"
            >
            <LogOut className="w-4 h-4" /> Logout
            </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8 space-y-8">

        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            label="Pending Review"
            count={pendingCount}
            icon={Clock}
            color="text-yellow-600"
            borderColor="border-l-4 border-yellow-500"
          />
          <StatCard
            label="Approved"
            count={approvedCount}
            icon={CheckCircle}
            color="text-green-600"
            borderColor="border-l-4 border-green-500"
          />
          <StatCard
            label="Rejected"
            count={rejectedCount}
            icon={XCircle}
            color="text-red-500"
            borderColor="border-l-4 border-red-500"
          />
          <StatCard
            label="Total Submissions"
            count={totalCount}
            icon={Database}
            color="text-[#99302A]"
            borderColor="border-l-4 border-[#99302A]"
          />
        </div>

        {/* --- TABS --- */}
        <div className="flex gap-4 border-b border-[#1a1a1a]/10 pb-4">
          <TabButton
            active={activeTab === 'pending'}
            onClick={() => setActiveTab('pending')}
            label={`Pending (${pendingCount})`}
            activeClass="bg-yellow-100 text-yellow-800 border-yellow-200"
          />
          <TabButton
            active={activeTab === 'approved'}
            onClick={() => setActiveTab('approved')}
            label={`Approved (${approvedCount})`}
            activeClass="bg-green-100 text-green-800 border-green-200"
          />
          <TabButton
            active={activeTab === 'rejected'}
            onClick={() => setActiveTab('rejected')}
            label={`Rejected (${rejectedCount})`}
            activeClass="bg-red-100 text-red-800 border-red-200"
          />
          {/* We can add Revision tab if needed, but let's stick to these 3 for now */}
        </div>

        {/* --- SUBMISSIONS LIST --- */}
        <div className="space-y-6">
          {filteredSubmissions.map((submission) => (
            <SubmissionCard 
                key={submission._id} 
                submission={submission} 
                onUpdateStatus={handleStatusUpdate}
            />
          ))}
          {filteredSubmissions.length === 0 && (
            <div className="text-center py-20 text-[#1a1a1a]/40">
              <div className="flex justify-center mb-4"><File className="w-12 h-12 opacity-50" /></div>
              <p>No submissions in this category.</p>
            </div>
          )}
        </div>

      </main>

      {/* --- FOOTER GUIDELINES --- */}
      <footer className="max-w-7xl mx-auto px-8 py-12 mt-12 bg-[#Eae9e5]">
        <h3 className="text-center font-serif text-[#1a1a1a] mb-8 text-lg">Review Guidelines</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <GuidelineColumn
            title="Quality Criteria"
            items={[
              "Methodological rigor",
              "Complete documentation",
              "Clear research questions",
              "Proper citations"
            ]}
          />
          <GuidelineColumn
            title="Ethics Requirements"
            items={[
              "IRB/Ethics approval",
              "Informed consent forms",
              "Community permissions",
              "Data anonymization"
            ]}
          />
          <GuidelineColumn
            title="Technical Standards"
            items={[
              "Metadata completeness",
              "File format compliance",
              "Proper categorization",
              "Keyword tagging"
            ]}
          />
        </div>
      </footer>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function StatCard({ label, count, icon: Icon, color, borderColor }: { label: string, count: number, icon: any, color: string, borderColor: string }) {
  return (
    <div className={`bg-white p-6 shadow-sm rounded-sm flex items-center justify-between ${borderColor}`}>
      <div>
        <div className="text-3xl font-bold font-serif mb-1">{count}</div>
        <div className="text-sm text-[#1a1a1a]/70">{label}</div>
      </div>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
  );
}

function TabButton({ active, onClick, label, activeClass }: { active: boolean, onClick: () => void, label: string, activeClass: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 text-sm font-medium rounded-sm transition-all border ${active
        ? `${activeClass} shadow-sm transform scale-105`
        : 'bg-[#1a1a1a]/5 text-[#1a1a1a]/60 border-transparent hover:bg-[#1a1a1a]/10'
        }`}
    >
      {label}
    </button>
  );
}

function GuidelineColumn({ title, items }: { title: string, items: string[] }) {
  return (
    <div className="bg-white p-8 rounded-sm shadow-sm">
      <h4 className="font-serif font-bold text-[#1a1a1a] mb-4 text-base">{title}</h4>
      <ul className="space-y-2 text-sm text-[#1a1a1a]/70">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-1 h-1 bg-[#99302A] rounded-full" /> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SubmissionCardProps {
    submission: Submission;
    onUpdateStatus: (id: string, status: SubmissionStatus, reason?: string) => void;
}

function SubmissionCard({ submission, onUpdateStatus }: SubmissionCardProps) {
  const isPending = submission.status === 'pending';

  const handleAction = (status: SubmissionStatus) => {
    let reason = '';
    if (status === 'rejected') {
        reason = prompt("Please provide a reason for rejection:") || '';
        if (!reason) return; // Cancel if no reason provided
    }
    if (status === 'revision') {
        reason = prompt("Please provide instructions for revision:") || '';
        if (!reason) return;
    }
    
    if (confirm(`Are you sure you want to mark this as ${status.toUpperCase()}?`)) {
        onUpdateStatus(submission._id, status, reason);
    }
  };

  const getFileUrl = (path: string) => {
    if (!path) return '#';
    // Remove backward slashes if any (Windows paths)
    const cleanPath = path.replace(/\/g, "/");
    return `${API_BASE_URL}/${cleanPath}`;
  };

  return (
    <div className="bg-white p-8 rounded-sm shadow-sm border border-[#1a1a1a]/5 hover:shadow-md transition-shadow">
      <div className="flex gap-6">
        {/* Icon Column */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-[#99302A]/5 flex items-center justify-center text-[#99302A]">
            {submission.type?.toLowerCase() === 'dataset' ? <Database className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
          </div>
        </div>

        {/* Content Column */}
        <div className="flex-grow space-y-4">

          {/* Tags Header */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 bg-[#99302A]/10 text-[#99302A] text-xs font-bold uppercase tracking-wider rounded-sm">{submission.type}</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-sm">{submission.community}</span>
            <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-1 ${submission.ethicsFileUrl ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
              {submission.ethicsFileUrl ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
              Ethics {submission.ethicsFileUrl ? 'Uploaded' : 'Missing'}
            </span>
          </div>

          {/* Title & Main Info */}
          <div>
            <h2 className="text-xl font-serif font-bold text-[#1a1a1a] mb-2 leading-tight">
              {submission.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-y-1 gap-x-8 text-sm text-[#1a1a1a]/70">
              <div className="flex items-center gap-2">
                <span className="text-[#1a1a1a]">By:</span> {submission.studentName} ({submission.studentId})
              </div>
              <div>
                <span className="text-[#1a1a1a]">Program:</span> {submission.program}
              </div>
              <div>
                <span className="text-[#1a1a1a]">Mentor:</span> {submission.mentor}
              </div>
              <div>
                <span className="text-[#1a1a1a]">Submitted:</span> {new Date(submission.createdAt).toLocaleDateString()}
              </div>
              <div>
                <span className="text-[#1a1a1a]">Batch:</span> {submission.batch}
              </div>
            </div>
          </div>

          {/* Abstract */}
          <p className="text-sm bg-[#FAFAF9] p-4 border border-[#1a1a1a]/5 rounded-sm italic text-[#1a1a1a]/80">
            <span className="font-bold not-italic text-[#1a1a1a]">Abstract: </span>
            {submission.abstract}
          </p>

          {/* Status Messages (if not pending) */}
          {submission.status === 'rejected' && (
            <div className="bg-red-50 text-red-800 text-xs p-3 rounded-sm border border-red-100">
              <strong>Rejection Reason:</strong> {submission.rejectionReason}
            </div>
          )}
          {submission.status === 'approved' && submission.reviewedDate && (
             <div className="bg-green-50 text-green-800 text-xs p-3 rounded-sm border border-green-100">
              Approved on {new Date(submission.reviewedDate).toLocaleDateString()}
            </div>
          )}

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between pt-4 border-t border-[#1a1a1a]/5 gap-4">
            <div className="flex gap-3">
              <a 
                href={getFileUrl(submission.fileUrl)} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#1a1a1a] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
              >
                <Download className="w-4 h-4" /> Main File
              </a>
              
              {submission.ethicsFileUrl && (
                  <a 
                    href={getFileUrl(submission.ethicsFileUrl)} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#1a1a1a] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
                  >
                    <FileText className="w-4 h-4" /> Ethics Doc
                  </a>
              )}

              {submission.mediaFileUrl && (
                  <a 
                    href={getFileUrl(submission.mediaFileUrl)} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#1a1a1a] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
                  >
                    <Database className="w-4 h-4" /> Media/Data
                  </a>
              )}
            </div>

            {isPending && (
              <div className="flex gap-2">
                <button 
                    onClick={() => handleAction('approved')}
                    className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> Approve
                </button>
                <button 
                    onClick={() => handleAction('revision')}
                    className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm transition-colors"
                >
                  Request Revision
                </button>
                <button 
                    onClick={() => handleAction('rejected')}
                    className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm transition-colors flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
