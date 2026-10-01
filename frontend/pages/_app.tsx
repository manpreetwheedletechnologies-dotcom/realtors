import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Lenis from 'lenis';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const hideLayout =
  router.pathname.startsWith('/admin') ||
  router.pathname === '/login';

// Preloader sirf tab dikhao jab site ka PEHLA page public ho (admin / login par nahi),
// aur sirf ek baar - page change par dobara nahi aata.
const [showPreloader, setShowPreloader] = useState(!hideLayout);
const handlePreloaderFinish = useCallback(() => setShowPreloader(false), []);

useEffect(() => {
  // Lenis hijacks page-level wheel scrolling for the smooth-scroll marketing
  // site. The admin dashboard has its own internal scrollable container
  // (AdminLayout's <main>), so Lenis must not run there — otherwise it
  // intercepts the mouse wheel and the inner panel only scrolls via the
  // scrollbar thumb/buttons, not the wheel.
  if (hideLayout) return;

  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
    infinite: false,
  });

  // sanity check — confirm scrollTo method actually exists before exposing
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
}, [hideLayout]);

  // Preloader ke peeche smooth-scroll (Lenis) band rakho, khatam hote hi chalu
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (!lenis) return;
    if (showPreloader) lenis.stop?.();
    else lenis.start?.();
  }, [showPreloader]);

  return (
    <>
     {showPreloader && <Preloader minDuration={4500} onFinish={handlePreloaderFinish} theme="light"/>}
     {!hideLayout && <NavBar />}

<Component {...pageProps} />

{!hideLayout && <Footer />}
    </>
  );
}