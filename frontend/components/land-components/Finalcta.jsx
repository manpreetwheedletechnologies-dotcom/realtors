import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * FinalCta
 * --------
 * Closing green call-to-action banner used across every /land/[slug]
 * page. Title, description and the button (label + url) come from JSON.
 *
 * Props: data -> { title, description, button: { label, url } }
 */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};

export default function FinalCta({ data }) {
  return (
    <motion.section
      className="py-24 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
    >
      <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-gradient-to-br from-emerald-600 to-green-700 px-8 py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />
        <h2 className="relative text-3xl md:text-5xl font-bold text-white mb-4">
          {data.title}
        </h2>
        <p className="relative text-emerald-50 max-w-xl mx-auto mb-8">{data.description}</p>
        <Link href={data.button.url} legacyBehavior>
          <motion.a
            className="relative inline-block px-8 py-4 bg-white text-emerald-700 rounded-2xl font-bold shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {data.button.label}
          </motion.a>
        </Link>
      </div>
    </motion.section>
  );
}