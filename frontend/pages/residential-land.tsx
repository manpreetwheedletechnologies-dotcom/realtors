import { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Ruler,
  Compass,
  FileCheck,
  Droplets,
  Zap,
  ChevronDown,
  MapPin,
  Home as HomeIcon
} from 'lucide-react';
import PageHero from '../components/Pagehero';
import LandPlotCard from '../components/Landplotcard';

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

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const residentialPlots = [
  {
    id: 101,
    title: 'Prime Residential Plot - South Delhi',
    location: 'South Delhi, Delhi',
    price: '₹2.5 Cr',
    size: '450 sq.yds',
    type: 'Residential Land',
    dimensions: '30ft × 45ft',
    facing: 'North-East',
    owner: 'Shree Builders Pvt Ltd',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700'
    ],
    rating: 4.9,
    amenities: ['Corner Plot', 'Wide Road', 'Water Supply', 'Electricity', 'Drainage'],
    verification: 'Approved',
    measurement: '30ft x 45ft = 1350 sq.ft'
  },
  {
    id: 102,
    title: 'Waterfront Residential Plot - ECR',
    location: 'ECR, Chennai',
    price: '₹4.1 Cr',
    size: '800 sq.yds',
    type: 'Residential Land',
    dimensions: '40ft × 90ft',
    facing: 'East',
    owner: 'Coastal Estates',
    images: [
      'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=700',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700'
    ],
    rating: 4.9,
    amenities: ['Sea View', 'Gated Community', 'Water Supply', 'Electricity'],
    verification: 'RERA Registered',
    measurement: '40ft x 90ft = 3,600 sq.ft'
  },
  {
    id: 103,
    title: 'Gated Community Plot - Whitefield',
    location: 'Whitefield, Bangalore',
    price: '₹1.9 Cr',
    size: '600 sq.yds',
    type: 'Residential Land',
    dimensions: '36ft × 60ft',
    facing: 'North',
    owner: 'Green Valley Developers',
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700',
      'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=700'
    ],
    rating: 4.7,
    amenities: ['Clubhouse', 'Security', 'Wide Road', 'Park Facing'],
    verification: 'Verified',
    measurement: '36ft x 60ft = 2,160 sq.ft'
  },
  {
    id: 104,
    title: 'Hillside Residential Plot - Lonavala',
    location: 'Lonavala, Maharashtra',
    price: '₹95 Lakh',
    size: '500 sq.yds',
    type: 'Residential Land',
    dimensions: '32ft × 50ft',
    facing: 'South',
    owner: 'Sahyadri Estates',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700',
      'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=700',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700'
    ],
    rating: 4.6,
    amenities: ['Hill View', 'Gated Entry', 'Electricity', 'Drainage'],
    verification: 'Approved',
    measurement: '32ft x 50ft = 1,600 sq.ft'
  },
  {
    id: 105,
    title: 'Premium Plot - Gurugram Sector 108',
    location: 'Sector 108, Gurugram',
    price: '₹3.6 Cr',
    size: '520 sq.yds',
    type: 'Residential Land',
    dimensions: '33ft × 47ft',
    facing: 'East',
    owner: 'Capital Land Ventures',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700',
      'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=700',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700'
    ],
    rating: 4.8,
    amenities: ['RERA Registered', 'Wide Road', 'Underground Wiring', 'Park'],
    verification: 'RERA Registered',
    measurement: '33ft x 47ft = 1,551 sq.ft'
  },
  {
    id: 106,
    title: 'Riverside Residential Plot - Rishikesh',
    location: 'Rishikesh, Uttarakhand',
    price: '₹1.2 Cr',
    size: '400 sq.yds',
    type: 'Residential Land',
    dimensions: '28ft × 42ft',
    facing: 'North-East',
    owner: 'Himalayan Realty',
    images: [
      'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=700',
      'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=700',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700'
    ],
    rating: 4.5,
    amenities: ['River View', 'Water Supply', 'Wide Road'],
    verification: 'Verified',
    measurement: '28ft x 42ft = 1,176 sq.ft'
  }
];

const journeySteps = [
  {
    step: '01',
    title: 'Site Visit & Photos',
    desc: 'Our team physically walks the plot and captures real, dated photographs — no stock images.',
    icon: MapPin
  },
  {
    step: '02',
    title: 'Document Check',
    desc: 'Title deed, encumbrance certificate, and mutation records verified against government registries.',
    icon: FileCheck
  },
  {
    step: '03',
    title: 'Measurement Audit',
    desc: 'Exact dimensions and boundaries confirmed on-ground to match the sale deed — down to the foot.',
    icon: Ruler
  },
  {
    step: '04',
    title: 'Approval Tagging',
    desc: 'Plot is tagged Approved, Verified, or RERA Registered based on what actually checks out.',
    icon: ShieldCheck
  }
];

const features = [
  {
    icon: Compass,
    title: 'Verified Facing & Dimensions',
    desc: 'Every plot lists true compass facing and exact boundary measurements, confirmed on-site.'
  },
  {
    icon: Droplets,
    title: 'Utility-Ready Plots',
    desc: 'Water, drainage, and sewage access checked before listing — not promised, verified.'
  },
  {
    icon: Zap,
    title: 'Electricity & Road Access',
    desc: 'Grid connection and road-width details included so you know what you\'re building on.'
  },
  {
    icon: ShieldCheck,
    title: 'Clean Title Guarantee',
    desc: 'Legal ownership and encumbrance history checked by our verification team before listing.'
  }
];

const faqs = [
  {
    q: 'How is a residential plot different from other land types on PGI?',
    a: 'Residential plots are zoned specifically for housing construction, and each listing includes facing direction, road width, and utility access — details that matter most when you\'re planning to build a home.'
  },
  {
    q: 'What does the "RERA Registered" tag mean?',
    a: 'It means the plot and its developer are registered under the Real Estate (Regulation and Development) Act, giving you added legal protection and transparency on project timelines.'
  },
  {
    q: 'Can I schedule a physical site visit before buying?',
    a: 'Yes. Every listing page lets you request a guided site visit with our local verification team, who can walk the boundaries with you in person.'
  },
  {
    q: 'Are the photos and measurements on each listing current?',
    a: 'Yes — our verification team re-visits listings periodically, and each plot shows the date of its last on-site confirmation.'
  }
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function ResidentialLand() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <Head>
        <title>Residential Land Plots | PGI Land Realtors</title>
        <meta
          name="description"
          content="Browse verified residential land plots across India with exact dimensions, facing direction, and complete legal verification."
        />
      </Head>

      <main className="min-h-screen bg-white text-gray-800">
        <PageHero
          image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600"
          badge="🏡 Residential Land"
          titleLine1="Residential Land"
          titleLine2="Built to Move In On"
          subtitle="1,800+ verified residential plots across India — exact dimensions, real facing direction, and a clean legal title, every time."
        />

        {/* Stats strip */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            {[
              ['1,800+', 'Residential Plots'],
              ['35+', 'Cities Covered'],
              ['600+', 'RERA Registered'],
              ['9,200+', 'Happy Families']
            ].map(([value, label]) => (
              <motion.div key={label} variants={fadeInUp} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
                  {value}
                </div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why residential land with PGI */}
        <motion.section
          className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 mb-6">
              <HomeIcon className="w-4 h-4 text-emerald-700" />
              <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                Why Residential Land, Verified
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-900">Every plot, checked </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
                before it's listed
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Not another listings board. Every residential plot goes through the same
              verification standard before it reaches you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:border-emerald-200 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-green-700/15 border border-emerald-200 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Verification Journey — signature element */}
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
                The Verification Journey
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 text-gray-900">
                From site visit to <span className="text-emerald-600">sale-ready</span>
              </h2>
            </motion.div>

            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* connecting line */}
              <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200" />

              {journeySteps.map((s) => (
                <motion.div key={s.step} variants={fadeInUp} className="relative text-center">
                  <div className="relative z-10 w-16 h-16 mx-auto rounded-2xl bg-white border-2 border-emerald-500 shadow-lg flex items-center justify-center mb-5">
                    <s.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div className="text-xs font-bold text-emerald-500 tracking-widest mb-2">
                    STEP {s.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed px-2">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Featured residential plots — reuses your existing LandPlotCard */}
        <motion.section
          className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 mb-6">
              <span className="text-2xl">🏡</span>
              <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                Residential Plots Available Now
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-900">Plots ready for your </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
                next home
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {residentialPlots.map((land, index) => (
              <LandPlotCard key={land.id} land={land} index={index} />
            ))}
          </div>
        </motion.section>

        {/* FAQ */}
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
                Common Questions
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 text-gray-900">
                Residential Land <span className="text-emerald-600">FAQs</span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((item, i) => (
                <motion.div
                  key={item.q}
                  variants={fadeInUp}
                  className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-gray-900">{item.q}</span>
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
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Final CTA */}
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
              Found your plot? Let's verify it together.
            </h2>
            <p className="relative text-emerald-50 max-w-xl mx-auto mb-8">
              Talk to our team about site visits, document checks, and everything else
              that goes into a residential purchase you won't regret.
            </p>
            <motion.button
              className="relative px-8 py-4 bg-white text-emerald-700 rounded-2xl font-bold shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Talk to a Land Expert →
            </motion.button>
          </div>
        </motion.section>
      </main>
    </>
  );
}