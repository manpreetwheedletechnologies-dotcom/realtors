import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, X, Building2, MapPin, Eye, EyeOff, Star, Upload, Film, Link2 } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { resolveMediaUrl } from '../../utils/resolveMediaUrl';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const STATUSES = ['Upcoming', 'Ongoing', 'Completed', 'Sold Out'];
const TYPES = ['Residential', 'Commercial', 'Agricultural', 'Industrial', 'Farm House', 'Plotted Development', 'Mixed Use'];

interface Project {
  _id?: string;
  title: string;
  slug?: string;
  tagline: string;
  description: string;
  status: string;
  location: string;
  type: string;
  price: string;
  area: string;
  totalUnits: string;
  developer: string;
  reraNumber: string;
  launchDate: string;
  possessionDate: string;
  coverImage: string;
  images: string[];
  videoUrl: string;
  videos?: string[];
  brochureUrl: string;
  highlights: string[];
  amenities: string[];
  showOnLanding: boolean;
  isPublished: boolean;
  order: number;
}

const emptyForm = {
  title: '', tagline: '', description: '', status: 'Upcoming', location: '', type: 'Residential',
  price: '', area: '', totalUnits: '', developer: '', reraNumber: '', launchDate: '', possessionDate: '',
  coverImage: '', imagesRaw: '', videosRaw: '', brochureUrl: '', highlightsRaw: '', amenitiesRaw: '',
  showOnLanding: true, isPublished: true, order: 0,
};

const isYouTube = (u: string) => /(?:youtu\.be\/|youtube\.com\/)/.test(u);
const lines = (s: string) => s.split('\n').map((x) => x.trim()).filter(Boolean);
const statusColor: Record<string, string> = {
  Upcoming: 'bg-blue-50 text-blue-700',
  Ongoing: 'bg-amber-50 text-amber-700',
  Completed: 'bg-green-50 text-green-700',
  'Sold Out': 'bg-red-50 text-red-700',
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [current, setCurrent] = useState<Project | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadPct, setUploadPct] = useState<number | null>(null);
  const [videoLink, setVideoLink] = useState('');

  const getAuthToken = () => {
    if (typeof document === 'undefined') return '';
    const parts = `; ${document.cookie}`.split('; auth_token=');
    return parts.length === 2 ? parts.pop()?.split(';').shift() || '' : '';
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/projects/admin/all`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      if (!res.ok) throw new Error('Failed to load projects (login expired?)');
      setProjects(await res.json());
      setError('');
    } catch (e: any) {
      setError(e.message || 'Error loading projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  // XHR (not fetch) so we can show a progress bar - videos can be up to 100 MB.
  const uploadFile = (file: File, onProgress?: (pct: number) => void): Promise<string> =>
    new Promise((resolve, reject) => {
      const body = new FormData();
      body.append('file', file);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${API_URL}/api/v1/upload`);
      xhr.setRequestHeader('Authorization', `Bearer ${getAuthToken()}`);
      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable && onProgress) onProgress(Math.round((ev.loaded / ev.total) * 100));
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try { resolve(JSON.parse(xhr.responseText).url); } catch { reject(new Error('Upload failed')); }
        } else if (xhr.status === 413) {
          reject(new Error('File is too large (max 100 MB).'));
        } else {
          reject(new Error('File upload failed'));
        }
      };
      xhr.onerror = () => reject(new Error('Network error during upload'));
      xhr.send(body);
    });

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    try {
      const url = await uploadFile(f);
      setForm((p) => ({ ...p, coverImage: url }));
    } catch (err: any) { alert(err.message); } finally { setUploading(false); e.target.value = ''; }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) urls.push(await uploadFile(files[i]));
      setForm((p) => ({ ...p, imagesRaw: [p.imagesRaw.trim(), ...urls].filter(Boolean).join('\n') }));
    } catch (err: any) { alert(err.message); } finally { setUploading(false); e.target.value = ''; }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        setUploadPct(0);
        urls.push(await uploadFile(files[i], setUploadPct));
      }
      setForm((p) => ({ ...p, videosRaw: [p.videosRaw.trim(), ...urls].filter(Boolean).join('\n') }));
    } catch (err: any) { alert(err.message); } finally { setUploading(false); setUploadPct(null); e.target.value = ''; }
  };

  const addVideoLink = () => {
    const link = videoLink.trim();
    if (!link) return;
    setForm((p) => ({ ...p, videosRaw: [p.videosRaw.trim(), link].filter(Boolean).join('\n') }));
    setVideoLink('');
  };

  const removeVideo = (idx: number) =>
    setForm((p) => ({ ...p, videosRaw: lines(p.videosRaw).filter((_, i) => i !== idx).join('\n') }));

  const handleBrochureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    try {
      const url = await uploadFile(f);
      setForm((p) => ({ ...p, brochureUrl: url }));
    } catch (err: any) { alert(err.message); } finally { setUploading(false); e.target.value = ''; }
  };

  const removeGalleryImage = (idx: number) =>
    setForm((p) => ({ ...p, imagesRaw: lines(p.imagesRaw).filter((_, i) => i !== idx).join('\n') }));

  const openAdd = () => { setCurrent(null); setForm({ ...emptyForm }); setVideoLink(''); setIsModalOpen(true); };

  const openEdit = (p: Project) => {
    setCurrent(p);
    setForm({
      title: p.title || '', tagline: p.tagline || '', description: p.description || '',
      status: p.status || 'Upcoming', location: p.location || '', type: p.type || 'Residential',
      price: p.price || '', area: p.area || '', totalUnits: p.totalUnits || '', developer: p.developer || '',
      reraNumber: p.reraNumber || '', launchDate: p.launchDate || '', possessionDate: p.possessionDate || '',
      coverImage: p.coverImage || '', imagesRaw: (p.images || []).join('\n'), videosRaw: Array.from(new Set([...(p.videos || []), ...(p.videoUrl ? [p.videoUrl] : [])])).join('\n'),
      brochureUrl: p.brochureUrl || '', highlightsRaw: (p.highlights || []).join('\n'),
      amenitiesRaw: (p.amenities || []).join('\n'), showOnLanding: p.showOnLanding ?? true,
      isPublished: p.isPublished ?? true, order: p.order ?? 0,
    });
    setVideoLink('');
    setIsModalOpen(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: name === 'order' ? Number(value) : value }));
  };

  const buildPayload = (f: typeof emptyForm) => {
    const { imagesRaw, videosRaw, highlightsRaw, amenitiesRaw, ...rest } = f;
    const images = lines(imagesRaw);
    const videos = lines(videosRaw);
    return {
      ...rest,
      images,
      videos,
      videoUrl: videos[0] || '', // keep legacy field in sync
      coverImage: f.coverImage || images[0] || '',
      highlights: lines(highlightsRaw),
      amenities: lines(amenitiesRaw),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return alert('Project title is required.');
    setSaving(true);
    try {
      const res = await fetch(
        current?._id ? `${API_URL}/api/v1/projects/${current._id}` : `${API_URL}/api/v1/projects`,
        {
          method: current?._id ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
          body: JSON.stringify(buildPayload(form)),
        }
      );
      if (!res.ok) throw new Error('Save failed. Please login again and retry.');
      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) { alert(err.message); } finally { setSaving(false); }
  };

  const patch = async (p: Project, data: Partial<Project>) => {
    const res = await fetch(`${API_URL}/api/v1/projects/${p._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
      body: JSON.stringify(data),
    });
    if (res.ok) setProjects((prev) => prev.map((x) => (x._id === p._id ? { ...x, ...data } : x)));
    else alert('Update failed');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project permanently?')) return;
    const res = await fetch(`${API_URL}/api/v1/projects/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    });
    if (res.ok) setProjects((prev) => prev.filter((p) => p._id !== id));
    else alert('Delete failed');
  };

  const filtered = projects.filter((p) => {
    const q = search.toLowerCase();
    const matchQ = !q || p.title.toLowerCase().includes(q) || (p.location || '').toLowerCase().includes(q);
    return matchQ && (statusFilter === 'All' || p.status === statusFilter);
  });

  const input = 'w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:bg-white';
  const label = 'block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1.5';
  const gallery = lines(form.imagesRaw);
  const videoList = lines(form.videosRaw);

  return (
    <AdminLayout title="Projects">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-gray-900">Manage Projects</h1>
          <p className="text-gray-500 text-sm">Add a project here and it appears on the website landing page automatically.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or location..." className={`${input} pl-10`} />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={`${input} sm:w-48`}>
          {['All', ...STATUSES].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>}

      {loading ? (
        <p className="text-gray-400 text-sm">Loading projects...</p>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4"><Building2 className="w-7 h-7 text-gray-400" /></div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">No projects yet</h2>
          <p className="text-gray-500 text-sm">Click “New Project” to add your first one.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div key={p._id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="relative h-44 bg-gray-100">
                {p.coverImage || p.images?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={resolveMediaUrl(p.coverImage || p.images[0])} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><Building2 className="w-8 h-8 text-gray-300" /></div>
                )}
                <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full ${statusColor[p.status] || 'bg-gray-100 text-gray-600'}`}>{p.status}</span>
                {(p.videos?.length || p.videoUrl) ? <span className="absolute bottom-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/70 text-white inline-flex items-center gap-1"><Film className="w-3 h-3" />{p.videos?.length || 1}</span> : null}
                {!p.isPublished && <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-900/80 text-white">Draft</span>}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 text-lg leading-tight">{p.title}</h3>
                {p.location && <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><MapPin className="w-3.5 h-3.5" />{p.location}</p>}
                <p className="text-sm font-semibold text-green-700 mt-2">{p.price || '—'}</p>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                  <div className="flex gap-1">
                    <button title={p.isPublished ? 'Unpublish' : 'Publish'} onClick={() => patch(p, { isPublished: !p.isPublished })} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                      {p.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button title="Show on landing page" onClick={() => patch(p, { showOnLanding: !p.showOnLanding })} className={`p-2 rounded-lg hover:bg-gray-100 ${p.showOnLanding ? 'text-amber-500' : 'text-gray-400'}`}>
                      <Star className="w-4 h-4" fill={p.showOnLanding ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-green-50 text-green-700"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(p._id!)} className="p-2 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center overflow-y-auto p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-extrabold text-gray-900">{current ? 'Edit Project' : 'New Project'}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2"><label className={label}>Project Title *</label><input name="title" value={form.title} onChange={onChange} className={input} required /></div>
              <div className="md:col-span-2"><label className={label}>Tagline (short line)</label><input name="tagline" value={form.tagline} onChange={onChange} className={input} placeholder="Premium plotted community near highway" /></div>
              <div><label className={label}>Status</label><select name="status" value={form.status} onChange={onChange} className={input}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></div>
              <div><label className={label}>Type</label><select name="type" value={form.type} onChange={onChange} className={input}>{TYPES.map((s) => <option key={s}>{s}</option>)}</select></div>
              <div><label className={label}>Location</label><input name="location" value={form.location} onChange={onChange} className={input} /></div>
              <div><label className={label}>Price</label><input name="price" value={form.price} onChange={onChange} className={input} placeholder="₹25 Lakh onwards" /></div>
              <div><label className={label}>Total Area</label><input name="area" value={form.area} onChange={onChange} className={input} placeholder="50 acres" /></div>
              <div><label className={label}>Total Units / Plots</label><input name="totalUnits" value={form.totalUnits} onChange={onChange} className={input} /></div>
              <div><label className={label}>Developer</label><input name="developer" value={form.developer} onChange={onChange} className={input} /></div>
              <div><label className={label}>RERA Number</label><input name="reraNumber" value={form.reraNumber} onChange={onChange} className={input} /></div>
              <div><label className={label}>Launch Date</label><input name="launchDate" value={form.launchDate} onChange={onChange} className={input} placeholder="Jan 2026" /></div>
              <div><label className={label}>Possession Date</label><input name="possessionDate" value={form.possessionDate} onChange={onChange} className={input} placeholder="Dec 2027" /></div>
              <div className="md:col-span-2"><label className={label}>Description</label><textarea name="description" value={form.description} onChange={onChange} rows={4} className={input} /></div>
              <div><label className={label}>Highlights (one per line)</label><textarea name="highlightsRaw" value={form.highlightsRaw} onChange={onChange} rows={4} className={input} placeholder={'Gated community\n30ft wide roads'} /></div>
              <div><label className={label}>Amenities (one per line)</label><textarea name="amenitiesRaw" value={form.amenitiesRaw} onChange={onChange} rows={4} className={input} placeholder={'Park\nClub house\nCCTV'} /></div>

              <div className="md:col-span-2">
                <label className={label}>Cover Image</label>
                <div className="flex items-center gap-4">
                  {form.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={resolveMediaUrl(form.coverImage)} alt="cover" className="w-28 h-20 object-cover rounded-xl border" />
                  )}
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold cursor-pointer">
                    <Upload className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Upload cover'}
                    <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                  </label>
                  {form.coverImage && <button type="button" onClick={() => setForm((p) => ({ ...p, coverImage: '' }))} className="text-xs text-red-500 font-semibold">Remove</button>}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className={label}>Gallery Images</label>
                <div className="flex flex-wrap gap-3 mb-3">
                  {gallery.map((url, i) => (
                    <div key={i} className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={resolveMediaUrl(url)} alt="" className="w-24 h-20 object-cover rounded-xl border" />
                      <button type="button" onClick={() => removeGalleryImage(i)} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">×</button>
                    </div>
                  ))}
                </div>
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold cursor-pointer">
                  <Upload className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Upload images (multiple)'}
                  <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
                </label>
              </div>

              <div className="md:col-span-2">
                <label className={label}>Project Videos</label>
                {videoList.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-3">
                    {videoList.map((url, i) => (
                      <div key={i} className="relative w-40">
                        <div className="w-40 h-24 rounded-xl border bg-black overflow-hidden flex items-center justify-center">
                          {isYouTube(url) ? (
                            <div className="text-white text-xs font-semibold flex flex-col items-center gap-1"><Film className="w-5 h-5" />YouTube</div>
                          ) : (
                            // eslint-disable-next-line jsx-a11y/media-has-caption
                            <video src={`${resolveMediaUrl(url)}#t=0.5`} preload="metadata" muted playsInline className="w-full h-full object-cover" />
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1 truncate" title={url}>{url.split('/').pop()}</p>
                        <button type="button" onClick={() => removeVideo(i)} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">×</button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <label className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold cursor-pointer shrink-0">
                    <Upload className="w-4 h-4" /> {uploadPct !== null ? `Uploading ${uploadPct}%` : 'Upload videos (multiple)'}
                    <input type="file" accept="video/*" multiple onChange={handleVideoUpload} className="hidden" disabled={uploading} />
                  </label>
                  <span className="text-xs text-gray-400 hidden sm:inline">or</span>
                  <div className="flex flex-1 gap-2">
                    <div className="relative flex-1">
                      <Link2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input value={videoLink} onChange={(e) => setVideoLink(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addVideoLink(); } }}
                        placeholder="Paste YouTube / mp4 link" className={`${input} pl-9`} />
                    </div>
                    <button type="button" onClick={addVideoLink} className="px-4 py-2 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-700">Add</button>
                  </div>
                </div>

                {uploadPct !== null && (
                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-600 to-emerald-400 transition-all" style={{ width: `${uploadPct}%` }} />
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-2">MP4 recommended, max 100 MB per file. Videos appear in the project gallery next to the images.</p>
              </div>
              <div>
                <label className={label}>Brochure (PDF, optional)</label>
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold cursor-pointer">
                    <Upload className="w-4 h-4" /> Upload PDF
                    <input type="file" accept="application/pdf" onChange={handleBrochureUpload} className="hidden" />
                  </label>
                  {form.brochureUrl && <span className="text-xs text-green-700 font-semibold">Uploaded ✓</span>}
                </div>
              </div>

              <div className="md:col-span-2 flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={form.isPublished} onChange={(e) => setForm((p) => ({ ...p, isPublished: e.target.checked }))} className="accent-green-600 w-4 h-4" /> Published (live on website)</label>
                <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={form.showOnLanding} onChange={(e) => setForm((p) => ({ ...p, showOnLanding: e.target.checked }))} className="accent-green-600 w-4 h-4" /> Show on landing page</label>
                <label className="flex items-center gap-2 text-sm font-medium">Order <input type="number" name="order" value={form.order} onChange={onChange} className="w-20 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" /></label>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
              <button type="submit" disabled={saving || uploading} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold shadow disabled:opacity-60">
                {saving ? 'Saving...' : current ? 'Save Changes' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
}
