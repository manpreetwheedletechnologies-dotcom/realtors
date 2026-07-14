import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp } from '../utils/animations';
import Link from 'next/dist/client/link';

const faqs = [
  {
    question: 'What types of land plots are available on PGI Land Realtors?',
    answer: 'We offer a wide variety of land plots including Residential Land, Commercial Land, Agricultural Land, Industrial Land, Mixed-Use Land, Plotted Development, Farm Land, Hill View Plot, Waterfront Land, and Corner Plots across 50+ cities in India.'
  },
  {
    question: 'How can I verify the legal status of a land plot?',
    answer: 'Each land listing on our platform goes through a rigorous verification process. We provide complete legal documentation including title deeds, encumbrance certificates, zoning approvals, and DTCP/RERA registrations. You can also schedule a legal consultation through our platform.'
  },
  {
    question: 'What measurement tools are available on the platform?',
    answer: 'PGI Land Realtors offers advanced measurement tools including Area Calculator for sq.ft, sq.yds, acres, and hectares conversion; Distance Measurement with GPS integration; Elevation Analysis with contour mapping; and Construction Estimator for cost and material calculations.'
  },
  {
    question: 'How do I schedule a site visit for a land plot?',
    answer: 'You can schedule a site visit directly through the land listing page. Simply click on "Schedule Visit" and choose your preferred date and time. Our team will coordinate with the owner and accompany you during the visit for a seamless experience.'
  },
  {
    question: 'What financing options are available for land purchase?',
    answer: 'We have partnerships with leading banks and financial institutions offering land purchase loans. Our EMI calculator helps you estimate monthly payments based on loan amount, interest rate, and tenure. We also provide assistance with loan documentation and processing.'
  },
  {
    question: 'Can I list my land plot for sale on your platform?',
    answer: 'Yes, absolutely! You can list your land plot by clicking on "List Your Land Plot" button. Our team will verify your property details, legal documents, and coordinate with potential buyers. We provide professional photography, virtual tours, and marketing support for your listing.'
  },
  {
    question: 'What is the process of buying land through your platform?',
    answer: 'The process is simple: 1) Search and filter land plots based on your requirements, 2) Verify the land details, legal documents, and zoning regulations, 3) Schedule a site visit, 4) Connect with the owner for price negotiation, 5) Complete the legal documentation and registration with our assistance, 6) Get possession of your land.'
  },
  {
    question: 'Do you offer virtual tours for land properties?',
    answer: 'Yes, we provide 360° immersive virtual tours for select properties. These interactive tours allow you to experience the property remotely with features like VR compatibility, voice guide, night mode, and measurement tools integrated into the tour experience.'
  }
];

export default function FAQ() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  return (
    <motion.section
      className="relative py-32 bg-white z-30"
      // initial="hidden"
      // whileInView="visible"
      // viewport={{ once: true, amount: 0.1 }}
      // variants={fadeInUp}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <motion.span
            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-2 border-emerald-200 text-xs uppercase tracking-[0.4em] text-emerald-600 font-bold"
          >
            ❓ FAQ
          </motion.span>
          <motion.h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
              Questions
            </span>
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to commonly asked questions about land buying, verification, and our services
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl border-2 border-gray-100 hover:border-emerald-200 transition-all overflow-hidden shadow-sm hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="w-full px-6 py-5 flex items-center justify-between text-left"
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                whileHover={{ backgroundColor: 'rgba(16,185,129,0.03)' }}
              >
                <span className="text-base md:text-lg font-semibold text-gray-900 pr-8">{faq.question}</span>
                <motion.span
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"
                  animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {openFaqIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-1">
                      <div className="h-px bg-gradient-to-r from-emerald-200 to-transparent mb-4" />
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          variants={fadeInUp}
        >
          <p className="text-gray-600 mb-4">Still have questions? We're here to help!</p>
          <Link href="/contact">
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-emerald-500/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support →
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}