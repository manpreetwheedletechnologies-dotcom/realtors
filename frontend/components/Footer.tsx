import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/Realtors white.png'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0a1a12] to-[#030a06] text-gray-300 pt-16 pb-8 border-t-2 border-emerald-700/50 shadow-[0_-8px_30px_rgba(0,20,0,0.7)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* ---------- logo with visibility fix ---------- */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* Light background panel behind logo for contrast */}
                <Image 
                  src={logo} 
                  alt="PGI Land Realtors – green & black logo" 
                  className="h-12 w-auto" 
                  priority
                />
            </div>
            <p className="text-sm text-gray-300/80 leading-relaxed">
              India's premier land aggregator with advanced measurement tools,
              360° virtual tours, and verified listings across 50+ cities.
            </p>

{/* ---------- Social Links ---------- */}
<div className="flex items-center gap-4 mt-5">
  {/* Facebook */}
  <a
    href="https://www.facebook.com/profile.php?id=61591837984294"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Visit our Facebook page"
    className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-900/40 to-emerald-700/20 border-2 border-emerald-500/30 text-emerald-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-400 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
    </svg>
    <span className="sr-only">Facebook</span>
    {/* Glow effect */}
    <span className="absolute inset-0 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-all duration-300"></span>
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/pgirealtors13/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Visit our Instagram page"
    className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-pink-900/40 to-purple-700/20 border-2 border-pink-500/30 text-pink-400 hover:text-white hover:bg-gradient-to-br hover:from-pink-600 hover:to-purple-600 hover:border-pink-400 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
      <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.89 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45.53C6.09.28 6.82.11 7.88.06 8.94.01 9.28 0 12 0zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.25A3.25 3.25 0 1 1 12 6.75a3.25 3.25 0 0 1 0 6.5zm5.2-8.45a1.17 1.17 0 1 1-2.34 0 1.17 1.17 0 0 1 2.34 0z" />
    </svg>
    <span className="sr-only">Instagram</span>
    <span className="absolute inset-0 rounded-full bg-pink-500/0 group-hover:bg-pink-500/10 transition-all duration-300"></span>
  </a>

  {/* YouTube */}
  <a
    href="https://www.youtube.com/@PGIRealtors"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Visit our YouTube channel"
    className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-red-900/40 to-red-700/20 border-2 border-red-500/30 text-red-400 hover:text-white hover:bg-red-600 hover:border-red-400 hover:scale-110 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z" />
    </svg>
    <span className="sr-only">YouTube</span>
    <span className="absolute inset-0 rounded-full bg-red-500/0 group-hover:bg-red-500/10 transition-all duration-300"></span>
  </a>
</div>
          </div>

          {/* ---------- explore ---------- */}
          <div>
            <h4 className="text-white font-bold mb-4 tracking-wide">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/land/residential-land" className="hover:text-emerald-300 transition-colors duration-200">Residential Land</Link></li>
              <li><Link href="/measurement" className="hover:text-emerald-300 transition-colors duration-200">Measurement Tools</Link></li>
              <li><Link href="/videos" className="hover:text-emerald-300 transition-colors duration-200">Video Walkthroughs</Link></li>
            </ul>
          </div>

          {/* ---------- company ---------- */}
          <div>
            <h4 className="text-white font-bold mb-4 tracking-wide">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-emerald-300 transition-colors duration-200">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-300 transition-colors duration-200">Contact</Link></li>
              <li><Link href="/" className="hover:text-emerald-300 transition-colors duration-200">Home</Link></li>
            </ul>
          </div>

          {/* ---------- contact ---------- */}
          <div>
            <h4 className="text-white font-bold mb-4 tracking-wide">Get in Touch</h4>
            <ul className="space-y-2 text-sm text-gray-300/80">
              <li className="flex items-center gap-2">📍 Pilot no. 8c near 100x school  techzone 4, Greator noida, India</li>
              <li className="flex items-center gap-2">📞 +91 9990960187</li>
              <li className="flex items-center gap-2">✉️ greenspragati@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* ---------- bottom bar ---------- */}
        <div className="border-t border-emerald-700/30 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-400/70">
          <span>© {new Date().getFullYear()} PGI Land Realtors. All rights reserved.</span>
          <span className="tracking-wide">Made for land buyers &amp; owners across India</span>
        </div>
      </div>
    </footer>
  );
}