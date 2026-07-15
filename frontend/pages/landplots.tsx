import { useState, useEffect, useRef, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '../components/Pagehero';
import LandPlotCard from '../components/Landplotcard';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] } }
};

export const allLands = [
  {
    id: 1,
    title: 'Prime Residential Plot',
    location: '',
    price: '₹2.5 Cr',
    size: '450 sq.yds',
    type: 'Residential Land',
    dimensions: '30ft × 45ft',
    facing: 'North-East',
    owner: 'Shree Builders Pvt Ltd',
    images: [
      '/residential3.png',
      "/residential1.png",
      "/residential2.png",
       "/residential4.png",
      "/residential5.png"
    ],
    rating: 4.9,
    amenities: ['Corner Plot', 'Wide Road', 'Water Supply', 'Electricity', 'Drainage'],
    verification: 'Approved',
    measurement: '30ft x 45ft = 1350 sq.ft'
  },
  {
    id: 2,
    title: 'Agricultural Land - Whitefield',
    location: '',
    price: '₹1.8 Cr',
    size: '2 acres',
    type: 'Agricultural Land',
    dimensions: '200ft × 435ft',
    facing: 'East',
    owner: 'Green Valley Farms',
    images: [
      "/agri1.jpg",
      "/agri2.jpg",
      "/agri3.jpg",
      "/agri4.jpg",
      "/agri5.jpg",
      "/agri6.jpg",
      "/agri7.jpg",
      "/agri8.jpg"
    ],
    rating: 4.7,
    amenities: ['Fertile Soil', 'Water Borewell', 'Fencing', 'Farm House'],
    verification: 'Verified',
    measurement: '200ft x 435ft = 87,000 sq.ft'
  },
  {
    id: 3,
    title: 'Commercial Land - BKC',
    location: '',
    price: '₹8.5 Cr',
    size: '1200 sq.yds',
    type: 'Commercial Land',
    dimensions: '60ft × 80ft',
    facing: 'West',
    owner: 'Bombay Land Developers',
    images: [
      "/commercial1.jpg",
      "/commercial2.jpg",
      "/commercial3.jpg",
      "/commercial4.jpg"
    ],
    rating: 4.8,
    amenities: ['Prime Location', 'Road Access', 'Parking Space', 'Construction Allowed'],
    verification: 'Approved',
    measurement: '60ft x 80ft = 4,800 sq.ft'
  },
  {
    id: 4,
    title: 'Industrial Plot ',
    location: '',
    price: '₹3.2 Cr',
    size: '650 sq.yds',
    type: 'Industrial Land',
    dimensions: '50ft × 52ft',
    facing: 'South',
    owner: 'Industrial Estates Ltd',
    images: [
      "/industrial1.jpg",
      "/industrial2.jpg",
      "/industrial3.jpg"
    ],
    rating: 4.6,
    amenities: ['Power Supply', 'Water Access', 'Loading Bay', 'Security'],
    verification: 'Verified',
    measurement: '50ft x 52ft = 2,600 sq.ft'
  },
  {
    id: 5,
    title: 'Waterfront Plot - ECR',
    location: '',
    price: '₹4.1 Cr',
    size: '800 sq.yds',
    type: 'Residential Land',
    dimensions: '40ft × 90ft',
    facing: 'East',
    owner: 'Coastal Estates',
    images: [
      'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=600'
    ],
    rating: 4.9,
    amenities: ['Beach Access', 'Scenic View', 'Gated Community', 'Road Access'],
    verification: 'RERA Registered',
    measurement: '40ft x 90ft = 3,600 sq.ft'
  },
  {
    id: 6,
    title: 'Hill View Plot - Lonavala',
    location: '',
    price: '₹95 Lakh',
    size: '1 acre',
    type: 'Farm Land',
    dimensions: '150ft × 290ft',
    facing: 'North',
    owner: 'Sahyadri Farms',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600'
    ],
    rating: 4.5,
    amenities: ['Hill View', 'Fresh Air', 'Farm House', 'Fencing'],
    verification: 'Verified',
    measurement: '150ft x 290ft = 43,560 sq.ft'
  }
];

const landTypes = ['All', 'Residential Land', 'Commercial Land', 'Agricultural Land', 'Industrial Land', 'Farm Land'];

// Category cards shown at the top — background image + count pulled live from allLands
const categories = [
  {
    label: 'Residential Land',
    route : 'residential-land',
    icon: '🏡',
    image: '/residential3.png',
    match: (l) => l.type === 'Residential Land'
  },
  {
    label: 'Commercial Land',
    route : 'commercial-land',
    icon: '🏢',
    image: '/commercial1.jpg',
    match: (l) => l.type === 'Commercial Land'
  },
  {
    label: 'Agricultural Land',
    route : 'agricultural-land',
    icon: '🌾',
    image: '/agri1.jpg',
    match: (l) => l.type === 'Agricultural Land'
  },
  {
    label: 'Industrial Land',
    route : 'industrial-land',
    icon: '🏭',
    image: '/industrial1.jpg',
    match: (l) => l.type === 'Industrial Land'
  },
  {
    label: 'Mixed-Use Land',
    route : 'mixed-use-land',
    icon: '🏘️',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    match: (l) => (l.amenities || []).some((a) => /mixed/i.test(a))
  },
  {
    label: 'Plotted Development',
    route : 'plotted-development',
    icon: '📐',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    match: (l) => /plotted|layout/i.test(l.title)
  },
  {
    label: 'Farm Land',
    route : 'farm-land',
    icon: '🌱',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    match: (l) => l.type === 'Farm Land'
  },
  {
    label: 'Hill View Plot',
    route : 'hill-view-plot',
    icon: '⛰️',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800',
    match: (l) => (l.amenities || []).some((a) => /hill/i.test(a)) || /hill/i.test(l.title)
  }
];

function CategoryGrid() {
  const counts = useMemo(
    () => categories.map((c) => allLands.filter(c.match).length),
    []
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Browse by Category</h2>
        <p className="text-gray-500 mt-2">Browse through various land categories and zoning classifications</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: (i % 5) * 0.06 }}
          >
            <Link
              href={`/land/${encodeURIComponent(cat.route)}`}
              scroll={false}
              className="group relative block h-40 sm:h-44 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 ring-1 ring-black/5"
            >
              {/* background image, slow zoom on hover */}
              <motion.img
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />

              {/* gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/0 group-hover:from-emerald-900/85 transition-colors duration-300" />

              {/* count badge */}
              {counts[i] > 0 && (
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-white/90 text-[11px] font-bold text-emerald-700">
                  {counts[i]} {counts[i] === 1 ? 'plot' : 'plots'}
                </span>
              )}

              {/* content */}
              <div className="absolute inset-x-0 bottom-0 p-3.5 flex items-center gap-2">
                <span className="text-2xl drop-shadow-sm">{cat.icon}</span>
                <span className="text-white font-semibold text-sm sm:text-[15px] leading-tight drop-shadow-sm">
                  {cat.label}
                </span>
              </div>

              {/* subtle border glow on hover */}
              <div className="absolute inset-0 rounded-2xl ring-2 ring-emerald-400/0 group-hover:ring-emerald-400/70 transition-all duration-300 pointer-events-none" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/**
 * CardImage
 * Same auto-cycling + crossfade + slow zoom effect as LandPlotCard.
 * Accepts either `images` (array) or a single `image` (string) —
 * so old data without an array still works.
 */
function CardImage({ land }) {
  const images =
    land.images && land.images.length > 0 ? land.images : [land.image];
  const [activeImg, setActiveImg] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (images.length <= 1 || isHovered) return;
    timerRef.current = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % images.length);
    }, 3800);
    return () => clearInterval(timerRef.current);
  }, [images.length, isHovered]);

  return (
    <div
      className="relative h-52 overflow-hidden bg-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={activeImg}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          <motion.img
            src={images[activeImg]}
            alt={`${land.title} — view ${activeImg + 1}`}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.12 }}
            transition={{ duration: 4.5, ease: 'linear' }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold rounded-full z-10">
        {land.type}
      </div>
      <div className="absolute top-3 right-3 px-2 py-1 bg-emerald-400/90 backdrop-blur-sm text-xs font-bold rounded z-10">
        ⭐ {land.rating}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === activeImg ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function LandPlots() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');

  // If a category card is clicked (?type=Residential Land), pick it up and
  // filter the list below automatically.
  // useEffect(() => {
  //   if (router.query.type && landTypes.includes(router.query.type)) {
  //     setType(router.query.type);
  //   }
  // }, [router.query.type]);

  const filtered = useMemo(() => {
    return allLands.filter((land) => {
      const matchesSearch =
        land.title.toLowerCase().includes(search.toLowerCase()) ||
        land.location.toLowerCase().includes(search.toLowerCase());
      const matchesType = type === 'All' || land.type === type;
      return matchesSearch && matchesType;
    });
  }, [search, type]);

  return (
    <>
      <Head>
        <title>Featured Land Plots | PGI Land Realtors</title>
        <meta name="description" content="Browse verified land plots across India — residential, commercial, agricultural, and industrial." />
      </Head>
      <main className="min-h-screen bg-white text-gray-800">
        <PageHero
          image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600"
          badge="🌳 All Listings"
          titleLine1="Featured"
          titleLine2="Land Plots"
          subtitle={`${filtered.length} verified plots available right now, across residential, commercial, agricultural, and industrial zones.`}
        />

        <CategoryGrid />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10 max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="🔍 Search by title or location..."
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none transition-all"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {landTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-16">No plots match your search. Try a different keyword or type.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((land, index) => (
                <LandPlotCard key={land.id} land={land} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}