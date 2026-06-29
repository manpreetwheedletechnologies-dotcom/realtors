import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function App({ Component, pageProps }: AppProps) {
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
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
