"use client";

import React, { useState } from 'react';
import { Upload, FileVideo, Image as ImageIcon, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import api from '@/lib/api';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function UploadPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    category: '', // We'll split this by comma before sending
    studentName: 'Admin Team', // Default or dynamic
  });

  // File State
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  // Handlers
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

    // Validation
    if (!thumbnail || !video) {
      setError("Please select both a thumbnail and a video file.");
      return;
    }

    try {
      setLoading(true);

      // 1. Create FormData object
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('duration', formData.duration);
      data.append('category', formData.category);
      data.append('studentName', formData.studentName);
      data.append('thumbnail', thumbnail);
      data.append('video', video);

      // 2. Send to Backend
      // Content-Type header is handled automatically by Axios when passing FormData
      await api.post('/docs/upload', data);

      // 3. Reset Form on Success
      setSuccess(true);
      setFormData({ title: '', description: '', duration: '', category: '', studentName: 'Admin Team' });
      setThumbnail(null);
      setVideo(null);
      
      // Reset file inputs visually
      (document.getElementById('thumbInput') as HTMLInputElement).value = '';
      (document.getElementById('videoInput') as HTMLInputElement).value = '';

    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white border border-[#1a1a1a]/10 rounded-lg shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1a1a1a] p-8 text-center">
          <h1 className="text-3xl font-bold font-serif text-[#E3E1DB] mb-2">Upload Documentary</h1>
          <p className="text-[#E3E1DB]/70">Add new visual stories to the archive</p>
        </div>

        <div className="p-8">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-50 text-green-900 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>Documentary uploaded successfully! It is now pending approval.</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title & Duration Row */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-[#1a1a1a] mb-2">Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#99302A]"
                  placeholder="e.g., The Iron Forgers"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-2">Duration</label>
                <input
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#99302A]"
                  placeholder="e.g., 14:20"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-[#1a1a1a] mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#99302A]"
                placeholder="A short synopsis of the documentary..."
              />
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-bold text-[#1a1a1a] mb-2">Categories (comma separated)</label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#99302A]"
                placeholder="craft, nomadic, heritage"
              />
            </div>

            {/* File Upload Area */}
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              
              {/* Thumbnail Input */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative">
                <input
                  id="thumbInput"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'thumbnail')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center">
                  <ImageIcon className={`w-10 h-10 mb-2 ${thumbnail ? 'text-green-600' : 'text-gray-400'}`} />
                  <span className="text-sm font-medium text-gray-700">
                    {thumbnail ? thumbnail.name : "Upload Thumbnail"}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">JPG, PNG (Max 5MB)</span>
                </div>
              </div>

              {/* Video Input */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative">
                <input
                  id="videoInput"
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, 'video')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center">
                  <FileVideo className={`w-10 h-10 mb-2 ${video ? 'text-green-600' : 'text-gray-400'}`} />
                  <span className="text-sm font-medium text-gray-700">
                    {video ? video.name : "Upload Video"}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">MP4, WebM (Max 50MB)</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#99302A] hover:bg-[#7a2621] text-white font-bold py-3 px-4 rounded-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" /> Submit Documentary
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}