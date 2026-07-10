import { motion } from 'framer-motion';
import Link from 'next/link';
import LandPlotCard from './Landplotcard';

// Enhanced featured lands data — each plot now has an `images` array
// (2-3 real, type-matched photos) instead of a single `image`. LandPlotCard
// auto-cycles through these with a crossfade + slow zoom to feel "live".
export const featuredLands = [
   {
    id: 1,
    title: 'Prime Residential Plot - South Delhi',
    location: 'South Delhi, Delhi',
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
    location: 'Whitefield, Bangalore',
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
      "/agri7.png",
      "/agri8.png"
    ],
    rating: 4.7,
    amenities: ['Fertile Soil', 'Water Borewell', 'Fencing', 'Farm House'],
    verification: 'Verified',
    measurement: '200ft x 435ft = 87,000 sq.ft'
  },
  {
    id: 3,
    title: 'Commercial Land - BKC',
    location: 'BKC, Mumbai',
    price: '₹8.5 Cr',
    size: '1200 sq.yds',
    type: 'Commercial Land',
    dimensions: '60ft × 80ft',
    facing: 'West',
    owner: 'Bombay Land Developers',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
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
    title: 'Industrial Plot - Andheri',
    location: 'Andheri, Mumbai',
    price: '₹3.2 Cr',
    size: '650 sq.yds',
    type: 'Industrial Land',
    dimensions: '50ft × 52ft',
    facing: 'South',
    owner: 'Industrial Estates Ltd',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
      "/industrial1.jpg",
      "/industrial2.jpg",
      "/industrial3.jpg"
    ],
    rating: 4.6,
    amenities: ['Power Supply', 'Water Access', 'Loading Bay', 'Security'],
    verification: 'Verified',
    measurement: '50ft x 52ft = 2,600 sq.ft'
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.6, -0.05, 0.01, 0.99], staggerChildren: 0.15 }
  }
};

export default function FeaturedLandPlotsSection() {
  return (
    <motion.section
      className="relative py-32 bg-gradient-to-b from-white via-emerald-50/30 to-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInUp}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" variants={fadeInUp}>
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl">🌳</span>
            <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">
              Featured Land Plots with Measurements
            </span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gray-900">Prime </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
              Land Properties
            </span>
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover premium land plots with precise measurements and complete verification —
            hover any card to browse real photos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredLands.map((land, index) => (
            <LandPlotCard key={land.id} land={land} index={index} />
          ))}
        </div>

        <motion.div className="text-center mt-12">
          <Link href="/landplots">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-emerald-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All 5,000+ Land Plots →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}