"use client";

import { useState } from "react";
import { galleryData } from "@/data/knowvy-data";
import { getOptimizedMediaUrl } from "@/lib/cloudinary";
import { Camera, X, Maximize2 } from "lucide-react";

export default function GallerySection() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section className="py-24 bg-transparent border-t border-slate-200 relative overflow-hidden text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-600 font-semibold">
              <Camera className="w-3.5 h-3.5" />
              On-Ground Moments
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
              Event <span className="gradient-text-blue">Gallery.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl">
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
                className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                {/* Image Frame */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={optimizedUrl}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] font-mono uppercase text-blue-600 font-bold shadow-xs">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover Maximize Icon */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 shadow-xs">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Bottom Information (High-Contrast Light Theme) */}
                <div className="p-4 space-y-1 bg-white border-t border-slate-100">
                  <h4 className="text-base font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-1">
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
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <button
            onClick={() => setActiveItem(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors z-10 shadow-lg cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl max-h-[75vh] bg-white">
              <img
                src={getOptimizedMediaUrl(activeItem.url, { width: 1400 })}
                alt={activeItem.title}
                className="w-full h-full object-contain max-h-[75vh]"
              />
            </div>
            <div className="mt-4 text-center space-y-1 bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl border border-slate-200 shadow-lg">
              <span className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold">
                {activeItem.category}
              </span>
              <h3 className="text-xl font-display font-bold text-slate-900">
                {activeItem.title}
              </h3>
              <p className="text-sm text-slate-600 max-w-lg">
                {activeItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
