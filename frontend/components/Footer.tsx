import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌳</span>
              <span className="font-bold text-lg text-white">PGI Land Realtors</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              India's premier land aggregator with advanced measurement tools,
              360° virtual tours, and verified listings across 50+ cities.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/land-plots" className="hover:text-emerald-400 transition-colors">Featured Land Plots</Link></li>
              <li><Link href="/measurement-tools" className="hover:text-emerald-400 transition-colors">Measurement Tools</Link></li>
              <li><Link href="/video-walkthroughs" className="hover:text-emerald-400 transition-colors">Video Walkthroughs</Link></li>
              <li><Link href="/land-categories" className="hover:text-emerald-400 transition-colors">Land Categories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 noida, India</li>
              <li>📞 +91XXXXXXXXXX</li>
              <li>✉️ hello@pgilandrealtors.in</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} PGI Land Realtors. All rights reserved.</span>
          <span>Made for land buyers & owners across India</span>
        </div>
      </div>
    </footer>
  );
}