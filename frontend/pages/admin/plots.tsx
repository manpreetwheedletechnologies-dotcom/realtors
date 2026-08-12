import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, X, MapPin, Compass, DollarSign, User, ShieldCheck } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { resolveMediaUrl } from '../../utils/resolveMediaUrl';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface LandPlot {
  _id?: string;
  title: string;
  location: string;
  price: string;
  size: string;
  type: string;
  dimensions: string;
  facing: string;
  owner: string;
  images: string[];
  rating: number;
  amenities: string[];
  verification: string;
  measurement: string;
}

export default function AdminPlots() {
  const [plots, setPlots] = useState<LandPlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlot, setCurrentPlot] = useState<LandPlot | null>(null);
  
  // Form fields state
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    size: '',
    type: 'Residential Land',
    dimensions: '',
    facing: '',
    owner: '',
    imagesRaw: '',
    rating: 5.0,
    amenitiesRaw: '',
    verification: 'Verified',
    measurement: ''
  });

  const getAuthToken = () => {
    if (typeof document === 'undefined') return '';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; auth_token=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
    return '';
  };

  const fetchPlots = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/lands`);
      if (!res.ok) throw new Error('Failed to fetch lands data');
      const data = await res.json();
      setPlots(data);
    } catch (err: any) {
      setError(err.message || 'Error loading plots');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlots();
  }, []);

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const token = getAuthToken();
    if (!token) {
      alert('You must be logged in to upload files.');
      return;
    }

    setUploading(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
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
        uploadedUrls.push(data.url);
      }
      
      setFormData(prev => {
        const current = prev.imagesRaw.trim();
        const appended = [current, ...uploadedUrls].filter(Boolean).join('\n');
        return { ...prev, imagesRaw: appended };
      });
    } catch (err: any) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const urls = formData.imagesRaw.split('\n').map(x => x.trim()).filter(Boolean);
    const filtered = urls.filter((_, idx) => idx !== indexToRemove);
    setFormData(prev => ({ ...prev, imagesRaw: filtered.join('\n') }));
  };

  const openAddModal = () => {
    setCurrentPlot(null);
    setFormData({
      title: '',
      location: '',
      price: '',
      size: '',
      type: 'Residential Land',
      dimensions: '',
      facing: '',
      owner: '',
      imagesRaw: '',
      rating: 5.0,
      amenitiesRaw: '',
      verification: 'Verified',
      measurement: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (plot: LandPlot) => {
    setCurrentPlot(plot);
    setFormData({
      title: plot.title,
      location: plot.location,
      price: plot.price,
      size: plot.size,
      type: plot.type,
      dimensions: plot.dimensions,
      facing: plot.facing,
      owner: plot.owner,
      imagesRaw: plot.images.join('\n'),
      rating: plot.rating,
      amenitiesRaw: plot.amenities.join(', '),
      verification: plot.verification,
      measurement: plot.measurement
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this land plot?')) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`${API_URL}/api/v1/lands/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Unauthorized or delete failed');
      setPlots((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      alert(err.message || 'Could not delete plot');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getAuthToken();
    if (!token) {
      alert('You must be logged in as admin to modify records.');
      return;
    }

    const payload: Partial<LandPlot> = {
      title: formData.title,
      location: formData.location,
      price: formData.price,
      size: formData.size,
      type: formData.type,
      dimensions: formData.dimensions,
      facing: formData.facing,
      owner: formData.owner,
      images: formData.imagesRaw.split('\n').map(x => x.trim()).filter(Boolean),
      rating: parseFloat(formData.rating.toString()) || 5.0,
      amenities: formData.amenitiesRaw.split(',').map(x => x.trim()).filter(Boolean),
      verification: formData.verification,
      measurement: formData.measurement
    };

    if (!payload.images || payload.images.length === 0) {
      alert('Please upload at least one image for the plot.');
      return;
    }

    try {
      let res;
      if (currentPlot?._id) {
        // Edit Mode
        res = await fetch(`${API_URL}/api/v1/lands/${currentPlot._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      } else {
        // Add Mode
        res = await fetch(`${API_URL}/api/v1/lands`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      }

      if (!res.ok) throw new Error('API request failed');
      
      setIsModalOpen(false);
      fetchPlots(); // Refresh
    } catch (err: any) {
      alert('Operation failed. Please verify admin authentication.');
    }
  };

  const filteredPlots = plots.filter((plot) => 
    plot.title.toLowerCase().includes(search.toLowerCase()) || 
    plot.location.toLowerCase().includes(search.toLowerCase()) || 
    plot.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Manage Plots">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-gray-900">Land Plot Directory</h1>
          <p className="text-gray-500 text-sm">Add, modify, and manage the live real estate plots shown on the frontend.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Land Plot
        </button>
      </div>

      {/* FILTER & SEARCH */}
      <div className="bg-white border border-gray-200 rounded-3xl p-5 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by title, location, type..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900"
          />
        </div>
        <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
          Total plots: {filteredPlots.length}
        </div>
      </div>

      {/* TABLE / LIST */}
      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-green-500/30 border-t-green-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 text-sm font-medium">Fetching land plots database...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">{error}</div>
        ) : filteredPlots.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            <p className="text-lg font-semibold">No plots found</p>
            <p className="text-sm text-gray-400 mt-1">Try modifying your search or add a new record.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-500 bg-gray-50/50">
                  <th className="px-8 py-4 font-semibold">Plot Detail</th>
                  <th className="px-8 py-4 font-semibold">Type & Facing</th>
                  <th className="px-8 py-4 font-semibold">Area & Price</th>
                  <th className="px-8 py-4 font-semibold">Owner & Status</th>
                  <th className="px-8 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPlots.map((plot) => (
                  <tr key={plot._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden relative shrink-0 border">
                          <img 
                            src={plot.images[0] ? resolveMediaUrl(plot.images[0]) : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=150'} 
                            alt={plot.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{plot.title}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 shrink-0" />
                            {plot.location || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="font-medium text-gray-900 text-sm">{plot.type}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <Compass className="w-3 h-3" /> Facing: {plot.facing}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="font-bold text-emerald-700 text-sm">{plot.price}</div>
                      <div className="text-xs text-gray-500 mt-0.5">Size: {plot.size} ({plot.dimensions})</div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                        <User className="w-3 h-3" /> {plot.owner}
                      </div>
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold">
                        <ShieldCheck className="w-3 h-3" /> {plot.verification}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(plot)}
                          className="p-2 text-gray-500 hover:text-green-700 hover:bg-gray-100 rounded-lg transition-all"
                          title="Edit plot"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(plot._id!)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete plot"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900">
                {currentPlot ? 'Edit Land Plot Details' : 'Add New Land Plot'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Plot Title*</label>
                  <input 
                    type="text" 
                    required 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Green Meadows Residential Plot"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Land Type*</label>
                  <select 
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900"
                  >
                    <option value="Residential Land">Residential Land</option>
                    <option value="Commercial Land">Commercial Land</option>
                    <option value="Agricultural Land">Agricultural Land</option>
                    <option value="Industrial Land">Industrial Land</option>
                    <option value="Farm Land">Farm Land</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price*</label>
                  <input 
                    type="text" 
                    required 
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g. ₹2.5 Cr"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Size (e.g. sq.yds / acres)*</label>
                  <input 
                    type="text" 
                    required 
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    placeholder="e.g. 450 sq.yds"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Dimensions*</label>
                  <input 
                    type="text" 
                    required 
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleInputChange}
                    placeholder="e.g. 30ft × 45ft"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Facing Direction*</label>
                  <input 
                    type="text" 
                    required 
                    name="facing"
                    value={formData.facing}
                    onChange={handleInputChange}
                    placeholder="e.g. North-East"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location*</label>
                  <input 
                    type="text" 
                    required 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Sector 62, Noida"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Owner Name / Company*</label>
                  <input 
                    type="text" 
                    required 
                    name="owner"
                    value={formData.owner}
                    onChange={handleInputChange}
                    placeholder="e.g. Shree Builders Pvt Ltd"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Verification Status</label>
                  <select 
                    name="verification"
                    value={formData.verification}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Approved">Approved</option>
                    <option value="RERA Registered">RERA Registered</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (0 - 5)*</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0" 
                    max="5"
                    required 
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900" 
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Calculation / Measurement Summary</label>
                  <input 
                    type="text" 
                    name="measurement"
                    value={formData.measurement}
                    onChange={handleInputChange}
                    placeholder="e.g. 30ft x 45ft = 1,350 sq.ft"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900" 
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Amenities (Comma separated)*</label>
                  <input 
                    type="text" 
                    required 
                    name="amenitiesRaw"
                    value={formData.amenitiesRaw}
                    onChange={handleInputChange}
                    placeholder="Corner Plot, Wide Road, Water Supply, Electricity, Drainage"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900" 
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Plot Images (Upload Multiple)*</label>
                  
                  {/* Preview Grid */}
                  <div className="flex flex-wrap gap-3 mb-3">
                    {formData.imagesRaw.split('\n').map(x => x.trim()).filter(Boolean).map((imgUrl, idx) => {
                      return (
                        <div key={idx} className="relative w-24 h-24 border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
                          <img src={resolveMediaUrl(imgUrl)} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow hover:bg-red-600 transition-colors"
                          >
                            &times;
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Upload Dropzone */}
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100/70 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-4 pb-4">
                        <Plus className="w-8 h-8 text-gray-400 mb-1" />
                        <p className="text-sm text-gray-500 font-semibold">
                          {uploading ? 'Uploading images...' : 'Click to upload plot images'}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, JPEG up to 10MB</p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        disabled={uploading}
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
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