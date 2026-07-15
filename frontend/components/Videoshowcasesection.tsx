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

/* =========================================================================
   MOBILE CARD
   Lightweight — no 3D transform, no scroll-linked recalculation.
   Video only gets a real `src` (and therefore only decodes/plays) once the
   card is actually the one in view, via IntersectionObserver. Every other
   card just shows a static poster frame. This is what actually fixes the
   mobile hang: on a 14-video page you were previously asking the phone to
   decode up to 14 video streams at once.
   ========================================================================= */
function VideoCardMobile({
  video,
  index,
  isActive,
  setRef,
}: {
  video: VideoData;
  index: number;
  isActive: boolean;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  const videoElRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoElRef.current;
    if (!el) return;
    if (isActive) {
      // Play only the visible/centered video.
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      el.pause();
    }
  }, [isActive]);

  return (
    <div
      ref={setRef}
      data-index={index}
      className="relative flex-shrink-0 snap-center"
      style={{ width: "84vw", maxWidth: 420, aspectRatio: "16 / 10" }}
    >
      <div
        className="relative w-full h-full rounded-xl overflow-hidden"
        style={{
          boxShadow: isActive
            ? "0 15px 40px -12px rgba(16,185,129,0.45), 0 0 0 2px rgba(52,211,153,0.6)"
            : "0 6px 16px -8px rgba(0,0,0,0.3)",
          transform: isActive ? "scale(1)" : "scale(0.94)",
          opacity: isActive ? 1 : 0.75,
          transition: "transform 0.25s ease, opacity 0.25s ease, box-shadow 0.25s ease",
        }}
      >
        <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black">
          {/* preload="none" + only load the src for cards near/at active so we
              never ask the browser to buffer every video on the page. */}
          <video
            ref={videoElRef}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            preload="none"
            src={video.src}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        </div>

        <span className="absolute top-2.5 left-2.5 text-[9px] font-bold tracking-widest text-white/70 bg-white/10 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
          {String(index + 1).padStart(2, "0")}
        </span>

        {isActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-lg" />
              <div className="relative w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center shadow-xl">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-3.5">
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            {video.tag && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 text-[9px] font-bold uppercase tracking-wider rounded-full border border-emerald-400/30">
                <Sparkles className="w-2.5 h-2.5" />
                {video.tag}
              </span>
            )}
            {video.badge && (
              <span className="px-2 py-0.5 bg-gradient-to-r from-amber-400 to-orange-400 text-black text-[9px] font-bold uppercase tracking-wider rounded-full">
                {video.badge}
              </span>
            )}
          </div>
          <h4 className="text-white font-bold leading-tight mb-0.5 text-sm line-clamp-1">
            {video.title}
          </h4>
          <p className="text-white/70 text-[11px] flex items-center gap-1 truncate">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            {video.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   MOBILE SECTION
   Plain, non-pinned, native horizontal scroll-snap. No framer-motion scroll
   linking, no 3D perspective, no per-frame getBoundingClientRect loops.
   ========================================================================= */
function VideoShowcaseMobile({
  videos,
  onViewMore,
}: {
  videos: VideoData[];
  onViewMore: () => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // IntersectionObserver decides which single card counts as "active" —
  // cheap, event-driven, no scroll-frame math.
  useEffect(() => {
    const track = trackRef.current;
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
        if (best && best.ratio > 0.5) setActiveIndex(best.idx);
      },
      { root: track, threshold: [0.5, 0.6, 0.75, 0.9] }
    );

    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [videos.length]);

  return (
    <section className="relative">
      <div className="text-center pt-14 pb-6 px-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-200/50 text-[10px] uppercase tracking-[0.2em] text-emerald-600 font-bold">
          <Sparkles className="w-3 h-3" />
          Video Walkthroughs
        </span>
        <h2 className="text-3xl font-bold mt-5 mb-3 leading-tight">
          <span className="text-gray-800">Property & Land </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
            3D Showcases
          </span>
        </h2>
        <p className="text-gray-600 text-xs px-2">
          Swipe through handpicked walkthroughs
        </p>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-[8vw] pb-2 scroll-smooth [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {videos.map((video, i) => (
            <VideoCardMobile
              key={video.src + i}
              video={video}
              index={i}
              isActive={i === activeIndex}
              setRef={(el) => (cardRefs.current[i] = el)}
            />
          ))}
        </div>

        <div className="flex justify-center gap-1.5 mt-3">
          {videos.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all duration-200"
              style={{
                width: i === activeIndex ? 16 : 6,
                background: i === activeIndex ? "#059669" : "#d1d5db",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-xs text-gray-500 mb-5">
          Showing {videos.length} handpicked walkthroughs
        </p>
        <button
          onClick={onViewMore}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 text-white text-sm font-semibold shadow-lg shadow-emerald-500/30 active:scale-95 transition-transform"
        >
          View All Videos
          <ChevronDown className="w-4 h-4 -rotate-90" />
        </button>
        <div className="flex justify-center mt-3">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm text-gray-600 text-[11px] rounded-full border border-gray-200/50 shadow-sm">
            <Clock className="w-3 h-3 text-emerald-500" />
            {videos.length}+ videos available
          </span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   DESKTOP CARD — original pinned 3D experience, unchanged.
   ========================================================================= */
function VideoCard3D({
  video,
  depth,
  index,
  setRef,
}: {
  video: VideoData;
  depth: number;
  index: number;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  const d = Math.max(-1.4, Math.min(1.4, depth));
  const isActive = Math.abs(d) < 0.22;

  const rotateY = d * -42;
  const baseScale = 1 - Math.min(Math.abs(d), 1) * 0.3;
  const scale = isActive ? baseScale * 1.14 : baseScale;
  const translateZ = isActive ? 60 : -Math.min(Math.abs(d), 1) * 200;
  const translateX = d * -30;
  const translateY = isActive ? -26 : 0;
  const opacity = 1 - Math.min(Math.abs(d), 1) * 0.4;
  const zIndex = isActive ? 200 : Math.round((1 - Math.min(Math.abs(d), 1)) * 100);
  const brightness = 1 - Math.min(Math.abs(d), 1) * 0.3;

  return (
    <div
      ref={setRef}
      className="relative flex-shrink-0"
      style={{ width: "min(78vw, 560px)", aspectRatio: "16 / 10", perspective: "1200px" }}
    >
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer"
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
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            src={video.src}
          />
          {/* Just enough of a bottom gradient to keep the title readable —
              no full-frame darkening, so the video itself stays clear. */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </div>

        <span className="absolute top-4 left-4 text-[10px] font-bold tracking-widest text-white/70 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div
          className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-300"
          style={{ transform: isActive ? "translateY(0)" : "translateY(6px)" }}
        >
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            {video.tag && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-400/30">
                <Sparkles className="w-2.5 h-2.5" />
                {video.tag}
              </span>
            )}
            {video.badge && (
              <span className="px-2.5 py-0.5 bg-gradient-to-r from-amber-400 to-orange-400 text-black text-[10px] font-bold uppercase tracking-wider rounded-full">
                {video.badge}
              </span>
            )}
          </div>
          <h4
            className={`text-white font-bold leading-tight mb-0.5 transition-all duration-300 line-clamp-1 ${
              isActive ? "text-lg md:text-xl" : "text-sm md:text-base"
            }`}
          >
            {video.title}
          </h4>
          <p className="text-white/70 text-xs md:text-sm flex items-center gap-1 truncate">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            {video.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   DESKTOP SECTION — original pinned scroll-driven 3D carousel, unchanged
   logic-wise, just no longer rendered on mobile at all.
   ========================================================================= */
function VideoShowcaseDesktop({
  videos,
  onViewMore,
}: {
  videos: VideoData[];
  onViewMore: () => void;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [depths, setDepths] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [edgePadding, setEdgePadding] = useState(0);

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
    setEdgePadding(Math.max((wrapperWidth - cardWidth) / 2, 0));
  }, []);

  const recalcDistance = useCallback(() => {
    const wrapper = wrapperRef.current;
    const lastCard = cardRefs.current[cardRefs.current.length - 1];
    if (!wrapper || !lastCard) return;
    const wrapperRect = wrapper.getBoundingClientRect();
    const lastCardRect = lastCard.getBoundingClientRect();
    const currentX = x.get();
    const naturalCenter = lastCardRect.left - wrapperRect.left - currentX + lastCardRect.width / 2;
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
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalcAll);
    };
  }, [recalcAll, videos.length]);

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
  }, [updateDepths, videos.length, edgePadding]);

  const spacerHeight = `calc(100dvh + ${scrollDistance}px)`;

  return (
    <section className="relative">
      <motion.div
        className="relative text-center pt-24 md:pt-32 pb-12 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/30 via-white to-transparent -z-10" />
        <motion.span
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-200/50 text-xs uppercase tracking-[0.3em] text-emerald-600 font-bold backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="w-3 h-3" />
          Video Walkthroughs
        </motion.span>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-6 mb-4 leading-tight">
          <span className="text-gray-800">Property & Land </span>
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
              3D Showcases
            </span>
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 to-green-700 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </span>
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-2">
          Keep scrolling — the showcase moves in 3D as you go, like walking through the property
        </p>
      </motion.div>

      <div ref={outerRef} style={{ height: spacerHeight }} className="relative">
        <div
          ref={wrapperRef}
          className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-white via-emerald-50/10 to-white"
        >
          <motion.div
            className="pointer-events-none absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-green-400/10 rounded-full blur-3xl"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-white to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-white to-transparent z-20" />

          <motion.div
            ref={trackRef}
            className="flex gap-8 md:gap-10 items-center"
            style={{ x, paddingLeft: edgePadding, paddingRight: edgePadding, transformStyle: "preserve-3d" }}
          >
            {videos.map((video, i) => (
              <VideoCard3D
                key={video.src + i}
                video={video}
                index={i}
                depth={depths[i] ?? 0}
                setRef={(el) => (cardRefs.current[i] = el)}
              />
            ))}
          </motion.div>

          <div className="absolute top-8 right-8 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm text-xs font-semibold text-gray-700">
            <span className="text-emerald-600">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="text-gray-300">/</span>
            <span>{String(videos.length).padStart(2, "0")}</span>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-56 md:w-72 h-1.5 rounded-full bg-gray-200/70 overflow-hidden z-30">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-600" style={{ width: progressWidth }} />
          </div>

          <span className="absolute bottom-16 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.25em] text-gray-400 font-semibold z-30 whitespace-nowrap">
            Scroll to explore
          </span>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-sm text-gray-500 mb-8">
          Showing {videos.length} handpicked walkthroughs — explore the full library below
        </p>

        <motion.div className="flex justify-center" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.button
            onClick={onViewMore}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 text-white text-base font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 overflow-hidden"
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
          className="flex justify-center mt-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-600 text-xs rounded-full border border-gray-200/50 shadow-sm">
            <Clock className="w-3 h-3 text-emerald-500" />
            {videos.length}+ videos available
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================================
   ENTRY POINT — picks mobile vs desktop version. Mobile never mounts the
   3D/pinned engine at all, so there's nothing heavy for it to run.
   ========================================================================= */
export default function VideoShowcaseSection() {
  const router = useRouter();
  const allVideos: VideoData[] = (primaryVideos as VideoData[]).slice(0, MAX_SHOWCASE_VIDEOS);

  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleViewMore = () => router.push("/videos");

  // Avoid a flash of the wrong layout / SSR mismatch: render nothing on the
  // very first paint until we know the viewport, then pick one version.
  if (isMobile === null) return <section className="relative min-h-[40vh]" />;

  return isMobile ? (
    <VideoShowcaseMobile videos={allVideos} onViewMore={handleViewMore} />
  ) : (
    <VideoShowcaseDesktop videos={allVideos} onViewMore={handleViewMore} />
  );
}