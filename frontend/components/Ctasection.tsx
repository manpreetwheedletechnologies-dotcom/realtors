import Link from 'next/link';
import { useRouter } from 'next/router';

/**
 * Closing call-to-action band. Drop this in wherever you want a final push
 * toward search or listing (home page, land-plots page, etc).
 *
 * - "Start Your Land Search Now" smooth-scrolls to #search (same page)
 *   or navigates + scrolls (from a different page)
 * - "List Your Land Plot" routes to /landplots
 */
export default function CTASection() {
  const router = useRouter();

const handleSearchClick = (e: React.MouseEvent) => {
  const target = document.getElementById('search');
  if (!target) return; // link ko normal navigate karne do agar target hi nahi mila

  if (router.pathname === '/') {
    e.preventDefault();
    const lenis = (window as any).lenis;

    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(target, { offset: -20, duration: 1.5 });
    } else {
      // Lenis available nahi ya broken — fallback native smooth scroll
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

  return (
    <section className="relative py-32 bg-gradient-to-br from-emerald-600 via-green-700 to-black text-white z-30 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-emerald-400/20 blur-3xl animate-cta-glow" />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Ready to Find Your{' '}
          <span className="text-emerald-300">Perfect Land Plot</span>?
        </h2>
        <p className="text-xl text-gray-200 mb-10">
          Join 15,000+ happy land owners who found their perfect plot through PGI Land Realtors
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/#search" onClick={handleSearchClick}>
            <button className="w-full sm:w-auto px-10 py-4 bg-white text-emerald-700 rounded-2xl font-bold shadow-2xl transition-all duration-300 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95">
              Start Your Land Search Now →
            </button>
          </Link>
          <Link href="/landplots">
            <button className="w-full sm:w-auto px-10 py-4 border-2 border-white/50 text-white rounded-2xl font-medium transition-all duration-300 hover:bg-white/10 hover:scale-105 active:scale-95">
              List Your Land Plot
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}