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
      lerp: 0.06,            // 0-1 ke beech: jitna kam, utna zyada "heavy/smooth" feel (0.08-0.1 sweet spot hai)
      smoothWheel: true,
      wheelMultiplier: 0.28, // 1 se kam = scroll speed cap/limited — jitna scroll karo, utni distance kam tay hogi per tick
      touchMultiplier: 1.2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
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
