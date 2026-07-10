import { motion } from 'framer-motion';
import {
  MapPin,
  FileCheck,
  Ruler,
  ShieldCheck,
  Compass,
  Droplets,
  Zap,
  Home as HomeIcon
} from 'lucide-react';

/**
 * VerificationJourney
 * -------------------
 * "The Verification Journey" step timeline used across every
 * /land/[slug] page. Badge, heading, and every step come from JSON.
 *
 * Props: data -> {
 *   badgeLabel, titlePrefix, titleHighlight,
 *   steps: [{ step, title, description, icon }]
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

const ICONS = {
  MapPin,
  FileCheck,
  Ruler,
  ShieldCheck,
  Compass,
  Droplets,
  Zap,
  Home: HomeIcon
};

export default function VerificationJourney({ data }) {
  return (
    <section className="py-28 bg-gradient-to-b from-emerald-50/40 via-white to-white">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">
            {data.badgeLabel}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-gray-900">
            {data.titlePrefix} <span className="text-emerald-600">{data.titleHighlight}</span>
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* connecting line */}
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200" />

          {data.steps?.map((s) => {
            const Icon = ICONS[s.icon] || ShieldCheck;
            return (
              <motion.div key={s.step} variants={fadeInUp} className="relative text-center">
                <div className="relative z-10 w-16 h-16 mx-auto rounded-2xl bg-white border-2 border-emerald-500 shadow-lg flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-emerald-600" />
                </div>
                <div className="text-xs font-bold text-emerald-500 tracking-widest mb-2">
                  STEP {s.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed px-2">{s.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}