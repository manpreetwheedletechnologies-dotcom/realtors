import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    location: 'Mumbai',
    text: 'Found the perfect commercial land in BKC through PGI Land Realtors. Complete legal verification made the process smooth.',
    rating: 5,
    image: '👨'
  },
  {
    name: 'Sunita Reddy',
    location: 'Bangalore',
    text: 'Excellent platform for agricultural land. Found a 2-acre plot with all necessary approvals and clear title.',
    rating: 5,
    image: '👩'
  },
  {
    name: 'Vikram Singh',
    location: 'Delhi',
    text: 'The land zoning information and legal verification gave me confidence to invest. Highly recommended for land buyers.',
    rating: 5,
    image: '👨'
  }
];

export default function Testimonials() {
  return (
    <motion.section
      className="relative py-32 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInUp}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <motion.span className="text-4xl block mb-4">💬</motion.span>
          <motion.h2 className="text-4xl md:text-5xl font-bold">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">Land Buyers Say</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl border border-gray-100"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(16,185,129,0.12)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{testimonial.image}</span>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
              <div className="flex gap-1 text-emerald-400">
                {'⭐'.repeat(testimonial.rating)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}