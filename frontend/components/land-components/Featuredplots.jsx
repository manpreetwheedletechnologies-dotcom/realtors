import { motion } from 'framer-motion';
import LandFeatureCard from './LandFeatureCard';

/**
 * FeaturedPlots
 * -------------
 * "<Land Type> Available Now" listings grid used across every
 * /land/[slug] page. Badge, heading, and every plot come from JSON.
 * Uses LandFeatureCard (a component dedicated to this page family) —
 * NOT Landplotcard.jsx, which is used on a different page.
 *
 * Props: data -> {
 *   badgeEmoji, badgeLabel, titlePrefix, titleHighlight,
 *   plots: [ ...plot objects ]
 * }
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

export default function FeaturedPlots({ data }) {
  return (
    <motion.section
      className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={staggerContainer}
    >
      <motion.div className="text-center mb-12" variants={fadeInUp}>
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 mb-6">
          <span className="text-2xl">{data.badgeEmoji}</span>
          <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">
            {data.badgeLabel}
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gray-900">{data.titlePrefix} </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
            {data.titleHighlight}
          </span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.plots?.map((land, index) => (
          <LandFeatureCard key={land.id} land={land} index={index} />
        ))}
      </div>
    </motion.section>
  );
}