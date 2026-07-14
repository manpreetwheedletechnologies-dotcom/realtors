import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99], staggerChildren: 0.15 } }
};

/**
 * Closing call-to-action band. Drop this in wherever you want a final push
 * toward search or listing (home page, land-plots page, etc).
 *
 * - "Start Your Land Search Now" routes to /landplots
 * - "List Your Land Plot" routes to /contact (swap this for a dedicated
 *   listing-submission page/route if you build one later)
 */
export default function CTASection() {
  return (
    <motion.section
      className="relative py-32 bg-gradient-to-br from-emerald-600 via-green-700 to-black text-white z-30"
      // initial="hidden"
      // whileInView="visible"
      // viewport={{ once: true, amount: 0.1 }}
      // variants={fadeInUp}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-emerald-400/20 blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" variants={fadeInUp}>
          Ready to Find Your{' '}
          <span className="text-emerald-300">Perfect Land Plot</span>?
        </motion.h2>
        <motion.p className="text-xl text-gray-200 mb-10" variants={fadeInUp}>
          Join 15,000+ happy land owners who found their perfect plot through PGI Land Realtors
        </motion.p>
        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeInUp}>
          <Link href="/contact">
            <motion.button
              className="w-full sm:w-auto px-10 py-4 bg-white text-emerald-700 rounded-2xl font-bold shadow-2xl hover:shadow-emerald-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Land Search Now →
            </motion.button>
          </Link>
          <Link href="/landplots">
            <motion.button
              className="w-full sm:w-auto px-10 py-4 border-2 border-white/50 text-white rounded-2xl font-medium hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              List Your Land Plot
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}