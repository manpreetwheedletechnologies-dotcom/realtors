import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LandPlotCard
 * Enhanced version of the featured-land card:
 * - Cycles through 2-3 real photos per plot (crossfade) so the card feels
 *   "alive" without needing licensed GIF assets.
 * - Each active photo gets a slow continuous Ken-Burns zoom/pan.
 * - Auto-advance pauses on hover so people can actually look at a photo.
 * - Clickable dot indicators to jump to a specific photo.
 * - Wishlist heart (local UI state only — wire up to your save/favorites
 *   API if you have one).
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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Live cycling image gallery */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeImg}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          >
            <motion.img
              src={images[activeImg]}
              alt={`${land.title} — view ${activeImg + 1}`}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: 1.12 }}
              transition={{ duration: 4.5, ease: 'linear' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Live preview pill */}
        {images.length > 1 && (
          <motion.div
            className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full text-[10px] font-bold text-white uppercase tracking-wide z-10"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-red-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            Live
          </motion.div>
        )}

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
            className="w-7 h-7 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform"
            aria-label={isSaved ? 'Remove from saved' : 'Save plot'}
          >
            <motion.span
              animate={isSaved ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
              className={isSaved ? 'text-red-500' : 'text-gray-400'}
            >
              {isSaved ? '❤️' : '🤍'}
            </motion.span>
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
        <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">📍 {land.location}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-emerald-600">{land.price}</span>
          <span className="text-xs text-gray-500">{land.measurement}</span>
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

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-600">👤 {land.owner}</span>
          <motion.button
            className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl text-xs font-bold hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}