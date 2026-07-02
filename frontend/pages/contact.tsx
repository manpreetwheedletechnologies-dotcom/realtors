import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import PageHero from '../components/Pagehero'
import FAQ from '../components/FAQ';
import CTASection from '../components/Ctasection';
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] } }
};

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
        <section className="relative">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
            <div className="relative rounded-3xl overflow-hidden min-h-[560px] flex">
              <img
                src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600"
                alt="Open land under a wide sky"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

              <div className="relative z-10 grid md:grid-cols-2 gap-8 w-full p-6 sm:p-10 lg:p-14 items-center">
                {/* Left: heading */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-white">
                  <h1 className="text-4xl sm:text-5xl font-bold mb-5">Contact Us</h1>
                  <p className="text-white/85 leading-relaxed max-w-md">
                    Have a question about a plot, want to list your land, or thinking about a partnership?
                    Send us a message and our team will get back to you — usually within a day.
                  </p>
                </motion.div>

                {/* Right: form card */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  {submitted ? (
                    <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
                      <div className="text-4xl mb-3">✅</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Message sent</h3>
                      <p className="text-gray-600 mb-6">Thanks for reaching out — our team will get back to you shortly.</p>
                      <button
                        className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all"
                        onClick={() => setSubmitted(false)}
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-4" noValidate>
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

                      <button
                        type="submit"
                        className="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all"
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Office details + map */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl border border-gray-100 p-8 sm:p-10"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Office Details</h2>
              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">Phone</p>
                  <a href="tel:+919876543210" className="text-emerald-600 font-medium">+91 xxxxxxxxx</a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">Email</p>
                  <a href="mailto:hello@pgilandrealtors.in" className="text-emerald-600 font-medium">hello@pgilandrealtors.in</a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">Address</p>
                  <p className="text-gray-900">PGI Land Realtors<br />New Delhi, India</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">Hours</p>
                  <p className="text-gray-900">Mon–Sat, 10am – 7pm IST</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-100 min-h-[280px]">
              <iframe
                title="PGI Land Realtors office location"
                src="https://www.google.com/maps?q=New+Delhi,India&output=embed"
                className="w-full h-full min-h-[280px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>

        <FAQ/>
        <CTASection/>
      </main>
    </>
  );
}