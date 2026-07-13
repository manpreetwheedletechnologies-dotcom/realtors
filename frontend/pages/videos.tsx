import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, X, ChevronLeft, ChevronRight, Volume2, VolumeX, 
  Sparkles, MapPin, Clock, Grid3x3, List, Filter, 
  Eye, Calendar, Building2, Trees, Factory, ShoppingBag,
  Mountain, Waves, ArrowRight
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

// Transform JSON data to match component structure
const transformVideoData = (data: VideoData[]): Video[] => {
  return data.map((video, index) => ({
    id: index + 1,
    src: video.src || '',
    title: video.title || 'Video Tour',
    subtitle: video.subtitle || 'Property Location',
    location: video.subtitle || 'Property Location',
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

// Enhanced Video Tile Component - Autoplay on load
function VideoTile({ 
  video, 
  featured = false, 
  onClick, 
  index = 0 
}: { 
  video: Video; 
  featured?: boolean; 
  onClick: () => void; 
  index?: number;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    
    const playVideo = async () => {
      try {
        await videoRef.current?.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay prevented:', error);
        setIsPlaying(false);
      }
    };
    
    playVideo();
  }, []);

  const TagIcon = tagIcons[video.tag] || Sparkles;

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ 
        scale: featured ? 1.01 : 1.03,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className={`group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${
        featured ? 'aspect-[16/7]' : 'aspect-video'
      }`}
    >
      {/* Video - Always playing */}
      <video 
        ref={videoRef} 
        className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-500" 
        loop 
        muted 
        playsInline 
        src={video.src}
        onLoadedData={() => setIsLoaded(true)}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500" />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-transparent to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-emerald-500/5 transition-all duration-700" />

      {/* Live Indicator */}
      <motion.div
        className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          className="w-2 h-2 rounded-full bg-red-500"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live</span>
      </motion.div>

      {/* Tags */}
      <div className="absolute top-4 right-4 flex gap-2 flex-wrap">
        {video.badge && (
          <span className="px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 text-black text-[10px] font-bold rounded-full shadow-lg">
            {video.badge}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-[10px] font-bold rounded-full shadow-lg">
          <TagIcon className="w-3 h-3" />
          {video.tag}
        </span>
        <span className="px-3 py-1.5 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold rounded-full border border-white/10">
          {video.duration}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h4 className={`text-white font-bold ${featured ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-sm md:text-base'} leading-tight mb-1 group-hover:text-emerald-300 transition-colors duration-300 line-clamp-2`}>
          {video.title}
        </h4>
        <p className="text-white/80 text-xs md:text-sm flex items-center gap-1.5 truncate">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          {video.location}
        </p>
        {featured && (
          <motion.div 
            className="flex items-center gap-4 mt-3 text-white/60 text-xs"
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

      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl animate-pulse" />
          <div className={`relative rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center shadow-2xl ${featured ? 'w-20 h-20' : 'w-14 h-14'}`}>
            <Play className={`${featured ? 'w-8 h-8' : 'w-5 h-5'} text-white fill-white ml-0.5`} />
          </div>
        </motion.div>
      </div>

      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400/90 backdrop-blur-sm text-black text-[10px] font-bold rounded-full">
            <Sparkles className="w-3 h-3" />
            Featured
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default function VideoWalkthroughs() {
  const [active, setActive] = useState<Video | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState('All');
  const [muted, setMuted] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  const filtered = filter === 'All' ? videos : videos.filter((v) => v.tag === filter);
  const featured = videos.find(v => v.featured) || videos[0];

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

  return (
    <>
      <Head>
        <title>Video Walkthroughs | BuildSmart Construction</title>
        <meta name="description" content="Watch detailed 3D construction animations and property walkthroughs by BuildSmart." />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-white via-emerald-50/10 to-white">
        <PageHero
          image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600"
          badge="🎬 3D Construction Video Showcases"
          titleLine1="BuildSmart"
          titleLine2="Video Showcases"
          subtitle="Watch detailed 3D construction animations and property walkthroughs — click any tile to view full screen."
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          {/* Featured Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
                Featured Animation
              </span>
            </div>
          </motion.div>

          {/* Featured Video */}
          <VideoTile
            video={featured}
            featured
            onClick={() => openVideo(featured)}
            index={0}
          />

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-16 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                <span className="text-gray-900">All </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
                  Animations
                </span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Showing {filtered.length} of {videos.length} videos
              </p>
            </div>
            
            <div className="flex items-center gap-3">
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

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => {
              const Icon = f !== 'All' ? tagIcons[f] : Filter;
              return (
                <motion.button
                  key={f}
                  onClick={() => setFilter(f)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    filter === f
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {f}
                </motion.button>
              );
            })}
          </div>

          {/* Video Grid */}
          <div className={`grid ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          } gap-6`}>
            <AnimatePresence mode="popLayout">
              {filtered.map((video, i) => (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <VideoTile 
                    video={video} 
                    onClick={() => openVideo(video)} 
                    index={i + 1}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
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
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-full border border-emerald-200/50">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-gray-700">
                New animations added weekly. 
                <button className="ml-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                  Subscribe for updates →
                </button>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Fullscreen Modal */}
        <AnimatePresence>
          {active && (
            <motion.div
              className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeVideo}
            >
              {/* Close Button */}
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl transition-colors backdrop-blur-sm"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev / Next Arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); step(-1); }}
                className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-2xl transition-colors backdrop-blur-sm"
                aria-label="Previous video"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); step(1); }}
                className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-2xl transition-colors backdrop-blur-sm"
                aria-label="Next video"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Video Content */}
              <motion.div
                key={active.id}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl">
                  <video 
                    className="w-full max-h-[75vh] object-contain" 
                    autoPlay 
                    loop 
                    muted={muted} 
                    controls={false} 
                    src={active.src} 
                  />
                  
                  {/* Mute Toggle */}
                  <button
                    onClick={() => setMuted((m) => !m)}
                    className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center text-white transition-colors border border-white/10"
                    aria-label={muted ? 'Unmute' : 'Mute'}
                  >
                    {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                    {active.badge && (
                      <span className="px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 text-black text-xs font-bold rounded-full shadow-lg">
                        {active.badge}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold rounded-full shadow-lg">
                      <Building2 className="w-3 h-3" />
                      {active.tag}
                    </span>
                    <span className="px-3 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/10">
                      {active.duration}
                    </span>
                  </div>

                  {/* Progress indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-green-600"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 30, ease: "linear" }}
                    />
                  </div>
                </div>

                {/* Video Info */}
                <div className="text-center mt-6">
                  <h4 className="text-white font-bold text-2xl md:text-3xl">{active.title}</h4>
                  <p className="text-gray-300 text-sm md:text-base mt-1 flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {active.location}
                  </p>
                  
                  <div className="flex items-center justify-center gap-6 mt-5">
                    <button
                      className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg"
                      onClick={closeVideo}
                    >
                      Close
                    </button>
                    <motion.a
                      href="/contact"
                      className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get a Quote
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  </div>
                  
                  <p className="text-gray-500 text-xs mt-4 flex items-center justify-center gap-4">
                    <span>← → Browse videos</span>
                    <span>•</span>
                    <span>Esc Close</span>
                  </p>
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