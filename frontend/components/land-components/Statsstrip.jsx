import { motion } from 'framer-motion';

/**
 * StatsStrip
 * ----------
 * The floating white stats card that overlaps the bottom of the hero
 * image (e.g. "1,800+ Residential Plots"). Used across every
 * /land/[slug] page — the list of stats comes entirely from JSON.
 *
 * Props: stats -> [{ value, label }]
 */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

export default function StatsStrip({ stats }) {
  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={staggerContainer}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
        {stats?.map((stat) => (
          <motion.div key={stat.label} variants={fadeInUp} className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
              {stat.value}
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}