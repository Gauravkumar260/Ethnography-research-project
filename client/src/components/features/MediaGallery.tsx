"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface MediaGalleryProps {
  images: string[];
}

export default function MediaGallery({ images }: MediaGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="py-8">
      <h3 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-6">Visual Archive</h3>
      
      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="aspect-square relative overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => setSelectedImage(img)}
          >
            <img 
              src={img.startsWith('http') ? img : `http://localhost:5000/${img}`} 
              alt={`Gallery ${idx}`} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage.startsWith('http') ? selectedImage : `http://localhost:5000/${selectedImage}`}
            alt="Full view" 
            className="max-w-full max-h-[90vh] object-contain rounded-sm"
          />
        </div>
      )}
    </div>
  );
}