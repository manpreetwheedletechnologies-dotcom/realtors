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
              <li className="flex items-center gap-2">📍 Pilot no. 8c near 100 x school  techzone 4, Greator noida, India</li>
              <li className="flex items-center gap-2">📞 +91 9990960187</li>
              <li className="flex items-center gap-2">✉️ hello@pgilandrealtors.in</li>
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