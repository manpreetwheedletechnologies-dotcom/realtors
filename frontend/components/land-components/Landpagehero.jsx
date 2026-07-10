import { motion } from 'framer-motion';

/**
 * LandPageHero
 * ------------
 * Dedicated hero for /land/[slug] pages. Kept as its own component
 * (separate from components/Pagehero.jsx, which is used on other pages)
 * so changes here never affect that page. Same visual design, but every
 * prop is read straight off the JSON block for the current land type.
 *
 * Props:
 * - image, badge, titleLine1, titleLine2, subtitle, height (all strings,
 *   height optional — defaults to the same size as Pagehero).
 */
export default function LandPageHero({
  image,
  badge,
  titleLine1,
  titleLine2,
  subtitle,
  height = 'h-[60vh] min-h-[420px]'
}) {
  return (
    <section className={`relative ${height} flex items-center justify-center overflow-hidden bg-black`}>
      <div className="absolute inset-0 z-0">
        <motion.img
          src={image}
          alt=""
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 via-transparent to-emerald-900/40" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full pt-16">
        {badge && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs uppercase tracking-[0.3em] text-emerald-300 font-bold mb-6"
          >
            {badge}
          </motion.span>
        )}

        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="block text-white drop-shadow-2xl">{titleLine1}</span>
          {titleLine2 && (
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-500">
              {titleLine2}
            </span>
          )}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm p-3 rounded-xl bg-black/20 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}