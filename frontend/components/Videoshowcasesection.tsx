import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation"; // or 'next/router' for pages router
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { ChevronDown, Play, Sparkles, MapPin, Clock } from "lucide-react";
import primaryVideos from "../lib/videos.json";
 
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};
 
type VideoData = {
  src: string;
  title: string;
  subtitle: string;
  badge?: string;
  tag?: string;
};
 
const MAX_SHOWCASE_VIDEOS = 14;
 
/**
* Single 3D card. `depth` runs from -1 (fully left of center) to 0 (centered)
* to 1 (fully right of center). `isMobile` softens the 3D effect on small
* screens so it stays smooth and readable instead of feeling exaggerated.
*/
function VideoCard3D({
  video,
  depth,
  index,
  setRef,
  isMobile,
}: {
  video: VideoData;
  depth: number;
  index: number;
  setRef: (el: HTMLDivElement | null) => void;
  isMobile: boolean;
}) {
  const d = Math.max(-1.4, Math.min(1.4, depth));
  const isActive = Math.abs(d) < 0.22;
 
  // Softer tilt/depth on mobile — big rotateY + translateZ values look and
  // perform worse on small/low-power screens.
  const rotateY = d * (isMobile ? -20 : -42);
 
  const baseScale = 1 - Math.min(Math.abs(d), 1) * (isMobile ? 0.22 : 0.3);
  const scale = isActive ? baseScale * (isMobile ? 1.08 : 1.14) : baseScale;
 
  const translateZ = isActive ? (isMobile ? 30 : 60) : -Math.min(Math.abs(d), 1) * (isMobile ? 110 : 200);
  const translateX = d * (isMobile ? -18 : -30);
  const translateY = isActive ? (isMobile ? -14 : -26) : 0;
 
  const opacity = 1 - Math.min(Math.abs(d), 1) * 0.6;
  const zIndex = isActive ? 200 : Math.round((1 - Math.min(Math.abs(d), 1)) * 100);
  const brightness = 1 - Math.min(Math.abs(d), 1) * 0.55;
 
  return (
    <div
      ref={setRef}
      className="relative flex-shrink-0"
      style={{
        width: isMobile ? "min(84vw, 420px)" : "min(78vw, 560px)",
        aspectRatio: "16 / 10",
        perspective: isMobile ? "900px" : "1200px",
      }}
    >
      <div
        className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer"
        style={{
          transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
          opacity,
          zIndex,
          filter: `brightness(${brightness})`,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity, filter",
          boxShadow: isActive
            ? "0 25px 60px -15px rgba(16,185,129,0.5), 0 0 0 2px rgba(52,211,153,0.7)"
            : "0 10px 25px -10px rgba(0,0,0,0.35)",
          transition: "filter 0.1s linear, box-shadow 0.3s ease, transform 0.15s ease-out",
        }}
      >
        <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black">
          <video
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
            autoPlay
            loop
            muted
            playsInline
            src={video.src}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-transparent to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:to-emerald-500/10 transition-all duration-700" />
        </div>
 
        {/* Index chip */}
        <span className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 text-[9px] sm:text-[10px] font-bold tracking-widest text-white/70 bg-white/10 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
          {String(index + 1).padStart(2, "0")}
        </span>
 
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 active:opacity-100 transition-all duration-400">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl animate-pulse" />
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center shadow-2xl">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white ml-0.5" />
            </div>
          </div>
        </div>
 
        {/* Content — bigger & bolder when this card is the centered/active one */}
        <div
          className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-5 transition-all duration-300"
          style={{ transform: isActive ? "translateY(0)" : "translateY(6px)" }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5 flex-wrap">
            {video.tag && (
              <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-400/30">
                <Sparkles className="w-2.5 h-2.5" />
                {video.tag}
              </span>
            )}
            {video.badge && (
              <span className="px-2 sm:px-2.5 py-0.5 bg-gradient-to-r from-amber-400 to-orange-400 text-black text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-full">
                {video.badge}
              </span>
            )}
          </div>
          <h4
            className={`text-white font-bold leading-tight mb-0.5 transition-all duration-300 line-clamp-1 ${
              isActive ? "text-base sm:text-lg md:text-xl" : "text-xs sm:text-sm md:text-base"
            }`}
          >
            {video.title}
          </h4>
          <p className="text-white/70 text-[11px] sm:text-xs md:text-sm flex items-center gap-1 truncate">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            {video.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
 
export default function VideoShowcaseSection() {
  const router = useRouter();
  const allVideos: VideoData[] = (primaryVideos as VideoData[]).slice(0, MAX_SHOWCASE_VIDEOS);
 
  const outerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [depths, setDepths] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [edgePadding, setEdgePadding] = useState(0);
 
  // Track viewport so we can soften the 3D effect + tighten spacing on mobile.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
 
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);
  const x = useSpring(rawX, { stiffness: 110, damping: 24, mass: 0.4 });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["4%", "100%"]);
 
  const recalcPadding = useCallback(() => {
    const wrapper = wrapperRef.current;
    const firstCard = cardRefs.current[0];
    if (!wrapper || !firstCard) return;
 
    const wrapperWidth = wrapper.getBoundingClientRect().width;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const padding = Math.max((wrapperWidth - cardWidth) / 2, 0);
    setEdgePadding(padding);
  }, []);
 
  const recalcDistance = useCallback(() => {
    const wrapper = wrapperRef.current;
    const lastCard = cardRefs.current[cardRefs.current.length - 1];
    if (!wrapper || !lastCard) return;
 
    const wrapperRect = wrapper.getBoundingClientRect();
    const lastCardRect = lastCard.getBoundingClientRect();
    const currentX = x.get();
 
    const naturalCenter =
      lastCardRect.left - wrapperRect.left - currentX + lastCardRect.width / 2;
 
    const dist = naturalCenter - wrapperRect.width / 2;
    setScrollDistance(Math.max(dist, 0));
  }, [x]);
 
  const recalcAll = useCallback(() => {
    recalcPadding();
    requestAnimationFrame(recalcDistance);
  }, [recalcPadding, recalcDistance]);
 
  useEffect(() => {
    recalcAll();
    const ro = new ResizeObserver(recalcAll);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", recalcAll);
    window.addEventListener("orientationchange", recalcAll);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalcAll);
      window.removeEventListener("orientationchange", recalcAll);
    };
  }, [recalcAll, allVideos.length, isMobile]);
 
  const updateDepths = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const wrapperRect = wrapper.getBoundingClientRect();
    const centerX = wrapperRect.left + wrapperRect.width / 2;
    let closestIdx = 0;
    let closestDist = Infinity;
    const next = cardRefs.current.map((el, i) => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = cardCenter - centerX;
      const absDist = Math.abs(distance);
      if (absDist < closestDist) {
        closestDist = absDist;
        closestIdx = i;
      }
      const range = rect.width * 1.4 || 1;
      return distance / range;
    });
    setDepths(next);
    setActiveIndex(closestIdx);
  }, []);
 
  useMotionValueEvent(x, "change", () => {
    requestAnimationFrame(updateDepths);
  });
 
  useEffect(() => {
    updateDepths();
  }, [updateDepths, allVideos.length, edgePadding]);
 
  const handleViewMore = () => {
    router.push("/videos");
  };
 
  // dvh keeps the pinned section stable on mobile browsers whose address
  // bar shows/hides and shifts 100vh around.
  const spacerHeight = `calc(100dvh + ${scrollDistance}px)`;
 
  return (
    <section className="relative">
      {/* Header (scrolls normally, not pinned) */}
      <motion.div
        className="relative text-center pt-14 sm:pt-24 md:pt-32 pb-8 sm:pb-12 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/30 via-white to-transparent -z-10" />
        <motion.span
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-200/50 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-emerald-600 font-bold backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="w-3 h-3" />
          Video Walkthroughs
        </motion.span>
 
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-5 sm:mt-6 mb-3 sm:mb-4 leading-tight">
          <span className="text-gray-800">Property & Land </span>
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
              3D Showcases
            </span>
            <motion.span
              className="absolute -bottom-1.5 sm:-bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 to-green-700 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </span>
        </h2>
 
        <p className="text-gray-600 max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-2">
          Keep scrolling — the showcase moves in 3D as you go, like walking through the property
        </p>
      </motion.div>
 
      {/* Pinned 3D scroll-driven carousel */}
      <div ref={outerRef} style={{ height: spacerHeight }} className="relative">
        <div
          ref={wrapperRef}
          className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-white via-emerald-50/10 to-white"
        >
          {/* Ambient glow blobs — smaller on mobile to avoid overwhelming a small viewport */}
          <motion.div
            className="pointer-events-none absolute top-1/4 left-1/4 w-[220px] h-[220px] sm:w-[500px] sm:h-[500px] bg-emerald-400/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute bottom-1/4 right-1/4 w-[200px] h-[200px] sm:w-[450px] sm:h-[450px] bg-green-400/10 rounded-full blur-3xl"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
 
          {/* Edge vignette — narrower on mobile so it doesn't eat into card view */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-40 bg-gradient-to-r from-white to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-40 bg-gradient-to-l from-white to-transparent z-20" />
 
          {/* The 3D track — its x position is driven entirely by page scroll */}
          <motion.div
            ref={trackRef}
            className="flex gap-5 sm:gap-8 md:gap-10 items-center"
            style={{
              x,
              paddingLeft: edgePadding,
              paddingRight: edgePadding,
              transformStyle: "preserve-3d",
            }}
          >
            {allVideos.map((video, i) => (
              <VideoCard3D
                key={video.src + i}
                video={video}
                index={i}
                depth={depths[i] ?? 0}
                setRef={(el) => (cardRefs.current[i] = el)}
                isMobile={isMobile}
              />
            ))}
          </motion.div>
 
          {/* Live counter — visible on mobile too now, just smaller & repositioned */}
          <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-30 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm text-[10px] sm:text-xs font-semibold text-gray-700">
            <span className="text-emerald-600">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="text-gray-300">/</span>
            <span>{String(allVideos.length).padStart(2, "0")}</span>
          </div>
 
          {/* Scroll progress bar */}
          <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-40 sm:w-56 md:w-72 h-1 sm:h-1.5 rounded-full bg-gray-200/70 overflow-hidden z-30">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-600"
              style={{ width: progressWidth }}
            />
          </div>
 
          <span className="absolute bottom-10 sm:bottom-16 left-1/2 -translate-x-1/2 text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.25em] text-gray-400 font-semibold z-30 whitespace-nowrap">
            Scroll to explore
          </span>
        </div>
      </div>
 
      {/* Below the pinned section: CTA to the full video library */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-center">
        <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
          Showing {allVideos.length} handpicked walkthroughs — explore the full library below
        </p>
 
        <motion.div className="flex justify-center" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.button
            onClick={handleViewMore}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 text-white text-sm sm:text-base font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative flex items-center gap-2">
              View All Videos
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block"
              >
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
 
        <motion.div
          className="flex justify-center mt-3 sm:mt-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/80 backdrop-blur-sm text-gray-600 text-[11px] sm:text-xs rounded-full border border-gray-200/50 shadow-sm">
            <Clock className="w-3 h-3 text-emerald-500" />
            {allVideos.length}+ videos available
          </span>
        </motion.div>
      </div>
    </section>
  );
}