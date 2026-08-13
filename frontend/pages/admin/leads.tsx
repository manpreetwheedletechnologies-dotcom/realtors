import { useState, useEffect } from 'react';
import { Search, Trash2, Phone, Mail, Clock, Inbox, ChevronDown } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface Lead {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  queryType?: string;
  message: string;
  status: string;
  createdAt: string;
}

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  contacted: 'bg-amber-50 text-amber-700 border-amber-200',
  closed: 'bg-gray-100 text-gray-500 border-gray-200',
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

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getAuthToken = () => {
    if (typeof document === 'undefined') return '';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; auth_token=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
    return '';
  };

  const fetchLeads = async () => {
    setLoading(true);
    setError('');
    const token = getAuthToken();
    try {
      const res = await fetch(`${API_URL}/api/v1/leads`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch leads — make sure you are logged in.');
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || 'Error loading leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    const token = getAuthToken();
    // Optimistic update — dashboard should feel instant.
    setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
    try {
      await fetch(`${API_URL}/api/v1/leads/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
    } catch (err) {
      console.error('Error updating lead status:', err);
      fetchLeads(); // fall back to server truth if the update failed
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this lead? This cannot be undone.')) return;
    const token = getAuthToken();
    try {
      const res = await fetch(`${API_URL}/api/v1/leads/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      setLeads((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      alert('Could not delete this lead. Please try again.');
    }
  };

  const filtered = leads.filter((l) => {
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      `${l.firstName} ${l.lastName || ''}`.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.phone.toLowerCase().includes(q) ||
      (l.message || '').toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const newCount = leads.filter((l) => l.status === 'new').length;

  return (
    <AdminLayout title="Leads">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-gray-900">Leads</h1>
          <p className="text-gray-500 text-sm">
            Enquiries submitted through the website's contact form.
            {newCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                {newCount} new
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 w-full sm:w-64"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/50"
          >
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 font-medium">Loading leads...</div>
      ) : error ? (
        <div className="text-center py-20 text-red-500 font-medium">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-gray-200 rounded-3xl">
          <Inbox className="w-10 h-10 text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">
            {leads.length === 0 ? 'No leads yet — new contact form submissions will show up here.' : 'No leads match your search.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((lead) => {
            const isExpanded = expandedId === lead._id;
            return (
              <div
                key={lead._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : lead._id)}
                  className="w-full flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 px-5 py-4 text-left hover:bg-gray-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {lead.firstName?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 truncate">
                        {lead.firstName} {lead.lastName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{lead.message}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500 shrink-0">
                    {lead.queryType && (
                      <span className="hidden md:inline px-2.5 py-1 bg-gray-100 rounded-lg font-medium text-gray-600">
                        {lead.queryType}
                      </span>
                    )}
                    <span className="hidden sm:flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {timeAgo(lead.createdAt)}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full font-bold border text-[11px] uppercase tracking-wide ${STATUS_STYLES[lead.status] || STATUS_STYLES.new}`}
                    >
                      {lead.status}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mt-4">
                      <a
                        href={`mailto:${lead.email}`}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-gray-400" /> {lead.email}
                      </a>
                      <a
                        href={`tel:${lead.phone}`}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-gray-400" /> {lead.phone}
                      </a>
                    </div>

                    <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-4 mb-4 whitespace-pre-wrap">
                      {lead.message}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {['new', 'contacted', 'closed'].map((s) => (
                          <button
                            key={s}
                            onClick={() => handleStatusChange(lead._id, s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide border transition-colors ${
                              lead.status === s
                                ? STATUS_STYLES[s]
                                : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => handleDelete(lead._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-red-500 hover:bg-red-50 rounded-lg text-xs font-bold transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
}