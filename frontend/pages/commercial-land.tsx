import { useState, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  ShoppingBag,
  Warehouse,
  Layers,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowUpRight,
  MapPinned,
  ChevronDown
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

const commercialPlots = [
  {
    id: 201,
    title: 'Commercial Land - BKC',
    location: 'BKC, Mumbai',
    price: '₹8.5 Cr',
    size: '1200 sq.yds',
    type: 'Commercial Land',
    dimensions: '60ft × 80ft',
    facing: 'West',
    owner: 'Bombay Land Developers',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=700',
      'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=700'
    ],
    rating: 4.8,
    amenities: ['Prime Location', 'Road Access', 'Parking Space', 'Construction Allowed'],
    verification: 'Approved',
    measurement: '60ft x 80ft = 4,800 sq.ft'
  },
  {
    id: 202,
    title: 'High-Street Retail Plot - Connaught Place',
    location: 'Connaught Place, Delhi',
    price: '₹12.2 Cr',
    size: '900 sq.yds',
    type: 'Commercial Land',
    dimensions: '45ft × 90ft',
    facing: 'East',
    owner: 'Capital Commercial Estates',
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=700',
      'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=700',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700'
    ],
    rating: 4.9,
    amenities: ['High Footfall', 'Metro Adjacent', 'Road Access', 'Signage Rights'],
    verification: 'RERA Registered',
    measurement: '45ft x 90ft = 4,050 sq.ft'
  },
  {
    id: 203,
    title: 'IT Park Land - Hinjewadi',
    location: 'Hinjewadi, Pune',
    price: '₹6.7 Cr',
    size: '1500 sq.yds',
    type: 'Commercial Land',
    dimensions: '75ft × 90ft',
    facing: 'North',
    owner: 'Pune Tech Realty',
    images: [
      'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=700',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=700'
    ],
    rating: 4.7,
    amenities: ['IT Zone', 'Power Backup', 'Wide Road', 'Parking'],
    verification: 'Approved',
    measurement: '75ft x 90ft = 6,750 sq.ft'
  },
  {
    id: 204,
    title: 'Warehouse Land - Bhiwandi',
    location: 'Bhiwandi, Mumbai',
    price: '₹4.3 Cr',
    size: '3 acres',
    type: 'Commercial Land',
    dimensions: '300ft × 435ft',
    facing: 'South',
    owner: 'Logistics Land Co.',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700',
      'https://images.unsplash.com/photo-1553413077-190dd305871c?w=700',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700'
    ],
    rating: 4.6,
    amenities: ['Highway Access', 'Loading Bay', 'High Ceiling Clearance', 'Power Supply'],
    verification: 'Verified',
    measurement: '300ft x 435ft = 1,30,500 sq.ft'
  },
  {
    id: 205,
    title: 'Mixed-Use Plot - HITEC City',
    location: 'HITEC City, Hyderabad',
    price: '₹9.1 Cr',
    size: '1800 sq.yds',
    type: 'Commercial Land',
    dimensions: '80ft × 100ft',
    facing: 'East',
    owner: 'Cyber Realty Ventures',
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=700',
      'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=700',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700'
    ],
    rating: 4.8,
    amenities: ['Mixed-Use Zoning', 'Metro Nearby', 'Parking', 'High Visibility'],
    verification: 'RERA Registered',
    measurement: '80ft x 100ft = 8,000 sq.ft'
  },
  {
    id: 206,
    title: 'Business Park Plot - GIFT City',
    location: 'GIFT City, Gandhinagar',
    price: '₹7.4 Cr',
    size: '1350 sq.yds',
    type: 'Commercial Land',
    dimensions: '65ft × 90ft',
    facing: 'North-East',
    owner: 'Gujarat Commercial Trust',
    images: [
      'https://images.unsplash.com/photo-1553413077-190dd305871c?w=700',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=700'
    ],
    rating: 4.9,
    amenities: ['SEZ Zone', 'Tax Benefits', 'Wide Road', 'Power Backup'],
    verification: 'Approved',
    measurement: '65ft x 90ft = 5,850 sq.ft'
  }
];

const categories = [
  {
    key: 'retail',
    label: 'Retail Spaces',
    icon: ShoppingBag,
    avgPrice: '₹18,500 / sq.ft',
    roi: '9–11% annual',
    desc: 'High-street and mall-facing plots picked for footfall density and signage visibility, not just square footage.'
  },
  {
    key: 'office',
    label: 'Office Space',
    icon: Building2,
    avgPrice: '₹14,200 / sq.ft',
    roi: '7–9% annual',
    desc: 'Business-district land zoned for commercial towers, close to metro corridors and grade-A infrastructure.'
  },
  {
    key: 'warehouse',
    label: 'Warehousing & Logistics',
    icon: Warehouse,
    avgPrice: '₹3,800 / sq.ft',
    roi: '10–13% annual',
    desc: 'Highway-adjacent plots with loading clearance, built for last-mile logistics and industrial storage.'
  },
  {
    key: 'mixed',
    label: 'Mixed-Use Development',
    icon: Layers,
    avgPrice: '₹11,600 / sq.ft',
    roi: '8–10% annual',
    desc: 'Dual-zoned land combining retail frontage with office or residential floors above — built for compounding returns.'
  }
];

const scores = [
  { value: 92, label: 'Footfall Score', sublabel: 'Based on 90-day foot traffic data' },
  { value: 88, label: 'Connectivity Index', sublabel: 'Metro, highway & transit proximity' },
  { value: 95, label: 'Growth Potential', sublabel: '5-year zoning & infra forecast' }
];

const diligenceChecklist = [
  'Title & Ownership Verification',
  'Zoning & Land-Use Compliance',
  'FSI / FAR Confirmation',
  'Environmental & NOC Clearances',
  'Existing Lease / Tenancy Records',
  'Encumbrance Certificate Check'
];

const faqs = [
  {
    q: 'What FSI (Floor Space Index) can I expect on a commercial plot?',
    a: 'FSI varies by zone and municipal corporation — every listing shows the sanctioned FSI so you can calculate buildable area before you commit.'
  },
  {
    q: 'Are these plots suitable for REIT or institutional investment?',
    a: 'Several listings, especially RERA Registered and SEZ-zoned plots, meet the documentation standard institutional buyers typically require. Our team can share the full compliance file on request.'
  },
  {
    q: 'How is ROI estimated for each category?',
    a: 'ROI ranges are drawn from recent transaction data and rental yields in the same micro-market, updated quarterly — not a fixed promise, but a grounded estimate.'
  },
  {
    q: 'Can I get zoning and land-use documents before visiting?',
    a: 'Yes, zoning certificates and land-use maps are available on request for every commercial listing before you schedule a site visit.'
  }
];

/* ------------------------------------------------------------------ */
/* Small components                                                    */
/* ------------------------------------------------------------------ */

function SpotlightCard({ icon: Icon, title, desc }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--x', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      variants={fadeInUp}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gray-900 p-6"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(16,185,129,0.18), transparent 40%)'
        }}
      />
      <div className="relative w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-emerald-400" />
      </div>
      <h3 className="relative font-bold text-white mb-2">{title}</h3>
      <p className="relative text-sm text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function RadialGauge({ value, label, sublabel, delay = 0 }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const gradientId = `gauge-${label.replace(/\s/g, '')}`;

  return (
    <motion.div variants={fadeInUp} className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{value}</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <div className="font-bold text-white">{label}</div>
        <div className="text-xs text-gray-400 mt-1 max-w-[9rem]">{sublabel}</div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function CommercialLand() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <Head>
        <title>Commercial Land Plots | PGI Land Realtors</title>
        <meta
          name="description"
          content="Verified commercial land plots across India — retail, office, warehousing, and mixed-use, with ROI data and location scoring."
        />
      </Head>

      <main className="min-h-screen bg-white text-gray-800">
        <PageHero
          image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600"
          badge="🏙️ Commercial Land"
          titleLine1="Commercial Land"
          titleLine2="Built for Returns"
          subtitle="1,100+ verified commercial plots across India's business districts — with location scoring, ROI data, and full legal diligence."
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
              ['1,100+', 'Commercial Plots'],
              ['28+', 'Business Districts'],
              ['₹9,200 Cr+', 'Transacted Value'],
              ['8–13%', 'Typical Annual ROI']
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

        {/* Business categories — animated tab switcher */}
        <motion.section
          className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 mb-6">
              <TrendingUp className="w-4 h-4 text-emerald-700" />
              <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                Choose Your Business Category
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-900">Four ways to </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
                put land to work
              </span>
            </h2>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat, i) => (
              <button
                key={cat.key}
                onClick={() => setActiveTab(i)}
                className="relative px-5 py-3 rounded-2xl font-semibold text-sm transition-colors duration-300"
              >
                {activeTab === i && (
                  <motion.div
                    layoutId="tabPill"
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className={`relative flex items-center gap-2 ${activeTab === i ? 'text-white' : 'text-gray-600'}`}>
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Active tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={categories[activeTab].key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="rounded-3xl border border-gray-100 bg-white shadow-xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="md:col-span-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-green-700/15 border border-emerald-200 flex items-center justify-center mb-4">
                  {(() => {
                    const Icon = categories[activeTab].icon;
                    return <Icon className="w-6 h-6 text-emerald-700" />;
                  })()}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{categories[activeTab].label}</h3>
                <p className="text-gray-600 leading-relaxed">{categories[activeTab].desc}</p>
              </div>
              <div className="flex flex-col justify-center gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Avg. Price</div>
                  <div className="text-xl font-bold text-emerald-700">{categories[activeTab].avgPrice}</div>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                    Est. ROI <ArrowUpRight className="w-3 h-3" />
                  </div>
                  <div className="text-xl font-bold text-emerald-700">{categories[activeTab].roi}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.section>

        {/* Location Intelligence — dark premium band */}
        <section className="relative py-28 bg-gray-900 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />

          <motion.div
            className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-6">
                <MapPinned className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Location Intelligence
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Scored before it's <span className="text-emerald-400">listed</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Every commercial plot is benchmarked against real foot-traffic, connectivity,
                and growth data — not gut feel.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 justify-items-center">
              {scores.map((s, i) => (
                <RadialGauge key={s.label} {...s} delay={i * 0.15} />
              ))}
            </div>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
              <SpotlightCard icon={Users} title="Footfall Analytics" desc="Real pedestrian & vehicle traffic data, not estimates from a brochure." />
              <SpotlightCard icon={Building2} title="Zoning Clarity" desc="Sanctioned FSI and land-use category confirmed before listing." />
              <SpotlightCard icon={TrendingUp} title="Growth Signals" desc="Infrastructure pipeline and price trend tracked for the next 5 years." />
              <SpotlightCard icon={CheckCircle2} title="Compliance Ready" desc="Documentation pre-checked for institutional and REIT-grade buyers." />
            </motion.div>
          </motion.div>
        </section>

        {/* Featured commercial plots */}
        <motion.section
          className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 mb-6">
              <span className="text-2xl">🏙️</span>
              <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                Commercial Plots Available Now
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-900">Land that pays </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">
                for itself
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialPlots.map((land, index) => (
              <LandPlotCard key={land.id} land={land} index={index} />
            ))}
          </div>
        </motion.section>

        {/* Due Diligence Checklist */}
        <section className="py-28 bg-gradient-to-b from-emerald-50/40 via-white to-white">
          <motion.div
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                Before You Sign
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">
                Our due diligence checklist
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Every commercial listing clears this checklist before it reaches a buyer —
                the same standard institutional investors expect.
              </p>
            </motion.div>

            <ul className="space-y-4">
              {diligenceChecklist.map((item, i) => (
                <motion.li
                  key={item}
                  variants={fadeInUp}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, delay: i * 0.08 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  </motion.span>
                  <span className="text-sm font-medium text-gray-800">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="py-28">
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
                Commercial Land <span className="text-emerald-600">FAQs</span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((item, i) => (
                <motion.div
                  key={item.q}
                  variants={fadeInUp}
                  className="border-l-4 border-emerald-500 rounded-r-2xl overflow-hidden bg-white shadow-sm border-t border-r border-b border-gray-100"
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
                        <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Final CTA — dark premium */}
        <motion.section
          className="py-24 px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-gray-900 px-8 py-16 text-center relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green-600/10 rounded-full blur-3xl" />
            <h2 className="relative text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to put capital into land?
            </h2>
            <p className="relative text-gray-400 max-w-xl mx-auto mb-8">
              Talk to our commercial desk about zoning, FSI, and ROI projections
              before you shortlist a plot.
            </p>
            <motion.button
              className="relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-bold shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Talk to a Commercial Advisor →
            </motion.button>
          </div>
        </motion.section>
      </main>
    </>
  );
}