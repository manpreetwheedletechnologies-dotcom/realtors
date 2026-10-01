import { useEffect, useState } from 'react';
import Head from 'next/head';
import ProjectCard from '../../components/ProjectCard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const FILTERS = ['All', 'Upcoming', 'Ongoing', 'Completed', 'Sold Out'];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch(`${API_URL}/api/v1/projects`)
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setProjects(Array.isArray(d) ? d : []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const shown = filter === 'All' ? projects : projects.filter((p) => p.status === filter);

  return (
    <>
      <Head><title>Projects - PGI Realtors</title></Head>
      <section className="pt-32 pb-12 bg-gradient-to-b from-[#0A1A12] to-[#0F281D] text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold">Our Projects</h1>
        <p className="mt-4 text-emerald-100/80 max-w-2xl mx-auto">Upcoming, ongoing and completed projects by PGI Realtors.</p>
      </section>

      <section className="py-14 bg-gray-50 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors ${filter === f ? 'bg-[#1F6B3D] text-white border-[#1F6B3D]' : 'bg-white text-gray-700 border-gray-200 hover:border-[#1F6B3D]'}`}>
                {f}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-center text-gray-400">Loading projects...</p>
          ) : shown.length === 0 ? (
            <p className="text-center text-gray-500">No projects found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {shown.map((p) => <div key={p._id} className="flex"><div className="w-full flex"><ProjectCard project={p} /></div></div>)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
