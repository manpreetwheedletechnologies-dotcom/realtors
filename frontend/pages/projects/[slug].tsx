import { useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  MapPin, Ruler, Calendar, Building, ShieldCheck, FileText, CheckCircle2,
  ArrowLeft, Play, ChevronLeft, ChevronRight, ArrowRight, Maximize2, X,
} from 'lucide-react';
import { resolveMediaUrl } from '../../utils/resolveMediaUrl';
import { statusStyles } from '../../components/ProjectCard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

type VideoItem = { kind: 'file' | 'youtube'; src: string; thumb?: string };

const youTubeId = (url: string) => {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return m ? m[1] : '';
};

const unique = (arr: string[]) => arr.filter(Boolean).filter((v, i, a) => a.indexOf(v) === i);

// Plain green backdrop (no image) - same palette as the Projects listing header
const Backdrop = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <section className={`relative overflow-hidden bg-[#0A1A12] ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A12] via-[#0F2A1C] to-[#123B22]" />
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 via-transparent to-emerald-900/40" />
    {children}
  </section>
);

const SectionTitle = ({ children, sub }: { children: React.ReactNode; sub?: string }) => (
  <div className="mb-5">
    <h2 className="text-2xl font-bold text-[#16241B] flex items-center gap-3">
      <span className="w-1.5 h-7 rounded-full bg-gradient-to-b from-emerald-400 to-[#1F6B3D]" />
      {children}
    </h2>
    {sub && <p className="text-sm text-[#5C6B61] mt-1 ml-[18px]">{sub}</p>}
  </div>
);

export default function ProjectDetail() {
  const { query } = useRouter();
  const slug = query.slug as string | undefined;
  const [project, setProject] = useState<any>(null);
  const [state, setState] = useState<'loading' | 'ok' | 'notfound'>('loading');
  const [activeImg, setActiveImg] = useState(0);
  const [activeVid, setActiveVid] = useState(0);
  const [vidPicked, setVidPicked] = useState(false); // autoplay only after the visitor picks a video
  const [lightbox, setLightbox] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (!slug) return;
    setState('loading');
    fetch(`${API_URL}/api/v1/projects/${slug}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => { setProject(d); setActiveImg(0); setActiveVid(0); setVidPicked(false); setState('ok'); })
      .catch(() => setState('notfound'));
  }, [slug]);

  const images: string[] = useMemo(
    () => (project ? unique([project.coverImage, ...(project.images || [])]) : []),
    [project]
  );

  const total = images.length;
  const goImg = (d: number) => setActiveImg((i) => (total ? (i + d + total) % total : 0));

  // swipe left/right on touch screens
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) goImg(dx < 0 ? 1 : -1);
  };

  // fullscreen viewer: keyboard + stop page scrolling behind it
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') setActiveImg((i) => (i + 1) % total);
      if (e.key === 'ArrowLeft') setActiveImg((i) => (i - 1 + total) % total);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    (window as any).lenis?.stop?.();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      (window as any).lenis?.start?.();
    };
  }, [lightbox, total]);

  const videos: VideoItem[] = useMemo(() => {
    if (!project) return [];
    return unique([...(project.videos || []), project.videoUrl]).map<VideoItem>((src) => {
      const id = youTubeId(src);
      return id
        ? { kind: 'youtube', src: `https://www.youtube.com/embed/${id}`, thumb: `https://img.youtube.com/vi/${id}/hqdefault.jpg` }
        : { kind: 'file', src };
    });
  }, [project]);

  if (state !== 'ok') {
    return (
      <Backdrop className="min-h-[80vh] flex items-center justify-center text-center px-4">
        <div className="relative z-10 text-white">
          {state === 'loading' ? (
            <p className="text-emerald-100/80">Loading project...</p>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4">Project not found</h1>
              <Link href="/projects" className="inline-flex items-center gap-2 text-emerald-300 font-semibold hover:text-white">
                <ArrowLeft className="w-4 h-4" /> Back to projects
              </Link>
            </>
          )}
        </div>
      </Backdrop>
    );
  }

  const video = videos[activeVid];

  const facts = [
    { icon: MapPin, label: 'Location', value: project.location },
    { icon: Ruler, label: 'Total Area', value: project.area },
    { icon: Building, label: 'Units / Plots', value: project.totalUnits },
    { icon: Calendar, label: 'Launch', value: project.launchDate },
    { icon: Calendar, label: 'Possession', value: project.possessionDate },
    { icon: ShieldCheck, label: 'RERA No.', value: project.reraNumber },
    { icon: Building, label: 'Developer', value: project.developer },
  ].filter((f) => f.value);

  return (
    <>
      <Head>
        <title>{project.title} - PGI Realtors</title>
        {project.tagline && <meta name="description" content={project.tagline} />}
      </Head>

      {/* ───────── Green hero (no image - navbar's white text stays readable) ───────── */}
      <Backdrop className="pt-32 pb-32 md:pb-40">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-200/80 hover:text-white mb-8">
              <ArrowLeft className="w-4 h-4" /> All projects
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className={`text-xs font-bold px-3 py-1 rounded-full shadow ${statusStyles[project.status] || 'bg-gray-700 text-white'}`}>{project.status}</span>
              {project.type && (
                <span className="px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs uppercase tracking-[0.25em] text-emerald-300 font-bold">{project.type}</span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white max-w-4xl">{project.title}</h1>
            {project.tagline && <p className="mt-4 text-base md:text-lg text-emerald-100/80 max-w-2xl leading-relaxed">{project.tagline}</p>}

            <div className="mt-7 flex flex-wrap gap-3 text-sm">
              {project.location && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white"><MapPin className="w-4 h-4 text-emerald-300" />{project.location}</span>
              )}
              {project.area && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white"><Ruler className="w-4 h-4 text-emerald-300" />{project.area}</span>
              )}
            </div>
          </motion.div>
        </div>
      </Backdrop>

      {/* ───────── Body (overlaps the hero a little) ───────── */}
      <div className="bg-[#F5F3EC] pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32 relative z-10">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 min-w-0">

              {/* Photos - always shown in full (never cropped); blurred copy fills the spare space */}
              {images.length > 0 && (
                <div className="bg-white rounded-3xl p-3 shadow-xl border border-gray-100">
                  <div
                    className="relative rounded-2xl overflow-hidden bg-[#0F2A1C] h-[300px] sm:h-[420px] lg:h-[520px] select-none"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={resolveMediaUrl(images[activeImg])} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={images[activeImg]}
                      src={resolveMediaUrl(images[activeImg])}
                      alt={project.title}
                      onClick={() => setLightbox(true)}
                      className="relative z-[1] w-full h-full object-contain cursor-zoom-in"
                    />

                    <span className="absolute z-[2] top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white">{activeImg + 1} / {images.length}</span>
                    <button aria-label="View fullscreen" onClick={() => setLightbox(true)} className="absolute z-[2] top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur text-white flex items-center justify-center"><Maximize2 className="w-4 h-4" /></button>

                    {images.length > 1 && (
                      <>
                        <button aria-label="Previous photo" onClick={() => goImg(-1)} className="absolute z-[2] left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-[#123B22] shadow flex items-center justify-center"><ChevronLeft className="w-5 h-5" /></button>
                        <button aria-label="Next photo" onClick={() => goImg(1)} className="absolute z-[2] right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-[#123B22] shadow flex items-center justify-center"><ChevronRight className="w-5 h-5" /></button>
                      </>
                    )}
                  </div>

                  {images.length > 1 && (
                    <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
                      {images.map((g, i) => (
                        <button key={`${g}-${i}`} onClick={() => setActiveImg(i)} className={`shrink-0 w-24 h-20 rounded-xl overflow-hidden border-2 bg-[#0F2A1C] transition ${i === activeImg ? 'border-[#1F6B3D] ring-2 ring-emerald-300/50' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={resolveMediaUrl(g)} alt="" className="w-full h-full object-contain" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Videos - their own section */}
              {videos.length > 0 && (
                <div id="videos" className="mt-8 bg-white rounded-3xl border border-gray-100 shadow-sm p-5 md:p-8">
                  <SectionTitle sub={videos.length > 1 ? `${videos.length} videos - tap one to watch` : 'Watch the project walkthrough'}>
                    Project {videos.length > 1 ? 'Videos' : 'Video'}
                  </SectionTitle>

                  <div className="rounded-2xl overflow-hidden bg-black aspect-video shadow-lg">
                    {video.kind === 'youtube' ? (
                      <iframe
                        key={video.src}
                        src={vidPicked ? `${video.src}?autoplay=1` : video.src}
                        className="w-full h-full"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                        title={`${project.title} video ${activeVid + 1}`}
                      />
                    ) : (
                      // eslint-disable-next-line jsx-a11y/media-has-caption
                      <video
                        key={video.src}
                        src={`${resolveMediaUrl(video.src)}#t=0.5`}
                        controls
                        playsInline
                        preload="metadata"
                        autoPlay={vidPicked}
                        className="w-full h-full object-contain bg-black"
                      />
                    )}
                  </div>

                  {videos.length > 1 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                      {videos.map((v, i) => (
                        <button
                          key={`${v.src}-${i}`}
                          onClick={() => { setActiveVid(i); setVidPicked(true); }}
                          className={`group text-left rounded-xl overflow-hidden border-2 bg-white transition ${i === activeVid ? 'border-[#1F6B3D] ring-2 ring-emerald-300/50' : 'border-gray-100 hover:border-emerald-300'}`}
                        >
                          <div className="relative aspect-video bg-black">
                            {v.kind === 'youtube' ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={v.thumb} alt="" className="w-full h-full object-cover" />
                            ) : (
                              // eslint-disable-next-line jsx-a11y/media-has-caption
                              <video src={`${resolveMediaUrl(v.src)}#t=0.5`} preload="metadata" muted playsInline className="w-full h-full object-cover pointer-events-none" />
                            )}
                            <span className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition">
                              <span className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg"><Play className="w-4 h-4 fill-current ml-0.5" /></span>
                            </span>
                          </div>
                          <p className={`px-3 py-2 text-xs font-semibold ${i === activeVid ? 'text-[#1F6B3D]' : 'text-gray-600'}`}>
                            {i === activeVid ? 'Now playing · ' : ''}Video {i + 1}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {project.description && (
                <div className="mt-8 bg-white rounded-3xl border border-gray-100 shadow-sm p-7 md:p-9">
                  <SectionTitle>About this project</SectionTitle>
                  <p className="text-[#5C6B61] leading-relaxed whitespace-pre-line">{project.description}</p>
                </div>
              )}

              {project.highlights?.length > 0 && (
                <div className="mt-8 bg-white rounded-3xl border border-gray-100 shadow-sm p-7 md:p-9">
                  <SectionTitle>Highlights</SectionTitle>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {project.highlights.map((h: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-[#16241B]"><CheckCircle2 className="w-5 h-5 text-[#2F9E5B] shrink-0 mt-0.5" />{h}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.amenities?.length > 0 && (
                <div className="mt-8 bg-white rounded-3xl border border-gray-100 shadow-sm p-7 md:p-9">
                  <SectionTitle>Amenities</SectionTitle>
                  <div className="flex flex-wrap gap-2">
                    {project.amenities.map((a: string, i: number) => (
                      <span key={i} className="px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-sm font-medium text-[#175631]">{a}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-28 self-start bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-br from-[#0F2A1C] via-[#123B22] to-[#1F6B3D] p-7 text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-300 font-bold">Price</p>
                <p className="text-3xl font-extrabold mt-1">{project.price || 'Price on request'}</p>
              </div>

              <div className="p-7">
                {facts.length > 0 && (
                  <dl className="space-y-4">
                    {facts.map((f, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0"><f.icon className="w-4 h-4 text-[#1F6B3D]" /></span>
                        <div><dt className="text-xs uppercase tracking-wide text-gray-400 font-semibold">{f.label}</dt><dd className="text-sm font-medium text-[#16241B]">{f.value}</dd></div>
                      </div>
                    ))}
                  </dl>
                )}

                {videos.length > 0 && (
                  <a href="#videos" className="mt-6 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-50 text-[#1F6B3D] font-semibold hover:bg-emerald-100 transition">
                    <Play className="w-4 h-4 fill-current" /> Watch project video
                  </a>
                )}

                <Link href="/contact" className="mt-3 flex items-center justify-center gap-2 text-center py-3.5 rounded-xl text-white font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(to right, #1F6B3D, #123B22)' }}>
                  Enquire about this project <ArrowRight className="w-4 h-4" />
                </Link>
                {project.brochureUrl && (
                  <a href={resolveMediaUrl(project.brochureUrl)} target="_blank" rel="noreferrer" className="mt-3 flex items-center justify-center gap-2 py-3 rounded-xl border border-[#1F6B3D]/25 font-semibold text-[#1F6B3D] hover:bg-emerald-50">
                    <FileText className="w-4 h-4" /> Download brochure
                  </a>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ───────── Fullscreen photo viewer ───────── */}
      {lightbox && images.length > 0 && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolveMediaUrl(images[activeImg])}
            alt={project.title}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full object-contain p-2 sm:p-8"
          />
          <button aria-label="Close" onClick={() => setLightbox(false)} className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center"><X className="w-6 h-6" /></button>
          <span className="absolute top-5 left-5 text-sm font-semibold text-white/80">{activeImg + 1} / {images.length}</span>
          {images.length > 1 && (
            <>
              <button aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); goImg(-1); }} className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center"><ChevronLeft className="w-6 h-6" /></button>
              <button aria-label="Next photo" onClick={(e) => { e.stopPropagation(); goImg(1); }} className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center"><ChevronRight className="w-6 h-6" /></button>
            </>
          )}
        </div>
      )}
    </>
  );
}
