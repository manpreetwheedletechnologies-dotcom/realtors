import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '../components/Pagehero';
import FAQ from '../components/FAQ';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/Ctasection';

const videos = [
  { id: 1, title: 'Premium Residential Colony', location: 'South Delhi • 3 BHK Apartments', src: 'https://3dbharat.com/video/header-video1.mp4', tag: 'Residential', duration: '5:30' },
  { id: 2, title: 'Commercial Complex BKC', location: 'Mumbai • Premium Office Space', src: 'https://3dbharat.com/video/header-video2.mp4', tag: 'Commercial', duration: '4:45' },
  { id: 3, title: 'Agricultural Land Tour', location: 'Bangalore • 2 Acres Farm', src: 'https://3dbharat.com/video/header-video1.mp4', tag: 'Agricultural', duration: '6:10' },
  { id: 4, title: 'Industrial Plot Walkthrough', location: 'Andheri, Mumbai • 650 sq.yds', src: 'https://3dbharat.com/video/header-video2.mp4', tag: 'Industrial', duration: '3:55' },
  { id: 5, title: 'Waterfront Land Preview', location: 'ECR, Chennai • 800 sq.yds', src: 'https://3dbharat.com/video/header-video1.mp4', tag: 'Waterfront', duration: '5:05' },
  { id: 6, title: 'Hill View Farm Plot', location: 'Lonavala • 1 Acre', src: 'https://3dbharat.com/video/header-video2.mp4', tag: 'Farm Land', duration: '4:20' }
];

const filters = ['All', ...Array.from(new Set(videos.map((v) => v.tag)))];

export default function VideoWalkthroughs() {
  const [active, setActive] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState('All');
  const [muted, setMuted] = useState(true);

  const filtered = filter === 'All' ? videos : videos.filter((v) => v.tag === filter);
  const featured = videos[0];

  const openVideo = (video) => {
    const idx = videos.findIndex((v) => v.id === video.id);
    setActiveIndex(idx);
    setActive(video);
    setMuted(true);
  };

  const closeVideo = useCallback(() => setActive(null), []);

  const step = useCallback(
    (dir) => {
      const nextIndex = (activeIndex + dir + videos.length) % videos.length;
      setActiveIndex(nextIndex);
      setActive(videos[nextIndex]);
      setMuted(true);
    },
    [activeIndex]
  );

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
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
        <title>Video Walkthroughs | PGI Land Realtors</title>
        <meta name="description" content="Watch detailed video walkthroughs of land plots and properties across India." />
      </Head>
      <main className="min-h-screen bg-white text-gray-800">
        <PageHero
          image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600"
          badge="🎬 Video Walkthroughs"
          titleLine1="Property & Land"
          titleLine2="Video Showcases"
          subtitle="Watch detailed video walkthroughs of properties and land plots — click any tile to view full screen."
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          {/* Featured video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Featured Tour
            </span>
          </motion.div>
          <VideoTile
            video={featured}
            featured
            onClick={() => openVideo(featured)}
          />

          {/* Filter tabs */}
          <div className="flex items-center justify-between flex-wrap gap-3 mt-16 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="text-gray-900">All </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">Walkthroughs</span>
            </h2>
            <span className="text-sm text-gray-500">{filtered.length} of {videos.length} videos</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <VideoTile video={video} onClick={() => openVideo(video)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-500 py-16">No videos in this category yet.</p>
          )}
        </div>

        {/* Fullscreen modal */}
        <AnimatePresence>
          {active && (
            <motion.div
              className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeVideo}
            >
              {/* Prev / Next arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); step(-1); }}
                className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white text-xl transition-colors"
                aria-label="Previous video"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); step(1); }}
                className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white text-xl transition-colors"
                aria-label="Next video"
              >
                ›
              </button>

              <motion.div
                key={active.id}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative rounded-2xl overflow-hidden bg-black">
                  <video className="w-full max-h-[70vh] object-contain" autoPlay loop muted={muted} controls={false} src={active.src} />
                  <button
                    onClick={() => setMuted((m) => !m)}
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
                    aria-label={muted ? 'Unmute' : 'Mute'}
                  >
                    {muted ? '🔇' : '🔊'}
                  </button>
                  <span className="absolute top-4 left-4 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                    {active.tag}
                  </span>
                </div>
                <div className="text-center mt-5">
                  <h4 className="text-white font-bold text-xl">{active.title}</h4>
                  <p className="text-gray-300 text-sm mt-1">{active.location} • {active.duration}</p>
                  <div className="flex items-center justify-center gap-3 mt-5">
                    <button
                      className="px-6 py-2.5 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition-colors"
                      onClick={closeVideo}
                    >
                      Close
                    </button>
                    <a
                      href="/landplots"
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                    >
                      View Similar Plots
                    </a>
                  </div>
                  <p className="text-gray-500 text-xs mt-4">Use ← → to browse, Esc to close</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <FAQ/>
        <Testimonials/>
        <CTASection/>
      </main>
    </>
  );
}

// A single video tile — plays on hover (or always, if `featured`) to keep
// the page light: 6 simultaneous autoplaying videos is heavy, so grid tiles
// only render/play their <video> once hovered.
function VideoTile({ video, featured = false, onClick }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);
  const shouldPlay = featured || hovered;

  useEffect(() => {
    if (!videoRef.current) return;
    if (shouldPlay) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [shouldPlay]);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      whileHover={{ scale: featured ? 1.01 : 1.02 }}
      className={`group relative bg-black rounded-3xl overflow-hidden cursor-pointer ${
        featured ? 'aspect-[16/7]' : 'aspect-video'
      }`}
    >
      {shouldPlay ? (
        <video ref={videoRef} className="w-full h-full object-cover" loop muted playsInline src={video.src} />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-emerald-900 via-gray-900 to-black" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      {shouldPlay && (
        <motion.div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full text-[10px] font-bold text-white uppercase tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-red-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          Playing
        </motion.div>
      )}

      <div className="absolute top-3 right-3 flex gap-1.5">
        <span className="px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full">{video.tag}</span>
        <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">{video.duration}</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <h4 className={`text-white font-bold ${featured ? 'text-xl sm:text-2xl' : ''}`}>{video.title}</h4>
        <p className="text-white/80 text-sm mt-0.5">{video.location}</p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`rounded-full bg-white/90 flex items-center justify-center shadow-xl ${featured ? 'w-16 h-16' : 'w-14 h-14'}`}
        >
          <span className={featured ? 'text-3xl' : 'text-2xl'}>▶️</span>
        </motion.div>
      </div>
    </motion.div>
  );
}