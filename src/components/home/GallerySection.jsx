"use client";

import { useState } from "react";
import { galleryData } from "@/data/knowvy-data";
import { getOptimizedMediaUrl } from "@/lib/cloudinary";
import { Camera, X, Maximize2 } from "lucide-react";

export default function GallerySection() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section className="py-24 bg-[#0D1118] border-t border-[#1C2430] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D8DFF]/10 border border-[#4D8DFF]/30 text-xs font-mono text-[#4D8DFF]">
              <Camera className="w-3.5 h-3.5" />
              On-Ground Moments
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Event <span className="gradient-text-blue">Gallery.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#8B95A5] max-w-xl">
              Real moments from Hack-Knowvy, Cloud Sprints with Azure Tech Group Bhopal, and student workshops. Optimized via Cloudinary.
            </p>
          </div>
        </div>

        {/* Dynamic Masonry-Style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryData.map((item) => {
            const optimizedUrl = getOptimizedMediaUrl(item.url, {
              width: 800,
              quality: "auto",
              format: "auto",
            });

            return (
              <div
                key={item.id}
                data-cursor="open"
                onClick={() => setActiveItem(item)}
                className="group relative rounded-2xl overflow-hidden bg-[#111722] border border-[#1C2430] hover:border-[#4D8DFF]/50 transition-all duration-300 cursor-pointer h-72"
              >
                <img
                  src={optimizedUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-85 group-hover:opacity-100"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090D] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase text-[#4D8DFF] font-bold">
                    {item.category}
                  </span>
                </div>

                {/* Hover Maximize Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom Information */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-base font-display font-bold text-white group-hover:text-[#4D8DFF] transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#8B95A5] line-clamp-1 mt-0.5">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <button
            onClick={() => setActiveItem(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-[#111722] border border-[#1C2430] text-white hover:bg-[#161F2E] transition-colors z-10"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#1C2430] shadow-2xl max-h-[75vh]">
              <img
                src={getOptimizedMediaUrl(activeItem.url, { width: 1400 })}
                alt={activeItem.title}
                className="w-full h-full object-contain max-h-[75vh]"
              />
            </div>
            <div className="mt-4 text-center space-y-1">
              <span className="text-xs font-mono text-[#4D8DFF] uppercase tracking-wider">
                {activeItem.category}
              </span>
              <h3 className="text-xl font-display font-bold text-white">
                {activeItem.title}
              </h3>
              <p className="text-sm text-[#8B95A5] max-w-lg">
                {activeItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
