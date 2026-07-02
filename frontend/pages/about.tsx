import Head from 'next/head';
import { motion } from 'framer-motion';
import PageHero from '../components/Pagehero';
import CTASection from '../components/Ctasection';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] } }
};

const stats = [
  { label: 'Land Plots', value: '5,000+' },
  { label: 'Cities', value: '50+' },
  { label: 'Verified Owners', value: '1,200+' },
  { label: 'Happy Buyers', value: '15,000+' }
];

const values = [
  { icon: '✅', title: 'Verified Listings', desc: 'Every plot goes through legal and physical verification before it goes live.' },
  { icon: '📐', title: 'Precision Tools', desc: 'We build our own measurement and estimation tools so buyers see exact numbers, not guesses.' },
  { icon: '🤝', title: 'Direct Connections', desc: 'No middlemen games — you deal directly with verified owners and developers.' },
  { icon: '🎥', title: 'Full Transparency', desc: '360° tours and video walkthroughs so you know exactly what you are buying.' }
];

// TODO: swap in your real team photos, names and designations
const team = [
  { name: '', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600' },
  { name: '', role: 'Co-Founder & COO', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600' },
  { name: '', role: 'Head of Verification', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600' }
];

// TODO: swap in real recognitions/press once you have them — placeholders removed on purpose
const process = [
  { step: '01', title: 'Plot Submitted', desc: 'Owner or developer shares plot details, documents and location.' },
  { step: '02', title: 'Legal Check', desc: 'Title deed, encumbrance and land-use records are verified.' },
  { step: '03', title: 'Site Survey', desc: 'Our team measures the plot on-ground and shoots a 360° walkthrough.' },
  { step: '04', title: 'Goes Live', desc: 'Only after every check clears does the plot appear on PGI.' }
];

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | PGI Land Realtors</title>
        <meta name="description" content="Learn about PGI Land Realtors — India's premier land aggregator platform with verified listings and advanced measurement tools." />
      </Head>
      <main className="min-h-screen bg-white text-gray-800">
        <PageHero
          image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600"
          badge="About Us"
          titleLine1="Built for people who"
          titleLine2="buy land, not promises"
          subtitle="PGI Land Realtors started with a simple frustration: land listings in India are full of vague descriptions and no real way to check what you're getting. We built a platform where every plot comes verified."
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          {/* Stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Philosophy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid md:grid-cols-2 gap-10 items-center mb-24"
          >
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-emerald-600 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Our Philosophy
              </span>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Why we do what we do</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Land, for us, is not something to be bought lightly — it's someone's biggest decision,
                often their life savings. PGI brings owners, developers and buyers together with a level
                of scrutiny most listings never get.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Every plot on our platform has been walked, measured and checked on paper before it's
                shown to a single buyer. That's not a marketing line — it's the only way we operate.
              </p>

            </div>
            <div className="rounded-2xl overflow-hidden border border-emerald-100 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900"
                alt="Aerial view of surveyed land"
                className="w-full h-80 object-cover"
              />
            </div>
          </motion.div>

          {/* Our Story */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-24">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-emerald-600 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> The Beginning
            </span>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              What began as a small team verifying plots around Delhi NCR has grown into a platform covering
              50+ cities across India. Along the way we kept hearing the same thing from buyers: they wanted
              exact dimensions, real photos, and someone to confirm the paperwork was clean — not another broker
              reading off a sales script.
            </p>
            <p className="text-gray-600 leading-relaxed">
              So we built the tools ourselves — area calculators, elevation analysis, construction estimators —
              and paired them with a verification process every listing has to pass before it's published. That's
              still how we operate today.
            </p>
          </motion.div>

          {/* How verification works */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-24">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-emerald-600 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Our Process
            </span>
            <h2 className="text-3xl font-bold mb-8 text-gray-900">How a plot gets verified</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {process.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative p-5 bg-white rounded-2xl border-2 border-gray-100"
                >
                  <div className="text-emerald-200 text-3xl font-black mb-2">{p.step}</div>
                  <h4 className="font-bold text-base mb-1 text-gray-900">{p.title}</h4>
                  <p className="text-sm text-gray-600">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-24">
            <span className="inline-flex items-center gap-2 justify-center text-xs font-semibold tracking-wide uppercase text-emerald-600 mb-3 w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> What We Stand For
            </span>
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">What We Stand For</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-emerald-300 transition-all"
                >
                  <div className="text-3xl mb-3">{v.icon}</div>
                  <h4 className="font-bold text-lg mb-2">{v.title}</h4>
                  <p className="text-sm text-gray-600">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-24">
            <div className="grid md:grid-cols-2 gap-6 items-end mb-8">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-emerald-600 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Core Team
                </span>
                <h2 className="text-3xl font-bold text-gray-900">The people behind PGI</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                A small team working closely with legal experts, surveyors and local partners to make sure
                every listing holds up — on paper and on the ground.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {team.map((m, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border-2 border-gray-100">
                  <img src={m.image} alt={m.name} className="w-full h-56 object-cover" />
                  <div className="p-4">
                    <div className="font-bold text-gray-900">{m.name}</div>
                    <div className="text-sm text-gray-500">{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
           
        </div>
        <CTASection/>
      </main>
    </>
  );
}