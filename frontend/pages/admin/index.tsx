import { useState, useEffect } from 'react';
import {
  FolderKanban,
  Film,
  Users,
  Clock3,
  Mail,
  Phone,
} from 'lucide-react';
import Link from 'next/link';
import AdminLayout from '../../components/AdminLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const STATUS_STYLES: Record<string, string> = {
  new: 'text-blue-600 bg-blue-500',
  contacted: 'text-amber-600 bg-amber-500',
  closed: 'text-gray-500 bg-gray-400',
};

function timeAgo(dateStr: string) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export default function AdminOverview() {
  const [landsCount, setLandsCount] = useState<number | null>(null);
  const [videosCount, setVideosCount] = useState<number | null>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getAuthToken = () => {
    if (typeof document === 'undefined') return '';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; auth_token=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
    return '';
  };

  useEffect(() => {
    const token = getAuthToken();

    Promise.all([
      fetch(`${API_URL}/api/v1/lands`).then((r) => (r.ok ? r.json() : [])),
      fetch(`${API_URL}/api/v1/videos`).then((r) => (r.ok ? r.json() : [])),
      fetch(`${API_URL}/api/v1/leads`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([lands, videos, leadsData]) => {
        setLandsCount(Array.isArray(lands) ? lands.length : 0);
        setVideosCount(Array.isArray(videos) ? videos.length : 0);
        setLeads(Array.isArray(leadsData) ? leadsData : []);
      })
      .catch((err) => console.error('Error loading overview data:', err))
      .finally(() => setLoading(false));
  }, []);

  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const recentLeads = leads.slice(0, 5);

  const kpis = [
    {
      title: 'Total Plots',
      value: landsCount === null ? '—' : landsCount,
      icon: FolderKanban,
      color: 'from-green-500 to-green-600',
      href: '/admin/plots',
    },
    {
      title: 'Total Videos',
      value: videosCount === null ? '—' : videosCount,
      icon: Film,
      color: 'from-teal-500 to-teal-600',
      href: '/admin/videos',
    },
    {
      title: 'Total Leads',
      value: leads.length,
      icon: Users,
      color: 'from-emerald-400 to-emerald-600',
      href: '/admin/leads',
    },
    {
      title: 'New Leads',
      value: newLeadsCount,
      icon: Clock3,
      color: newLeadsCount > 0 ? 'from-blue-500 to-blue-600' : 'from-gray-400 to-gray-500',
      href: '/admin/leads',
    },
  ];

  return (
    <AdminLayout title="Overview">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm">A snapshot of your plots, videos and incoming leads.</p>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {kpis.map((kpi, idx) => (
          <Link
            key={idx}
            href={kpi.href}
            className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group block"
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${kpi.color} rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity`}></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center text-white shadow-lg`}>
                <kpi.icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1 relative z-10">{kpi.title}</h3>
            <div className="flex items-baseline gap-1 relative z-10 text-gray-900">
              <span className="text-3xl font-extrabold tracking-tight">
                {loading ? <span className="inline-block w-10 h-8 bg-gray-100 rounded animate-pulse" /> : kpi.value}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* RECENT LEADS TABLE */}
      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">Recent Leads</h2>
          <Link href="/admin/leads" className="text-sm font-semibold text-green-700 hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-12 text-gray-400 text-sm font-medium">Loading...</div>
          ) : recentLeads.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm font-medium">
              No leads yet — new contact form submissions will show up here.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-500 bg-gray-50/50">
                  <th className="px-8 py-4 font-semibold">Name</th>
                  <th className="px-8 py-4 font-semibold">Contact</th>
                  <th className="px-8 py-4 font-semibold">Query</th>
                  <th className="px-8 py-4 font-semibold">Status</th>
                  <th className="px-8 py-4 font-semibold text-right">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                        {lead.firstName} {lead.lastName}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5 mb-1"><Mail className="w-3.5 h-3.5 text-gray-400" /> {lead.email}</div>
                      <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400" /> {lead.phone}</div>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-gray-600">{lead.queryType || '—'}</td>
                    <td className="px-8 py-5">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${(STATUS_STYLES[lead.status] || STATUS_STYLES.new).split(' ')[0]} bg-current/10 border border-current/20`}>
                        {lead.status}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-gray-500 text-right">{timeAgo(lead.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}