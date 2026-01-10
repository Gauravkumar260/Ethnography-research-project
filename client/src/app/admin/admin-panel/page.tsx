"use client";

import React, { useState, useEffect } from 'react';
import { Upload, FileVideo, Image as ImageIcon, Loader2, CheckCircle, AlertCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // <--- Import Router
import api from '@/lib/api';

export default function UploadPage() {
  const router = useRouter(); // <--- Init Router
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false); // <--- Security State
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    category: '', 
    studentName: 'Admin Team',
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  // --- 1. SECURITY CHECK ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirect if no token
    } else {
      setIsAuthorized(true); // Allow if token exists
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'video') => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'thumbnail') setThumbnail(e.target.files[0]);
      if (type === 'video') setVideo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!thumbnail || !video) {
      setError("Please select both a thumbnail and a video file.");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('duration', formData.duration);
      data.append('category', formData.category);
      data.append('studentName', formData.studentName);
      data.append('thumbnail', thumbnail);
      data.append('video', video);

      await api.post('/docs/upload', data);

      setSuccess(true);
      setFormData({ title: '', description: '', duration: '', category: '', studentName: 'Admin Team' });
      setThumbnail(null);
      setVideo(null);
      
      (document.getElementById('thumbInput') as HTMLInputElement).value = '';
      (document.getElementById('videoInput') as HTMLInputElement).value = '';

    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- 2. RENDER SECURITY LOADER ---
  if (!isAuthorized) {
    return <div className="h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-[#99302A]" /></div>;
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin/admin-panel" className="flex items-center gap-2 text-[#1a1a1a]/60 hover:text-[#99302A] mb-6 transition-colors font-medium">
            <ChevronLeft className="w-4 h-4" /> Back to Admin Panel
        </Link>

        <div className="bg-white border border-[#1a1a1a]/10 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-[#1a1a1a] p-8 text-center">
            <h1 className="text-3xl font-bold font-serif text-[#E3E1DB] mb-2">Upload Documentary</h1>
            <p className="text-[#E3E1DB]/70">Add new visual stories to the archive</p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 bg-red-50 text-red-900 border border-red-200 p-4 rounded-md flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4" /> {error}
              </div>
            )}

            {success && (
              <div className="mb-6 bg-green-50 text-green-900 border border-green-200 p-4 rounded-md flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" /> Documentary uploaded successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-[#1a1a1a] mb-2">Title</label>
                  <input name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#99302A]" placeholder="e.g., The Iron Forgers" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1a1a1a] mb-2">Duration</label>
                  <input name="duration" value={formData.duration} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#99302A]" placeholder="e.g., 14:20" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-2">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#99302A]" placeholder="A short synopsis..." />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-2">Categories (comma separated)</label>
                <input name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#99302A]" placeholder="craft, nomadic, heritage" />
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative">
                  <input id="thumbInput" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'thumbnail')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="flex flex-col items-center">
                    <ImageIcon className={`w-10 h-10 mb-2 ${thumbnail ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className="text-sm font-medium text-gray-700">{thumbnail ? thumbnail.name : "Upload Thumbnail"}</span>
                    <span className="text-xs text-gray-400 mt-1">JPG, PNG (Max 5MB)</span>
                  </div>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative">
                  <input id="videoInput" type="file" accept="video/*" onChange={(e) => handleFileChange(e, 'video')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="flex flex-col items-center">
                    <FileVideo className={`w-10 h-10 mb-2 ${video ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className="text-sm font-medium text-gray-700">{video ? video.name : "Upload Video"}</span>
                    <span className="text-xs text-gray-400 mt-1">MP4, WebM (Max 50MB)</span>
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-[#99302A] hover:bg-[#7a2621] text-white font-bold py-3 px-4 rounded-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-8">
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Uploading...</> : <><Upload className="w-5 h-5" /> Submit Documentary</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}