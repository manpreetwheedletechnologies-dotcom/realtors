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

// Land categories we specialize in
const expertise = [
  { icon: '🏘️', title: 'Residential Land' },
  { icon: '🏢', title: 'Commercial Land' },
  { icon: '🏭', title: 'Industrial Land' },
  { icon: '🌾', title: 'Agricultural Land' },
  { icon: '🏛️', title: 'Institutional Land' },
  { icon: '🚚', title: 'Warehouse & Logistics Land' }
];

// Why choose us
const whyChooseUs = [
  { icon: '🌐', title: 'Nationwide Presence', desc: 'Access to strategic land opportunities across growth corridors and cities all over India.' },
  { icon: '✅', title: 'Verified Opportunities', desc: 'Every plot goes through legal and physical verification before it goes live.' },
  { icon: '📊', title: 'Market Intelligence', desc: 'Deep market data and industry networks to spot high-potential land early.' },
  { icon: '🤝', title: 'End to End Support', desc: 'From opportunity identification to transaction closure, we stay with you at every step.' },
  { icon: '🎯', title: 'Customer Centric Approach', desc: 'Solutions tailored to your investment goals, not a one-size-fits-all pitch.' }
];

// Core values
const values = [
  { icon: '🔒', title: 'Integrity', desc: 'We operate with honesty and transparency in every transaction.' },
  { icon: '🤝', title: 'Trust', desc: 'Lasting relationships built on reliability, not one-time deals.' },
  { icon: '⭐', title: 'Excellence', desc: 'We hold every listing to a high bar before it reaches a buyer.' },
  { icon: '💡', title: 'Innovation', desc: 'We build our own tools to bring clarity to land buying decisions.' },
  { icon: '📌', title: 'Commitment', desc: 'We stay invested in outcomes long after the deal is signed.' }
];

// TODO: swap in your real team photos, names and designations
const team = [
  { name: '', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600' },
  { name: '', role: 'Co-Founder & COO', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600' },
  { name: '', role: 'Head of Verification', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600' }
];

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
        <meta name="description" content="PGI Land Realtors is a leading real estate advisory and land solutions company specializing in Residential, Commercial, Industrial, Agricultural, Institutional, and Warehouse & Logistics land across India." />
      </Head>
      <main className="min-h-screen bg-white text-gray-800">
        <PageHero
          image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600"
          badge="About Us"
titleLine1="Strategic land investments,"
titleLine2="with real due diligence"
subtitle="PGI Land Realtors — pan-India land advisory for all sectors. Trusted by investors & developers."

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

          {/* Philosophy / Who we are */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid md:grid-cols-2 gap-10 items-center mb-24"
          >
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-emerald-600 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Who We Are
              </span>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Why we do what we do</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                In an evolving real estate landscape, land remains one of the most valuable and future-ready
                assets. We bridge the gap between opportunity and investment by providing transparent,
                market-driven, and legally compliant land solutions tailored to diverse business and
                investment objectives.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our team combines deep market intelligence, extensive industry networks, and a customer-first
                approach to help clients discover high-potential land opportunities in emerging growth
                corridors, industrial zones, urban developments, and strategic investment destinations
                across India.
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

          {/* Vision & Mission */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-24">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-emerald-600 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Where We're Headed
            </span>
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Our Vision & Mission</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <h4 className="font-bold text-lg mb-2 text-gray-900">Our Vision</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  To become India's most trusted and preferred real estate and land advisory partner by
                  enabling strategic investments, fostering sustainable development, and creating long-term
                  value for our clients and communities.
                </p>
              </div>
              <div className="p-6 bg-white rounded-2xl border-2 border-gray-100">
                <h4 className="font-bold text-lg mb-3 text-gray-900">Our Mission</h4>
                <ul className="text-sm text-gray-600 leading-relaxed space-y-2 list-disc list-inside">
                  <li>Simplify land acquisition and investment through expert guidance and transparent processes.</li>
                  <li>Provide verified and legally compliant land opportunities across India.</li>
                  <li>Deliver customized real estate solutions aligned with our clients' objectives.</li>
                  <li>Create lasting relationships built on trust, integrity, and professionalism.</li>
                  <li>Contribute to India's growing infrastructure, industrial, and urban development landscape.</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Our Story */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-24">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-emerald-600 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Building India's Future
            </span>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">One investment at a time</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              India is witnessing unprecedented growth driven by rapid urbanization, infrastructure expansion,
              industrial development, technological advancement, and the rise of modern logistics networks.
              This transformation is creating new opportunities for investors, developers, businesses, and
              institutions seeking strategically located land assets with strong long-term potential.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We are committed to helping our clients identify and capitalize on these opportunities through
              expert market insights, transparent advisory services, and access to high-potential investment
              destinations across the country. Our team continuously monitors market trends, emerging
              business hubs, infrastructure projects, and economic growth corridors to ensure our clients
              stay ahead in an increasingly competitive real estate landscape.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe every parcel of land carries the potential to become a thriving community, a
              successful business destination, a world-class industrial facility, or a valuable long-term
              investment asset. Our role extends beyond facilitating transactions — we work closely with
              clients to understand their objectives, evaluate opportunities, mitigate risks, and build
              investment strategies aligned with their vision for growth.
            </p>
          </motion.div>

          {/* Our Expertise */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-24">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-emerald-600 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Our Expertise
            </span>
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Land categories we specialize in</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {expertise.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-5 bg-white rounded-2xl border-2 border-gray-100 text-center hover:border-emerald-300 transition-all"
                >
                  <div className="text-3xl mb-2">{e.icon}</div>
                  <h4 className="font-bold text-sm text-gray-900">{e.title}</h4>
                </motion.div>
              ))}
            </div>
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

          {/* Why Choose Us */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-24">
            <span className="inline-flex items-center gap-2 justify-center text-xs font-semibold tracking-wide uppercase text-emerald-600 mb-3 w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Why Choose Us
            </span>
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Why Choose PGI Land Realtors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyChooseUs.map((v, i) => (
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

          {/* Core Values */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-24">
            <span className="inline-flex items-center gap-2 justify-center text-xs font-semibold tracking-wide uppercase text-emerald-600 mb-3 w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Our Core Values
            </span>
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">What We Stand For</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-5 bg-white rounded-2xl border-2 border-gray-100 text-center hover:border-emerald-300 transition-all"
                >
                  <div className="text-2xl mb-2">{v.icon}</div>
                  <h4 className="font-bold text-sm mb-1">{v.title}</h4>
                  <p className="text-xs text-gray-600">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team */}
          {/* <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-24">
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
          </motion.div> */}

          {/* Closing statement */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-24 text-center max-w-3xl mx-auto"
          >
            <p className="text-gray-600 leading-relaxed text-lg">
              We do not simply facilitate property transactions — we create opportunities, unlock value, and
              build enduring partnerships founded on trust, transparency, and professional excellence.
              Whether your goal is wealth creation, business expansion, project development, institutional
              growth, or portfolio diversification, PGI Land Realtors stands as your trusted partner for
              strategic land investments across India.
            </p>
          </motion.div>

        </div>
        <CTASection/>
      </main>
    </>
  );
}