"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface MediaGalleryProps {
  images: string[];
}

export default function MediaGallery({ images }: MediaGalleryProps) {
  // We store the INDEX of the selected image, not the string. 
  // This makes Next/Prev logic much easier.
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // 1. Helper: Dynamic URL Handling
  const getUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    
    // Uses your environment variable
    const baseUrl = process.env.NEXT_PUBLIC_API_URL 
      ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') 
      : 'http://localhost:5000';
      
    return `${baseUrl}/${path.replace(/\\/g, "/")}`;
  };

  // 2. Navigation Handlers
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent closing the modal
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
  };

  // 3. Keyboard Support (Escape to close, Arrows to navigate)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedIndex === null) return;
    
    if (e.key === 'Escape') setSelectedIndex(null);
    if (e.key === 'ArrowLeft') setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
    if (e.key === 'ArrowRight') setSelectedIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
  }, [selectedIndex, images.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!images || images.length === 0) return null;

  return (
    <div className="py-8">
      <h3 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-6 border-b border-[#1a1a1a]/10 pb-4">
        Visual Archive
      </h3>
      
      {/* GRID LAYOUT */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="aspect-square relative overflow-hidden rounded-sm cursor-pointer group bg-gray-100"
            onClick={() => setSelectedIndex(idx)}
          >
            <img 
              src={getUrl(img)} 
              alt={`Gallery ${idx}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedIndex(null)} // Click outside to close
        >
          {/* Close Button */}
          <button 
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
          >
            <X className="w-10 h-10" />
          </button>

          {/* Previous Button */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* Main Image */}
          <div 
            className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
          >
            <img 
              src={getUrl(images[selectedIndex])}
              alt="Full view" 
              className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm"
            />
            
            {/* Counter */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium tracking-widest">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>

          {/* Next Button */}
          <button 
            onClick={handleNext}
            className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </div>
  );
}