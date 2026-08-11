import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, X, Film, Play, Tag, Sparkles } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface Video {
  _id?: string;
  src: string;
  title: string;
  subtitle: string;
  badge: string;
  size: string;
  tag: string;
}

export default function AdminVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  
  // Form fields state
  const [formData, setFormData] = useState({
    src: '',
    title: '',
    subtitle: '',
    badge: '',
    size: 'small',
    tag: 'Featured'
  });

  const getAuthToken = () => {
    if (typeof document === 'undefined') return '';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; auth_token=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
    return '';
  };

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/videos`);
      if (!res.ok) throw new Error('Failed to fetch videos data');
      const data = await res.json();
      setVideos(data);
    } catch (err: any) {
      setError(err.message || 'Error loading videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const [uploading, setUploading] = useState(false);

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const token = getAuthToken();
    if (!token) {
      alert('You must be logged in to upload files.');
      return;
    }

    setUploading(true);
    try {
      const file = files[0];
      const bodyData = new FormData();
      bodyData.append('file', file);
      
      const res = await fetch(`${API_URL}/api/v1/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: bodyData
      });
      
      if (!res.ok) throw new Error('File upload failed');
      const data = await res.json();
      setFormData(prev => ({ ...prev, src: data.url }));
    } catch (err: any) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveVideo = () => {
    setFormData(prev => ({ ...prev, src: '' }));
  };

  const openAddModal = () => {
    setCurrentVideo(null);
    setFormData({
      src: '',
      title: '',
      subtitle: '',
      badge: '',
      size: 'small',
      tag: 'Featured'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (video: Video) => {
    setCurrentVideo(video);
    setFormData({
      src: video.src,
      title: video.title,
      subtitle: video.subtitle,
      badge: video.badge,
      size: video.size,
      tag: video.tag
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`${API_URL}/api/v1/videos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Unauthorized or delete failed');
      setVideos((prev) => prev.filter((v) => v._id !== id));
    } catch (err: any) {
      alert(err.message || 'Could not delete video');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getAuthToken();
    if (!token) {
      alert('You must be logged in as admin to modify records.');
      return;
    }

    if (!formData.src) {
      alert('Please upload a video tour first.');
      return;
    }

    try {
      let res;
      if (currentVideo?._id) {
        // Edit Mode
        res = await fetch(`${API_URL}/api/v1/videos/${currentVideo._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });
      } else {
        // Add Mode
        res = await fetch(`${API_URL}/api/v1/videos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });
      }

      if (!res.ok) throw new Error('API request failed');
      
      setIsModalOpen(false);
      fetchVideos(); // Refresh
    } catch (err: any) {
      alert('Operation failed. Please verify admin authentication.');
    }
  };

  const filteredVideos = videos.filter((video) => 
    video.title.toLowerCase().includes(search.toLowerCase()) || 
    video.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Manage Videos">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-gray-900">Drone Video Showcases</h1>
          <p className="text-gray-500 text-sm">Add, modify, and delete the 3D showcase and site walkthrough videos displayed on the frontend.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Video
        </button>
      </div>

      {/* FILTER & SEARCH */}
      <div className="bg-white border border-gray-200 rounded-3xl p-5 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by title or category tag..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900"
          />
        </div>
        <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
          Total videos: {filteredVideos.length}
        </div>
      </div>

      {/* VIDEO GRID */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center bg-white border rounded-3xl">
          <div className="w-10 h-10 border-4 border-green-500/30 border-t-green-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 text-sm font-medium">Fetching videos database...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center text-red-600 bg-white border rounded-3xl">{error}</div>
      ) : filteredVideos.length === 0 ? (
        <div className="py-20 text-center text-gray-500 bg-white border rounded-3xl">
          <p className="text-lg font-semibold">No videos found</p>
          <p className="text-sm text-gray-400 mt-1">Try modifying your search or add a new record.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div key={video._id} className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col">
              <div className="h-44 bg-slate-900 relative flex items-center justify-center text-white">
                <Film className="w-12 h-12 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                {video.badge && (
                  <span className="absolute top-4 left-4 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded">
                    {video.badge}
                  </span>
                )}
                <span className="absolute bottom-4 right-4 px-2.5 py-1 bg-black/60 text-white text-xs font-bold rounded-lg backdrop-blur-sm">
                  {video.size === 'large' ? 'Wide Grid' : 'Standard'}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-bold rounded flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {video.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">
                    {video.title}
                  </h3>
                  {video.subtitle && <p className="text-xs text-gray-500 line-clamp-2 mb-4">{video.subtitle}</p>}
                  <p className="text-[11px] text-gray-400 font-mono truncate mb-4">{video.src}</p>
                </div>
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => openEditModal(video)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 rounded-xl text-sm font-semibold transition-colors text-gray-700"
                  >
                    <Edit2 className="w-4 h-4" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(video._id!)}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
                    title="Delete video"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900">
                {currentVideo ? 'Edit Video Details' : 'Add New Video'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Video Title*</label>
                  <input 
                    type="text" 
                    required 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. BuildSmart Premium Villa Development"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Video File Tour*</label>
                  {formData.src ? (
                    <div className="relative border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-gray-50 p-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-gray-600 truncate max-w-[250px]">
                          {formData.src}
                        </span>
                        <button
                          type="button"
                          onClick={handleRemoveVideo}
                          className="px-2.5 py-1 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Remove Video
                        </button>
                      </div>
                      <video
                        src={formData.src.startsWith('/uploads/') ? `${API_URL}${formData.src}` : formData.src}
                        controls
                        muted
                        className="w-full h-32 rounded-lg object-cover bg-black"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100/70 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-4 pb-4">
                          <Play className="w-8 h-8 text-gray-400 mb-1" />
                          <p className="text-sm text-gray-500 font-semibold">
                            {uploading ? 'Uploading video...' : 'Click to upload video tour'}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">MP4, WebM, OGG up to 100MB</p>
                        </div>
                        <input
                          type="file"
                          accept="video/*"
                          disabled={uploading}
                          onChange={handleVideoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle / Description</label>
                  <input 
                    type="text" 
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    placeholder="e.g. Architectural 3D design and flythrough"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category Tag*</label>
                    <select 
                      name="tag"
                      value={formData.tag}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900"
                    >
                      <option value="Featured">Featured</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Agricultural">Agricultural</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Waterfront">Waterfront</option>
                      <option value="Farm Land">Farm Land</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Display Size</label>
                    <select 
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900"
                    >
                      <option value="small">Standard</option>
                      <option value="large">Wide (large)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ribbon Badge (optional)</label>
                  <input 
                    type="text" 
                    name="badge"
                    value={formData.badge}
                    onChange={handleInputChange}
                    placeholder="e.g. New, HD Animation"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900" 
                  />
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-medium text-sm transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl font-medium text-sm shadow-lg shadow-green-500/30 transition-all hover:shadow-xl"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
