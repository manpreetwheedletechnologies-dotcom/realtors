import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

/**
 * LandPlotCard
 * - Cycles through photos per plot using pure CSS crossfade (no JS-driven animation)
 * - Ken-Burns zoom done via CSS keyframes (GPU composited, doesn't block scroll)
 * - Auto-advance pauses on hover
 * - Clickable dot indicators
 * - Wishlist heart with CSS pulse instead of JS animation
 */
export default function LandPlotCard({ land, index = 0 }) {
  const images = land.images && land.images.length > 0 ? land.images : [land.image];
  const [activeImg, setActiveImg] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (images.length <= 1 || isHovered) return;
    timerRef.current = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % images.length);
    }, 3800);
    return () => clearInterval(timerRef.current);
  }, [images.length, isHovered]);

  return (
    <div
      className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2.5 transition-all duration-300 border border-gray-100"
      style={{ contain: 'content' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Live cycling image gallery */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        {images.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity"
            style={{
              opacity: i === activeImg ? 1 : 0,
              transitionDuration: '900ms',
              transitionTimingFunction: 'ease-in-out',
              zIndex: i === activeImg ? 1 : 0,
              pointerEvents: 'none',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                animation: i === activeImg ? 'kenburns 4.5s linear forwards' : 'none',
                willChange: 'transform',
              }}
            >
              <Image
                src={img}
                alt={`${land.title} — view ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                priority={index < 4 && i === 0}
              />
            </div>
          </div>
        ))}

        <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold rounded-full z-10">
          {land.type}
        </div>

        <div className="absolute top-3 right-3 flex gap-1 z-10">
          <div className="px-2 py-1 bg-emerald-400/90 backdrop-blur-sm text-xs font-bold rounded flex items-center gap-1">
            ⭐ {land.rating}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
            className="w-7 h-7 flex items-center justify-center backdrop-blur-sm rounded-full hover:scale-110 transition-transform"
            aria-label={isSaved ? 'Remove from saved' : 'Save plot'}
          >
            <span
              className={`${isSaved ? 'text-red-500 animate-heart-pop' : 'text-gray-400'}`}
            >
              {isSaved ? '❤️' : '🤍'}
            </span>
          </button>
        </div>

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImg(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeImg ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                }`}
                aria-label={`View photo ${i + 1}`}
              />
            ))}
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 z-10">
          <div className="flex items-center gap-4 text-white text-xs">
            <span>{land.size}</span>
            <span>•</span>
            <span>🧭 {land.facing}</span>
            <span>•</span>
            <span>📐 {land.dimensions}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-lg font-bold text-gray-900">{land.title}</h3>
          <span className="shrink-0 mt-0.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full">
            ✅ {land.verification}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {land.amenities.slice(0, 3).map((amenity, i) => (
            <span key={i} className="text-[10px] px-2 py-1 bg-gray-100 rounded-full text-gray-600">
              {amenity}
            </span>
          ))}
          {land.amenities.length > 3 && (
            <span className="text-[10px] px-2 py-1 bg-gray-100 rounded-full text-gray-600">
              +{land.amenities.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}