import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
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
}, []);

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

<Component {...pageProps} />

{!hideLayout && <Footer />}
    </>
  );
}
