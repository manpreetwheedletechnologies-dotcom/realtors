import Link from 'next/link';
import { MapPin, Ruler, ArrowRight, Play } from 'lucide-react';
import { resolveMediaUrl } from '../utils/resolveMediaUrl';

export const statusStyles: Record<string, string> = {
  Upcoming: 'bg-blue-500 text-white',
  Ongoing: 'bg-amber-500 text-white',
  Completed: 'bg-emerald-600 text-white',
  'Sold Out': 'bg-red-600 text-white',
};

export default function ProjectCard({ project }: { project: any }) {
  const img = project.coverImage || project.images?.[0];
  return (
    <Link
      href={`/projects/${project.slug || project._id}`}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className="relative h-56 bg-gray-100 overflow-hidden">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={resolveMediaUrl(img)} alt={project.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0F281D] to-[#1F6B3D]" />
        )}
        <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full shadow ${statusStyles[project.status] || 'bg-gray-700 text-white'}`}>
          {project.status}
        </span>
        {(project.videos?.length > 0 || project.videoUrl) && (
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white">
            <Play className="w-3 h-3 fill-current" /> Video
          </span>
        )}
        {project.type && (
          <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full bg-white/90 text-gray-800">{project.type}</span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 leading-snug">{project.title}</h3>
        {project.tagline && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.tagline}</p>}
        <div className="mt-4 space-y-1.5 text-sm text-gray-600">
          {project.location && <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#1F6B3D]" />{project.location}</p>}
          {project.area && <p className="flex items-center gap-2"><Ruler className="w-4 h-4 text-[#1F6B3D]" />{project.area}</p>}
        </div>
        <div className="mt-auto pt-5 flex items-center justify-between">
          <span className="font-bold text-[#1F6B3D]">{project.price || 'Price on request'}</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900 group-hover:gap-2 transition-all">
            View details <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
