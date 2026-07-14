import { useState, useRef } from 'react';
import Head from 'next/head';
import { motion, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';
import PageHero from '../components/Pagehero'
import FAQ from '../components/FAQ';
import CTASection from '../components/Ctasection';
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] } }
};


// NEW — Glass card jo mouse ke saath halka 3D tilt karta hai (video page ke VideoTile jaisa)
function TiltCard({ children, className = '', strength = 6 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * strength * 2);
    rotateX.set(-(py - 0.5) * strength * 2);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


// NEW — Form ke andar cursor follow karne wala halka green gradient glow
function CursorGlowWrapper({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(16,185,129,0.16), transparent 70%)`;

  return (
    <div className="relative" onMouseMove={handleMove}>
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl"
        style={{ background }}
      />
      {children}
    </div>
  );
}

const queryTypes = ['Buying a plot', 'Selling / listing land', 'Verification query', 'Partnership', 'Other'];

const faqs = [
  {
    q: 'What does a "verified plot" mean on PGI?',
    a: 'Every plot has been through a legal document check (title deed, encumbrance, land-use records) and an on-ground survey by our team before it is listed. Nothing goes live unverified.'
  },
  {
    q: 'Do you charge brokerage to buyers?',
    a: 'No. You deal directly with the verified owner or developer — PGI does not add a brokerage fee on top for buyers.'
  },
  {
    q: 'How is the plot size measured?',
    a: 'Our field team physically surveys each plot using GPS-based measurement tools, so the dimensions and area you see are exact, not the owner\'s estimate.'
  },
  {
    q: 'Can NRIs buy land through PGI?',
    a: 'Yes, subject to RBI and FEMA guidelines that apply to the type of land. Our team can walk you through what\'s allowed for your specific case.'
  },
  {
    q: 'How do I list my own land on PGI?',
    a: 'Send us your plot and ownership details through this form or call us directly. Our verification team will schedule a document check and site visit before listing it.'
  }
];

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  queryType: string;
  message: string;
}

type FormErrors = Partial<Record<keyof ContactForm, string>>;

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    queryType: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.firstName.trim()) e.firstName = 'Please enter your first name';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Please enter a valid email';
    if (!form.phone.trim()) e.phone = 'Please enter a phone number';
    if (!form.queryType) e.queryType = 'Please select a query type';
    if (!form.message.trim()) e.message = 'Please enter a message';
    return e;
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      // NOTE: no backend wired up yet — replace with your API call / form service
      setSubmitted(true);
      setForm({ firstName: '', lastName: '', email: '', phone: '', queryType: '', message: '' });
    }
  };

  const inputClass = (field: keyof ContactForm) =>
    `w-full px-4 py-2.5 rounded-lg border outline-none transition-all bg-white ${
      errors[field] ? 'border-red-300' : 'border-gray-200 focus:border-emerald-500'
    }`;

  return (
    <>
      <Head>
        <title>Contact Us | PGI Land Realtors</title>
        <meta name="description" content="Get in touch with PGI Land Realtors for land buying, selling, and listing enquiries." />
      </Head>
      <main className="min-h-screen bg-emerald-50/40 text-gray-800">
        {/* Hero with overlay form */}
         <PageHero
          image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600"
          badge="Get in Touch"
          titleLine1="Let's Talk"
          titleLine2="Land"
          subtitle="Questions about a plot, listing your own land, or partnering with us — send a message and our team will get back to you."
          height="h-[50vh] min-h-[380px]"
        />
       {/* Hero with overlay form — premium glass + 3D tilt */}
        <section className="relative">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
            {/* Ambient spotlight glows */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-[380px] h-[380px] bg-emerald-400/15 rounded-full blur-[120px] z-0" />
            <div className="pointer-events-none absolute top-1/2 -left-20 w-[320px] h-[320px] bg-green-500/10 rounded-full blur-[110px] z-0" />

            <div className="relative rounded-3xl overflow-hidden min-h-[560px] flex" style={{ perspective: '1800px' }}>
              <img
                src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600"
                alt="Open land under a wide sky"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />

              {/* Subtle floor-grid texture for depth (matches video page showcase feel) */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-[0.06]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(16,185,129,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.9) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                  maskImage: 'linear-gradient(to top, black, transparent)',
                  WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
                }}
              />

              <div className="relative z-10 grid md:grid-cols-[1fr_1.2fr] gap-8 w-full p-6 sm:p-10 lg:p-14 items-center">
                {/* Left: heading */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-white">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-bold uppercase tracking-wider mb-5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                    Get in Touch
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-bold mb-5">Contact Us</h1>
                  <p className="text-white/85 leading-relaxed max-w-md">
                    Have a question about a plot, want to list your land, or thinking about a partnership?
                    Send us a message and our team will get back to you — usually within a day.
                  </p>

                  <div className="hidden md:flex flex-col gap-4 mt-10">
                    {[
                      { icon: Phone, label: '+91 99909 60187' },
                      { icon: Mail, label: 'hello@pgilandrealtors.in' },
                      { icon: Clock, label: 'Mon–Sat, 10am – 7pm IST' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-4 h-4 text-emerald-300" />
                        </div>
                        <span className="text-sm text-white/80">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Right: form card — glass + 3D tilt */}
                {/* Right: form card — glass + 3D tilt + cursor-tracked glow */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <TiltCard strength={3} className="relative">
                    {/* Glow behind card */}
                    <div className="pointer-events-none absolute -inset-4 bg-emerald-400/20 blur-2xl rounded-3xl -z-10" />

                    <CursorGlowWrapper>
                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 text-center shadow-2xl border border-white/50"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4"
                        >
                          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Message sent</h3>
                        <p className="text-gray-600 mb-6">Thanks for reaching out — our team will get back to you shortly.</p>
                        <button
                          className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all"
                          onClick={() => setSubmitted(false)}
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    ) : (
                      <form
                        onSubmit={handleSubmit}
                        className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/50 space-y-4"
                        noValidate
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">First Name*</label>
                            <input
                              type="text"
                              className={inputClass('firstName')}
                              value={form.firstName}
                              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                            />
                            {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Last Name</label>
                            <input
                              type="text"
                              className={inputClass('lastName')}
                              value={form.lastName}
                              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1">Email Address*</label>
                          <input
                            type="email"
                            className={inputClass('email')}
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="you@example.com"
                          />
                          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1">Phone Number*</label>
                          <input
                            type="tel"
                            className={inputClass('phone')}
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="+91 XXXXX XXXXX"
                          />
                          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1">Type of Query*</label>
                          <select
                            className={inputClass('queryType')}
                            value={form.queryType}
                            onChange={(e) => setForm({ ...form, queryType: e.target.value })}
                          >
                            <option value="">Select...</option>
                            {queryTypes.map((q) => (
                              <option key={q} value={q}>{q}</option>
                            ))}
                          </select>
                          {errors.queryType && <p className="text-xs text-red-500 mt-1">{errors.queryType}</p>}
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1">Message</label>
                          <textarea
                            rows={3}
                            className={`${inputClass('message')} resize-none`}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                          />
                          {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                        </div>

                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
                        >
                          <Send className="w-4 h-4" />
                          Send Message
                        </motion.button>
                      </form>
                    )}
                       </CursorGlowWrapper>
                  </TiltCard>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Office details + map */}
       {/* Office details + map — premium 3D info cards */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 overflow-hidden">
          <div className="pointer-events-none absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[130px]" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="w-1.5 h-8 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full" style={{ boxShadow: '0 0 16px rgba(16,185,129,0.6)' }} />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Office Details</h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6" style={{ perspective: '1600px' }}>
            {/* Left: contact info cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="grid sm:grid-cols-2 gap-4 content-start"
            >
              {[
                { icon: Phone, title: 'Phone', value: '+91 99909 60187', href: 'tel:+919990960187' },
                { icon: Mail, title: 'Email', value: 'hello@pgilandrealtors.in', href: 'mailto:hello@pgilandrealtors.in' },
                { icon: MapPin, title: 'Address', value: 'Pilot no. 8c, near 100 x school, techzone 4, Greater Noida, India' },
                { icon: Clock, title: 'Hours', value: 'Mon–Sat, 10am – 7pm IST' },
              ].map((item, i) => (
                <TiltCard key={item.title} strength={5}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="group relative h-full bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-200 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 group-hover:bg-emerald-500 flex items-center justify-center mb-3 transition-colors duration-300">
                      <item.icon className="w-4.5 h-4.5 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <p className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold mb-1">{item.title}</p>
                    {item.href ? (
                      <a href={item.href} className="text-emerald-600 font-medium text-sm hover:text-emerald-700 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-900 text-sm leading-snug">{item.value}</p>
                    )}
                  </motion.div>
                </TiltCard>
              ))}
            </motion.div>

            {/* Right: map with glass frame */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-lg min-h-[320px] md:min-h-full"
            >
              <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider">
                <MapPin className="w-3 h-3 text-emerald-300" />
                Our Location
              </div>
              <iframe
                title="PGI Land Realtors office location"
                src="https://www.google.com/maps?q=Pilot+no.+8c+near+100+x+school++techzone+4,+Greator+noida,+India&output=embed"
                className="w-full h-full min-h-[320px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>

        <FAQ/>
        <CTASection/>
      </main>
    </>
  );
}