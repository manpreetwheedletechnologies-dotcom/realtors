import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * FaqSection
 * ----------
 * "<Land Type> FAQs" accordion used across every /land/[slug] page.
 * Badge, heading, and every Q&A pair come from JSON.
 *
 * Props: data -> {
 *   badgeLabel, titlePrefix, titleHighlight,
 *   faqs: [{ question, answer }]
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

export default function FaqSection({ data }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="py-28 bg-gradient-to-b from-white via-emerald-50/30 to-white">
      <motion.div
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <motion.div className="text-center mb-12" variants={fadeInUp}>
          <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">
            {data.badgeLabel}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-gray-900">
            {data.titlePrefix} <span className="text-emerald-600">{data.titleHighlight}</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {data.faqs?.map((item, i) => (
            <motion.div
              key={item.question}
              variants={fadeInUp}
              className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold text-gray-900">{item.question}</span>
                <motion.span
                  animate={{ rotate: openFaq === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 text-emerald-600"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}