import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

// Motion exit/enter transition duration — dono jagah (motion.div aur scroll-fix) same rakho
const PAGE_TRANSITION_DURATION = 0.4; // seconds
const EXIT_DURATION_MS = PAGE_TRANSITION_DURATION * 1000;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const hideLayout =
    router.pathname.startsWith('/admin') ||
    router.pathname === '/login';

  // 1) Lenis init
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.55,
      touchMultiplier: 1.2,
      infinite: false,
    });

    if (typeof lenis.scrollTo === 'function') {
      (window as any).lenis = lenis;
    } else {
      console.warn('Lenis instance missing scrollTo — check lenis package version');
    }

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if ((window as any).lenis === lenis) {
        (window as any).lenis = null;
      }
    };
  }, []);

  // 2) Route change scroll correction — sirf agar OLD page scrolled tha
  useEffect(() => {
    let scrollBeforeNav = 0;
    let resetTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleRouteChangeStart = () => {
      const lenis = (window as any).lenis;
      // window.scrollY zyada reliable hai (lenis.scroll lerp lag ki wajah se stale ho sakta hai)
      scrollBeforeNav = window.scrollY || lenis?.scroll || 0;
    };

    const handleRouteChangeComplete = () => {
      const wasScrolled = scrollBeforeNav > 5;
      scrollBeforeNav = 0;

      if (!wasScrolled) return; // page scroll nahi tha -> kuch mat karo

      if (resetTimeout) clearTimeout(resetTimeout);

      // exit animation khatam hone tak wait karo, phir hi reset karo
      resetTimeout = setTimeout(() => {
        const lenis = (window as any).lenis;
        if (lenis) {
          lenis.resize();               // new page ki height recalc
          lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      }, EXIT_DURATION_MS);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      if (resetTimeout) clearTimeout(resetTimeout);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              darkMode: 'class',
              theme: {
                extend: {
                  colors: {
                    brand: { 50: '#EAF4ED', 100: '#CFE6D6', 300: '#7DC196', 500: '#2F9E5B', 600: '#1F6B3D', 700: '#175631', 900: '#0F2A1C' }
                  }
                }
              }
            }
          `
        }} />
      </Head>

      {!hideLayout && <NavBar />}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.pathname}
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: PAGE_TRANSITION_DURATION, ease: 'easeInOut' }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>

      {!hideLayout && <Footer />}
    </>
  );
}