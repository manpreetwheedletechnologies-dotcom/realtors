import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Landing page "Our Projects" section. Fully dynamic: shows latest published projects
// marked "show on landing" in the admin dashboard. Renders nothing if there are none.
export default function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/v1/projects?landing=true&limit=6`)
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setProjects(Array.isArray(d) ? d : []))
      .catch(() => setProjects([]));
  }, []);

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-20 md:py-28 bg-gradient-to-b from-white to-emerald-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <motion.span
                className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-2 border-emerald-200 text-xs uppercase tracking-[0.4em] text-emerald-600 font-bold"
              >
                 New &amp; Featured
              </motion.span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">Our Latest Projects</h2>
            <p className="text-gray-500 mt-3 max-w-xl">Explore our newest verified projects — locations, pricing and full details in one place.</p>
          </div>
          <Link href="/projects" className="inline-flex items-center gap-2 font-semibold text-[#1F6B3D] hover:gap-3 transition-all">
            View all projects <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="flex"
            >
              <div className="w-full flex"><ProjectCard project={p} /></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
