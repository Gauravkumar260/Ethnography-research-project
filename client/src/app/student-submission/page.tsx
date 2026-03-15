"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Upload, FileText, Database, BookOpen, Award,
  CheckCircle, ArrowLeft, Image as ImageIcon, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api';
import { useTranslations } from 'next-intl';

type SubmissionType = 'thesis' | 'publication' | 'dataset' | 'patent' | '';

export default function SubmissionPage() {
  const t = useTranslations('Submission');

  const [submissionType, setSubmissionType] = useState<SubmissionType>('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [mainFile, setMainFile] = useState<File | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [ethicsFile, setEthicsFile] = useState<File | null>(null);

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
    keywords: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mainFile) {
      toast.error(t('errorUploadDoc'));
      return;
    }
    if (!ethicsFile) {
      toast.error(t('errorUploadEthics'));
      return;
    }
    if (!agreed) {
      toast.error(t('errorAgree'));
      return;
    }

    setIsLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      data.append('type', submissionType);
      data.append('mainFile', mainFile);
      if (mediaFile) data.append('mediaFile', mediaFile);
      data.append('ethicsFile', ethicsFile);

      await apiFetch('/research/submit', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': undefined as unknown as string
        }
      });

      setSubmitted(true);
      toast.success(t('successToast'));
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error: unknown) {
      const message = error instanceof Error
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? (error as any).response?.data?.message || error.message
        : t('errorToast');
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const getPageTitle = () => {
    switch (submissionType) {
      case 'thesis': return t('submitThesis');
      case 'publication': return t('submitPublication');
      case 'dataset': return t('submitDataset');
      case 'patent': return t('submitPatent');
      default: return t('submitResearch');
    }
  };

  const getMainFileLabel = () => {
    switch (submissionType) {
      case 'thesis': return t('uploadThesisPdf');
      case 'publication': return t('uploadPublicationPdf');
      case 'dataset': return t('uploadDatasetZip');
      case 'patent': return t('uploadPatentDoc');
      default: return t('uploadDocument');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#Eae9e5] font-sans px-4">
        <div className="max-w-xl w-full bg-white p-12 shadow-md rounded-sm border border-[#1a1a1a]/5 text-center">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-700" />
          </div>
          <h2 className="text-[#1a1a1a] mb-4 text-3xl font-serif font-bold">{t('successTitle')}</h2>
          <p className="text-[#1a1a1a]/70 mb-8 leading-relaxed">
            {t('successDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setSubmitted(false); setSubmissionType(''); setMainFile(null); setMediaFile(null); setEthicsFile(null); setAgreed(false);
                setFormData({ studentName: '', studentId: '', email: '', program: 'PhD', batch: '', mentor: '', title: '', abstract: '', community: '', keywords: '' });
              }}
              className="px-8 py-3 bg-[#99302A] text-white hover:bg-[#7a2621] transition-colors text-xs font-bold uppercase tracking-wider rounded-sm"
            >
              {t('submitAnother')}
            </button>
            <Link href="/research" className="px-8 py-3 bg-white border border-[#1a1a1a]/20 text-[#1a1a1a] hover:bg-[#FAFAF9] transition-colors text-xs font-bold uppercase tracking-wider rounded-sm">
              {t('backToLibrary')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#Eae9e5] text-[#1a1a1a] font-sans">

      {!submissionType && (
        <>
          <section className="py-20 px-4 bg-[#1a1a1a] text-[#E3E1DB]">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="mb-4 text-4xl font-bold font-serif">{t('title')}</h1>
              <p className="text-[#E3E1DB]/80 max-w-3xl mx-auto text-lg font-light">
                {t('subtitle')}
              </p>
            </div>
          </section>

          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-[#1a1a1a] mb-12 text-center text-2xl font-serif font-bold">{t('selectPrompt')}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { id: 'thesis', icon: BookOpen, title: t('thesisTitle'), desc: t('thesisDesc') },
                  { id: 'publication', icon: FileText, title: t('publicationTitle'), desc: t('publicationDesc') },
                  { id: 'dataset', icon: Database, title: t('datasetTitle'), desc: t('datasetDesc') },
                  { id: 'patent', icon: Award, title: t('patentTitle'), desc: t('patentDesc') }
                ].map((item) => (
                  <button key={item.id} onClick={() => setSubmissionType(item.id as SubmissionType)} className="group bg-white p-10 border border-[#1a1a1a]/10 hover:border-[#99302A] hover:shadow-xl transition-all text-left rounded-sm flex flex-col items-start">
                    <div className="w-14 h-14 rounded-full bg-[#99302A]/10 flex items-center justify-center mb-6 group-hover:bg-[#99302A] transition-colors">
                      <item.icon className="w-7 h-7 text-[#99302A] group-hover:text-[#E3E1DB]" />
                    </div>
                    <h3 className="text-[#1a1a1a] mb-3 text-xl font-bold font-serif">{item.title}</h3>
                    <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {submissionType && (
        <section className="max-w-4xl mx-auto px-4 py-10">
          <button
            onClick={() => setSubmissionType('')}
            className="mb-8 flex items-center gap-2 text-sm text-[#99302A] hover:underline font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t('backToSelection')}
          </button>

          <div className="bg-white p-10 md:p-14 shadow-sm border border-[#1a1a1a]/5 rounded-sm">
            <form onSubmit={handleSubmit} className="space-y-10">

              <h2 className="text-xl font-serif font-bold text-[#1a1a1a] border-b border-[#1a1a1a]/10 pb-4">
                {getPageTitle()}
              </h2>

              {/* Student Information */}
              <div>
                <h3 className="text-sm font-bold text-[#1a1a1a] mb-6 uppercase tracking-wider">{t('studentInfo')}</h3>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1a1a1a]/70">{t('fullName')} *</label>
                    <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-white border border-[#E5E5E5] focus:border-[#99302A] focus:outline-none rounded-sm text-sm transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1a1a1a]/70">{t('studentId')} *</label>
                    <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-white border border-[#E5E5E5] focus:border-[#99302A] focus:outline-none rounded-sm text-sm transition-colors"
                      placeholder="e.g., PhD2018001"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1a1a1a]/70">{t('email')} *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-white border border-[#E5E5E5] focus:border-[#99302A] focus:outline-none rounded-sm text-sm transition-colors"
                      placeholder="your.email@university.edu"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1a1a1a]/70">{t('program')} *</label>
                    <select name="program" value={formData.program} onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-[#E5E5E5] focus:border-[#99302A] focus:outline-none rounded-sm text-sm transition-colors"
                    >
                      <option value="PhD">PhD</option>
                      <option value="MA">MA</option>
                      <option value="MPhil">MPhil</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1a1a1a]/70">{t('batch')} *</label>
                    <input type="text" name="batch" value={formData.batch} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-white border border-[#E5E5E5] focus:border-[#99302A] focus:outline-none rounded-sm text-sm transition-colors"
                      placeholder="e.g., 2019-2024"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1a1a1a]/70">{t('mentor')} *</label>
                    <input type="text" name="mentor" value={formData.mentor} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-white border border-[#E5E5E5] focus:border-[#99302A] focus:outline-none rounded-sm text-sm transition-colors"
                      placeholder="Dr. Name"
                    />
                  </div>
                </div>
              </div>

              {/* Research Details */}
              <div>
                <h3 className="text-sm font-bold text-[#1a1a1a] mb-6 uppercase tracking-wider">{t('researchDetails')}</h3>
                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1a1a1a]/70">{t('researchTitle')} *</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-white border border-[#E5E5E5] focus:border-[#99302A] focus:outline-none rounded-sm text-sm transition-colors"
                      placeholder="Full title of your research work"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1a1a1a]/70">{t('abstract')} *</label>
                    <textarea name="abstract" value={formData.abstract} onChange={handleChange} required rows={5}
                      className="w-full px-4 py-3 bg-white border border-[#E5E5E5] focus:border-[#99302A] focus:outline-none rounded-sm text-sm resize-none transition-colors"
                      placeholder={t('abstractPlaceholder')}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1a1a1a]/70">{t('communityStudied')} *</label>
                      <input type="text" name="community" value={formData.community} onChange={handleChange} required
                        className="w-full px-4 py-3 bg-white border border-[#E5E5E5] focus:border-[#99302A] focus:outline-none rounded-sm text-sm transition-colors"
                        placeholder="e.g. Van Gujjar"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1a1a1a]/70">{t('researchType')} *</label>
                      <input type="text" value={submissionType === 'dataset' ? 'Field Data' : submissionType} disabled
                        className="w-full px-4 py-3 bg-[#FAFAF9] border border-[#E5E5E5] rounded-sm text-sm capitalize text-[#1a1a1a]/60 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1a1a1a]/70">{t('keywords')} *</label>
                    <input type="text" name="keywords" value={formData.keywords} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-white border border-[#E5E5E5] focus:border-[#99302A] focus:outline-none rounded-sm text-sm transition-colors"
                      placeholder="e.g., nomadic communities, craft heritage, cultural identity"
                    />
                  </div>
                </div>
              </div>

              {/* Upload Files */}
              <div>
                <h3 className="text-sm font-bold text-[#1a1a1a] mb-6 uppercase tracking-wider">{t('uploadFiles')}</h3>
                <div className="space-y-4">

                  <div className="border border-[#E5E5E5] p-8 text-center bg-white rounded-sm hover:shadow-sm transition-shadow">
                    <div className="flex flex-col items-center">
                      {mainFile ? (
                        <>
                          <CheckCircle className="w-10 h-10 text-green-600 mb-2" />
                          <p className="text-sm font-bold text-[#1a1a1a]">{mainFile.name}</p>
                          <button type="button" onClick={() => setMainFile(null)} className="mt-3 text-xs text-[#99302A] hover:underline font-bold uppercase tracking-wider">{t('remove')}</button>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-[#1a1a1a]/80 mb-3" />
                          <p className="text-sm font-bold text-[#1a1a1a] mb-1">{getMainFileLabel()}</p>
                          <p className="text-[10px] text-[#1a1a1a]/50 uppercase tracking-wide mb-5">{t('maxFileSize')}</p>
                          <label className="px-8 py-3 bg-[#99302A] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#7a2621] transition-colors cursor-pointer">
                            {t('chooseFile')}
                            <input type="file" className="hidden" onChange={(e) => handleFileChange(e, setMainFile)} />
                          </label>
                        </>
                      )}
                    </div>
                  </div>

                  {submissionType === 'dataset' && (
                    <div className="border border-[#E5E5E5] p-8 text-center bg-white rounded-sm hover:shadow-sm transition-shadow">
                      <div className="flex flex-col items-center">
                        {mediaFile ? (
                          <>
                            <CheckCircle className="w-10 h-10 text-green-600 mb-2" />
                            <p className="text-sm font-bold text-[#1a1a1a]">{mediaFile.name}</p>
                            <button type="button" onClick={() => setMediaFile(null)} className="mt-3 text-xs text-[#99302A] hover:underline font-bold uppercase tracking-wider">{t('remove')}</button>
                          </>
                        ) : (
                          <>
                            <ImageIcon className="w-8 h-8 text-[#1a1a1a]/80 mb-3" />
                            <p className="text-sm font-bold text-[#1a1a1a] mb-1">{t('supportingMedia')}</p>
                            <p className="text-[10px] text-[#1a1a1a]/50 uppercase tracking-wide mb-5">{t('supportingMediaDesc')}</p>
                            <label className="px-8 py-3 bg-white border border-[#1a1a1a]/20 text-[#1a1a1a] text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#FAFAF9] transition-colors cursor-pointer">
                              {t('chooseFiles')}
                              <input type="file" className="hidden" onChange={(e) => handleFileChange(e, setMediaFile)} />
                            </label>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="border border-[#E5E5E5] p-8 text-center bg-white rounded-sm hover:shadow-sm transition-shadow">
                    <div className="flex flex-col items-center">
                      {ethicsFile ? (
                        <>
                          <CheckCircle className="w-10 h-10 text-green-600 mb-2" />
                          <p className="text-sm font-bold text-[#1a1a1a]">{ethicsFile.name}</p>
                          <button type="button" onClick={() => setEthicsFile(null)} className="mt-3 text-xs text-[#99302A] hover:underline font-bold uppercase tracking-wider">{t('remove')}</button>
                        </>
                      ) : (
                        <>
                          <FileText className="w-8 h-8 text-[#1a1a1a]/80 mb-3" />
                          <p className="text-sm font-bold text-[#1a1a1a] mb-1">{t('ethicsUpload')} *</p>
                          <p className="text-[10px] text-[#1a1a1a]/50 uppercase tracking-wide mb-5">{t('ethicsUploadDesc')}</p>
                          <label className="px-8 py-3 bg-[#99302A] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#7a2621] transition-colors cursor-pointer">
                            {t('chooseFiles')}
                            <input type="file" className="hidden" onChange={(e) => handleFileChange(e, setEthicsFile)} />
                          </label>
                        </>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Declaration */}
              <div className="bg-[#F5F5F4] p-6 flex gap-3 items-start border border-[#E5E5E5] rounded-sm">
                <input
                  type="checkbox" id="declaration" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 accent-[#99302A] cursor-pointer w-4 h-4"
                />
                <label htmlFor="declaration" className="text-xs text-[#1a1a1a]/80 leading-relaxed cursor-pointer select-none">
                  {t('declaration')}
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-2">
                <button
                  type="submit" disabled={isLoading}
                  className="px-10 py-3.5 bg-[#99302A] text-white hover:bg-[#7a2621] transition-colors font-bold tracking-wider uppercase text-xs rounded-sm disabled:opacity-50 min-w-[180px]"
                >
                  {isLoading ? t('submitting') : t('submitForReview')}
                </button>
                <button
                  type="button" onClick={() => setSubmissionType('')}
                  className="px-10 py-3.5 bg-white border border-[#E5E5E5] text-[#1a1a1a] hover:bg-gray-50 transition-colors font-bold tracking-wider uppercase text-xs rounded-sm"
                >
                  {t('cancel')}
                </button>
              </div>

            </form>
          </div>

          {/* Guidelines */}
          <div className="bg-[#Eae2cc] p-8 mt-8 rounded-sm border border-[#d6cfbb]">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-[#99302A]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a]">{t('guidelinesTitle')}</h4>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-xs text-[#1a1a1a]/80 leading-relaxed font-medium">
              <li>{t('guideline1')}</li>
              <li>{t('guideline2')}</li>
              <li>{t('guideline3')}</li>
              <li>{t('guideline4')}</li>
              <li>{t('guideline5')}</li>
            </ul>
          </div>

        </section>
      )}
    </div>
  );
}