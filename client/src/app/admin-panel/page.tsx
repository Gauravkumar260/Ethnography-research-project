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
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

// --- Types for Mock Data ---
type SubmissionStatus = 'pending' | 'approved' | 'rejected';

interface Submission {
  id: string;
  type: 'Thesis' | 'Publication' | 'Dataset';
  community: string;
  title: string;
  studentName: string;
  studentId: string;
  mentor: string;
  program: string;
  submittedDate: string;
  fileCount: number;
  abstract: string;
  ethicsStatus: 'Approved' | 'Missing';
  status: SubmissionStatus;
  rejectionReason?: string;
  approvalMeta?: string;
}

// --- Mock Data ---
const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: '1',
    type: 'Thesis',
    community: 'Van Gujjar',
    title: 'Traditional Ecological Knowledge and Climate Adaptation Among Van Gujjar Communities',
    studentName: 'Rahul Kumar',
    studentId: 'PhD2020015',
    mentor: 'Dr. Suresh Patel',
    program: 'PhD',
    submittedDate: '2024-12-20',
    fileCount: 8,
    abstract: 'This dissertation examines how Van Gujjar communities utilize traditional ecological knowledge for climate adaptation strategies...',
    ethicsStatus: 'Approved',
    status: 'pending'
  },
  {
    id: '2',
    type: 'Publication',
    community: 'Banjara',
    title: 'Gender Dynamics in Banjara Craft Production: An Economic Analysis',
    studentName: 'Priya Singh',
    studentId: 'MA2022034',
    mentor: 'Dr. Kavita Mehta',
    program: 'MA',
    submittedDate: '2024-12-22',
    fileCount: 4,
    abstract: 'This paper analyzes the economic contribution of women in Banjara textile craft production...',
    ethicsStatus: 'Approved',
    status: 'pending'
  },
  {
    id: '3',
    type: 'Dataset',
    community: 'Gadia Lohar',
    title: 'Gadia Lohar Migration Patterns GPS Tracking Data (2023-2024)',
    studentName: 'Amit Verma',
    studentId: 'MPhil2021028',
    mentor: 'Dr. Priya Sharma',
    program: 'MPhil',
    submittedDate: '2024-12-23',
    fileCount: 12,
    abstract: 'GPS tracking data from 45 Gadia Lohar families documenting seasonal migration routes across three states...',
    ethicsStatus: 'Approved',
    status: 'pending'
  },
  {
    id: '4',
    type: 'Thesis',
    community: 'Jaunsar',
    title: 'Oral Traditions and Historical Memory in Jaunsar Communities',
    studentName: 'Neha Joshi',
    studentId: 'PhD2019008',
    mentor: 'Prof. Ramesh Kumar',
    program: 'PhD',
    submittedDate: '2024-12-18',
    fileCount: 15,
    abstract: 'An ethnographic study of oral narratives as repositories of historical memory in the Jaunsar-Bawar region...',
    ethicsStatus: 'Approved',
    status: 'approved',
    approvalMeta: 'Reviewed and approved by Prof. Ramesh Kumar on 2024-12-24'
  },
  {
    id: '5',
    type: 'Publication',
    community: 'Multiple',
    title: 'Digital Storytelling Among Nomadic Youth',
    studentName: 'Karan Malhotra',
    studentId: 'MA2022019',
    mentor: 'Dr. Nandita Roy',
    program: 'MA',
    submittedDate: '2024-12-15',
    fileCount: 3,
    abstract: 'This paper examines social media use among nomadic youth...',
    ethicsStatus: 'Missing',
    status: 'rejected',
    rejectionReason: 'Insufficient ethics documentation - consent forms incomplete. Reviewed by Dr. Nandita Roy on 2024-12-19'
  }
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<SubmissionStatus>('pending');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin-panel/security/login');
    } else {
      setIsAuthorized(true);
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin-panel/security/login');
  };

  // --- Filter Data Based on Tab ---
  const filteredSubmissions = MOCK_SUBMISSIONS.filter(s => s.status === activeTab);

  // --- Stats Calculation ---
  const pendingCount = MOCK_SUBMISSIONS.filter(s => s.status === 'pending').length;
  const approvedCount = MOCK_SUBMISSIONS.filter(s => s.status === 'approved').length;
  const rejectedCount = MOCK_SUBMISSIONS.filter(s => s.status === 'rejected').length;
  const totalCount = MOCK_SUBMISSIONS.length;

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
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 border border-[#99302A] text-[#E3E1DB] bg-[#99302A] hover:bg-[#7a2621] rounded-sm text-sm transition-colors"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
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

        </div>

        {/* --- SUBMISSIONS LIST --- */}
        <div className="space-y-6">
          {filteredSubmissions.map((submission) => (
            <SubmissionCard key={submission.id} submission={submission} />
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

function SubmissionCard({ submission }: { submission: Submission }) {
  const isPending = submission.status === 'pending';

  return (
    <div className="bg-white p-8 rounded-sm shadow-sm border border-[#1a1a1a]/5 hover:shadow-md transition-shadow">
      <div className="flex gap-6">
        {/* Icon Column */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-[#99302A]/5 flex items-center justify-center text-[#99302A]">
            {submission.type === 'Dataset' ? <Database className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
          </div>
        </div>

        {/* Content Column */}
        <div className="flex-grow space-y-4">

          {/* Tags Header */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 bg-[#99302A]/10 text-[#99302A] text-xs font-bold uppercase tracking-wider rounded-sm">{submission.type}</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-sm">{submission.community}</span>
            <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-1 ${submission.ethicsStatus === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
              {submission.ethicsStatus === 'Approved' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
              Ethics {submission.ethicsStatus}
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
                <span className="text-[#1a1a1a]">Submitted:</span> {submission.submittedDate}
              </div>
              <div>
                <span className="text-[#1a1a1a]">Files:</span> {submission.fileCount} uploaded
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
          {submission.status === 'approved' && (
            <div className="bg-green-50 text-green-800 text-xs p-3 rounded-sm border border-green-100">
              {submission.approvalMeta}
            </div>
          )}

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between pt-4 border-t border-[#1a1a1a]/5 gap-4">
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#1a1a1a] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors">
                <Eye className="w-4 h-4" /> View Details
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#1a1a1a] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors">
                <Download className="w-4 h-4" /> Download Files
              </button>
            </div>

            {isPending && (
              <div className="flex gap-2">
                <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm transition-colors flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Approve
                </button>
                <button className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm transition-colors">
                  Request Revision
                </button>
                <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm transition-colors flex items-center gap-2">
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