import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence, useSpring, useScroll, useTransform, useMotionValue, useVelocity } from 'framer-motion';

import {
  Play, X, ChevronLeft, ChevronRight, Volume2, VolumeX,
  Sparkles, MapPin, Clock, Grid3x3, List, Filter,
  Eye, Calendar, Building2, Trees, Factory, ShoppingBag,
  Mountain, Waves, ArrowRight, Film, Layers, Maximize2, Compass
} from 'lucide-react';
import PageHero from '../components/Pagehero';
import FAQ from '../components/FAQ';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/Ctasection';
import videosData from '../lib/videos.json';

// Define types
interface VideoData {
  src: string;
  title: string;
  subtitle: string;
  badge?: string;
  size: string;
  tag: string;
}

interface Video {
  id: number;
  src: string;
  title: string;
  subtitle: string;
  location: string;
  tag: string;
  duration: string;
  category: string;
  views: string;
  date: string;
  badge: string;
  size: string;
  featured: boolean;
}

// Map tags to icons
const tagIcons: Record<string, any> = {
  'Featured': Sparkles,
  'Commercial': ShoppingBag,
  'Agricultural': Trees,
  'Industrial': Factory,
  'Residential': Building2,
  'Waterfront': Waves,
  'Farm Land': Mountain,
};

// Shared hook: detect mobile / touch viewport so heavy 3D + hover-only effects
// can be swapped for lightweight, always-visible mobile equivalents.
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [breakpoint]);
  return isMobile;
}

// Animated wave-text: each letter bobs in a continuous wave when `active`
function WaveText({
  text,
  active,
  className = '',
  letterClassName = '',
}: {
  text: string;
  active: boolean;
  className?: string;
  letterClassName?: string;
}) {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className={`inline-block ${letterClassName}`}
          animate={active ? { y: [0, -7, 0, 3, 0] } : { y: 0 }}
          transition={
            active
              ? { duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.045 }
              : { duration: 0.25 }
          }
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// Heading text jo left accent-bar se "nikal" ke aata hai, phir gentle
// continuous wave me settle ho jaata hai.
function EmergingWaveHeading({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0, y: [0, -6, 0, 2, 0] }}
          transition={{
            opacity: { duration: 0.4, delay: 0.25 + i * 0.03 },
            x: { duration: 0.4, delay: 0.25 + i * 0.03, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 1.3, repeat: Infinity, ease: 'easeInOut', delay: 0.7 + i * 0.03 },
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// Heading jiske words right side se "thrown" hoke aate hain aur settle ho jaate hain.
function ThrownInHeading({ segments }: { segments: { text: string; className: string }[] }) {
  return (
    <>
      {segments.map((seg, i) => (
        <motion.span
          key={i}
          className={`inline-block mr-3 ${seg.className}`}
          initial={{ opacity: 0, x: 120, rotate: 6 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          {seg.text}
        </motion.span>
      ))}
    </>
  );
}

// Transform JSON data to match component structure
const transformVideoData = (data: VideoData[]): Video[] => {
  return data.map((video, index) => ({
    id: index + 1,
    src: video.src || '',
    title: video.title || 'Video Tour',
    subtitle: video.subtitle || '',
    location: video.subtitle || '',
    tag: video.tag || 'Featured',
    duration: '3:45',
    category: video.tag || 'Property',
    views: Math.floor(Math.random() * 2000 + 500).toString() + '+',
    date: new Date().toISOString().split('T')[0],
    badge: video.badge || '',
    size: video.size || 'small',
    featured: video.tag === 'Featured'
  }));
};

const videos: Video[] = transformVideoData(videosData);
const filters: string[] = ['All', ...Array.from(new Set(videos.map((v) => v.tag)))];

// ============ Ambient floating particles — subtle depth cue across the page ============
function AmbientField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        size: 2 + Math.random() * 4,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 14 + Math.random() * 12,
        drift: (Math.random() - 0.5) * 60,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-emerald-400/25"
          style={{ width: p.size, height: p.size, left: `${p.left}%`, bottom: '-5%' }}
          animate={{ y: ['0%', '-1200%'], x: [0, p.drift], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

// ============ Stat pill for the metrics strip ============
function StatPill({ icon: Icon, value, label, delay }: { icon: any; value: string; label: string; delay: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="flex items-center gap-2 sm:gap-3 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white/70 backdrop-blur-md border border-emerald-100 shadow-[0_10px_30px_-12px_rgba(16,185,129,0.25)]"
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md shadow-emerald-500/30 flex-shrink-0">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
      <div>
        <p className="text-base sm:text-lg font-extrabold text-gray-900 leading-none">{value}</p>
        <p className="text-[9px] sm:text-[11px] text-gray-500 uppercase tracking-wider mt-1 whitespace-nowrap">{label}</p>
      </div>
    </motion.div>
  );
}

// Enhanced Video Tile Component with scroll-driven 3D effects
function VideoTile({
  video,
  featured = false,
  onClick,
  index = 0,
  skipEntryAnim = false,
}: {
  video: Video;
  featured?: boolean;
  onClick: () => void;
  index?: number;
  skipEntryAnim?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Scroll-based 3D transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useSpring(0, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 22 });
  
  // Scroll-driven transforms — tone the tilt down on mobile so the wall
  // doesn't feel disorienting when the whole card fills the viewport width.
  const scrollRotateX = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [6, 0, -6] : [15, 0, -15]);
  const scrollRotateY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], isMobile ? [0, 0, 0, 0] : [-10, 0, 5, 0]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const scrollY = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [20, 0, -20] : [60, 0, -60]);
  const scrollZ = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [-100, 0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const strength = featured ? 4.5 : 9;
    rotateY.set((px - 0.5) * strength * 2);
    rotateX.set(-(py - 0.5) * strength * 2);
    setGlarePos({ x: px * 100, y: py * 100 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  useEffect(() => {
    if (!videoRef.current) return;
    const playVideo = async () => {
      try {
        await videoRef.current?.play();
        setIsPlaying(true);
      } catch (error) {
        setIsPlaying(false);
      }
    };
    playVideo();
  }, []);

  const TagIcon = tagIcons[video.tag] || Sparkles;

  return (
    <motion.div
      ref={containerRef}
      style={{
        rotateX: scrollRotateX,
        rotateY: scrollRotateY,
        scale: scrollScale,
        opacity: scrollOpacity,
        y: scrollY,
        z: scrollZ,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      onClick={onClick}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onHoverStart={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onTouchStart={() => setIsHovered(true)}
        whileHover={{
          scale: featured ? 1.015 : 1.035,
          z: 40,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }}
        whileTap={{ scale: 0.98 }}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
          transformStyle: 'preserve-3d',
        }}
        className={`group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden cursor-pointer shadow-[0_15px_35px_-15px_rgba(0,0,0,0.5)] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_35px_80px_-15px_rgba(16,185,129,0.35)] hover:ring-2 hover:ring-emerald-400/40 transition-shadow duration-500 ${
          featured ? 'aspect-video md:aspect-[16/7]' : 'aspect-video'
        }`}
      >
        {/* Glass showcase edge highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 z-[6]" />

        {/* Cursor-tracked glare — reinforces the glass/3D feel beyond the tilt (desktop only) */}
        <div
          className="pointer-events-none absolute inset-0 z-[5] opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 hidden sm:block"
          style={{
            background: `radial-gradient(280px circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.16), transparent 60%)`,
          }}
        />

        {/* Premium shimmer sweep on hover (desktop only) */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[5] hidden sm:block"
          initial={false}
          animate={isHovered ? { x: ['-120%', '120%'] } : { x: '-120%' }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(75deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
            width: '60%',
          }}
        />

        {/* Video - Always playing */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-500"
          loop
          muted
          playsInline
          preload="metadata"
          src={video.src}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent sm:from-black/80 sm:via-black/20 group-hover:from-black/70 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-transparent to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-emerald-500/5 transition-all duration-700" />

        {/* 3D Depth Layers (desktop only) */}
        <div className="hidden sm:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 via-transparent to-emerald-500/5 transform translate-z-20" />
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/5 via-transparent to-green-400/5 rounded-2xl blur-xl transform -translate-z-10" />
        </div>

        {/* Live Indicator */}
        <motion.div
          className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span className="text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider">Live</span>
        </motion.div>

        {/* Tags */}
        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 flex gap-1.5 sm:gap-2 flex-wrap justify-end max-w-[65%] sm:max-w-none">
          {video.badge && (
            <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 text-black text-[9px] sm:text-[10px] font-bold rounded-full shadow-lg whitespace-nowrap">
              {video.badge}
            </span>
          )}
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-[9px] sm:text-[10px] font-bold rounded-full shadow-lg whitespace-nowrap">
            <TagIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            {video.tag}
          </span>
          <span className="hidden xs:inline-block sm:inline-block px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold rounded-full border border-white/10 whitespace-nowrap">
            {video.duration}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 md:p-6 transform translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0 transition-transform duration-300">
          <h4 className={`text-white font-bold ${featured ? 'text-base sm:text-xl lg:text-3xl' : 'text-sm md:text-base'} leading-tight mb-1 transition-colors duration-300 line-clamp-2`}>
            <WaveText
              text={video.title}
              active={isHovered}
              letterClassName={isHovered ? 'text-emerald-300' : ''}
            />
          </h4>
          <p className="text-white/80 text-xs md:text-sm flex items-center gap-1.5 truncate">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            {video.location}
          </p>
          {featured && (
            <motion.div
              className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-3 text-white/60 text-[10px] sm:text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {video.views} views
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {video.date}
              </span>
            </motion.div>
          )}
        </div>

        {/* Play Button Overlay — always visible on mobile (no hover on touch), hover-revealed on desktop */}
        <div className="absolute inset-0 flex items-center justify-center opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-400">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl animate-pulse" />
            <div className={`relative rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center shadow-2xl ${featured ? 'w-14 h-14 sm:w-20 sm:h-20' : 'w-11 h-11 sm:w-14 sm:h-14'}`}>
              <Play className={`${featured ? 'w-6 h-6 sm:w-8 sm:h-8' : 'w-4 h-4 sm:w-5 sm:h-5'} text-white fill-white ml-0.5`} />
            </div>
          </motion.div>
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4">
            <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-amber-400/90 backdrop-blur-sm text-black text-[9px] sm:text-[10px] font-bold rounded-full">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              Featured
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ============ 3D COVERFLOW SHOWCASE (top hero carousel) with scroll parallax ============
// Desktop: heavy 3D perspective coverflow (unchanged).
// Mobile: swaps to a lightweight native horizontal snap-scroll carousel —
// only the visible/active video decodes+plays, everything else is paused,
// so it no longer hangs or looks broken on phones.
function Coverflow3D({ videos, onOpen }: { videos: Video[]; onOpen: (v: Video) => void }) {
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef(null);

  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const stageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
  const stageY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);

  const go = (dir: number) => {
    setActive((prev) => (prev + dir + videos.length) % videos.length);
  };

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) v.play().catch(() => {});
      else v.pause();
    });
  }, [active]);

  // --- MOBILE: swipeable snap carousel ---
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isMobile) return;
    const track = mobileTrackRef.current;
    if (!track) return;
    const io = new IntersectionObserver(
      (entries) => {
        let best: { idx: number; ratio: number } | null = null;
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.index);
          if (!best || entry.intersectionRatio > best.ratio) {
            best = { idx, ratio: entry.intersectionRatio };
          }
        });
        if (best && best.ratio > 0.55) setActive(best.idx);
      },
      { root: track, threshold: [0.5, 0.6, 0.75, 0.9] }
    );
    mobileCardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [isMobile, videos.length]);

  const scrollToMobileCard = (i: number) => {
    const el = mobileCardRefs.current[i];
    if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  if (isMobile) {
    return (
      <div className="relative rounded-2xl sm:rounded-[1.75rem] overflow-hidden bg-gradient-to-b from-[#0a0f0d] via-[#0d1512] to-[#050706] py-6 sm:py-8">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[220px] bg-emerald-400/15 rounded-full blur-[90px]" />

        <div
          ref={mobileTrackRef}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {videos.map((video, i) => {
            const isActive = i === active;
            const TagIcon = tagIcons[video.tag] || Sparkles;
            // Only decode video for the active card and its immediate
            // neighbours — everything else stays a blank shell until swiped near.
            const shouldLoadSrc = Math.abs(i - active) <= 1;

            return (
              <div
                key={video.id}
                data-index={i}
                ref={(el) => { mobileCardRefs.current[i] = el; }}
                onClick={() => (isActive ? onOpen(video) : scrollToMobileCard(i))}
                className="relative flex-shrink-0 w-[88vw] max-w-[440px] aspect-video snap-center rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  transform: isActive ? 'scale(1)' : 'scale(0.94)',
                  opacity: isActive ? 1 : 0.7,
                  transition: 'transform 0.25s ease, opacity 0.25s ease',
                }}
              >
                <div className="absolute inset-0 bg-black">
                  {shouldLoadSrc && (
                    <video
                      ref={(el) => { videoRefs.current[i] = el; }}
                      className="w-full h-full object-cover"
                      loop
                      muted
                      playsInline
                      preload="none"
                      src={video.src}
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-red-500"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                  <span className="text-[9px] font-bold text-white uppercase tracking-wider">Live</span>
                </div>
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-[9px] font-bold rounded-full shadow-lg">
                  <TagIcon className="w-3 h-3" />
                  {video.tag}
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-3.5">
                  <h4 className="text-white font-bold text-sm leading-tight mb-1 line-clamp-1">
                    {video.title}
                  </h4>
                  <p className="text-white/75 text-[11px] flex items-center gap-1.5 truncate">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    {video.location}
                  </p>
                  {isActive && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white/15 backdrop-blur-md rounded-full border border-white/20 text-white text-[9px] font-semibold">
                      <Play className="w-3 h-3 fill-white" />
                      Tap to view fullscreen
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative flex items-center justify-center gap-2 mt-5">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToMobileCard(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-8 bg-emerald-400' : 'w-1.5 bg-white/25'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  // --- DESKTOP: original 3D coverflow (unchanged) ---
  // Sirf active ke aas-paas ke cards render karo (performance)
  const visibleRange = 3;
  const activeVideo = videos[active];

  return (
    <motion.div 
      ref={containerRef}
      style={{ scale: stageScale, opacity: stageOpacity, y: stageY }}
      className="relative"
    >
      {/* Museum stage background */}
      <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#0a0f0d] via-[#0d1512] to-[#050706] py-16 md:py-24">
        {/* Spotlights */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-400/15 rounded-full blur-[130px]" />
        <div className="pointer-events-none absolute top-10 left-1/4 w-[300px] h-[300px] bg-green-400/10 rounded-full blur-[100px]" />
        <div className="pointer-events-none absolute top-10 right-1/4 w-[300px] h-[300px] bg-emerald-300/10 rounded-full blur-[100px]" />
        <AmbientField />
        {/* Faint stage floor lines */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(16,185,129,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.9) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to top, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
          }}
        />

        <div
          className="relative h-[280px] sm:h-[340px] md:h-[420px] flex items-center justify-center"
          style={{ perspective: '2200px' }}
        >
          {videos.map((video, i) => {
            let offset = i - active;
            // shortest wrap-around distance
            if (offset > videos.length / 2) offset -= videos.length;
            if (offset < -videos.length / 2) offset += videos.length;
            if (Math.abs(offset) > visibleRange) return null;

            const isCenter = offset === 0;
            const TagIcon = tagIcons[video.tag] || Sparkles;

            return (
              <motion.div
                key={video.id}
                className="absolute rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                style={{
                  width: isCenter ? 'min(60vw, 720px)' : 'min(38vw, 420px)',
                  aspectRatio: '16/9',
                  transformStyle: 'preserve-3d',
                  zIndex: 20 - Math.abs(offset),
                }}
                animate={{
                  x: offset * (isCenter ? 0 : 1) * 260,
                  rotateY: offset * -32,
                  scale: 1 - Math.abs(offset) * 0.16,
                  z: -Math.abs(offset) * 220,
                  opacity: 1 - Math.abs(offset) * 0.28,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                onClick={() => (isCenter ? onOpen(video) : setActive(i))}
              >
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  src={video.src}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10" />

                {isCenter && (
                  <>
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                      <motion.span
                        className="w-2 h-2 rounded-full bg-red-500"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                      />
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live</span>
                    </div>
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-[10px] font-bold rounded-full shadow-lg">
                      <TagIcon className="w-3 h-3" />
                      {video.tag}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                      <h4 className="text-white font-bold text-xl sm:text-2xl md:text-3xl leading-tight mb-1">
                        {video.title}
                      </h4>
                      <p className="text-white/80 text-xs md:text-sm flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        {video.location}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-md rounded-full border border-white/20 text-white text-xs font-semibold">
                        <Play className="w-3.5 h-3.5 fill-white" />
                        Tap to view fullscreen
                      </div>
                    </div>
                  </>
                )}

                {!isCenter && <div className="absolute inset-0 bg-black/30" />}
              </motion.div>
            );
          })}
        </div>

        {/* Mirror reflection of the active card — grounds the stage, sells the "showcase floor" */}
        <div
          className="relative mx-auto mt-2 hidden md:block"
          style={{ width: 'min(60vw, 720px)', height: 90, perspective: '2200px' }}
        >
          <div
            className="absolute inset-x-0 top-0 rounded-2xl overflow-hidden opacity-30"
            style={{
              height: 90,
              transform: 'scaleY(-1)',
              maskImage: 'linear-gradient(to bottom, black, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
            }}
          >
            {activeVideo && (
              <video
                className="w-full h-full object-cover blur-[1px]"
                loop
                muted
                autoPlay
                playsInline
                src={activeVideo.src}
              />
            )}
          </div>
        </div>

        {/* Reflective floor illusion under carousel */}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 w-[70%] h-16 rounded-[100%] bg-emerald-400/10 blur-2xl" />

        {/* Nav arrows */}
        <button
          onClick={() => go(-1)}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-colors z-30"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-colors z-30"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="relative flex items-center justify-center gap-2 mt-8 md:mt-10">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-8 bg-emerald-400' : 'w-1.5 bg-white/25 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============ 3D SHOWCASE WALL (grid below, columns at alternating depth/tilt) with scroll parallax ============
function ShowcaseWall({
  videos,
  isAllGrid,
  onOpen,
  viewMode,
}: {
  videos: Video[];
  isAllGrid: boolean;
  onOpen: (v: Video) => void;
  viewMode: string;
}) {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const wallRotateX = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [5, 0, -5]);
  const wallScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);
  const wallY = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [10, 0, -10] : [30, 0, -30]);

  const columnsForRow = 3;

  return (
    <motion.div
      ref={containerRef}
      style={{ 
        rotateX: wallRotateX, 
        scale: wallScale, 
        y: wallY,
        transformPerspective: 2000,
        transformStyle: 'preserve-3d'
      }}
      className="relative rounded-2xl sm:rounded-[2rem] border border-gray-100 bg-gradient-to-b from-gray-50 to-white p-3.5 xs:p-4 sm:p-8 md:p-12 overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-32 left-1/4 w-[520px] h-[520px] bg-emerald-400/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 w-[440px] h-[440px] bg-green-500/10 rounded-full blur-[130px]" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(16,185,129,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.7) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'linear-gradient(to top, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
        }}
      />

      <div
        className={`relative grid ${
          viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
        } gap-6 sm:gap-8 md:gap-x-10 md:gap-y-16`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <AnimatePresence mode="popLayout">
          {videos.map((video, i) => {
            const col = i % columnsForRow;
            const rowIndex = Math.floor(i / columnsForRow);
            const fromLeft = rowIndex % 2 === 0;

            // Column ke hisaab se permanent tilt — "display wall" feel.
            // Disabled on mobile: single-column grid makes per-column tilt
            // look broken since every card sits in "column 0" visually.
            const colTilt = viewMode === 'grid' && !isMobile ? (col - 1) * -7 : 0;
            const colDepth = 0;
            const colLift = viewMode === 'grid' && !isMobile ? (col === 1 ? -14 : 0) : 0;
            
            return (
              <motion.div
                key={video.id}
                layout
                className="relative"
                style={{ transformStyle: 'preserve-3d' }}
                initial={
                  isAllGrid && !isMobile
                    ? { opacity: 0, x: fromLeft ? -220 : 220, rotateY: fromLeft ? -38 : 38, z: -220 }
                    : { opacity: 0, y: 20 }
                }
                {...(isAllGrid
                  ? {
                      whileInView: {
                        opacity: 1,
                        x: 0,
                        y: colLift,
                        rotateY: colTilt,
                        z: colDepth,
                      },
                      viewport: { once: true, amount: 0.15, margin: '0px 0px -100px 0px' },
                    }
                  : {
                      animate: { opacity: 1, y: colLift, rotateY: colTilt, z: colDepth },
                    })}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={
                  isAllGrid
                    ? { duration: isMobile ? 0.5 : 1, delay: isMobile ? 0 : (i % columnsForRow) * 0.14, ease: [0.16, 1, 0.3, 1] }
                    : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                }
                whileHover={{ rotateY: 0, y: colLift - 6, scale: 1.02 }}
              >
                <VideoTile
                  video={video}
                  onClick={() => onOpen(video)}
                  index={i + 1}
                  skipEntryAnim={isAllGrid}
                />
                {/* Pedestal glow */}
                <div className="pointer-events-none absolute left-1/2 -bottom-4 -translate-x-1/2 w-[82%] h-5 rounded-full bg-emerald-500/25 blur-xl hidden sm:block" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function VideoWalkthroughs() {
  const [active, setActive] = useState<Video | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState('All');
  const [muted, setMuted] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const pageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const filtered = filter === 'All' ? videos : videos.filter((v) => v.tag === filter);

  // Category counts — drives the new stat-driven category cards below the coverflow
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    videos.forEach((v) => {
      map[v.tag] = (map[v.tag] || 0) + 1;
    });
    return map;
  }, []);

  const totalViews = useMemo(
    () => videos.reduce((sum, v) => sum + parseInt(v.views.replace('+', ''), 10), 0),
    []
  );

  const openVideo = (video: Video) => {
    const idx = videos.findIndex((v) => v.id === video.id);
    setActiveIndex(idx);
    setActive(video);
    setMuted(true);
  };

  const closeVideo = useCallback(() => setActive(null), []);

  const step = useCallback(
    (dir: number) => {
      const nextIndex = (activeIndex + dir + videos.length) % videos.length;
      setActiveIndex(nextIndex);
      setActive(videos[nextIndex]);
      setMuted(true);
    },
    [activeIndex]
  );

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeVideo();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, closeVideo, step]);

  // Swipe support for the fullscreen modal on touch devices — nav arrows are
  // hidden on small screens, so swipe left/right is the primary way to browse.
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      step(delta < 0 ? 1 : -1);
    }
    touchStartX.current = null;
  };

  // Parallax scroll effect for the entire page
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"]
  });

  const pageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

  return (
    <>
      <Head>
        <title>Video Walkthroughs | BuildSmart Construction</title>
        <meta name="description" content="Watch detailed 3D construction animations and property walkthroughs by BuildSmart." />
      </Head>
      <main ref={pageRef} className="min-h-screen bg-gradient-to-b from-white via-emerald-50/10 to-white overflow-x-hidden">
        <PageHero
          image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600"
          badge="🎬 3D Construction Video Showcases"
          titleLine1="BuildSmart"
          titleLine2="Video Showcases"
          subtitle="Watch detailed 3D construction animations and property walkthroughs — click any tile to view full screen."
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-16 sm:pb-24 overflow-hidden">
          {/* Ambient decorative glow — premium depth feel */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-[420px] h-[420px] bg-emerald-400/10 rounded-full blur-[120px]" />
          <div className="pointer-events-none absolute top-1/3 -left-24 w-[360px] h-[360px] bg-green-500/10 rounded-full blur-[110px]" />

          {/* Featured Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-5 sm:mb-6"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-2">
              <motion.span
                className="w-1.5 h-8 sm:h-10 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full flex-shrink-0"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ boxShadow: '0 0 16px rgba(16,185,129,0.6)' }}
              />
              <span className="text-sm xs:text-base md:text-xl font-extrabold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-emerald-600">
                <EmergingWaveHeading text="Featured Animation" />
              </span>
            </div>
          </motion.div>

          {/* 3D Coverflow Showcase */}
          <Coverflow3D videos={videos} onOpen={openVideo} />

          {/* Stats strip — content-driven, replaces generic filler under the hero showcase */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 -mt-2 mb-10 sm:mb-14 md:mb-16 px-1">
            <StatPill icon={Film} value={`${videos.length}`} label="Total Videos" delay={0} />
            <StatPill icon={Layers} value={`${filters.length - 1}`} label="Categories" delay={0.08} />
            <StatPill icon={Eye} value={`${totalViews.toLocaleString()}+`} label="Total Views" delay={0.16} />
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h2 className="text-xl xs:text-2xl md:text-3xl lg:text-4xl font-bold flex flex-wrap">
                <ThrownInHeading
                  segments={[
                    { text: 'All', className: 'text-gray-900' },
                    {
                      text: 'Animations',
                      className: 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700',
                    },
                  ]}
                />
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Showing {filtered.length} of {videos.length} videos
              </p>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* View Mode Toggle */}
              <div className="flex rounded-full bg-gray-100 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-md text-emerald-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full transition-all ${
                    viewMode === 'list'
                      ? 'bg-white shadow-md text-emerald-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Cards — horizontal scroll on mobile so they never wrap into a
              messy multi-row block on narrow screens; wraps normally from sm: up */}
          <div
            className="flex sm:flex-wrap gap-2.5 sm:gap-3 mb-8 sm:mb-10 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ perspective: '1000px' }}
          >
            {filters.map((f) => {
              const Icon = f !== 'All' ? tagIcons[f] : Filter;
              const isActive = filter === f;
              const count = f === 'All' ? videos.length : categoryCounts[f] || 0;
              return (
                <motion.button
                  key={f}
                  onClick={() => setFilter(f)}
                  whileHover={{ scale: 1.05, rotateX: -6, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className={`flex-shrink-0 inline-flex items-center gap-2 sm:gap-2.5 pl-3.5 sm:pl-4 pr-2.5 sm:pr-3 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/40 ring-2 ring-emerald-300/50'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  {f}
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white/25 text-white' : 'bg-white text-gray-500'
                    }`}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* 3D Showcase Wall */}
          <ShowcaseWall
            videos={filtered}
            isAllGrid={filter === 'All' && viewMode === 'grid'}
            onOpen={openVideo}
            viewMode={viewMode}
          />

          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                <Filter className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No videos in this category yet.</p>
              <button
                onClick={() => setFilter('All')}
                className="mt-4 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
              >
                View all videos →
              </button>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 sm:mt-16 text-center"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-full border border-emerald-200/50 max-w-full">
              <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-700">
                New animations added weekly.
                <button className="ml-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                  Subscribe for updates →
                </button>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Fullscreen Modal — now with a real 3D flip-in, swipe navigation, and a
            thumbnail strip for quick navigation, all tuned for small screens */}
        <AnimatePresence>
          {active && (
            <motion.div
              className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeVideo}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{ perspective: '1800px' }}
            >
              {/* Close Button */}
              <button
                onClick={closeVideo}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl transition-colors backdrop-blur-sm z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Prev / Next Arrows — desktop only; mobile uses swipe + thumbnail strip */}
              <button
                onClick={(e) => { e.stopPropagation(); step(-1); }}
                className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white text-2xl transition-colors backdrop-blur-sm z-10"
                aria-label="Previous video"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); step(1); }}
                className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white text-2xl transition-colors backdrop-blur-sm z-10"
                aria-label="Next video"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Video Content */}
              <motion.div
                key={active.id}
                initial={{ scale: 0.9, opacity: 0, rotateY: -35 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.9, opacity: 0, rotateY: 35 }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="max-w-5xl w-full my-auto"
                style={{ transformStyle: 'preserve-3d' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-2xl">
                  <video
                    className="w-full max-h-[45vh] sm:max-h-[70vh] object-contain"
                    autoPlay
                    loop
                    muted={muted}
                    controls={false}
                    src={active.src}
                  />

                  {/* Mute Toggle */}
                  <button
                    onClick={() => setMuted((m) => !m)}
                    className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center text-white transition-colors border border-white/10"
                    aria-label={muted ? 'Unmute' : 'Mute'}
                  >
                    {muted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-1.5 sm:gap-2 flex-wrap max-w-[70%]">
                    {active.badge && (
                      <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 text-black text-[10px] sm:text-xs font-bold rounded-full shadow-lg">
                        {active.badge}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg">
                      <Building2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      {active.tag}
                    </span>
                    <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold rounded-full border border-white/10">
                      {active.duration}
                    </span>
                  </div>

                  {/* Progress indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-500 to-green-600"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 30, ease: 'linear' }}
                    />
                  </div>
                </div>

                {/* Video Info */}
                <div className="text-center mt-4 sm:mt-6 px-1">
                  <h4 className="text-white font-bold text-lg xs:text-xl sm:text-2xl md:text-3xl">{active.title}</h4>
                  <p className="text-gray-300 text-xs sm:text-sm md:text-base mt-1 flex items-center justify-center gap-2">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    {active.location}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 sm:mt-5">
                    <button
                      className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg text-sm sm:text-base"
                      onClick={closeVideo}
                    >
                      Close
                    </button>
                    <motion.a
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-500/30 transition-all text-sm sm:text-base"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get a Quote
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  </div>

                  <p className="text-gray-500 text-[11px] sm:text-xs mt-4 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
                    <span className="hidden sm:inline">← → Browse videos</span>
                    <span className="sm:hidden">Swipe to browse</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Esc / Tap outside to close</span>
                  </p>
                </div>

                {/* Thumbnail strip — quick jump to nearby videos without leaving the modal */}
                <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {videos.map((v, i) => (
                    <button
                      key={v.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex(i);
                        setActive(v);
                        setMuted(true);
                      }}
                      className={`relative flex-shrink-0 w-16 h-10 sm:w-24 sm:h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        i === activeIndex ? 'border-emerald-400 scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <video className="w-full h-full object-cover" muted playsInline preload="metadata" src={v.src} />
                      {i === activeIndex && <div className="absolute inset-0 bg-emerald-400/10" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <FAQ />
        <Testimonials />
        <CTASection />
      </main>
    </>
  );
}