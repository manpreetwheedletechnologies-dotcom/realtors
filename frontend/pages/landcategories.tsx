import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageHero from '../components/Pagehero';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] } }
};

const landTypes = [
  { name: 'Residential Land', icon: '🏠', desc: 'Plots approved for homes, apartments, and housing colonies.' },
  { name: 'Commercial Land', icon: '🏢', desc: 'Ideal for offices, retail, and mixed commercial development.' },
  { name: 'Agricultural Land', icon: '🌾', desc: 'Fertile plots for farming and cultivation.' },
  { name: 'Industrial Land', icon: '🏭', desc: 'Zoned for factories, warehouses, and manufacturing units.' },
  { name: 'Mixed-Use Land', icon: '🏘️', desc: 'Flexible plots for combined residential and commercial use.' },
  { name: 'Plotted Development', icon: '📐', desc: 'Pre-approved layouts ready for individual plot sale.' },
  { name: 'Farm Land', icon: '🌿', desc: 'Countryside plots for farmhouses and agri-tourism.' },
  { name: 'Hill View Plot', icon: '⛰️', desc: 'Scenic elevated land, popular for weekend homes.' },
  { name: 'Waterfront Land', icon: '🏖️', desc: 'Coastal or riverside plots with premium views.' },
  { name: 'Corner Plot', icon: '📍', desc: 'Two-road-facing plots with higher resale value.' }
];

const landZoning = [
  'Residential R-1', 'Residential R-2', 'Residential R-3',
  'Commercial C-1', 'Commercial C-2',
  'Industrial I-1', 'Industrial I-2',
  'Agricultural Zone', 'Mixed-Use Zone', 'Special Zone'
];

export default function LandCategories() {
  return (
    <>
      <Head>
        <title>Land Categories & Zoning | PGI Land Realtors</title>
        <meta name="description" content="Browse land by type — residential, commercial, agricultural, industrial — and zoning classification." />
      </Head>
      <main className="min-h-screen bg-white text-gray-800">
        <PageHero
          image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600"
          badge="Land Categories"
          titleLine1="Find Land by"
          titleLine2="Type & Zoning"
          subtitle="Browse through various land categories and zoning classifications to find the right fit."
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          {/* Land types */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
            {landTypes.map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(16,185,129,0.15)' }}
                className="p-5 bg-white rounded-2xl border-2 border-gray-100 text-center hover:border-emerald-400 transition-all"
              >
                <div className="text-3xl mb-2">{type.icon}</div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">{type.name}</h4>
                <p className="text-xs text-gray-500">{type.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Zoning */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Zoning <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">Classifications</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Understand what each zoning code permits before you buy</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {landZoning.map((zone, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all"
              >
                {zone}
              </motion.span>
            ))}
          </div>

          <div className="text-center">
            <Link href="/land-plots" className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-emerald-500/30 transition-all">
              Browse Land Plots by Category →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}