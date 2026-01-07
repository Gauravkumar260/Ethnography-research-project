"use client";

// IMPORTS
// ------------------------------------------------------------------
import React, { useState, useRef } from 'react';
import Link from 'next/link';
// Importing icons from 'lucide-react' for UI elements
import { 
  Upload, FileText, Database, BookOpen, Award, 
  CheckCircle, ArrowLeft, X, ChevronRight, AlertCircle 
} from 'lucide-react';
// Importing toast for notifications
import { toast } from 'sonner';
// Importing API helper (ensure this path exists in your project)
import api from '@/lib/api';

// TYPES
// ------------------------------------------------------------------
// Defining the allowed values for submission types
type SubmissionType = 'thesis' | 'publication' | 'dataset' | 'patent' | '';

export default function SubmissionPage() {
  // STATE MANAGEMENT
  // ----------------------------------------------------------------
  // Controls which form section is visible (Selection vs Form)
  const [submissionType, setSubmissionType] = useState<SubmissionType>('');
  // Controls the success view after submission
  const [submitted, setSubmitted] = useState(false);
  // Controls the loading state during API calls
  const [isLoading, setIsLoading] = useState(false);
  // Controls the ethics declaration checkbox
  const [agreed, setAgreed] = useState(false);
  
  // FILE HANDLING STATE
  // ----------------------------------------------------------------
  // Stores the selected file object
  const [file, setFile] = useState<File | null>(null);
  // Reference to the hidden file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  // FORM DATA STATE
  // ----------------------------------------------------------------
  // Stores text input values
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    email: '',
    program: 'PhD',
    batch: '', 
    mentor: '',
    title: '',
    abstract: '',
    community: '',
    keywords: '', // Specific to Dataset
    organization: '', // Specific to Patent
  });

  // HANDLERS
  // ----------------------------------------------------------------
  
  // Updates state when text inputs change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Updates state when a file is selected
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handles the final form submission to the backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    // Validation: Check if file is present
    if (!file) {
      toast.error("Please upload your document.");
      return;
    }
    // Validation: Check if ethics declaration is agreed to
    if (!agreed) {
      toast.error("Please agree to the declaration.");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const data = new FormData();
      // Append all text fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      // Append the submission type and the file itself
      data.append('type', submissionType);
      data.append('file', file);

      // API Call
      await api.post('/research/submit', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // On Success
      setSubmitted(true);
      toast.success("Research submitted successfully!");
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error: any) {
      // On Error
      console.error(error);
      const message = error.response?.data?.message || "Submission failed.";
      toast.error(message);
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  // HELPER FUNCTION
  // ----------------------------------------------------------------
  // Returns the correct button label based on the selected type
  const getUploadLabel = () => {
    switch (submissionType) {
      case 'thesis': return 'Upload Thesis PDF';
      case 'publication': return 'Upload Publication PDF';
      case 'dataset': return 'Upload Extracted Data (ZIP)';
      case 'patent': return 'Upload Patent Documentation';
      default: return 'Upload Document';
    }
  };

  // RENDER: SUCCESS VIEW
  // ----------------------------------------------------------------
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#Eae9e5] font-sans px-4">
        <div className="max-w-xl w-full bg-white p-12 shadow-md rounded-sm border border-[#1a1a1a]/5 text-center">
          
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-700" />
          </div>

          <h2 className="text-[#1a1a1a] mb-4 text-3xl font-serif font-bold">Submission Received</h2>
          <p className="text-[#1a1a1a]/70 mb-8 leading-relaxed">
            Thank you for contributing to Unheard India. Your research has been sent for faculty review.
          </p>
          
          {/* Reset Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => { 
                // Reset all states to initial values
                setSubmitted(false); 
                setSubmissionType(''); 
                setFile(null);
                setAgreed(false);
                setFormData({ 
                  studentName: '', studentId: '', email: '', program: 'PhD', 
                  batch: '', mentor: '', title: '', abstract: '', 
                  community: '', keywords: '', organization: '' 
                });
              }}
              className="px-8 py-3 bg-[#99302A] text-white hover:bg-[#7a2621] transition-colors text-sm font-bold uppercase tracking-wider rounded-sm"
            >
              Submit Another
            </button>
            <Link 
              href="/research"
              className="px-8 py-3 bg-white border border-[#1a1a1a]/20 text-[#1a1a1a] hover:bg-[#FAFAF9] transition-colors text-sm font-bold uppercase tracking-wider rounded-sm"
            >
              Back to Library
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: MAIN VIEW
  // ----------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#Eae9e5] text-[#1a1a1a] font-sans">
      
      {/* HEADER SECTION (From your layout snippet) */}
      <section className="py-20 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold font-serif">
            Submit Your Research
          </h1>
          <p className="text-[#E3E1DB]/80 max-w-3xl mx-auto text-lg font-light">
            Share your ethnographic research, thesis, publications, or field data with the academic community. All submissions undergo faculty review.
          </p>
        </div>
      </section>

      {/* STEP 1: SELECTION GRID (Only show if no type selected) */}
      {!submissionType && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[#1a1a1a] mb-12 text-center text-2xl font-serif font-bold">
              What would you like to submit?
            </h2>
           
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Option 1: Thesis */}
              <button onClick={() => setSubmissionType('thesis')} className="group bg-white p-10 border border-[#1a1a1a]/10 hover:border-[#99302A] hover:shadow-xl transition-all text-left rounded-sm flex flex-col items-start">
                <div className="w-14 h-14 rounded-full bg-[#99302A]/10 flex items-center justify-center mb-6 group-hover:bg-[#99302A] transition-colors">
                  <BookOpen className="w-7 h-7 text-[#99302A] group-hover:text-[#E3E1DB]" />
                </div>
                <h3 className="text-[#1a1a1a] mb-3 text-xl font-bold font-serif">Thesis / Dissertation</h3>
                <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">Submit your completed thesis or dissertation along with abstract and supporting materials.</p>
              </button>

              {/* Option 2: Publication */}
              <button onClick={() => setSubmissionType('publication')} className="group bg-white p-10 border border-[#1a1a1a]/10 hover:border-[#99302A] hover:shadow-xl transition-all text-left rounded-sm flex flex-col items-start">
                <div className="w-14 h-14 rounded-full bg-[#99302A]/10 flex items-center justify-center mb-6 group-hover:bg-[#99302A] transition-colors">
                  <FileText className="w-7 h-7 text-[#99302A] group-hover:text-[#E3E1DB]" />
                </div>
                <h3 className="text-[#1a1a1a] mb-3 text-xl font-bold font-serif">Publication / Paper</h3>
                <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">Share your journal articles, conference papers, or book chapters for the repository.</p>
              </button>

              {/* Option 3: Dataset */}
              <button onClick={() => setSubmissionType('dataset')} className="group bg-white p-10 border border-[#1a1a1a]/10 hover:border-[#99302A] hover:shadow-xl transition-all text-left rounded-sm flex flex-col items-start">
                <div className="w-14 h-14 rounded-full bg-[#99302A]/10 flex items-center justify-center mb-6 group-hover:bg-[#99302A] transition-colors">
                  <Database className="w-7 h-7 text-[#99302A] group-hover:text-[#E3E1DB]" />
                </div>
                <h3 className="text-[#1a1a1a] mb-3 text-xl font-bold font-serif">Field Data / Dataset</h3>
                <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">Contribute primary research data, interviews, photos, or raw field notes.</p>
              </button>

              {/* Option 4: Patent */}
              <button onClick={() => setSubmissionType('patent')} className="group bg-white p-10 border border-[#1a1a1a]/10 hover:border-[#99302A] hover:shadow-xl transition-all text-left rounded-sm flex flex-col items-start">
                <div className="w-14 h-14 rounded-full bg-[#99302A]/10 flex items-center justify-center mb-6 group-hover:bg-[#99302A] transition-colors">
                  <Award className="w-7 h-7 text-[#99302A] group-hover:text-[#E3E1DB]" />
                </div>
                <h3 className="text-[#1a1a1a] mb-3 text-xl font-bold font-serif">Patent / Innovation</h3>
                <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">Submit documentation of research methodologies, innovations, or patents.</p>
              </button>

            </div>
          </div>
        </section>
      )}

      {/* STEP 2: THE FORM (Only show if type is selected) */}
      {submissionType && (
        <section className="max-w-3xl mx-auto px-4 py-10">
          {/* Back Button */}
          <button
            onClick={() => setSubmissionType('')}
            className="mb-6 flex items-center gap-2 text-sm text-[#99302A] hover:underline font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to selection
          </button>

          <div className="bg-white p-10 md:p-12 shadow-sm border border-[#1a1a1a]/5 rounded-sm">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Form Section: Student Info */}
              <div>
                <h3 className="text-sm font-bold text-[#1a1a1a] mb-6">Student Information</h3>
                <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1a1a1a]/70">Full Name *</label>
                    <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} required 
                      className="w-full px-3 py-2.5 bg-white border border-[#1a1a1a]/10 focus:border-[#99302A] focus:outline-none rounded-sm text-sm" 
                      placeholder="Enter your full name" 
                    />
                  </div>
                  {/* ID Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1a1a1a]/70">Student ID *</label>
                    <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} required 
                      className="w-full px-3 py-2.5 bg-white border border-[#1a1a1a]/10 focus:border-[#99302A] focus:outline-none rounded-sm text-sm" 
                      placeholder="e.g. PhD2019001" 
                    />
                  </div>
                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1a1a1a]/70">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required 
                      className="w-full px-3 py-2.5 bg-white border border-[#1a1a1a]/10 focus:border-[#99302A] focus:outline-none rounded-sm text-sm" 
                      placeholder="you.email@university.edu" 
                    />
                  </div>
                  {/* Program Select */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1a1a1a]/70">Program *</label>
                    <select name="program" value={formData.program} onChange={handleChange} 
                      className="w-full px-3 py-2.5 bg-white border border-[#1a1a1a]/10 focus:border-[#99302A] focus:outline-none rounded-sm text-sm"
                    >
                      <option value="PhD">PhD</option>
                      <option value="MA">MA</option>
                      <option value="MPhil">MPhil</option>
                    </select>
                  </div>
                  {/* Batch Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1a1a1a]/70">Batch *</label>
                    <input type="text" name="batch" value={formData.batch} onChange={handleChange} required 
                      className="w-full px-3 py-2.5 bg-white border border-[#1a1a1a]/10 focus:border-[#99302A] focus:outline-none rounded-sm text-sm" 
                      placeholder="e.g., 2019-2024" 
                    />
                  </div>
                  {/* Mentor Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1a1a1a]/70">Research Mentor/Advisor *</label>
                    <input type="text" name="mentor" value={formData.mentor} onChange={handleChange} required 
                      className="w-full px-3 py-2.5 bg-white border border-[#1a1a1a]/10 focus:border-[#99302A] focus:outline-none rounded-sm text-sm" 
                      placeholder="Dr. Name" 
                    />
                  </div>
                </div>
              </div>

              {/* Form Section: Research Details */}
              <div>
                <h3 className="text-sm font-bold text-[#1a1a1a] mb-6">Research Details</h3>
                <div className="space-y-6">
                  {/* Title Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1a1a1a]/70">Title *</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required 
                      className="w-full px-3 py-2.5 bg-white border border-[#1a1a1a]/10 focus:border-[#99302A] focus:outline-none rounded-sm text-sm" 
                      placeholder="Full title of your research work" 
                    />
                  </div>
                  {/* Abstract Textarea */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1a1a1a]/70">Abstract *</label>
                    <textarea name="abstract" value={formData.abstract} onChange={handleChange} required rows={5} 
                      className="w-full px-3 py-2.5 bg-white border border-[#1a1a1a]/10 focus:border-[#99302A] focus:outline-none rounded-sm text-sm resize-none" 
                      placeholder="Provide a comprehensive abstract (200-300 words)" 
                    />
                  </div>
                  
                  {/* Community & Type */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1a1a1a]/70">Community Studied *</label>
                      <input type="text" name="community" value={formData.community} onChange={handleChange} required 
                        className="w-full px-3 py-2.5 bg-white border border-[#1a1a1a]/10 focus:border-[#99302A] focus:outline-none rounded-sm text-sm" 
                        placeholder="e.g. Van Gujjar" 
                      />
                    </div>
                    {/* Read-only field showing current submission type */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1a1a1a]/70">Research Type *</label>
                      <input type="text" value={submissionType === 'dataset' ? 'Field Data' : submissionType} disabled
                        className="w-full px-3 py-2.5 bg-[#FAFAF9] border border-[#1a1a1a]/10 rounded-sm text-sm capitalize text-[#1a1a1a]/60 cursor-not-allowed" 
                      />
                    </div>
                  </div>

                  {/* Conditional Input: Keywords (Only for Dataset) */}
                  {submissionType === 'dataset' && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1a1a1a]/70">Keywords (Comma Separated) *</label>
                      <input type="text" name="keywords" value={formData.keywords} onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-white border border-[#1a1a1a]/10 focus:border-[#99302A] focus:outline-none rounded-sm text-sm" 
                        placeholder="e.g. nomadic communities, craft heritage" 
                      />
                    </div>
                  )}

                  {/* Conditional Input: Organization (Only for Patent) */}
                  {submissionType === 'patent' && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1a1a1a]/70">Organization (if applicable)</label>
                      <input type="text" name="organization" value={formData.organization} onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-white border border-[#1a1a1a]/10 focus:border-[#99302A] focus:outline-none rounded-sm text-sm" 
                        placeholder="University or Research Body" 
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Form Section: File Uploads */}
              <div>
                <h3 className="text-sm font-bold text-[#1a1a1a] mb-6">Upload Files</h3>
                
                {/* 1. Main File Upload Area */}
                <div className="border border-[#1a1a1a]/10 p-10 text-center bg-white rounded-sm mb-4">
                  {file ? (
                    // State: File Selected
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-10 h-10 text-green-600 mb-3" />
                      <p className="text-sm font-medium text-[#1a1a1a]">{file.name}</p>
                      <p className="text-xs text-[#1a1a1a]/50 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }} className="mt-4 text-xs text-[#99302A] hover:underline font-bold uppercase tracking-wider">
                        Remove File
                      </button>
                    </div>
                  ) : (
                    // State: No File Selected
                    <div className="flex flex-col items-center">
                      <Upload className="w-8 h-8 text-[#1a1a1a]/80 mb-3" />
                      <p className="text-sm font-bold text-[#1a1a1a] mb-1">
                        {getUploadLabel()}
                      </p>
                      <p className="text-xs text-[#1a1a1a]/50 mt-1 mb-4">Max file size: 50MB</p>
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-2 bg-[#99302A] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#7a2621] transition-colors"
                      >
                        Choose File
                      </button>
                      <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.doc,.docx,.zip" onChange={handleFileChange} />
                    </div>
                  )}
                </div>

                {/* 2. Ethics Upload Placeholder */}
                <div className="border border-[#1a1a1a]/10 p-10 text-center bg-white rounded-sm">
                    <div className="flex flex-col items-center">
                      <FileText className="w-8 h-8 text-[#1a1a1a]/80 mb-3" />
                      <p className="text-sm font-bold text-[#1a1a1a] mb-1">Upload Ethics Approval & Consent Forms *</p>
                      <p className="text-[10px] text-[#1a1a1a]/50 mt-1 mb-4">Merge with your main document if possible, or ensure it is included.</p>
                      <button type="button" className="px-6 py-2 bg-[#99302A] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#7a2621] transition-colors">
                        Choose Files
                      </button>
                    </div>
                </div>
              </div>

              {/* Declaration Checkbox */}
              <div className="bg-[#FAFAF9] p-4 flex gap-3 items-start border border-[#1a1a1a]/5 rounded-sm">
                <input 
                  type="checkbox" 
                  id="declaration" 
                  checked={agreed} 
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 accent-[#99302A] cursor-pointer" 
                />
                <label htmlFor="declaration" className="text-xs text-[#1a1a1a]/70 leading-relaxed cursor-pointer select-none">
                  I declare that this research was conducted in accordance with ethical guidelines. All participants provided informed consent, and the data is accurate to the best of my knowledge. I understand that this submission will undergo faculty review before publication.
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="px-8 py-3 bg-[#99302A] text-white hover:bg-[#7a2621] transition-colors font-bold tracking-wider uppercase text-xs rounded-sm disabled:opacity-50 min-w-[160px]"
                >
                  {isLoading ? "Submitting..." : "Submit for Review"}
                </button>
                <button 
                  type="button"
                  onClick={() => setSubmissionType('')}
                  className="px-8 py-3 bg-white border border-[#1a1a1a]/20 text-[#1a1a1a] hover:bg-gray-50 transition-colors font-bold tracking-wider uppercase text-xs rounded-sm"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>

          {/* Submission Guidelines Footer */}
          <div className="bg-[#Eae2cc] p-6 mt-8 rounded-sm border border-[#d6cfbb]">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-[#99302A]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#99302A]">Submission Guidelines</h4>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#1a1a1a]/80 leading-relaxed font-medium">
              <li>Ensure all personal identifiers are properly anonymized where required.</li>
              <li>Include complete metadata (keywords, abstract, community details).</li>
              <li>Ethics approval documentation is mandatory for all submissions.</li>
              <li>Large datasets (&gt;50MB) may require special upload arrangements.</li>
              <li>Faculty review typically takes 3-5 business days.</li>
            </ul>
          </div>

        </section>
      )}
    </div>
  );
}