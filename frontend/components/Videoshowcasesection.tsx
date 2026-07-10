import { useState } from "react";
import { useRouter } from "next/navigation"; // or 'next/router' for pages router
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Play, Sparkles, MapPin, Clock } from "lucide-react";
import primaryVideos from "../lib/videos.json"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};


function VideoCard({
  src,
  title,
  subtitle,
  badge,
  tag,
  className = "",
  index = 0,
}: {
  src: string;
  title: string;
  subtitle: string;
  badge?: string;
  tag?: string;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 ${className}`}
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      {/* Video Background */}
      <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black">
        <video
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
          autoPlay
          loop
          muted
          playsInline
          src={src}
        />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-transparent to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:to-emerald-500/10 transition-all duration-700" />
      </div>

      {/* Play Button - Enhanced */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400"
        initial={false}
      >
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl animate-pulse" />
          <div className="relative w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center shadow-2xl">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          {tag && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-400/30">
              <Sparkles className="w-2.5 h-2.5" />
              {tag}
            </span>
          )}
          {badge && (
            <span className="px-2.5 py-0.5 bg-gradient-to-r from-amber-400 to-orange-400 text-black text-[10px] font-bold uppercase tracking-wider rounded-full">
              {badge}
            </span>
          )}
        </div>
        <h4 className="text-white font-bold text-sm md:text-base lg:text-lg leading-tight mb-0.5 group-hover:text-emerald-300 transition-colors duration-300 line-clamp-1">
          {title}
        </h4>
        <p className="text-white/70 text-xs md:text-sm flex items-center gap-1 truncate">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}

export default function VideoShowcaseSection() {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);

  const handleViewMore = () => {
    router.push('/videos');
  };

  return (
    <motion.section
      className="relative py-24 md:py-32 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInUp}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/30 via-white to-emerald-50/20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-green-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <motion.span 
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-200/50 text-xs uppercase tracking-[0.3em] text-emerald-600 font-bold backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-3 h-3" />
            Video Walkthroughs
          </motion.span>
          
          <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-6 mb-4 leading-tight">
            <span className="text-gray-800">Property & Land </span>
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
                Video Showcases
              </span>
              <motion.span 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 to-green-700 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
          </motion.h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Explore immersive video walkthroughs of premium properties and land plots
          </p>
        </motion.div>

        {/* Video Grid */}
        <motion.div 
          className="space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Row 1: large + small */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <VideoCard {...primaryVideos[0]} className="md:col-span-2 aspect-video" index={0} />
            <VideoCard {...primaryVideos[1]} className="aspect-video" index={1} />
          </div>

          {/* Row 2: small + large */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <VideoCard {...primaryVideos[2]} className="aspect-video" index={2} />
            <VideoCard {...primaryVideos[3]} className="md:col-span-2 aspect-video" index={3} />
          </div>
        </motion.div>

        {/* Expandable extra videos - Now hidden by default, only shown if showMore is true */}
        <AnimatePresence mode="wait">
          {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ 
                opacity: 1, 
                height: "auto", 
                y: 0,
                transition: { 
                  duration: 0.6, 
                  ease: [0.25, 0.1, 0.25, 1.0],
                }
              }}
              exit={{ 
                opacity: 0, 
                height: 0, 
                y: -20,
                transition: { duration: 0.5 }
              }}
              className="overflow-hidden"
            >
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {/* Example extra videos - you can add your actual extra videos here */}
                {[
                  {
                    src: "/waterfront.mp4",
                    title: "Waterfront Plot Tour",
                    subtitle: "ECR, Chennai • Sea Facing",
                    badge: "Premium",
                  },
                  {
                    src: "/hillview.mp4",
                    title: "Hill View Farm Land",
                    subtitle: "Lonavala • 1 Acre",
                    badge: "Scenic",
                  },
                  {
                    src: "/plot-survey.mp4",
                    title: "Drone Survey Walkthrough",
                    subtitle: "Whitefield • Full Perimeter",
                    badge: "Aerial",
                  },
                  {
                    src: "/gated-community.mp4",
                    title: "Gated Community Preview",
                    subtitle: "South Delhi • Amenities Tour",
                    badge: "Luxury",
                  },
                ].map((v, i) => (
                  <motion.div
                    key={v.src}
                    variants={fadeInUp}
                    custom={i}
                  >
                    <VideoCard 
                      {...v} 
                      className="aspect-[4/3]" 
                      index={i + 4}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View More Button - Navigates to /videos */}
        <motion.div 
          className="flex justify-center mt-12"
          variants={fadeInUp}
        >
          <motion.button
            onClick={handleViewMore}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 overflow-hidden"
          >
            {/* Shine Effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <span className="relative flex items-center gap-2">
              View All Videos
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="inline-block"
              >
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Counter Badge */}
        <motion.div 
          className="flex justify-center mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-600 text-xs rounded-full border border-gray-200/50 shadow-sm">
            <Clock className="w-3 h-3 text-emerald-500" />
            8+ videos available
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}