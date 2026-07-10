import { motion } from 'framer-motion';
import {
  Home as HomeIcon,
  Compass,
  Droplets,
  Zap,
  ShieldCheck,
  Ruler,
  FileCheck,
  MapPin,
  Building2,
  Leaf,
  Trees,
  Mountain
} from 'lucide-react';

/**
 * Features
 * --------
 * "Why <Land Type>, Verified" section used across every /land/[slug]
 * page. Badge, heading, description, and every feature card come from
 * JSON so this one component serves every land type.
 *
 * Props: data -> {
 *   badgeIcon, badgeLabel, titlePrefix, titleHighlight, description,
 *   list: [{ icon, title, description }]
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

// Map of icon-name strings (as stored in JSON) -> lucide-react component.
const ICONS = {
  Home: HomeIcon,
  Compass,
  Droplets,
  Zap,
  ShieldCheck,
  Ruler,
  FileCheck,
  MapPin,
  Building2,
  Leaf,
  Trees,
  Mountain
};

export default function Features({ data }) {
  const BadgeIcon = ICONS[data.badgeIcon] || HomeIcon;

  return (
    <motion.section
      className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <motion.div className="text-center mb-16" variants={fadeInUp}>
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 mb-6">
          <BadgeIcon className="w-4 h-4 text-emerald-700" />
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
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{data.description}</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.list?.map((f) => {
          const Icon = ICONS[f.icon] || ShieldCheck;
          return (
            <motion.div
              key={f.title}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:border-emerald-200 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-green-700/15 border border-emerald-200 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}