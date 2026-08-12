import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Lenis from 'lenis';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const hideLayout =
  router.pathname.startsWith('/admin') ||
  router.pathname === '/login';

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

  return (
    <>
     {!hideLayout && <NavBar />}

<Component {...pageProps} />

{!hideLayout && <Footer />}
    </>
  );
}