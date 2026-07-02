import { useState, useMemo } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import PageHero from '../components/Pagehero';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] } }
};

const allLands = [
  {
    id: 1,
    title: 'Prime Residential Plot - South Delhi',
    location: 'South Delhi, Delhi',
    price: '₹2.5 Cr',
    size: '450 sq.yds',
    type: 'Residential Land',
    facing: 'North-East',
    owner: 'Shree Builders Pvt Ltd',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600',
    rating: 4.9,
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
    facing: 'East',
    owner: 'Green Valley Farms',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600',
    rating: 4.7,
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
    facing: 'West',
    owner: 'Bombay Land Developers',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
    rating: 4.8,
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
    facing: 'South',
    owner: 'Industrial Estates Ltd',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
    rating: 4.6,
    verification: 'Verified',
    measurement: '50ft x 52ft = 2,600 sq.ft'
  },
  {
    id: 5,
    title: 'Waterfront Plot - ECR',
    location: 'ECR, Chennai',
    price: '₹4.1 Cr',
    size: '800 sq.yds',
    type: 'Residential Land',
    facing: 'East',
    owner: 'Coastal Estates',
    image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=600',
    rating: 4.9,
    verification: 'RERA Registered',
    measurement: '40ft x 90ft = 3,600 sq.ft'
  },
  {
    id: 6,
    title: 'Hill View Plot - Lonavala',
    location: 'Lonavala, Maharashtra',
    price: '₹95 Lakh',
    size: '1 acre',
    type: 'Farm Land',
    facing: 'North',
    owner: 'Sahyadri Farms',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600',
    rating: 4.5,
    verification: 'Verified',
    measurement: '150ft x 290ft = 43,560 sq.ft'
  }
];

const landTypes = ['All', 'Residential Land', 'Commercial Land', 'Agricultural Land', 'Industrial Land', 'Farm Land'];

export default function LandPlots() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');

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
                <motion.div
                  key={land.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  whileHover={{ y: -8 }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img src={land.image} alt={land.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold rounded-full">
                      {land.type}
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 bg-emerald-400/90 backdrop-blur-sm text-xs font-bold rounded">
                      ⭐ {land.rating}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{land.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">📍 {land.location}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-emerald-600">{land.price}</span>
                      <span className="text-xs text-gray-500">{land.size}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
                      <span>👤 {land.owner}</span>
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full font-semibold">✅ {land.verification}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}